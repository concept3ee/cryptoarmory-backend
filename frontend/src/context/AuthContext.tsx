import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { User } from '../types';
import { createApi } from '../lib/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  sendEmailOtp: (email: string) => Promise<string>;
  verifyEmailOtp: (email: string, otp: string, token: string) => Promise<boolean>;
  // Session timeout
  isSessionWarning: boolean;
  sessionSecondsLeft: number;
  extendSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

function getApiBaseUrl(): string {
  // Vite injects import.meta.env at build-time
  return (import.meta as any).env?.VITE_API_BASE_URL || '';
}

function getSessionTimeoutMinutes(): number {
  const raw = (import.meta as any).env?.VITE_SESSION_TIMEOUT_MINUTES;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 15; // default 15 minutes
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(!!token);
  // Session timeout state
  const [isSessionWarning, setIsSessionWarning] = useState(false);
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState(60);
  const warnTimerRef = React.useRef<number | null>(null);
  const logoutTimerRef = React.useRef<number | null>(null);
  const tickIntervalRef = React.useRef<number | null>(null);
  const api = useMemo(() => createApi({ baseUrl: getApiBaseUrl(), authToken: token || '' }), [token]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        setIsLoadingUser(true);
        const me = await api.me();
        // map backend fields to User type
        const mapped: User = {
          id: me.id,
          email: me.email,
          firstName: me.firstName,
          lastName: me.lastName,
          cryptoBalance: me.walletBalance ?? 0,
          totalInvested: me.totalInvested ?? 0,
          totalProfit: me.totalProfit ?? 0,
          joinDate: me.joinDate || new Date().toISOString(),
          emailVerified: true,
        };
        setUser(mapped);
      } catch (e) {
        // invalid token
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_token');
      } finally { setIsLoadingUser(false); }
    })();
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Login failed');
      setToken(data.token);
      localStorage.setItem('auth_token', data.token);
      (window as any).__AUTH_TOKEN__ = data.token;
      extendSession();
      return true;
    } catch (e) {
      return false;
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Signup failed');
      setToken(data.token);
      localStorage.setItem('auth_token', data.token);
      (window as any).__AUTH_TOKEN__ = data.token;
      extendSession();
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    clearSessionTimers();
  };

  const sendEmailOtp = async (email: string): Promise<string> => {
    const res = await fetch(`${getApiBaseUrl()}/api/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || 'Failed to send OTP');
    return data?.devOtp || '';
  };

  const verifyEmailOtp = async (email: string, otp: string, _token: string): Promise<boolean> => {
    const res = await fetch(`${getApiBaseUrl()}/api/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    return res.ok;
  };

  const isAuthenticated = !!token && user !== null;

  function clearSessionTimers() {
    if (warnTimerRef.current) window.clearTimeout(warnTimerRef.current);
    if (logoutTimerRef.current) window.clearTimeout(logoutTimerRef.current);
    if (tickIntervalRef.current) window.clearInterval(tickIntervalRef.current);
    warnTimerRef.current = null;
    logoutTimerRef.current = null;
    tickIntervalRef.current = null;
    setIsSessionWarning(false);
  }

  function startSessionTimers() {
    clearSessionTimers();
    if (!token) return;
    const timeoutMs = getSessionTimeoutMinutes() * 60 * 1000;
    const warnMs = 60 * 1000;
    warnTimerRef.current = window.setTimeout(() => {
      setIsSessionWarning(true);
      setSessionSecondsLeft(60);
      tickIntervalRef.current = window.setInterval(() => {
        setSessionSecondsLeft((s) => {
          if (s <= 1) {
            if (tickIntervalRef.current) window.clearInterval(tickIntervalRef.current);
          }
          return Math.max(0, s - 1);
        });
      }, 1000);
    }, Math.max(0, timeoutMs - warnMs));

    logoutTimerRef.current = window.setTimeout(() => {
      setIsSessionWarning(false);
      logout();
    }, timeoutMs);
  }

  function extendSession() {
    setIsSessionWarning(false);
    startSessionTimers();
  }

  // Reset timers on user activity
  React.useEffect(() => {
    if (!token) return;
    const handler = () => extendSession();
    const events = ['mousemove','keydown','click','touchstart','scroll'];
    events.forEach(ev => window.addEventListener(ev, handler, { passive: true } as any));
    startSessionTimers();
    return () => {
      events.forEach(ev => window.removeEventListener(ev, handler));
      clearSessionTimers();
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, isLoadingUser, sendEmailOtp, verifyEmailOtp, isSessionWarning, sessionSecondsLeft, extendSession }}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { createContext, useContext, useMemo, useState, ReactNode, useEffect } from 'react';
import { NotificationItem } from '../types';
import { createApi } from '../lib/api';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (n: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const api = createApi({ authToken: (window as any).__AUTH_TOKEN__ || localStorage.getItem('auth_token') || '' });

  useEffect(() => {
    (async () => {
      try {
        const list = await api.notifications();
        // Coerce backend shape to NotificationItem
        const mapped = list.map((n: any) => ({
          id: n._id,
          title: n.title,
          message: n.message,
          type: n.type || 'info',
          createdAt: n.createdAt,
          read: !!n.read,
        }));
        setNotifications(mapped);
      } catch {}
    })();
  }, []);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const addNotification: NotificationContextType['addNotification'] = (n) => {
    const item: NotificationItem = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false,
      ...n,
    };
    setNotifications(prev => [item, ...prev]);
  };

  const markAsRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    try { await api.notificationsMarkRead(id); } catch {}
  };
  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try { await api.notificationsReadAll(); } catch {}
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};




import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Investment, CryptoAsset, WithdrawalRequest } from '../types';
import { useNotifications } from './NotificationContext';
import { createApi } from '../lib/api';

interface InvestmentContextType {
  investments: Investment[];
  cryptoAssets: CryptoAsset[];
  withdrawalRequests: WithdrawalRequest[];
  addInvestment: (investment: Omit<Investment, 'id' | 'status' | 'walletUrl'>) => Promise<Investment>;
  confirmPayment: (investmentId: string) => void;
  requestWithdrawal: (amount: number) => void;
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (context === undefined) {
    throw new Error('useInvestment must be used within an InvestmentProvider');
  }
  return context;
};

const mockCryptoAssets: CryptoAsset[] = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', currentPrice: 65420, change24h: 2.45, icon: '₿' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', currentPrice: 3240, change24h: -1.23, icon: 'Ξ' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', currentPrice: 145, change24h: 5.67, icon: '◎' },
  { id: 'ada', name: 'Cardano', symbol: 'ADA', currentPrice: 0.58, change24h: 3.21, icon: '₳' },
];

interface InvestmentProviderProps {
  children: ReactNode;
}

export const InvestmentProvider: React.FC<InvestmentProviderProps> = ({ children }) => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);
  // Access notifications context; App wraps this provider with NotificationProvider
  const { addNotification } = useNotifications();
  const api = createApi({ authToken: (window as any).__AUTH_TOKEN__ || localStorage.getItem('auth_token') || '' });

  // Load investments from backend on mount/auth
  React.useEffect(() => {
    (async () => {
      try {
        const summary = await api.investmentSummary();
        const items = (summary.investments || []).map((i: any): Investment => ({
          id: i._id || i.id,
          cryptoType: i.planId || 'INV',
          amount: i.amount,
          investmentDate: i.createdAt || new Date().toISOString(),
          currentValue: i.currentValue ?? i.amount,
          profit: i.profit ?? 0,
          walletUrl: i.walletUrl,
          status: (i.status as any) || 'pending',
        }));
        setInvestments(items);
      } catch {}
    })();
  }, [api]);

  const addInvestment = async (investment: Omit<Investment, 'id' | 'status' | 'walletUrl'>): Promise<Investment> => {
    const res = await api.createInvestment({ planId: investment.cryptoType, amount: investment.amount });
    const created: Investment = {
      cryptoType: investment.cryptoType,
      amount: investment.amount,
      investmentDate: new Date().toISOString(),
      currentValue: investment.amount,
      profit: 0,
      id: res._id || res.id || Date.now().toString(),
      status: res.status || 'pending',
      walletUrl: res.walletUrl || `crypto-wallet://pay/${Math.random().toString(36).substr(2, 9)}`,
    };
    setInvestments(prev => [...prev, created]);
    return created;
  };

  const confirmPayment = (investmentId: string) => {
    setInvestments(prev => 
      prev.map(inv => 
        inv.id === investmentId 
          ? { ...inv, status: 'confirmed', currentValue: inv.amount * 1.1 } 
          : inv
      )
    );
  };

  // Simulate backoffice approval: after 5s, mark latest pending as confirmed and push notification
  React.useEffect(() => {
    const pending = investments.find(inv => inv.status === 'pending');
    if (!pending) return;
    const timer = setTimeout(() => {
      confirmPayment(pending.id);
      addNotification({
        title: 'Investment approved',
        message: `Your ${pending.cryptoType} investment of $${pending.amount.toLocaleString()} is now active.`,
        type: 'success'
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [investments]);

  const requestWithdrawal = (amount: number) => {
    const newRequest: WithdrawalRequest = {
      id: Date.now().toString(),
      amount,
      requestDate: new Date().toISOString(),
      status: 'pending',
      eligibleDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    setWithdrawalRequests(prev => [...prev, newRequest]);
  };

  return (
    <InvestmentContext.Provider value={{
      investments,
      cryptoAssets: mockCryptoAssets,
      withdrawalRequests,
      addInvestment,
      confirmPayment,
      requestWithdrawal
    }}>
      {children}
    </InvestmentContext.Provider>
  );
};
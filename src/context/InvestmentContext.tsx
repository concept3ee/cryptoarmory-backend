import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Investment, CryptoAsset, WithdrawalRequest } from '../types';

interface InvestmentContextType {
  investments: Investment[];
  cryptoAssets: CryptoAsset[];
  withdrawalRequests: WithdrawalRequest[];
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
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

  const addInvestment = (investment: Omit<Investment, 'id'>) => {
    const newInvestment: Investment = {
      ...investment,
      id: Date.now().toString(),
      status: 'pending',
      walletUrl: `crypto-wallet://pay/${Math.random().toString(36).substr(2, 9)}`
    };
    setInvestments(prev => [...prev, newInvestment]);
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
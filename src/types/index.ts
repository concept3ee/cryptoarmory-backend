export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  cryptoBalance: number;
  totalInvested: number;
  totalProfit: number;
  joinDate: string;
}

export interface Investment {
  id: string;
  cryptoType: string;
  amount: number;
  investmentDate: string;
  currentValue: number;
  profit: number;
  walletUrl?: string;
  status: 'pending' | 'confirmed' | 'completed';
}

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  change24h: number;
  icon: string;
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  requestDate: string;
  status: 'pending' | 'approved' | 'completed';
  eligibleDate: string;
}
import React from 'react';
import { DollarSign, TrendingUp, Wallet, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useInvestment } from '../../context/InvestmentContext';
import StatsCard from './StatsCard';
import CryptoGrid from './CryptoGrid';

interface DashboardOverviewProps {
  onInvest: (asset: any) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onInvest }) => {
  const { user } = useAuth();
  const { cryptoAssets, investments } = useInvestment();

  const activeInvestments = investments.filter(inv => inv.status === 'confirmed').length;
  const pendingInvestments = investments.filter(inv => inv.status === 'pending').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Welcome back, {user?.firstName}!
          </h2>
          <p className="text-gray-400 mt-1">
            Here's an overview of your crypto investments
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="text-right">
            <p className="text-sm text-gray-400">Member since</p>
            <p className="text-white font-semibold">
              {user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long'
              }) : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Balance"
          value={`$${user?.cryptoBalance.toLocaleString() || '0'}`}
          icon={DollarSign}
          gradient="bg-gradient-to-br from-purple-500 to-blue-600"
        />
        <StatsCard
          title="Total Invested"
          value={`$${user?.totalInvested.toLocaleString() || '0'}`}
          icon={Wallet}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
        />
        <StatsCard
          title="Total Profit"
          value={`$${user?.totalProfit.toLocaleString() || '0'}`}
          change="27.1%"
          changeType="positive"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        <StatsCard
          title="Active Investments"
          value={activeInvestments.toString()}
          change={`${pendingInvestments} pending`}
          changeType="neutral"
          icon={Clock}
          gradient="bg-gradient-to-br from-orange-500 to-red-600"
        />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-6">Available Cryptocurrencies</h3>
        <CryptoGrid assets={cryptoAssets} onInvest={onInvest} />
      </div>
    </div>
  );
};

export default DashboardOverview;
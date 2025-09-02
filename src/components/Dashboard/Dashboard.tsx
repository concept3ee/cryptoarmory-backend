import React, { useState } from 'react';
import Header from '../Layout/Header';
import Navigation from './Navigation';
import DashboardOverview from './DashboardOverview';
import InvestmentPage from './InvestmentPage';
import Portfolio from './Portfolio';
import Withdrawal from './Withdrawal';
import InvestmentModal from '../Investment/InvestmentModal';
import { CryptoAsset } from '../../types';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInvest = (asset: CryptoAsset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAsset(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview onInvest={handleInvest} />;
      case 'invest':
        return <InvestmentPage />;
      case 'portfolio':
        return <Portfolio />;
      case 'withdrawal':
        return <Withdrawal />;
      default:
        return <DashboardOverview onInvest={handleInvest} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}
      </main>

      {selectedAsset && (
        <InvestmentModal
          asset={selectedAsset}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
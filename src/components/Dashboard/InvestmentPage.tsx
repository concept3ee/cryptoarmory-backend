import React, { useState } from 'react';
import { useInvestment } from '../../context/InvestmentContext';
import CryptoGrid from './CryptoGrid';
import InvestmentModal from '../Investment/InvestmentModal';
import { CryptoAsset } from '../../types';

const InvestmentPage: React.FC = () => {
  const { cryptoAssets } = useInvestment();
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Invest in Crypto</h2>
        <p className="text-gray-400">
          Choose from our selection of top-performing cryptocurrencies
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-2">💎 Premium Investment Features</h3>
        <ul className="text-purple-200 space-y-1 text-sm">
          <li>• Real-time profit tracking and analytics</li>
          <li>• Secure wallet generation for each investment</li>
          <li>• Competitive returns with professional management</li>
          <li>• 24/7 market monitoring and automated optimization</li>
        </ul>
      </div>

      <CryptoGrid assets={cryptoAssets} onInvest={handleInvest} />

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

export default InvestmentPage;
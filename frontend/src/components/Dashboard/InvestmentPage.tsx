import React, { useState } from 'react';
import { useInvestment } from '../../context/InvestmentContext';
import InvestmentModal from '../Investment/InvestmentModal';
import { CryptoAsset } from '../../types';
import InvestmentPlans, { Plan, defaultPlans } from '../Investment/InvestmentPlans';
import PlanInvestmentModal from '../Investment/PlanInvestmentModal';

const InvestmentPage: React.FC = () => {
  const { cryptoAssets, addInvestment } = useInvestment();
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const handleInvest = (asset: CryptoAsset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAsset(null);
  };

  const onSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsPlanModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Invest in Crypto</h2>
        <p className="text-gray-400">
          Choose from our selection of top-performing cryptocurrencies
        </p>
      </div>

      <div className="space-y-2">
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Choose a Plan</h3>
          <InvestmentPlans onSelect={onSelectPlan} />
        </div>
      </div>

      {/* Removed asset-based investing per request */}

      {selectedAsset && (
        <InvestmentModal
          asset={selectedAsset}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {selectedPlan && (
        <PlanInvestmentModal
          isOpen={isPlanModalOpen}
          plan={selectedPlan}
          onClose={() => setIsPlanModalOpen(false)}
          onInvest={async (amount, planId) => {
            await addInvestment({
              cryptoType: planId,
              amount,
              investmentDate: new Date().toISOString(),
              currentValue: amount,
              profit: 0,
            });
          }}
        />
      )}
    </div>
  );
};

export default InvestmentPage;
import React from 'react';
import { Shield, TrendingUp, Zap } from 'lucide-react';

export interface Plan {
  id: string;
  name: string;
  minAmount: number;
  maxAmount?: number;
  yieldPct: number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface InvestmentPlansProps {
  onSelect: (plan: Plan) => void;
}

export const defaultPlans: Plan[] = [
  { id: 'starter', name: 'Starter', minAmount: 100, maxAmount: 999, yieldPct: 8, description: 'Perfect for beginners testing the waters', icon: Zap },
  { id: 'premium', name: 'Premium', minAmount: 1000, maxAmount: 9999, yieldPct: 12, description: 'Balanced growth with solid returns', icon: Shield },
  { id: 'elite', name: 'Elite', minAmount: 10000, maxAmount: 100000, yieldPct: 16, description: 'Higher capital, priority execution', icon: TrendingUp },
];

const InvestmentPlans: React.FC<InvestmentPlansProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {defaultPlans.map((plan) => {
        const Icon = plan.icon;
        return (
          <button
            key={plan.id}
            onClick={() => onSelect(plan)}
            className="text-left rounded-2xl border border-gray-700/50 bg-gray-800/60 p-6 transition-all hover:border-gray-600/50 hover:bg-gray-800/80"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-600">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              </div>
              <span className="rounded-full border border-green-500/30 bg-green-900/20 px-2 py-1 text-xs text-green-300">+{plan.yieldPct}% est.</span>
            </div>
            <p className="mb-4 text-sm text-gray-400">{plan.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Package range</span>
              <span className="font-semibold text-white">${plan.minAmount.toLocaleString()} - {plan.maxAmount ? `$${plan.maxAmount.toLocaleString()}` : 'Unlimited'}</span>
            </div>
          </button>
        );
      })}

      {/* Custom plan */}
      <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-purple-500/30 bg-purple-900/20 p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Custom Plan</h3>
            <p className="text-sm text-purple-200">Choose any amount above $100 and tailor your package.</p>
          </div>
          <button
            onClick={() => onSelect({ id: 'custom', name: 'Custom Plan', minAmount: 100, yieldPct: 10, description: 'Flexible package for any amount', icon: Zap })}
            className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 font-semibold text-white hover:from-purple-700 hover:to-blue-700"
          >
            Select Custom Amount
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlans;




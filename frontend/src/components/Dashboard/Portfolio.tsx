import React from 'react';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { useInvestment } from '../../context/InvestmentContext';

const Portfolio: React.FC = () => {
  const { investments } = useInvestment();

  const confirmedInvestments = investments.filter(inv => inv.status === 'confirmed');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Your Portfolio</h2>
      
      {confirmedInvestments.length === 0 ? (
        <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Investments Yet</h3>
          <p className="text-gray-400">Start investing in cryptocurrencies to build your portfolio</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {confirmedInvestments.map((investment) => {
            const profitPercentage = ((investment.currentValue - investment.amount) / investment.amount) * 100;
            const isProfit = investment.profit >= 0;
            
            return (
              <details
                key={investment.id}
                className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-200"
              >
                <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {investment.cryptoType === 'BTC' ? '₿' : 
                       investment.cryptoType === 'ETH' ? 'Ξ' :
                       investment.cryptoType === 'SOL' ? '◎' : '₳'}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{investment.cryptoType}</h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(investment.investmentDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white font-semibold">${investment.currentValue.toLocaleString()}</p>
                    <div className="flex items-center space-x-1">
                      {isProfit ? (
                        <TrendingUp className="w-3 h-3 text-green-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      )}
                      <span className={`text-sm font-medium ${
                        isProfit ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {isProfit && '+'}{profitPercentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
                </summary>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Initial Investment</span>
                    <span className="text-white">${investment.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current Value</span>
                    <span className="text-white">${investment.currentValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Profit/Loss</span>
                    <span className={`font-semibold ${
                      isProfit ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isProfit && '+'}${investment.profit.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Investment ID: {investment.id}
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoAsset } from '../../types';

interface CryptoGridProps {
  assets: CryptoAsset[];
  onInvest: (asset: CryptoAsset) => void;
}

const CryptoGrid: React.FC<CryptoGridProps> = ({ assets, onInvest }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-200 hover:transform hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {asset.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold">{asset.symbol}</h3>
                <p className="text-gray-400 text-sm">{asset.name}</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-2xl font-bold text-white">${asset.currentPrice.toLocaleString()}</p>
            <div className="flex items-center space-x-1">
              {asset.change24h >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className={`text-sm font-medium ${
                asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {asset.change24h > 0 && '+'}{asset.change24h}%
              </span>
            </div>
          </div>

          <button
            onClick={() => onInvest(asset)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            Invest Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default CryptoGrid;
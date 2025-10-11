import React, { useMemo } from 'react';

interface TickerItem {
  label: string;
  value: string;
  change: number;
}

interface TickerProps {
  items?: TickerItem[];
}

const Ticker: React.FC<TickerProps> = ({ items }) => {
  const data: TickerItem[] = useMemo(() => (
    items ?? [
      { label: 'US 100', value: '24,892.5', change: 0.15 },
      { label: 'EUR/USD', value: '1.16302', change: -0.22 },
      { label: 'Bitcoin', value: '121,938', change: 0.45 },
      { label: 'Ethereum', value: '4,473.1', change: 0.53 },
      { label: 'S&P 500', value: '6,726.2', change: 0.11 },
      { label: 'NASDAQ', value: '17,456.8', change: -0.08 },
      { label: 'Gold', value: '2,367.1', change: 0.06 },
      { label: 'Crude Oil', value: '87.24', change: -1.02 },
    ]
  ), [items]);

  return (
    <div className="relative w-full overflow-hidden bg-gray-900/70 border-b border-gray-700/40">
      <div className="flex whitespace-nowrap animate-[ticker_30s_linear_infinite]">
        {[...data, ...data].map((item, idx) => (
          <div
            key={`${item.label}-${idx}`}
            className="flex items-center px-4 py-2 text-sm border-r border-gray-700/30"
          >
            <span className="text-gray-300 mr-2 font-medium">{item.label}</span>
            <span className="text-white mr-2">{item.value}</span>
            <span className={item.change >= 0 ? 'text-green-400' : 'text-red-400'}>
              {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default Ticker;




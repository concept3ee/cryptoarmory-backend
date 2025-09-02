import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  gradient: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  gradient 
}) => {
  const changeColor = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-gray-400'
  }[changeType];

  return (
    <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-200 hover:transform hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${changeColor}`}>
            {changeType === 'positive' && '+'}
            {change}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
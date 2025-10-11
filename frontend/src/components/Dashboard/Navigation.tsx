import React from 'react';
import { LayoutDashboard, TrendingUp, Wallet, ArrowDownToLine } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'invest', name: 'Invest', icon: TrendingUp },
    { id: 'portfolio', name: 'Portfolio', icon: Wallet },
    { id: 'withdrawal', name: 'Withdrawal', icon: ArrowDownToLine }
  ];

  return (
    <nav className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-2 mb-8">
      <div className="flex flex-wrap">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
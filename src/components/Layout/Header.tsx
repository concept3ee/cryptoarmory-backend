import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">CryptoArmory</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <User className="w-4 h-4" />
              <span className="hidden sm:block text-sm">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useInvestment } from '../../context/InvestmentContext';

const Withdrawal: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { withdrawalRequests, requestWithdrawal } = useInvestment();

  const handleWithdrawal = async () => {
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > 0 && user && withdrawAmount <= user.cryptoBalance) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      requestWithdrawal(withdrawAmount);
      setAmount('');
      setIsLoading(false);
    }
  };

  const canWithdraw = user && user.cryptoBalance > 0;
  const minWithdrawal = 100;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Withdrawal</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Request Withdrawal</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-300 font-medium text-sm">Withdrawal Policy</h4>
                  <p className="text-blue-200 text-sm mt-1">
                    Withdrawals are available after 7 days from your last investment. Minimum withdrawal: ${minWithdrawal}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Available Balance: ${user?.cryptoBalance.toLocaleString() || '0'}
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder={`Minimum $${minWithdrawal}`}
                  min={minWithdrawal}
                  max={user?.cryptoBalance || 0}
                  disabled={!canWithdraw}
                />
              </div>
            </div>

            <button
              onClick={handleWithdrawal}
              disabled={
                !canWithdraw || 
                !amount || 
                parseFloat(amount) < minWithdrawal || 
                parseFloat(amount) > (user?.cryptoBalance || 0) ||
                isLoading
              }
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Request Withdrawal'}
            </button>
          </div>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Withdrawal History</h3>
          
          {withdrawalRequests.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400">No withdrawal requests yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {withdrawalRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">${request.amount.toLocaleString()}</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {request.status === 'pending' && (
                        <>
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 text-sm">Pending</span>
                        </>
                      )}
                      {request.status === 'approved' && (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">Approved</span>
                        </>
                      )}
                      {request.status === 'completed' && (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">Completed</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
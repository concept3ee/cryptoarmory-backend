import React, { useState } from 'react';
import { X, DollarSign, Copy, Check } from 'lucide-react';
import { CryptoAsset } from '../../types';
import { useInvestment } from '../../context/InvestmentContext';

interface InvestmentModalProps {
  asset: CryptoAsset;
  isOpen: boolean;
  onClose: () => void;
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({ asset, isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'input' | 'payment' | 'success'>('input');
  const [walletUrl, setWalletUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const { addInvestment, confirmPayment } = useInvestment();

  if (!isOpen) return null;

  const handleInvest = () => {
    const investmentAmount = parseFloat(amount);
    if (investmentAmount > 0) {
      addInvestment({
        cryptoType: asset.symbol,
        amount: investmentAmount,
        investmentDate: new Date().toISOString(),
        currentValue: investmentAmount,
        profit: 0
      });
      
      setWalletUrl(`crypto-wallet://pay/${Math.random().toString(36).substr(2, 9)}`);
      setStep('payment');
    }
  };

  const handleCopyWallet = async () => {
    await navigator.clipboard.writeText(walletUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setStep('success');
    setTimeout(() => {
      onClose();
      setStep('input');
      setAmount('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-bold text-white">
            Invest in {asset.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {step === 'input' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {asset.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{asset.name} ({asset.symbol})</h3>
                <p className="text-gray-400">${asset.currentPrice.toLocaleString()} per {asset.symbol}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Amount (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                  />
                </div>
                {amount && (
                  <p className="text-sm text-gray-400 mt-2">
                    You'll get ≈ {(parseFloat(amount) / asset.currentPrice).toFixed(6)} {asset.symbol}
                  </p>
                )}
              </div>

              <button
                onClick={handleInvest}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Payment
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Payment Instructions</h3>
                <p className="text-gray-400">Send ${amount} to the wallet address below</p>
              </div>

              <div className="bg-gray-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">Wallet Address</label>
                  <button
                    onClick={handleCopyWallet}
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-white font-mono text-sm break-all bg-gray-800 p-3 rounded-lg">
                  {walletUrl}
                </p>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-4">
                <p className="text-yellow-300 text-sm">
                  ⚠️ Please send the exact amount to the wallet address. Your investment will be confirmed once payment is received.
                </p>
              </div>

              <button
                onClick={handleConfirmPayment}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                I Have Paid
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Payment Confirmed!</h3>
              <p className="text-gray-400">
                Your investment in {asset.name} has been processed successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentModal;
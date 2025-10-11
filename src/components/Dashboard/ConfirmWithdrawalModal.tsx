import React from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ConfirmWithdrawalModalProps {
  isOpen: boolean;
  amount: number;
  recipientName: string;
  accountNumber: string;
  bankName: string;
  isSubmitting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmWithdrawalModal: React.FC<ConfirmWithdrawalModalProps> = ({
  isOpen,
  amount,
  recipientName,
  accountNumber,
  bankName,
  isSubmitting,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-700/50 bg-gray-800/90 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-700/50 p-4">
          <h2 className="text-lg font-semibold text-white">Confirm Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-start space-x-3 rounded-xl border border-yellow-500/30 bg-yellow-900/20 p-4">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            <p className="text-sm text-yellow-200">Double-check the details before you proceed.</p>
          </div>

          <div className="rounded-2xl border border-gray-700/50 bg-gray-900/40 p-4">
            <div className="mb-4 text-sm text-gray-300">Recipient 1 of 1</div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Name</span>
                <span className="text-white">{recipientName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Account No.</span>
                <span className="text-white">{accountNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Bank</span>
                <span className="text-white">{bankName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Amount</span>
                <span className="text-white">${amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-700/50 bg-gray-900/40 p-4">
            <span className="text-gray-400">Total Amount</span>
            <span className="text-white font-semibold">${amount.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-600 px-4 py-2 text-gray-300 hover:border-gray-500 hover:text-white disabled:opacity-50"
            >
              Review
            </button>
            <button
              onClick={onConfirm}
              disabled={isSubmitting}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2 font-semibold text-white hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm'}
            </button>
          </div>

          <div className="flex items-center space-x-2 pt-1 text-xs text-gray-400">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <span>This is a transaction you’re about to perform.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWithdrawalModal;




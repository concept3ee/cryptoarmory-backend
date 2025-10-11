import React, { useState } from 'react';
import { X, DollarSign, Copy, Check, UploadCloud } from 'lucide-react';
import { createApi } from '../../lib/api';

interface Plan {
  id: string;
  name: string;
  minAmount: number;
  maxAmount?: number;
  yieldPct: number; // expected yield percent
}

interface PlanInvestmentModalProps {
  isOpen: boolean;
  plan: Plan | null;
  onClose: () => void;
  onInvest: (amount: number, planId: string) => void;
}

const PlanInvestmentModal: React.FC<PlanInvestmentModalProps> = ({ isOpen, plan, onClose, onInvest }) => {
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'input' | 'payment' | 'success'>('input');
  const [walletUrl, setWalletUrl] = useState('');
  const [proof, setProof] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [investmentId, setInvestmentId] = useState<string | null>(null);

  if (!isOpen || !plan) return null;

  const numericAmount = parseFloat(amount || '0');
  const isValid = numericAmount >= plan.minAmount && (!plan.maxAmount || numericAmount <= plan.maxAmount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-700/50 bg-gray-800/90 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-700/50 p-6">
          <h2 className="text-lg font-semibold text-white">Invest in {plan.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {step === 'input' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-700/50 bg-gray-900/40 p-4 text-sm text-gray-300">
                <div className="flex items-center justify-between">
                  <span>Minimum</span>
                  <span className="text-white">${plan.minAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Maximum</span>
                  <span className="text-white">{plan.maxAmount ? `$${plan.maxAmount.toLocaleString()}` : 'Unlimited'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Estimated Yield</span>
                  <span className="text-green-400 font-medium">+{plan.yieldPct}%</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Amount (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min={plan.minAmount}
                    max={plan.maxAmount}
                    placeholder={`>= $${plan.minAmount}`}
                  />
                </div>
                {!isValid && amount && (
                  <p className="mt-2 text-sm text-red-400">Amount must be between ${plan.minAmount.toLocaleString()} and {plan.maxAmount ? `$${plan.maxAmount.toLocaleString()}` : 'no maximum'}.</p>
                )}
              </div>

              <button
                disabled={!isValid}
                onClick={async () => { const created: any = await onInvest(numericAmount, plan.id); setInvestmentId(created?.id || created?._id || null); setWalletUrl(created?.walletUrl || `crypto-wallet://pay/${Math.random().toString(36).substr(2, 9)}`); setStep('payment'); }}
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 font-semibold text-white hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="mb-2 text-lg font-semibold text-white">Payment Instructions</h3>
                <p className="text-gray-400">Send ${numericAmount} to the wallet address below</p>
              </div>

              <div className="rounded-xl bg-gray-700/50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">Wallet Address</label>
                  <button
                    onClick={async () => { await navigator.clipboard.writeText(walletUrl); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                    className="text-purple-400 transition-colors hover:text-purple-300"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <p className="break-all rounded-lg bg-gray-800 p-3 font-mono text-sm text-white">{walletUrl}</p>
              </div>

              <div className="rounded-xl border border-yellow-500/30 bg-yellow-900/30 p-4 text-yellow-300">
                Please send the exact amount to the wallet address. Your investment will be confirmed once payment is received.
              </div>

              <div className="rounded-xl border border-blue-500/30 bg-blue-900/30 p-3 text-center text-blue-200">
                Payment pending — we’ll notify you once the payment is approved.
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">Upload proof of payment (screenshot/receipt)</label>
                <input type="file" accept="image/*,.pdf" onChange={e=>setProof(e.target.files?.[0] || null)} className="w-full text-sm text-gray-300" />
                <button
                  disabled={!proof || submitting}
                  onClick={async ()=>{
                    if (!proof) return;
                    setSubmitting(true);
                    try {
                      if (!investmentId) return;
                      const token = (window as any).__AUTH_TOKEN__ || localStorage.getItem('auth_token') || '';
                      const apiBase = (import.meta as any).env?.VITE_API_BASE_URL || '';
                      const form = new FormData();
                      form.append('file', proof);
                      await fetch(`${apiBase}/api/investments/${investmentId}/proof`, { method: 'POST', headers: token ? { Authorization: `Bearer ${token}` } as any : undefined, body: form } as any);
                    } finally { setSubmitting(false); }
                  }}
                  className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 font-semibold text-white hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
                >
                  <UploadCloud className="h-4 w-4" />
                  <span>{submitting ? 'Uploading…' : 'Upload Proof'}</span>
                </button>

                <button
                  onClick={()=> setStep('success')}
                  className="w-full rounded-xl border border-green-600/40 bg-green-900/20 px-4 py-3 font-semibold text-green-200 hover:bg-green-900/30"
                >
                  I have paid
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-4 text-center p-6">
              <div className="text-green-400 font-semibold">Payment submitted</div>
              <div className="text-gray-300 text-sm">Your payment is pending approval by admin.</div>
              <button onClick={onClose} className="rounded-xl bg-gray-700/60 text-white px-4 py-2">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanInvestmentModal;



import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  ClipboardList,
  ChevronDown,
  ArrowDownLeft,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';
import { CryptoAsset } from '../types';
import { CurrencyIcon } from '../components/common/CurrencyIcon';

interface AssetsViewProps {
  assets: CryptoAsset[];
  totalUsd: number;
  hideBalance: boolean;
  onToggleHideBalance: () => void;
  onOpenModal: (modalName: string) => void;
  onSelectAsset: (asset: CryptoAsset) => void;
  onToast: (msg: string) => void;
}

export const AssetsView: React.FC<AssetsViewProps> = ({
  assets,
  totalUsd,
  hideBalance,
  onToggleHideBalance,
  onOpenModal,
  onSelectAsset,
  onToast,
}) => {
  const [currency, setCurrency] = useState('USD');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Staking/earn asset calculation
  const cryptoTotal = totalUsd;
  const earnTotal = 0.0;

  return (
    <div className="flex-1 overflow-y-auto pb-24 relative select-none">
      
      {/* Top Gradient Header Area (Screenshot 5) */}
      <div className="bg-gradient-to-b from-[#DCF7E7] via-[#EFFBF4] to-neutral-50/50 px-5 pt-4 pb-6 space-y-4">
        
        {/* Row 1: 總資產 + Eye + 訂單記錄 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">總資產</h2>
            <button
              onClick={onToggleHideBalance}
              className="text-neutral-500 hover:text-neutral-800 p-0.5 transition-colors"
            >
              {hideBalance ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* 訂單記錄 button */}
          <button
            onClick={() => onOpenModal('history')}
            className="flex items-center space-x-1 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-full border border-neutral-200/60 shadow-2xs"
          >
            <ClipboardList size={14} className="text-neutral-500" />
            <span>訂單記錄</span>
          </button>
        </div>

        {/* Row 2: Big USD Equivalent with dropdown */}
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-black text-neutral-900 tracking-tight font-sans">
            {hideBalance ? '••••••' : `≈${totalUsd.toFixed(2)}`}
          </span>

          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center space-x-1 text-xs font-bold text-neutral-600 hover:text-neutral-900"
            >
              <span>{currency}</span>
              <ChevronDown size={12} />
            </button>

            {showCurrencyDropdown && (
              <div className="absolute left-0 top-6 bg-white border border-neutral-200 rounded-xl shadow-lg p-1 z-40 text-xs min-w-[70px]">
                {['USD', 'USDT', 'EUR', 'CNY', 'HKD'].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setShowCurrencyDropdown(false);
                    }}
                    className="w-full text-left px-2.5 py-1 hover:bg-neutral-100 rounded font-semibold text-neutral-700"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Row 3: Sub balances (幣種資產 & 理財資產) */}
        <div className="flex space-x-10 text-xs pt-1">
          <div>
            <div className="text-neutral-500 text-[11px] mb-0.5">幣種資產</div>
            <div className="font-extrabold text-neutral-900 text-sm">
              {hideBalance ? '••••' : cryptoTotal.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-neutral-500 text-[11px] mb-0.5">理財資產</div>
            <div className="font-extrabold text-neutral-900 text-sm">
              {hideBalance ? '••••' : earnTotal.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Row 4: Quick Action Buttons (充值 & 提現) */}
        <div className="flex space-x-3 pt-2">
          <button
            onClick={() => onOpenModal('deposit')}
            className="flex-1 py-2.5 bg-white rounded-full border border-neutral-200/80 shadow-xs flex items-center justify-center space-x-1.5 text-xs font-bold text-neutral-800 hover:border-orange-300 active:scale-[0.98] transition-all"
          >
            <div className="w-5 h-5 rounded-full border border-[#FF6B00] flex items-center justify-center text-[#FF6B00]">
              <ArrowDownLeft size={13} className="stroke-[2.5]" />
            </div>
            <span>充值</span>
          </button>

          <button
            onClick={() => onOpenModal('withdraw')}
            className="flex-1 py-2.5 bg-white rounded-full border border-neutral-200/80 shadow-xs flex items-center justify-center space-x-1.5 text-xs font-bold text-neutral-800 hover:border-orange-300 active:scale-[0.98] transition-all"
          >
            <div className="w-5 h-5 rounded-full border border-[#FF6B00] flex items-center justify-center text-[#FF6B00]">
              <ArrowUpRight size={13} className="stroke-[2.5]" />
            </div>
            <span>提現</span>
          </button>
        </div>

      </div>

      {/* Main Asset List Box (Screenshot 5) */}
      <div className="px-4 -mt-1">
        <div className="bg-white rounded-3xl p-2 shadow-xs border border-neutral-100 divide-y divide-neutral-100">
          {assets.map((asset) => (
            <div
              key={asset.symbol}
              onClick={() => onSelectAsset(asset)}
              className="p-3.5 flex items-center justify-between hover:bg-neutral-50/80 rounded-2xl cursor-pointer transition-colors"
            >
              {/* Left: Icon & Symbol Name */}
              <div className="flex items-center space-x-3.5">
                <CurrencyIcon type={asset.iconType} size="md" />
                <div>
                  <div className="font-extrabold text-sm text-neutral-900 tracking-tight">
                    {asset.symbol}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-medium">
                    {asset.name}
                  </div>
                </div>
              </div>

              {/* Right: Quantity & USD Value */}
              <div className="text-right">
                <div className="font-bold text-sm text-neutral-900 font-mono">
                  {hideBalance ? '••••' : asset.balance.toFixed(2)}
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">
                  {hideBalance ? '••••' : `$${(asset.balance * asset.usdPrice).toFixed(0)}`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Footnote */}
        <div className="text-center mt-6 text-xs text-neutral-400">
          匯率僅供參考，以實際交易為準。
        </div>
      </div>

      {/* Floating Customer Service Green Chat Button (Screenshot 5) */}
      <button
        onClick={() => onOpenModal('chat')}
        className="fixed bottom-20 right-6 w-12 h-12 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-lg shadow-orange-500/25 hover:bg-[#E05E00] active:scale-95 transition-all z-40"
        title="聯絡客服"
      >
        <MessageCircle size={24} className="fill-white" />
      </button>

    </div>
  );
};

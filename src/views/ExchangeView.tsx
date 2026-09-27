import React, { useState } from 'react';
import { ArrowUpDown, RefreshCw, Info, CheckCircle2, ChevronDown } from 'lucide-react';
import { CryptoAsset } from '../types';
import { CurrencyIcon } from '../components/common/CurrencyIcon';
import { useLanguage } from '../context/LanguageContext';

interface ExchangeViewProps {
  assets: CryptoAsset[];
  onSwap: (fromSymbol: string, toSymbol: string, fromAmount: number, toAmount: number) => void;
  onToast: (msg: string) => void;
}

export const ExchangeView: React.FC<ExchangeViewProps> = ({
  assets,
  onSwap,
  onToast,
}) => {
  const { t } = useLanguage();
  const [fromSymbol, setFromSymbol] = useState('USDT');
  const [toSymbol, setToSymbol] = useState('TRX');
  const [fromAmount, setFromAmount] = useState('100');

  const fromAsset = assets.find((a) => a.symbol === fromSymbol) || assets[0];
  const toAsset = assets.find((a) => a.symbol === toSymbol) || assets[1];

  // Calculate swap rate: (fromPrice / toPrice)
  const rate = (fromAsset.usdPrice || 1) / (toAsset.usdPrice || 1);
  const inputNum = parseFloat(fromAmount) || 0;
  const calculatedReceive = (inputNum * rate).toFixed(4);

  const handleFlip = () => {
    setFromSymbol(toSymbol);
    setToSymbol(fromSymbol);
  };

  const handleExecuteSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputNum || inputNum <= 0) {
      onToast('請輸入有效的兌換數量');
      return;
    }
    if (inputNum > fromAsset.balance) {
      onToast(`餘額不足！您當前持有 ${fromAsset.balance} ${fromAsset.symbol}，請先充值`);
      return;
    }

    onSwap(fromSymbol, toSymbol, inputNum, parseFloat(calculatedReceive));
    onToast(`🎉 兌換成功！已將 ${inputNum} ${fromSymbol} 兌換為 ${calculatedReceive} ${toSymbol}`);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between py-1">
        <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">{t('swap_title', '極速閃兌')}</h2>
        <div className="text-xs bg-[#FFF4EC] text-[#FF6B00] font-bold px-2.5 py-1 rounded-full border border-orange-100 flex items-center space-x-1">
          <RefreshCw size={12} className="animate-spin" />
          <span>{t('swap_optimal_depth', '實時最優深度')}</span>
        </div>
      </div>

      {/* Main Swap Box */}
      <form onSubmit={handleExecuteSwap} className="space-y-3">
        {/* From Box */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-100 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-500 font-semibold">{t('swap_pay', '支付數量')}</span>
            <div className="text-neutral-400">
              {t('swap_balance', '可用:')} <strong className="text-neutral-800">{fromAsset.balance} {fromAsset.symbol}</strong>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="number"
              placeholder="0.00"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="flex-1 min-w-0 h-10 text-2xl font-black text-neutral-900 focus:outline-none placeholder-neutral-300 font-mono bg-transparent"
            />

            {/* Currency Selector */}
            <div className="relative shrink-0 flex items-center bg-neutral-100 hover:bg-neutral-200/80 rounded-2xl px-3 h-10 transition-colors cursor-pointer">
              <div className="flex items-center space-x-1.5 pointer-events-none">
                <CurrencyIcon type={fromAsset.iconType} size="sm" />
                <span className="font-extrabold text-sm text-neutral-900 leading-none">
                  {fromAsset.symbol}
                </span>
                <ChevronDown size={14} className="text-neutral-500 stroke-[2.5]" />
              </div>
              <select
                value={fromSymbol}
                onChange={(e) => setFromSymbol(e.target.value)}
                aria-label="選擇支付幣種"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              >
                {assets.map((a) => (
                  <option key={a.symbol} value={a.symbol} disabled={a.symbol === toSymbol}>
                    {a.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center pt-1 text-[11px] text-neutral-400">
            <span>≈ ${(inputNum * fromAsset.usdPrice).toFixed(2)} USD</span>
            <button
              type="button"
              onClick={() => setFromAmount(fromAsset.balance.toString())}
              className="text-[#FF6B00] font-bold hover:underline"
            >
              {t('swap_max', '全部劃轉')}
            </button>
          </div>
        </div>

        {/* Flip Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            type="button"
            onClick={handleFlip}
            className="w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-md text-[#FF6B00] flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          >
            <ArrowUpDown size={18} className="stroke-[2.5]" />
          </button>
        </div>

        {/* To Box */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-100 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-500 font-semibold">{t('swap_get', '預計收到')}</span>
            <div className="text-neutral-400">
              {t('swap_balance', '餘額:')} <strong className="text-neutral-800">{toAsset.balance} {toAsset.symbol}</strong>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex-1 min-w-0 h-10 flex items-center text-2xl font-black text-neutral-900 font-mono">
              {calculatedReceive}
            </div>

            {/* Currency Selector */}
            <div className="relative shrink-0 flex items-center bg-neutral-100 hover:bg-neutral-200/80 rounded-2xl px-3 h-10 transition-colors cursor-pointer">
              <div className="flex items-center space-x-1.5 pointer-events-none">
                <CurrencyIcon type={toAsset.iconType} size="sm" />
                <span className="font-extrabold text-sm text-neutral-900 leading-none">
                  {toAsset.symbol}
                </span>
                <ChevronDown size={14} className="text-neutral-500 stroke-[2.5]" />
              </div>
              <select
                value={toSymbol}
                onChange={(e) => setToSymbol(e.target.value)}
                aria-label="選擇接收幣種"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              >
                {assets.map((a) => (
                  <option key={a.symbol} value={a.symbol} disabled={a.symbol === fromSymbol}>
                    {a.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-1 text-[11px] text-neutral-400">
            <span>≈ ${(parseFloat(calculatedReceive) * toAsset.usdPrice).toFixed(2)} USD</span>
          </div>
        </div>

        {/* Rate Breakdown */}
        <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-100 space-y-1.5 text-xs text-neutral-600">
          <div className="flex justify-between">
            <span className="text-neutral-400">{t('swap_reference_rate', '參考兌換率')}</span>
            <span className="font-semibold text-neutral-800">
              1 {fromSymbol} ≈ {rate.toFixed(4)} {toSymbol}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">{t('swap_fee_label', '兌換手續費')}</span>
            <span className="font-bold text-[#FF6B00]">{t('swap_fee_free', '0.00% (限時免收)')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">{t('swap_settlement_mode', '到賬模式')}</span>
            <span className="text-neutral-800 font-semibold">{t('swap_instant_settle', '極速秒級兌換入賬')}</span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[#FF6B00] text-white font-bold rounded-full text-base hover:bg-[#E05E00] active:scale-[0.99] transition-all shadow-md shadow-orange-500/20"
        >
          {t('swap_confirm_btn', '立即兌換')}
        </button>
      </form>
    </div>
  );
};

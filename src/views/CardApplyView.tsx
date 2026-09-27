import React, { useState } from 'react';
import {
  ChevronLeft,
  CreditCard,
  ShieldCheck,
  Check,
  Sparkles,
  Zap,
  Globe2,
  Lock,
  ArrowRight,
  Info,
} from 'lucide-react';
import { CardProduct, UserCard } from '../types';
import { BybitMastercard } from '../components/cards/BybitMastercard';
import { useLanguage } from '../context/LanguageContext';

interface CardApplyViewProps {
  cardProduct: CardProduct;
  onBack: () => void;
  onSuccess: (newCard: UserCard) => void;
  onToast: (msg: string) => void;
  usdtBalance: number;
}

export const CardApplyView: React.FC<CardApplyViewProps> = ({
  cardProduct,
  onBack,
  onSuccess,
  onToast,
  usdtBalance,
}) => {
  const { t } = useLanguage();
  const [holderName, setHolderName] = useState('BYBIT VIP USER');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [shippingAddress, setShippingAddress] = useState('台北市信義區信義路五段7號 (預設地址)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fee = cardProduct.type === 'virtual' ? 1 : 10;
  const isPhysical = cardProduct.type === 'physical';

  const handleConfirmApply = () => {
    if (!agreeTerms) {
      onToast('請先閱讀並同意 Visa 卡片持卡人協議及隱私條款');
      return;
    }

    if (!holderName.trim()) {
      onToast('請輸入卡面持卡人姓名（拼音或英文）');
      return;
    }

    if (usdtBalance < fee) {
      onToast(`錢包 USDT 餘額不足 (${usdtBalance} USDT)，開卡需 ${fee} USDT。請先充值！`);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newCard: UserCard = {
        id: 'card-' + Date.now(),
        cardType: isPhysical ? 'Visa Bybit 實體黑金卡' : 'Visa Bybit 虛擬卡',
        cardNumber: `4111 8820 9134 ${randomSuffix}`,
        expiry: '09/30',
        cvv: String(Math.floor(100 + Math.random() * 899)),
        balance: 0.0,
        currency: 'USD',
        status: 'active',
        holderName: holderName.trim().toUpperCase(),
      };

      onToast(`🎉 開卡成功！您的 ${newCard.cardType} 已即時啟用`);
      onSuccess(newCard);
      onBack();
    }, 600);
  };

  return (
    <div className="absolute inset-0 z-40 bg-[#F8F9FA] flex flex-col animate-in slide-in-from-right duration-200 select-none">
      {/* Top Header Bar */}
      <div className="w-full px-4 pt-3 pb-3 flex items-center justify-between border-b border-neutral-100 bg-white/95 backdrop-blur-xs shrink-0">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-neutral-800 hover:text-black active:scale-95 transition cursor-pointer"
          title="返回"
        >
          <ChevronLeft size={24} className="stroke-[2.2]" />
        </button>

        <div className="flex items-center space-x-1.5">
          <CreditCard size={19} className="text-[#FF6B00]" />
          <h2 className="text-[17px] font-bold text-neutral-900 tracking-tight">
            {t('cards_apply_title', '申請 Bybit Mastercard')}
          </h2>
        </div>

        <div className="w-8" />
      </div>

      {/* Main Scrollable Form Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-28">
        {/* Realistic Official Bybit Mastercard Preview matching uploaded image */}
        <div className="w-full max-w-[320px] mx-auto">
          <BybitMastercard
            holderName={holderName || 'BYBIT VIP USER'}
            cardNumber="4111 8820 9134 ••••"
            expiry="09/30"
            className="shadow-xl"
          />
        </div>

        {/* Benefits Card */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-2.5">
          <span className="text-xs font-bold text-neutral-800 block">{t('cards_benefits_title', '卡片核心權益')}</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2 p-2 bg-neutral-50 rounded-xl">
              <Zap size={15} className="text-[#FF6B00] shrink-0" />
              <span className="text-neutral-700">{t('cards_benefit_0fee', '0% 充值手續費')}</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-neutral-50 rounded-xl">
              <Globe2 size={15} className="text-[#FF6B00] shrink-0" />
              <span className="text-neutral-700">{t('cards_benefit_global', '全球 1.3 億商戶')}</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-neutral-50 rounded-xl">
              <Sparkles size={15} className="text-[#FF6B00] shrink-0" />
              <span className="text-neutral-700">{t('cards_benefit_applepay', '支持 Apple Pay / 3DS')}</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-neutral-50 rounded-xl">
              <ShieldCheck size={15} className="text-[#FF6B00] shrink-0" />
              <span className="text-neutral-700">{t('cards_benefit_reserve', '資產 100% 準備金')}</span>
            </div>
          </div>
        </div>

        {/* Application Information Form */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-3.5">
          <span className="text-xs font-bold text-neutral-800 block">{t('cards_info_title', '填寫申請人資訊')}</span>

          <div>
            <label className="text-xs font-bold text-neutral-700 block mb-1.5">
              {t('cards_holder_name', '卡面持卡人姓名 (英文或拼音)')}
            </label>
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value.toUpperCase())}
              placeholder={t('cards_holder_name_placeholder', '例如: ZHANG WEI 或 JOHN DOE')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs uppercase font-mono font-bold text-neutral-900 focus:outline-none focus:border-[#FF6B00]"
            />
            <p className="text-[10px] text-neutral-400 mt-1">
              * {t('cards_holder_notice', '將壓印於卡面或虛擬卡授權賬單中，需與身份證件一致。')}
            </p>
          </div>

          {isPhysical && (
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1.5">
                {t('cards_shipping_addr', '實體卡郵寄地址')}
              </label>
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="輸入精確收件地址"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#FF6B00]"
              />
              <p className="text-[10px] text-neutral-400 mt-1">
                * {t('cards_shipping_notice', '全球順豐 / DHL 免費特快配送，預計 3-5 個工作日送達。')}
              </p>
            </div>
          )}

          {/* Payment Method / Fee Breakdown */}
          <div className="pt-2 border-t border-neutral-100 space-y-2 text-xs">
            <div className="flex justify-between items-center text-neutral-600">
              <span>{t('cards_pay_method', '扣繳方式：')}</span>
              <span className="font-semibold text-neutral-900">{t('cards_pay_wallet_usdt', '錢包 USDT 餘額即時扣除')}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-600">
              <span>{t('cards_available_bal', '可用 USDT 餘額：')}</span>
              <span className="font-mono font-bold text-neutral-900">{usdtBalance.toFixed(2)} USDT</span>
            </div>
            <div className="flex justify-between items-center text-neutral-600">
              <span>{t('cards_cost_fee', '開卡工本費：')}</span>
              <span className="font-mono font-extrabold text-[#FF6B00] text-sm">{fee} USDT</span>
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div
          onClick={() => setAgreeTerms(!agreeTerms)}
          className="flex items-start space-x-2.5 cursor-pointer p-1"
        >
          <div
            className={`w-4 h-4 mt-0.5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
              agreeTerms ? 'bg-[#FF6B00] text-white' : 'border border-neutral-300 bg-white'
            }`}
          >
            {agreeTerms && <Check size={11} className="stroke-[3]" />}
          </div>
          <span className="text-[11px] text-neutral-500 leading-relaxed">
            {t('cards_agree_terms', '我已完整閱讀並同意《Bybit 卡持卡人服務合約》、《全球反洗錢與合規條款》及《個人隱私安全保護協定》。')}
          </span>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-md border-t border-neutral-100 flex items-center justify-between z-10">
        <div>
          <span className="text-[10px] text-neutral-400 block font-medium">{t('cards_total_fee', '合計支付開卡費')}</span>
          <div className="text-base font-black text-[#FF6B00] font-mono leading-tight">
            {fee} <span className="text-xs">USDT</span>
          </div>
        </div>

        <button
          onClick={handleConfirmApply}
          disabled={isSubmitting}
          className="px-6 py-3 bg-[#FF6B00] text-white rounded-xl font-bold text-xs hover:bg-[#E05E00] shadow-md shadow-orange-500/25 active:scale-98 transition cursor-pointer flex items-center space-x-1.5 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>{t('cards_applying', '正在為您開卡...')}</span>
          ) : (
            <>
              <span>{t('cards_confirm_apply', '確認開卡並啟用')}</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

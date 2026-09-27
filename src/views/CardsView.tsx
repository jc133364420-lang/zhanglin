import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Gift, Bookmark, Shield, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import { CardProduct, UserCard } from '../types';
import { CARD_PRODUCTS } from '../data/mockData';
import { BybitMastercard } from '../components/cards/BybitMastercard';
import { useLanguage } from '../context/LanguageContext';

interface CardsViewProps {
  onBack: () => void;
  onSelectProduct: (product: CardProduct) => void;
  userCards: UserCard[];
  onToggleCardFreeze: (cardId: string) => void;
  onToast: (msg: string) => void;
}

export const CardsView: React.FC<CardsViewProps> = ({
  onBack,
  onSelectProduct,
  userCards,
  onToggleCardFreeze,
  onToast,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'market' | 'myCards'>('market');
  const [showCvv, setShowCvv] = useState<{ [key: string]: boolean }>({});

  const toggleCvv = (id: string) => {
    setShowCvv((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-2 pb-24 space-y-4">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between py-2 border-b border-neutral-100">
        <button
          onClick={onBack}
          className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft size={22} className="stroke-[2.5]" />
        </button>
        <h2 className="text-lg font-bold text-neutral-900 tracking-tight">{t('cards_list_title', '卡片列表')}</h2>
        <div className="w-8" />
      </div>

      {/* Sub tabs */}
      <div className="flex bg-neutral-100 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('market')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'market' ? 'bg-white text-[#FF6B00] shadow-xs' : 'text-neutral-500'
          }`}
        >
          {t('cards_tab_zone', '卡片專區')}
        </button>
        <button
          onClick={() => setActiveTab('myCards')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
            activeTab === 'myCards' ? 'bg-white text-[#FF6B00] shadow-xs' : 'text-neutral-500'
          }`}
        >
          {t('cards_tab_mycards', '我的卡片')} ({userCards.length})
          {userCards.length > 0 && (
            <span className="absolute top-1.5 right-4 w-1.5 h-1.5 bg-[#FF6B00] rounded-full" />
          )}
        </button>
      </div>

      {activeTab === 'market' ? (
        /* =================== CARD APPLICATION LIST (Screenshot 4) =================== */
        <div className="space-y-4">
          
          {/* Card Item 1: Visa Platinum Card (Virtual) */}
          <div className="bg-white rounded-3xl p-4 border border-neutral-100 shadow-sm relative overflow-hidden">
            {/* Red bookmark ribbon in top right */}
            <div className="absolute top-0 right-5">
              <div className="w-6 h-8 bg-[#FF3B30] rounded-b-xs shadow-xs flex items-center justify-center text-white pb-1">
                <Bookmark size={14} className="fill-white" />
              </div>
            </div>

            <h3 className="text-base font-extrabold text-neutral-900 mb-3">
              Bybit Mastercard
            </h3>

            {/* Card Graphic and Specs Row */}
            <div className="flex items-center space-x-4 mb-4">
              {/* Virtual Card Graphic */}
              <div className="w-36 shrink-0">
                <BybitMastercard compact={true} holderName="BYBIT VIRTUAL" />
              </div>

              {/* Specs Table */}
              <div className="space-y-1.5 text-xs flex-1">
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t('cards_open_fee', '開卡費')}</span>
                  <span className="font-semibold text-neutral-800">1 USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t('cards_topup_rate', '充值費率')}</span>
                  <span className="font-extrabold text-[#FF6B00]">0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t('cards_settle_cur', '結算幣種')}</span>
                  <span className="font-semibold text-neutral-800">USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t('cards_type', '卡片類型')}</span>
                  <span className="font-semibold text-neutral-800">{t('cards_virtual', '虛擬卡')}</span>
                </div>
              </div>
            </div>

            {/* Action Link Button */}
            <div className="pt-2 border-t border-neutral-100 flex justify-center">
              <button
                onClick={() => onSelectProduct(CARD_PRODUCTS[0])}
                className="w-full py-2.5 flex items-center justify-center space-x-1 text-sm font-bold text-[#FF6B00] hover:bg-[#FFF4EC] rounded-2xl transition-colors cursor-pointer"
              >
                <span className="text-base">🎁</span>
                <span>{t('cards_apply_btn_1u', '1USDT 申請卡')}</span>
                <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Card Item 2: Bybit Mastercard Physical */}
          <div className="bg-white rounded-3xl p-4 border border-neutral-100 shadow-sm relative overflow-hidden">
            {/* Red bookmark ribbon */}
            <div className="absolute top-0 right-5">
              <div className="w-6 h-8 bg-[#FF3B30] rounded-b-xs shadow-xs flex items-center justify-center text-white pb-1">
                <Bookmark size={14} className="fill-white" />
              </div>
            </div>

            <h3 className="text-base font-extrabold text-neutral-900 mb-3">
              Bybit Mastercard (實體白金卡)
            </h3>

            {/* Card Graphic and Specs Row */}
            <div className="flex items-center space-x-4 mb-4">
              {/* Physical Card Graphic */}
              <div className="w-36 shrink-0">
                <BybitMastercard compact={true} holderName="BYBIT PHYSICAL" />
              </div>

              {/* Specs Table */}
              <div className="space-y-1.5 text-xs flex-1">
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t('cards_open_fee', '開卡費')}</span>
                  <span className="font-semibold text-neutral-800">10 USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t('cards_topup_rate', '充值費率')}</span>
                  <span className="font-extrabold text-[#FF6B00]">0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t('cards_settle_cur', '結算幣種')}</span>
                  <span className="font-semibold text-neutral-800">USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t('cards_type', '卡片類型')}</span>
                  <span className="font-semibold text-neutral-800">{t('cards_physical', '實體卡')}</span>
                </div>
              </div>
            </div>

            {/* Action Link Button */}
            <div className="pt-2 border-t border-neutral-100 flex justify-center">
              <button
                onClick={() => onSelectProduct(CARD_PRODUCTS[1])}
                className="w-full py-2.5 flex items-center justify-center space-x-1 text-sm font-bold text-[#FF6B00] hover:bg-[#FFF4EC] rounded-2xl transition-colors cursor-pointer"
              >
                <span>{t('cards_apply_btn_10u', '10 USDT 申請卡')}</span>
                <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Card Item 3: Visa禮品卡 */}
          <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900">Visa禮品卡</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-[240px] leading-relaxed">
                  如果您獲得了 BYBIT 官方贈送的 Visa 禮品卡，請點擊進行綁定
                </p>
              </div>

              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-xl shadow-xs">
                🎁
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-center">
              <button
                onClick={() => onSelectProduct(CARD_PRODUCTS[2])}
                className="py-1 text-sm font-bold text-[#FF6B00] hover:text-[#E05E00] flex items-center space-x-1 cursor-pointer"
              >
                <span>立刻綁定</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      ) : (
        /* =================== MY CARDS TAB =================== */
        <div className="space-y-4">
          {userCards.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-neutral-100 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF6B00] flex items-center justify-center mx-auto text-2xl">
                💳
              </div>
              <h4 className="font-bold text-neutral-800 text-sm">{t('cards_no_cards', '尚無已啟用的卡片')}</h4>
              <p className="text-xs text-neutral-400">
                {t('cards_no_cards_desc', '申領虛擬卡僅需 1 USDT，即刻開通全球線上消費與 Apple Pay')}
              </p>
              <button
                onClick={() => setActiveTab('market')}
                className="px-6 py-2.5 bg-[#FF6B00] text-white rounded-full text-xs font-bold hover:bg-[#E05E00]"
              >
                {t('cards_go_apply', '前往申領')}
              </button>
            </div>
          ) : (
            userCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-4"
              >
                {/* Visual Card - Official Bybit Mastercard */}
                <BybitMastercard
                  holderName={card.holderName}
                  cardNumber={card.cardNumber}
                  expiry={card.expiry}
                  cvv={card.cvv}
                  showCvv={showCvv[card.id]}
                />

                {/* Card Controls */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="space-y-0.5">
                    <span className="text-neutral-400 block text-[10px]">{t('cards_available_limit', '卡片可用額度')}</span>
                    <span className="text-sm font-extrabold text-neutral-900">
                      ${card.balance.toFixed(2)} USD
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleCvv(card.id)}
                      className="px-3 py-1.5 rounded-xl border border-neutral-200 text-neutral-700 font-semibold flex items-center space-x-1 hover:bg-neutral-50"
                    >
                      {showCvv[card.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                      <span>{showCvv[card.id] ? t('cards_hide_cvv', '隱藏安全碼') : t('cards_view_cvv', '查看安全碼')}</span>
                    </button>

                    <button
                      onClick={() => onToggleCardFreeze(card.id)}
                      className={`px-3 py-1.5 rounded-xl font-semibold flex items-center space-x-1 ${
                        card.status === 'active'
                          ? 'border border-rose-200 text-rose-600 hover:bg-rose-50'
                          : 'bg-[#FF6B00] text-white hover:bg-[#E05E00]'
                      }`}
                    >
                      {card.status === 'active' ? (
                        <>
                          <Lock size={14} />
                          <span>{t('cards_freeze', '凍結卡片')}</span>
                        </>
                      ) : (
                        <>
                          <Unlock size={14} />
                          <span>{t('cards_unfreeze', '解凍卡片')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};

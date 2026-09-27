import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Bell,
  Headphones,
  Gift,
  User,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  Scan,
  QrCode,
  Coins,
  ShieldCheck,
  Zap,
  ChevronRight,
  CreditCard,
  Sparkles,
  Globe,
} from 'lucide-react';
import { CryptoAsset, TabType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HomeViewProps {
  assets: CryptoAsset[];
  totalUsd: number;
  hideBalance: boolean;
  onToggleHideBalance: () => void;
  onOpenModal: (modalName: string) => void;
  onNavigateTab: (tab: TabType) => void;
  onToast: (msg: string) => void;
  userName: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  assets,
  totalUsd,
  hideBalance,
  onToggleHideBalance,
  onOpenModal,
  onNavigateTab,
  onToast,
  userName,
}) => {
  const { currentLang, t } = useLanguage();

  const quickActions = [
    { id: 'deposit', label: t('action_deposit'), icon: ArrowDownLeft, color: 'text-[#FF6B00]', ringBg: 'bg-[#FFF4EC]' },
    { id: 'withdraw', label: t('action_withdraw'), icon: ArrowUpRight, color: 'text-[#FF6B00]', ringBg: 'bg-[#FFF4EC]' },
    { id: 'transfer', label: t('action_transfer'), icon: RefreshCw, color: 'text-[#FF6B00]', ringBg: 'bg-[#FFF4EC]' },
    { id: 'scan', label: t('action_scan'), icon: Scan, color: 'text-neutral-800', ringBg: 'bg-neutral-100' },
    { id: 'receive', label: t('action_receive'), icon: QrCode, color: 'text-neutral-800', ringBg: 'bg-neutral-100' },
    { id: 'staking', label: t('action_staking'), icon: Coins, color: 'text-[#FF6B00]', ringBg: 'bg-[#FFF4EC]' },
    { id: 'chat', label: t('action_chat'), icon: Headphones, color: 'text-[#FF6B00]', ringBg: 'bg-[#FFF4EC]' },
    { id: 'trx', label: t('action_trx'), icon: Zap, color: 'text-[#EF0027]', ringBg: 'bg-rose-50' },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-2 pb-24 space-y-4">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between py-1">
        {/* Left: User Avatar & Profile */}
        <div
          onClick={() => onOpenModal('profile')}
          className="flex items-center space-x-2.5 cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-neutral-800 to-neutral-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {userName ? userName.slice(0, 2).toUpperCase() : 'BY'}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-neutral-900 leading-tight">
              {userName || 'VIP用戶'}
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">UID: 8932014</span>
          </div>
        </div>

        {/* Right utility icons: Language Switcher, Customer Service, Notification */}
        <div className="flex items-center space-x-3 text-neutral-700">
          {/* Globe Quick Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal('language');
            }}
            className="p-1 hover:text-[#FF6B00] transition-colors relative cursor-pointer"
            title={t('lang_title')}
          >
            <Globe size={22} className="stroke-[2]" />
          </button>

          {/* Customer Service */}
          <button
            onClick={() => onOpenModal('chat')}
            className="p-1 hover:text-[#FF6B00] transition-colors cursor-pointer"
            title={t('online_cs')}
          >
            <Headphones size={22} className="stroke-[2]" />
          </button>

          {/* Notifications with badge '13' */}
          <button
            onClick={() => onOpenModal('notifications')}
            className="p-1 hover:text-[#FF6B00] transition-colors relative cursor-pointer"
            title={t('notice')}
          >
            <Bell size={22} className="stroke-[2]" />
            <span className="absolute -top-1 -right-1.5 px-1 py-0.2 bg-[#EF4444] text-white text-[9px] font-extrabold rounded-full min-w-[16px] text-center leading-tight shadow-xs">
              13
            </span>
          </button>
        </div>
      </div>

      {/* Announcement Marquee Bar (Screenshot 3) */}
      <div
        onClick={() => onOpenModal('notifications')}
        className="w-full bg-neutral-100/90 rounded-full px-3.5 py-2 flex items-center space-x-2 text-xs text-neutral-700 cursor-pointer hover:bg-neutral-200/80 transition-colors shadow-2xs"
      >
        <span className="text-[#FF6B00] shrink-0 font-bold flex items-center">
          📢 <span className="ml-1 text-neutral-600 font-semibold">{t('notice')}:</span>
        </span>
        <div className="overflow-hidden whitespace-nowrap flex-1 text-ellipsis text-neutral-700 font-medium">
          {t('notice_content')}
        </div>
      </div>

      {/* Total Assets & 8-Grid Card (Screenshot 3) */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-neutral-100">
        
        {/* Assets Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-neutral-500">{t('total_assets')}</span>
            <button
              onClick={onToggleHideBalance}
              className="text-neutral-400 hover:text-neutral-600 p-0.5"
            >
              {hideBalance ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Big Balance & Currency Dropdown */}
        <div className="mt-1 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-neutral-900 tracking-tight font-sans">
            {hideBalance ? '••••••' : `≈ ${totalUsd.toFixed(2)}`}
          </span>

          <div className="relative">
            <button
              type="button"
              className="flex items-center text-xs font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md cursor-default"
            >
              <span>USDT</span>
            </button>
          </div>
        </div>

        {/* 8-Grid Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-y-4 gap-x-2 mt-6 pt-2 border-t border-neutral-100">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onOpenModal(action.id)}
                className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${action.ringBg} flex items-center justify-center transition-all group-hover:scale-105 shadow-2xs`}
                >
                  <Icon size={22} className={`${action.color} stroke-[2.2]`} />
                </div>
                <span className="text-[12px] font-semibold text-neutral-800 mt-2 tracking-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>


      {/* 2-Column Promo Widgets (Screenshot 3) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left: 福利中心 */}
        <div
          onClick={() => onOpenModal('rewards')}
          className="bg-gradient-to-b from-[#FFF3EA] to-white rounded-3xl p-4 border border-orange-100 shadow-2xs flex flex-col justify-between h-44 cursor-pointer hover:shadow-xs transition-shadow"
        >
          <div>
            <h4 className="text-base font-extrabold text-neutral-900">福利中心</h4>
            <p className="text-[11px] text-neutral-500 mt-0.5">輕鬆解鎖更多好禮</p>
            <button className="mt-2 text-xs font-bold text-[#FF6B00] flex items-center space-x-0.5">
              <span>立即領取</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* 3D Gift Box Visual */}
          <div className="flex justify-center items-end py-1">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-tr from-[#FF6B00] to-[#FBBF24] rounded-2xl shadow-md flex items-center justify-center text-white text-2xl">
                🎁
              </div>
              <div className="absolute -top-2 -right-1 text-sm animate-bounce">🪙</div>
              <div className="absolute -bottom-1 -left-2 text-xs">✨</div>
            </div>
          </div>
        </div>

        {/* Right 2 items stacked */}
        <div className="flex flex-col gap-3">
          {/* Top: 邀請計劃 */}
          <div
            onClick={() => onOpenModal('invite')}
            className="flex-1 bg-white rounded-2xl p-3 border border-neutral-100 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-orange-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#FF6B00] flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="text-[9px] font-bold bg-[#FFF2E8] text-[#FF6B00] px-1.5 py-0.5 rounded-full">
                限時活動
              </span>
            </div>
            <div className="mt-2">
              <h5 className="text-xs font-extrabold text-neutral-900">邀請計劃</h5>
              <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                邀請好友，持續賺取返傭獎勵
              </p>
            </div>
          </div>

          {/* Bottom: 新人禮包 */}
          <div
            onClick={() => onOpenModal('rewards')}
            className="flex-1 bg-white rounded-2xl p-3 border border-neutral-100 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-orange-200 transition-colors"
          >
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 rounded-lg bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                🎁
              </div>
              <div className="w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">
                P
              </div>
            </div>
            <div className="mt-1">
              <h5 className="text-xs font-extrabold text-neutral-900">新人禮包</h5>
              <p className="text-[10px] text-neutral-400 leading-tight">
                預付卡充值100U得2U
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

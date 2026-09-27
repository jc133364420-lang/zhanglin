import React, { useState } from 'react';
import {
  ChevronLeft,
  Share2,
  Copy,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Gift,
  HelpCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface InviteFriendsViewProps {
  onBack: () => void;
  onToast: (msg: string) => void;
}

export const InviteFriendsView: React.FC<InviteFriendsViewProps> = ({
  onBack,
  onToast,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'credited' | 'pending'>('all');
  const [showPosterModal, setShowPosterModal] = useState<boolean>(false);

  const inviteCode = 'VIP888';
  const inviteLink = 'https://bybit.com/i/VIP888';

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    onToast(`✓ 已成功複製${label}到剪貼板`);
  };

  const referralRecords = [
    {
      uid: '89**12',
      time: '10 分鐘前',
      action: '完成入金 1,000 USDT',
      tier: 'Level 2 返傭',
      earn: '+15.00 USDT',
      status: 'credited',
    },
    {
      uid: '34**78',
      time: '2 小時前',
      action: '成功激活實體黑金卡',
      tier: '開卡獎勵',
      earn: '+10.00 USDT',
      status: 'credited',
    },
    {
      uid: '52**09',
      time: '昨天 19:42',
      action: '充值 500 USDT 並交易',
      tier: 'Level 2 返傭',
      earn: '+7.50 USDT',
      status: 'credited',
    },
    {
      uid: '77**63',
      time: '3 天前',
      action: '註冊新賬戶，完成 KYC2',
      tier: '實名激勵',
      earn: '+2.00 USDT',
      status: 'credited',
    },
    {
      uid: '19**44',
      time: '剛剛',
      action: '好友正在申請虛擬卡',
      tier: '待激活結算',
      earn: '+5.00 USDT',
      status: 'pending',
    },
  ];

  const filteredRecords = referralRecords.filter((r) => {
    if (activeTab === 'credited') return r.status === 'credited';
    if (activeTab === 'pending') return r.status === 'pending';
    return true;
  });

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
          <Gift size={20} className="text-[#FF6B00]" />
          <h2 className="text-[17px] font-bold text-neutral-900 tracking-tight">
            {t('invite_page_title', '邀請好友享返傭')}
          </h2>
        </div>

        <button
          onClick={() => setShowPosterModal(true)}
          className="p-1 -mr-1 text-neutral-800 hover:text-[#FF6B00] active:scale-95 transition cursor-pointer"
          title={t('invite_share_poster', '生成分享海報')}
        >
          <Share2 size={20} className="stroke-[2]" />
        </button>
      </div>

      {/* Main Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-20">
        {/* Hero Gold & Orange Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF6B00] via-[#FF8A00] to-[#FFA000] p-5 text-white shadow-md shadow-orange-500/15">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center space-x-1 text-[10px] bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              <Sparkles size={11} />
              <span>{t('invite_banner_tag', 'BYBIT 全球合夥人計劃')}</span>
            </span>

            <h3 className="text-2xl font-black mt-2 leading-tight tracking-tight">
              {t('invite_banner_heading', '邀請好友註冊交易\n坐享最高 30% 永久返傭')}
            </h3>

            <p className="text-xs text-orange-100 mt-2 leading-relaxed">
              {t('invite_banner_sub', '好友開卡、充值、現貨與合約交易，傭金即時結算秒到賬！')}
            </p>
          </div>
        </div>

        {/* Exclusive Referral Code & Link Box */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-neutral-700">{t('invite_my_code', '我的專屬邀請碼')}</span>
              <span className="text-[11px] text-neutral-400">{t('invite_enter_manually', '好友註冊時手動輸入')}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-100">
              <span className="font-mono text-base font-extrabold text-neutral-900 tracking-wider">
                {inviteCode}
              </span>
              <button
                onClick={() => handleCopy(inviteCode, '邀請碼')}
                className="flex items-center space-x-1 text-xs font-bold text-[#FF6B00] bg-white px-3 py-1.5 rounded-lg border border-orange-200 shadow-2xs hover:bg-orange-50 active:scale-95 transition cursor-pointer"
              >
                <Copy size={13} />
                <span>{t('invite_copy_code', '複製碼')}</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-neutral-700">{t('invite_my_link', '專屬邀請鏈接')}</span>
              <span className="text-[11px] text-neutral-400">{t('invite_auto_fill', '點擊即自動帶入')}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-100">
              <span className="font-mono text-xs text-neutral-600 truncate max-w-[200px]">
                {inviteLink}
              </span>
              <button
                onClick={() => handleCopy(inviteLink, '邀請鏈接')}
                className="flex items-center space-x-1 text-xs font-bold text-[#FF6B00] bg-white px-3 py-1.5 rounded-lg border border-orange-200 shadow-2xs hover:bg-orange-50 active:scale-95 transition cursor-pointer shrink-0 ml-2"
              >
                <Copy size={13} />
                <span>{t('invite_copy_link', '複製鏈接')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Core Stats Metrics */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/90 shadow-2xs">
            <span className="text-[11px] text-neutral-400 font-medium">{t('invite_total_rebate', '累計返傭')}</span>
            <div className="text-base font-black text-[#FF6B00] mt-1 font-mono">
              286.50 <span className="text-xs">U</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/90 shadow-2xs">
            <span className="text-[11px] text-neutral-400 font-medium">{t('invite_total_users', '成功邀請')}</span>
            <div className="text-base font-black text-neutral-900 mt-1 font-mono">
              12 <span className="text-xs font-normal">人</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/90 shadow-2xs">
            <span className="text-[11px] text-neutral-400 font-medium">{t('invite_rebate_rate', '返傭比例')}</span>
            <div className="text-base font-black text-emerald-600 mt-1 font-mono">
              30%
            </div>
          </div>
        </div>

        {/* Commission Tier Level Progress */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <TrendingUp size={16} className="text-[#FF6B00]" />
              <span className="text-xs font-bold text-neutral-800">返傭級別進度</span>
            </div>
            <span className="text-xs font-bold text-[#FF6B00]">當前: Level 2 (30%)</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#FF8A00] to-[#FF6B00] h-full w-[60%] rounded-full" />
          </div>

          <div className="flex justify-between text-[10px] text-neutral-400 font-medium">
            <span>Level 1 (15%)</span>
            <span className="text-[#FF6B00] font-bold">12/20 人 (再邀 8 人解鎖 45%)</span>
            <span>Level 3 (45%)</span>
          </div>
        </div>

        {/* 3 Steps Guide */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800">三步輕鬆賺取高額傭金</span>
            <button
              onClick={() => onToast('返傭規則：好友成功充值或使用 Bybit Card 消費，返利即時派發至資產錢包')}
              className="text-[11px] text-[#FF6B00] flex items-center space-x-0.5 cursor-pointer"
            >
              <HelpCircle size={12} />
              <span>規則說明</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 space-y-1">
              <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF6B00] text-[10px] font-bold flex items-center justify-center mx-auto">
                1
              </span>
              <span className="text-xs font-bold text-neutral-800 block">分享鏈接</span>
              <span className="text-[10px] text-neutral-400 block leading-tight">邀請好友完成註冊</span>
            </div>

            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 space-y-1">
              <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF6B00] text-[10px] font-bold flex items-center justify-center mx-auto">
                2
              </span>
              <span className="text-xs font-bold text-neutral-800 block">好友充值開卡</span>
              <span className="text-[10px] text-neutral-400 block leading-tight">綁卡消費或交易</span>
            </div>

            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 space-y-1">
              <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF6B00] text-[10px] font-bold flex items-center justify-center mx-auto">
                3
              </span>
              <span className="text-xs font-bold text-neutral-800 block">坐享返利</span>
              <span className="text-[10px] text-neutral-400 block leading-tight">秒級自動結算到賬</span>
            </div>
          </div>
        </div>

        {/* Dynamic Referral Commission Records */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800">最新返傭明細</span>
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#FF6B00] text-white'
                    : 'bg-neutral-100 text-neutral-500'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setActiveTab('credited')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer ${
                  activeTab === 'credited'
                    ? 'bg-[#FF6B00] text-white'
                    : 'bg-neutral-100 text-neutral-500'
                }`}
              >
                已入賬
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer ${
                  activeTab === 'pending'
                    ? 'bg-[#FF6B00] text-white'
                    : 'bg-neutral-100 text-neutral-500'
                }`}
              >
                結算中
              </button>
            </div>
          </div>

          <div className="divide-y divide-neutral-100">
            {filteredRecords.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2.5 text-xs">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-neutral-800">UID: {item.uid}</span>
                    <span className="text-[9px] bg-neutral-100 text-neutral-500 px-1 py-0.2 rounded font-medium">
                      {item.tier}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">
                    {item.time} · {item.action}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-mono font-extrabold ${
                      item.status === 'credited' ? 'text-[#FF6B00]' : 'text-amber-500'
                    }`}
                  >
                    {item.earn}
                  </span>
                  <span className="text-[9px] text-neutral-400 block">
                    {item.status === 'credited' ? '已入賬' : '待結算'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-md border-t border-neutral-100 flex space-x-2.5">
        <button
          onClick={() => setShowPosterModal(true)}
          className="flex-1 py-3 bg-neutral-100 text-neutral-800 rounded-xl font-bold text-xs hover:bg-neutral-200 transition active:scale-98 cursor-pointer flex items-center justify-center space-x-1.5"
        >
          <Share2 size={15} />
          <span>保存海報</span>
        </button>
        <button
          onClick={() => handleCopy(inviteLink, '邀請鏈接')}
          className="flex-2 py-3 bg-[#FF6B00] text-white rounded-xl font-bold text-xs hover:bg-[#E05E00] shadow-md shadow-orange-500/20 active:scale-98 transition cursor-pointer flex items-center justify-center space-x-1.5"
        >
          <Copy size={15} />
          <span>立即邀請好友</span>
        </button>
      </div>

      {/* Share Poster Modal */}
      {showPosterModal && (
        <div
          onClick={() => setShowPosterModal(false)}
          className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[280px] bg-gradient-to-b from-[#1C1F26] to-[#12141A] text-white rounded-3xl p-5 shadow-2xl border border-neutral-700/80 flex flex-col items-center text-center animate-in zoom-in-95 duration-150"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B00] flex items-center justify-center mb-3">
              <Gift size={20} className="text-white" />
            </div>
            <h4 className="text-base font-extrabold tracking-tight">BYBIT 邀請專屬海報</h4>
            <p className="text-[11px] text-neutral-400 mt-1">掃碼註冊，享最高 30% 返利</p>

            {/* QR Box */}
            <div className="w-40 h-40 bg-white p-2 rounded-2xl my-4 flex items-center justify-center shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                  inviteLink
                )}`}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="font-mono text-xs text-neutral-300">
              專屬邀請碼：<strong className="text-orange-400">{inviteCode}</strong>
            </div>

            <div className="w-full pt-4 space-y-2">
              <button
                onClick={() => {
                  onToast('✓ 邀請海報已成功保存到相冊！');
                  setShowPosterModal(false);
                }}
                className="w-full py-2.5 bg-[#FF6B00] text-white rounded-xl text-xs font-bold hover:bg-[#E05E00] cursor-pointer"
              >
                保存海報圖片
              </button>
              <button
                onClick={() => setShowPosterModal(false)}
                className="w-full py-2 text-neutral-400 text-xs font-semibold hover:text-white cursor-pointer"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

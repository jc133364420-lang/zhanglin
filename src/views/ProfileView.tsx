import React, { useState } from 'react';
import { Copy, Check, ChevronRight, X, ShieldCheck, Lock, Smartphone, Globe, Bell, Heart, Ticket, Users, FileText, ExternalLink, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProfileViewProps {
  user: { name: string; email: string };
  isLoggedIn: boolean;
  onLogout: () => void;
  onOpenAuth: () => void;
  onToast: (msg: string) => void;
  onOpenCustomerService: () => void;
  onOpenLanguage?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  isLoggedIn,
  onLogout,
  onOpenAuth,
  onToast,
  onOpenCustomerService,
  onOpenLanguage,
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);
  const userId = 'LE5M6G6J';

  const handleCopyId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    onToast(`已複製 ID: ${userId}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 bg-[#F9F8F5] overflow-y-auto px-5 pt-7 pb-10 select-none text-neutral-800">
      {/* Top Profile Header */}
      <div className="flex flex-col items-center justify-center text-center mb-7">
        {/* Brand Circular Logo with Stylized P */}
        <div className="relative w-18 h-18 rounded-full border-[3.5px] border-[#FF6B00] flex items-center justify-center bg-white shadow-xs">
          <span className="text-[#1E2329] font-black text-3xl italic tracking-tighter select-none font-sans">
            P
          </span>
        </div>

        {/* User ID with Copy Icon or Login prompt */}
        {isLoggedIn ? (
          <div
            onClick={handleCopyId}
            className="mt-3 flex items-center space-x-1.5 cursor-pointer group hover:opacity-80 transition"
          >
            <span className="text-neutral-500 font-mono text-sm tracking-wide font-medium">
              ID: {userId}
            </span>
            {copied ? (
              <Check size={14} className="text-[#FF6B00]" />
            ) : (
              <Copy size={13} className="text-neutral-400 group-hover:text-neutral-600 transition" />
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="mt-3 text-xs font-bold text-[#FF6B00] hover:underline cursor-pointer"
          >
            {t('profile_login_now', '未登錄，點擊登入 / 註冊 →')}
          </button>
        )}
      </div>


      {/* Group 2: 獎賞 */}
      <div className="mb-7">
        <h3 className="text-sm font-bold text-neutral-800 mb-4 px-1">{t('profile_rewards_group', '獎賞')}</h3>
        <div className="grid grid-cols-3 gap-y-6 text-center">
          {/* 邀請好友 */}
          <button
            onClick={() => setActiveModal('invite')}
            className="flex flex-col items-center space-y-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl group-active:scale-95 transition">
              <svg className="w-8 h-8 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8.8-6.2a1 1 0 0 1 1.2 0l8.4 6.2Z" />
                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                <path d="M12 14.5c-.8-1-2-.5-2 .5 0 1 2 2 2 2s2-1 2-2c0-1-1.2-1.5-2-.5z" stroke="#FF6B00" strokeWidth="2" fill="#FF6B00" />
              </svg>
            </div>
            <span className="text-xs font-medium text-neutral-800">{t('profile_invite_friends', '邀請好友')}</span>
          </button>

          {/* 優惠券 */}
          <button
            onClick={() => setActiveModal('coupons')}
            className="flex flex-col items-center space-y-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl group-active:scale-95 transition">
              <svg className="w-8 h-8 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9a3 3 0 0 1 0-6h18a3 3 0 0 1 0 6 3 3 0 0 1 0 6 3 3 0 0 1 0 6H3a3 3 0 0 1 0-6 3 3 0 0 1 0-6Z" />
                <line x1="12" y1="3" x2="12" y2="21" stroke="#FF6B00" strokeWidth="2" strokeDasharray="3 3" />
              </svg>
            </div>
            <span className="text-xs font-medium text-neutral-800">{t('profile_coupons', '優惠券')}</span>
          </button>

          {/* Empty spacer for alignment */}
          <div className="pointer-events-none" />
        </div>
      </div>

      {/* Group 3: 偏好 */}
      <div className="mb-7">
        <h3 className="text-sm font-bold text-neutral-800 mb-4 px-1">{t('profile_pref_group', '偏好')}</h3>
        <div className="grid grid-cols-3 gap-y-6 text-center">
          {/* 扣款順序 */}
          <button
            onClick={() => setActiveModal('priority')}
            className="flex flex-col items-center space-y-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl group-active:scale-95 transition">
              <svg className="w-8 h-8 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M8 10h8l-3-3" stroke="#FF6B00" strokeWidth="2.2" />
                <path d="M16 14H8l3 3" strokeWidth="2.2" />
              </svg>
            </div>
            <span className="text-xs font-medium text-neutral-800">{t('profile_deduct_order', '扣款順序')}</span>
          </button>

          {/* 語言 */}
          <button
            onClick={() => {
              if (onOpenLanguage) {
                onOpenLanguage();
              } else {
                setActiveModal('language');
              }
            }}
            className="flex flex-col items-center space-y-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl group-active:scale-95 transition">
              <svg className="w-8 h-8 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" stroke="#FF6B00" strokeWidth="2" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-neutral-800">{t('profile_lang_setting', '語言與地區')}</span>
          </button>

          {/* 通知 */}
          <button
            onClick={() => setActiveModal('notice')}
            className="flex flex-col items-center space-y-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl group-active:scale-95 transition">
              <svg className="w-8 h-8 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <line x1="8" y1="9" x2="16" y2="9" stroke="#FF6B00" strokeWidth="2.3" strokeLinecap="round" />
                <line x1="8" y1="13" x2="13" y2="13" stroke="#FF6B00" strokeWidth="2.3" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xs font-medium text-neutral-800">{t('profile_notifications', '通知')}</span>
          </button>
        </div>
      </div>

      {/* Group 4: 支援 */}
      <div className="mb-9">
        <h3 className="text-sm font-bold text-neutral-800 mb-4 px-1">{t('profile_help_group', '支援')}</h3>
        <div className="grid grid-cols-3 gap-y-6 text-center">
          {/* 在線客服 */}
          <button
            onClick={onOpenCustomerService}
            className="flex flex-col items-center space-y-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl group-active:scale-95 transition">
              <svg className="w-8 h-8 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#FF6B00" strokeWidth="2.3" strokeLinecap="round" />
                <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" />
                <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xs font-medium text-neutral-800">{t('online_cs', '在線客服')}</span>
          </button>

          {/* 社群 */}
          <button
            onClick={() => setActiveModal('community')}
            className="flex flex-col items-center space-y-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl group-active:scale-95 transition">
              <svg className="w-8 h-8 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="#FF6B00" strokeWidth="2.2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#FF6B00" strokeWidth="2.2" />
              </svg>
            </div>
            <span className="text-xs font-medium text-neutral-800">社群</span>
          </button>

          {/* 關於我們 */}
          <button
            onClick={() => setActiveModal('about')}
            className="flex flex-col items-center space-y-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl group-active:scale-95 transition">
              <svg className="w-8 h-8 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M8 7h8" stroke="#FF6B00" strokeWidth="2.2" />
                <path d="M8 11h8" strokeWidth="2.2" />
                <path d="M8 15h5" strokeWidth="2.2" />
              </svg>
            </div>
            <span className="text-xs font-medium text-neutral-800">關於我們</span>
          </button>
        </div>
      </div>

      {/* Logout Action Button */}
      <div className="flex justify-center pt-2 pb-6">
        {isLoggedIn ? (
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full max-w-[280px] py-3.5 px-6 rounded-full bg-[#EAE8E2] text-neutral-800 text-sm font-semibold hover:bg-[#DFDCD5] active:scale-98 transition shadow-xs cursor-pointer text-center"
          >
            退出登錄
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full max-w-[280px] py-3.5 px-6 rounded-full bg-[#FF6B00] text-white text-sm font-semibold hover:bg-[#E05E00] active:scale-98 transition shadow-xs cursor-pointer text-center"
          >
            立即登錄 / 註冊
          </button>
        )}
      </div>

      {/* Logout Confirmation Sheet */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="text-center py-2">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-[#FF6B00] flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-1">退出當前賬號</h3>
              <p className="text-xs text-neutral-500">
                確定要退出當前賬號嗎？退出後如需使用預付卡或資產服務請重新登入。
              </p>
            </div>
            <div className="mt-5 space-y-2">
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                  onToast('已安全退出當前賬號');
                }}
                className="w-full py-3 bg-[#FF6B00] text-white font-bold rounded-xl text-xs hover:bg-[#E05E00] active:scale-98 transition cursor-pointer"
              >
                確認退出登錄
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-3 bg-neutral-100 text-neutral-700 font-bold rounded-xl text-xs hover:bg-neutral-200 active:scale-98 transition cursor-pointer"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODALS FOR SUB-PAGES ===================== */}

      {/* 賬戶安全 Modal */}
      {activeModal === 'security' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-base">賬戶安全中心</h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-semibold text-neutral-900">Google 雙重身份驗證 (2FA)</div>
                  <div className="text-neutral-400 mt-0.5">保護提幣與開卡操作</div>
                </div>
                <span className="text-[#FF6B00] font-bold">已開啟</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-semibold text-neutral-900">支付交易密碼</div>
                  <div className="text-neutral-400 mt-0.5">消費與轉賬校驗</div>
                </div>
                <span className="text-[#FF6B00] font-bold">已設置</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-semibold text-neutral-900">生物識別解鎖 (FaceID)</div>
                  <div className="text-neutral-400 mt-0.5">iOS 便捷免密驗證</div>
                </div>
                <span className="text-[#FF6B00] font-bold">已啟用</span>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveModal(null);
                onToast('安全等級評分：98 分 (極高)');
              }}
              className="mt-5 w-full py-3 bg-[#FF6B00] text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              安全檢測已完成
            </button>
          </div>
        </div>
      )}

      {/* 身份認證 (KYC) Modal */}
      {activeModal === 'kyc' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-base">實名身份認證 (KYC)</h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div className="p-3.5 border border-neutral-200 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs text-neutral-900">Lv.1 基礎認證</span>
                  <span className="text-[11px] px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded font-medium">未完成</span>
                </div>
                <p className="text-[11px] text-neutral-500">提供姓名、身份證號或護照資料，解鎖日額度 $10,000 USDT。</p>
              </div>
              <div className="p-3.5 border border-neutral-200 rounded-xl opacity-75">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs text-neutral-900">Lv.2 高級人臉核驗</span>
                  <span className="text-[11px] px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded font-medium">需先完成 Lv.1</span>
                </div>
                <p className="text-[11px] text-neutral-500">即時活體動態檢測，享無限額度與實體萬事達卡申請權限。</p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveModal(null);
                onToast('已提交身份資料審核申請，預計 1-3 分鐘審核完畢');
              }}
              className="mt-5 w-full py-3 bg-[#FF6B00] text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              立即開始認證
            </button>
          </div>
        </div>
      )}

      {/* 偏好扣款順序 Modal */}
      {activeModal === 'priority' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-base">消費扣款順序</h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-2 mb-4">當預付卡或線上交易扣款時，系統將按以下資產優先級依序結算：</p>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between border border-neutral-200">
                <span className="font-bold text-neutral-800">1. USDT (泰達幣 - 首選穩定幣)</span>
                <span className="text-[#FF6B00] font-bold">默認</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between border border-neutral-200">
                <span className="font-semibold text-neutral-700">2. TRX (波場代幣)</span>
                <span className="text-neutral-400 text-[11px]">次選</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between border border-neutral-200">
                <span className="font-semibold text-neutral-700">3. 其它法幣餘額</span>
                <span className="text-neutral-400 text-[11px]">備用</span>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveModal(null);
                onToast('已保存扣款優先級設置');
              }}
              className="mt-5 w-full py-3 bg-[#FF6B00] text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              確認保存
            </button>
          </div>
        </div>
      )}

      {/* 語言設置 Modal */}
      {activeModal === 'language' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-base">語言選擇 / Language</h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <div
                onClick={() => {
                  setActiveModal(null);
                  onToast('已切換為：繁體中文 (Traditional Chinese)');
                }}
                className="p-3 bg-[#FF6B00]/10 text-[#FF6B00] rounded-xl font-bold flex items-center justify-between cursor-pointer"
              >
                <span>繁體中文 (默認)</span>
                <Check size={16} />
              </div>
              <div
                onClick={() => {
                  setActiveModal(null);
                  onToast('已切換為：简体中文 (Simplified Chinese)');
                }}
                className="p-3 hover:bg-neutral-50 rounded-xl text-neutral-700 font-medium flex items-center justify-between cursor-pointer"
              >
                <span>简体中文</span>
              </div>
              <div
                onClick={() => {
                  setActiveModal(null);
                  onToast('Language switched to: English');
                }}
                className="p-3 hover:bg-neutral-50 rounded-xl text-neutral-700 font-medium flex items-center justify-between cursor-pointer"
              >
                <span>English (US)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 邀請好友 Modal */}
      {activeModal === 'invite' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-base">邀請好友 & 賺取返佣</h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 p-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl text-white text-center">
              <span className="text-xs text-orange-100 font-medium">專屬邀請碼</span>
              <div className="text-2xl font-black tracking-widest my-1">{userId}</div>
              <div className="text-[11px] text-orange-100">好友開卡與兌換，您可享最高 30% 手續費返佣！</div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://pay.card/invite?ref=${userId}`);
                onToast('已複製邀請鏈接，快去分享給好友吧！');
                setActiveModal(null);
              }}
              className="mt-4 w-full py-3 bg-[#FF6B00] text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              複製邀請推廣鏈接
            </button>
          </div>
        </div>
      )}

      {/* 優惠券 Modal */}
      {activeModal === 'coupons' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-base">我的優惠券 (2)</h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-2.5">
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-900">新用戶開卡抵扣券</div>
                  <div className="text-[10px] text-amber-700 mt-0.5">申請萬事達實體卡立減 $5 USDT</div>
                </div>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    onToast('已為您激活立減優惠券');
                  }}
                  className="px-3 py-1 bg-amber-500 text-white text-[11px] font-bold rounded-lg cursor-pointer"
                >
                  去使用
                </button>
              </div>
              <div className="p-3 bg-orange-50/70 border border-orange-200/80 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-orange-900">全幣種兌換 8折 手續費券</div>
                  <div className="text-[10px] text-orange-700 mt-0.5">有效期至 2026-12-31</div>
                </div>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    onToast('兌換優惠券已生效');
                  }}
                  className="px-3 py-1 bg-[#FF6B00] text-white text-[11px] font-bold rounded-lg cursor-pointer"
                >
                  已激活
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 社群 Modal */}
      {activeModal === 'community' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-base">官方社群交流</h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <div
                onClick={() => {
                  onToast('正在前往 Telegram 官方繁體中文社群');
                  setActiveModal(null);
                }}
                className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer"
              >
                <span className="font-bold text-neutral-800">Telegram 官方群組 (@OfficialPayGroup)</span>
                <ChevronRight size={14} className="text-neutral-400" />
              </div>
              <div
                onClick={() => {
                  onToast('正在前往 X (Twitter) 官方資訊主頁');
                  setActiveModal(null);
                }}
                className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer"
              >
                <span className="font-bold text-neutral-800">X / Twitter (@PayOfficial)</span>
                <ChevronRight size={14} className="text-neutral-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 關於我們 Modal */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-base">關於我們</h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 text-center">
              <div className="w-14 h-14 mx-auto rounded-full border-[3px] border-[#FF6B00] flex items-center justify-center mb-2">
                <span className="text-[#1E2329] font-black text-2xl italic">P</span>
              </div>
              <div className="font-bold text-sm text-neutral-900">Web3 全球加密預付卡</div>
              <div className="text-xs text-neutral-400 mt-1">版本號: v2.4.8 (Build 2026.09)</div>
              <p className="text-xs text-neutral-500 mt-3 text-left leading-relaxed">
                致力於為全球用戶提供安全、快捷、低費率的數位資產聚合支付、法幣兌換及 Visa / 萬事達卡消費體驗。
              </p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-5 w-full py-3 bg-neutral-900 text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              關閉
            </button>
          </div>
        </div>
      )}

      {/* 通知 Modal */}
      {activeModal === 'notice' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-base">系統與消息通知</h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl">
                <div className="font-bold text-neutral-800">卡片消費提醒已開啟</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">每筆實時交易即時推播通知</div>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <div className="font-bold text-neutral-800">系統行情與優惠動態</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">重要安全公告與節假日優惠活動</div>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveModal(null);
                onToast('通知設置已保存');
              }}
              className="mt-5 w-full py-3 bg-[#FF6B00] text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              完成
            </button>
          </div>
        </div>
      )}

      {/* 第三方賬戶 Modal */}
      {activeModal === 'third_party' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-base">第三方關聯賬戶</h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-2.5 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-neutral-800">Google 賬號</div>
                  <div className="text-neutral-400 text-[10px]">bybit_user@bybit.com</div>
                </div>
                <span className="text-[#FF6B00] font-bold">已綁定</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-neutral-800">Apple ID</div>
                  <div className="text-neutral-400 text-[10px]">iCloud 授權登入</div>
                </div>
                <span className="text-neutral-400">未關聯</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-neutral-800">Telegram 快速授權</div>
                  <div className="text-neutral-400 text-[10px]">TG Bot 賬戶連動</div>
                </div>
                <span className="text-neutral-400">未關聯</span>
              </div>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-5 w-full py-3 bg-[#FF6B00] text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              完成
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

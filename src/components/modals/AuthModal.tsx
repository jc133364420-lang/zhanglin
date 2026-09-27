import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, X, ArrowLeft, ChevronDown, Check } from 'lucide-react';
import { AuthMode } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: AuthMode;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
  onToast: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess,
  onToast,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  useEffect(() => {
    if (isOpen && initialMode) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);
  const [loginTab, setLoginTab] = useState<'account' | 'email'>('account');

  // Login form states
  const [loginAccount, setLoginAccount] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register form states (email only)
  const [regInput, setRegInput] = useState('');
  const [regCode, setRegCode] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [showInviteField, setShowInviteField] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [codeCountdown, setCodeCountdown] = useState(0);

  if (!isOpen) return null;

  const handleSendCode = () => {
    if (!regInput) {
      onToast('請輸入郵箱地址');
      return;
    }
    setCodeCountdown(60);
    onToast('驗證碼已發送至您的郵箱');
    const timer = setInterval(() => {
      setCodeCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginAccount) {
      onToast('請輸入賬號或郵箱');
      return;
    }
    if (!loginPassword) {
      onToast('請輸入密碼');
      return;
    }
    onToast('登入成功，歡迎回來！');
    onSuccess({
      name: loginAccount.includes('@') ? loginAccount.split('@')[0] : loginAccount,
      email: loginAccount.includes('@') ? loginAccount : `${loginAccount}@bybit.com`,
    });
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regInput) {
      onToast('請輸入您的郵箱地址');
      return;
    }
    if (!regCode) {
      onToast('請輸入驗證碼');
      return;
    }
    if (!agreedTerms) {
      onToast('請先勾選閱讀並同意服務條款和隱私政策');
      return;
    }
    onToast('🎉 註冊成功！$12 新人禮包已自動發放至資產錢包');
    onSuccess({
      name: regInput.includes('@') ? regInput.split('@')[0] : 'User_' + regInput.slice(-4),
      email: regInput.includes('@') ? regInput : `${regInput}@bybit.com`,
    });
    onClose();
  };

  const handleSocialLogin = (platform: 'telegram' | 'google') => {
    onToast(`正在使用 ${platform === 'telegram' ? 'Telegram' : 'Google'} 快捷授權登入...`);
    setTimeout(() => {
      onToast('授權成功！');
      onSuccess({
        name: platform === 'telegram' ? 'TG_User' : 'Google_VIP',
        email: platform === 'telegram' ? 'tg_member@telegram.org' : 'vip_trader@gmail.com',
      });
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Bar for Login Mode (Screenshot 2) */}
        {mode === 'login' ? (
          <div className="px-5 pt-4 pb-2 border-b border-neutral-100 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white font-black text-sm shadow-sm">
                B
              </div>
              <span className="font-extrabold text-neutral-900 text-lg tracking-tight">
                BYBIT <span className="text-xs text-[#FF6B00] font-bold">WALLET</span>
              </span>
            </div>

            {/* Right actions: Register button, Flag, Menu */}
            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => setMode('register')}
                className="px-3.5 py-1 text-xs font-semibold bg-[#FF6B00] text-white rounded-full hover:bg-[#E05E00] transition-colors"
              >
                註冊
              </button>



              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          /* Top Bar for Register Mode (Screenshot 1) */
          <div className="px-5 pt-4 pb-2 flex items-center justify-between border-b border-neutral-100">
            <button
              onClick={() => setMode('login')}
              className="p-1 rounded-full text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {mode === 'login' ? (
            /* =================== LOGIN VIEW (Screenshot 2) =================== */
            <div>
              <div className="mb-5">
                <button
                  onClick={onClose}
                  className="text-neutral-700 mb-3 block hover:text-neutral-900"
                >
                  <X size={22} className="stroke-[2.5]" />
                </button>
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                  登入BYBIT
                </h1>
              </div>

              {/* Tabs: 賬號 | 郵箱 */}
              <div className="flex items-center space-x-6 border-b border-neutral-100 mb-5">
                {(['account', 'email'] as const).map((tab) => {
                  const labels = { account: '賬號', email: '郵箱' };
                  const active = loginTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setLoginTab(tab)}
                      className={`pb-2 text-base font-semibold transition-all relative ${
                        active ? 'text-[#FF6B00]' : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      {labels[tab]}
                      {active && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF6B00] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Field 1 */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-semibold text-neutral-800">
                      {loginTab === 'account' ? '賬號' : '郵箱'}
                    </label>
                    <button
                      type="button"
                      onClick={() => onToast('請通過註冊郵箱或聯繫客服找回賬號')}
                      className="text-xs text-[#FF6B00] hover:underline"
                    >
                      忘記賬號?
                    </button>
                  </div>
                  <input
                    type={loginTab === 'email' ? 'email' : 'text'}
                    placeholder={loginTab === 'account' ? '賬號' : '請輸入郵箱'}
                    value={loginAccount}
                    onChange={(e) => setLoginAccount(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] text-neutral-800 placeholder-neutral-400"
                  />
                </div>

                {/* Field 2: Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-semibold text-neutral-800">密碼</label>
                    <button
                      type="button"
                      onClick={() => onToast('重置密碼鏈接已發送')}
                      className="text-xs text-[#FF6B00] hover:underline"
                    >
                      忘記密碼?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="密碼"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] text-neutral-800 placeholder-neutral-400 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 bg-[#FF6B00] text-white rounded-full font-bold text-base hover:bg-[#E05E00] active:scale-[0.99] transition-all shadow-md shadow-orange-500/20"
                >
                  登入
                </button>
              </form>

              {/* Register link */}
              <div className="text-center mt-5 text-sm text-neutral-600">
                還沒有賬號?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-[#FF6B00] font-semibold hover:underline"
                >
                  去註冊
                </button>
              </div>

              {/* Divider & Social Login */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200" />
                </div>
                <span className="relative bg-white px-3 text-xs text-neutral-400">
                  無需註冊，快速登錄
                </span>
              </div>

              <div className="flex items-center justify-center space-x-6 pb-2">
                {/* Telegram */}
                <button
                  onClick={() => handleSocialLogin('telegram')}
                  className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center text-[#24A1DE] hover:bg-neutral-50 transition-colors shadow-xs"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.74-.56 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
                  </svg>
                </button>

                {/* Google */}
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-xs"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.86c2.26-2.09 3.685-5.17 3.685-9.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.34 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            /* =================== REGISTER VIEW (Screenshot 1) =================== */
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-3">
                創建賬號
              </h1>

              {/* Gift Promo Banner */}
              <div className="bg-[#FFF4EC] text-[#C2410C] rounded-xl px-3.5 py-2.5 flex items-center space-x-2 text-xs font-semibold mb-5 border border-orange-100">
                <span className="text-base">🎁</span>
                <span>
                  註冊賬號即可領取<strong className="text-[#16A34A]">$12</strong>新手禮包!
                </span>
              </div>

              {/* Tab: 郵箱 */}
              <div className="flex items-center space-x-6 border-b border-neutral-100 mb-5">
                <button
                  type="button"
                  className="pb-2 text-base font-semibold text-[#FF6B00] relative"
                >
                  郵箱
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF6B00] rounded-full" />
                </button>
              </div>

              {/* Register Form */}
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {/* Input 1: Email */}
                <div>
                  <input
                    type="email"
                    placeholder="您的郵箱地址"
                    value={regInput}
                    onChange={(e) => setRegInput(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] text-neutral-800 placeholder-neutral-400"
                  />
                </div>

                {/* Input 2: Verification Code */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="郵箱地址驗證碼"
                    value={regCode}
                    onChange={(e) => setRegCode(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] text-neutral-800 placeholder-neutral-400 pr-24"
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={codeCountdown > 0}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-500 hover:text-[#FF6B00] disabled:text-neutral-400"
                  >
                    {codeCountdown > 0 ? `${codeCountdown}s 後重新獲取` : '獲取驗證碼'}
                  </button>
                </div>

                {/* Expandable Invitation Code Section */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-xs text-neutral-700 font-medium mb-1.5">
                    <button
                      type="button"
                      onClick={() => setShowInviteField(!showInviteField)}
                      className="flex items-center space-x-1 hover:text-neutral-900"
                    >
                      <span>邀請碼 (選填)</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${showInviteField ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>

                  {showInviteField && (
                    <input
                      type="text"
                      placeholder="填寫邀請人提供的邀請碼"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] text-neutral-800 placeholder-neutral-400"
                    />
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setAgreedTerms(!agreedTerms)}
                    className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-colors ${
                      agreedTerms
                        ? 'bg-[#FF6B00] border-[#FF6B00] text-white'
                        : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {agreedTerms && <Check size={12} strokeWidth={3} />}
                  </button>
                  <label
                    onClick={() => setAgreedTerms(!agreedTerms)}
                    className="text-xs text-neutral-600 leading-snug cursor-pointer select-none"
                  >
                    我已閱讀並同意BYBIT的{' '}
                    <span className="text-[#FF6B00] font-medium">服務條款</span> 和{' '}
                    <span className="text-[#FF6B00] font-medium">隱私政策</span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 bg-[#FF6B00] text-white rounded-full font-bold text-base hover:bg-[#E05E00] active:scale-[0.99] transition-all shadow-md shadow-orange-500/20"
                >
                  下一步
                </button>
              </form>

              {/* Already have account */}
              <div className="text-center mt-4 text-sm text-neutral-600">
                已經有賬號?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-[#FF6B00] font-semibold hover:underline"
                >
                  登入
                </button>
              </div>

              {/* Divider & Social */}
              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200" />
                </div>
                <span className="relative bg-white px-3 text-xs text-neutral-400">
                  無需註冊，快速登錄
                </span>
              </div>

              <div className="flex items-center justify-center space-x-6 pb-2">
                <button
                  onClick={() => handleSocialLogin('telegram')}
                  className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center text-[#24A1DE] hover:bg-neutral-50 transition-colors shadow-xs"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.74-.56 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-xs"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.86c2.26-2.09 3.685-5.17 3.685-9.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.34 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

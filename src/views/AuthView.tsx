import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Headphones,
  Globe,
  Check,
  ChevronDown,
  ShieldCheck,
  Lock,
  Mail,
  User as UserIcon,
  Sparkles,
} from 'lucide-react';
import { AuthMode } from '../types';
import { BybitLogo } from '../components/common/BybitLogo';

interface AuthViewProps {
  initialMode?: AuthMode;
  onBack: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
  onToast: (msg: string) => void;
  onOpenCustomerService?: () => void;
  onOpenLanguage?: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialMode = 'login',
  onBack,
  onSuccess,
  onToast,
  onOpenCustomerService,
  onOpenLanguage,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [loginTab, setLoginTab] = useState<'account' | 'email'>('account');

  // Login form states
  const [loginAccount, setLoginAccount] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form states
  const [regEmail, setRegEmail] = useState('');
  const [regCode, setRegCode] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [showInviteField, setShowInviteField] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [codeCountdown, setCodeCountdown] = useState(0);

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode]);

  // Email verification countdown
  const handleSendCode = () => {
    if (!regEmail || !regEmail.includes('@')) {
      onToast('請輸入有效的郵箱地址');
      return;
    }
    setCodeCountdown(60);
    onToast('驗證碼已發送至您的郵箱，請查收');
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
    if (!loginAccount.trim()) {
      onToast(loginTab === 'account' ? '請輸入賬號' : '請輸入郵箱');
      return;
    }
    if (!loginPassword) {
      onToast('請輸入密碼');
      return;
    }
    onToast('登入成功，歡迎回來！');
    const cleanAccount = loginAccount.trim();
    onSuccess({
      name: cleanAccount.includes('@') ? cleanAccount.split('@')[0] : cleanAccount,
      email: cleanAccount.includes('@') ? cleanAccount : `${cleanAccount}@bybit.com`,
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail.trim() || !regEmail.includes('@')) {
      onToast('請輸入正確的郵箱地址');
      return;
    }
    if (!regCode.trim()) {
      onToast('請輸入郵箱驗證碼');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      onToast('請設置至少6位數的安全密碼');
      return;
    }
    if (!agreedTerms) {
      onToast('請先閱讀並同意服務條款和隱私政策');
      return;
    }
    onToast('🎉 註冊成功！$12 USDT 新人禮包已發放至您的資產錢包');
    const cleanEmail = regEmail.trim();
    onSuccess({
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
    });
  };

  const handleSocialLogin = (platform: 'telegram' | 'google') => {
    onToast(`正在連接 ${platform === 'telegram' ? 'Telegram' : 'Google'} 安全授權...`);
    setTimeout(() => {
      onToast('快捷登入成功！');
      onSuccess({
        name: platform === 'telegram' ? 'TG_Trader' : 'Google_VIP',
        email: platform === 'telegram' ? 'trader@telegram.org' : 'vip_member@gmail.com',
      });
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden text-neutral-900 select-none">
      {/* Top Navigation Bar of the Independent Page */}
      <div className="shrink-0 px-4 pt-3 pb-2.5 flex items-center justify-between border-b border-neutral-100 bg-white/95 backdrop-blur-md z-10">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-1 p-1.5 -ml-1.5 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
          title="返回首頁"
        >
          <ArrowLeft size={20} />
          <span className="text-xs font-semibold text-neutral-600">返回</span>
        </button>

        {/* Brand Logo & Name: Official Bybit Wordmark with iconic orange bar */}
        <BybitLogo size="md" showCardBadge={true} />

        {/* Right Action Icons: Customer Support & Language */}
        <div className="flex items-center space-x-1.5">
          {onOpenCustomerService && (
            <button
              type="button"
              onClick={onOpenCustomerService}
              className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
              title="在線客服"
            >
              <Headphones size={18} />
            </button>
          )}
          {onOpenLanguage && (
            <button
              type="button"
              onClick={onOpenLanguage}
              className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
              title="切換語言"
            >
              <Globe size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* Page Hero Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight flex items-center gap-2">
            <span>{mode === 'login' ? '歡迎登入 BYBIT' : '創建 BYBIT 賬號'}</span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#FF6B00]" />
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {mode === 'login'
              ? '安全便捷登入，隨時隨地管理您的數字資產與卡片'
              : '享零手續費開卡、即時充提與全球消費返現特權'}
          </p>
        </div>

        {/* Mode Switcher Tabs (登入 / 註冊) */}
        <div className="flex items-center bg-neutral-100 p-1 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            登入
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all relative ${
              mode === 'register'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            註冊
            <span className="absolute top-1 right-3 w-1.5 h-1.5 bg-[#FF6B00] rounded-full" />
          </button>
        </div>

        {/* ======================= LOGIN VIEW ======================= */}
        {mode === 'login' && (
          <div className="space-y-4">
            {/* Account / Email Sub-tabs */}
            <div className="flex items-center space-x-6 border-b border-neutral-100 pb-2">
              <button
                type="button"
                onClick={() => setLoginTab('account')}
                className={`text-sm font-semibold transition-colors relative pb-1 ${
                  loginTab === 'account' ? 'text-[#FF6B00]' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                賬號登入
                {loginTab === 'account' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B00] rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setLoginTab('email')}
                className={`text-sm font-semibold transition-colors relative pb-1 ${
                  loginTab === 'email' ? 'text-[#FF6B00]' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                郵箱登入
                {loginTab === 'email' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B00] rounded-full" />
                )}
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  {loginTab === 'account' ? 'BYBIT 賬號 / ID' : '註冊郵箱'}
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    {loginTab === 'account' ? <UserIcon size={16} /> : <Mail size={16} />}
                  </div>
                  <input
                    type={loginTab === 'email' ? 'email' : 'text'}
                    placeholder={loginTab === 'account' ? '請輸入賬號' : '請輸入郵箱地址'}
                    value={loginAccount}
                    onChange={(e) => setLoginAccount(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 text-neutral-800 placeholder-neutral-400 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-neutral-700">登入密碼</label>
                  <button
                    type="button"
                    onClick={() => onToast('重置密碼鏈接已發送至您的安全郵箱')}
                    className="text-xs text-[#FF6B00] hover:underline"
                  >
                    忘記密碼?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="請輸入密碼"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 text-neutral-800 placeholder-neutral-400 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1"
                  >
                    {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me option */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center space-x-2 text-xs text-neutral-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#FF6B00] focus:ring-[#FF6B00] accent-[#FF6B00]"
                  />
                  <span>記住登入狀態</span>
                </label>
                <button
                  type="button"
                  onClick={() => onToast('請通過驗證郵箱或聯繫客服找回賬號')}
                  className="text-xs text-neutral-500 hover:text-[#FF6B00]"
                >
                  忘記賬號?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-[#FF6B00] text-white rounded-xl font-bold text-base hover:bg-[#E05E00] active:scale-[0.99] transition-all shadow-md shadow-orange-500/20 cursor-pointer"
              >
                登入 BYBIT
              </button>
            </form>

            {/* Quick Switch to Register */}
            <div className="text-center pt-2 text-xs text-neutral-600">
              還沒有 BYBIT 賬號？{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-[#FF6B00] font-bold hover:underline"
              >
                立即註冊 →
              </button>
            </div>

            {/* Social Logins */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <span className="relative bg-white px-3 text-xs text-neutral-400">
                無需註冊，快捷安全登入
              </span>
            </div>

            <div className="flex items-center justify-center space-x-6 pb-2">
              <button
                type="button"
                onClick={() => handleSocialLogin('telegram')}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer text-xs font-semibold text-neutral-700"
              >
                <svg className="w-5 h-5 fill-[#24A1DE]" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.74-.56 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
                </svg>
                <span>Telegram</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer text-xs font-semibold text-neutral-700"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                <span>Google</span>
              </button>
            </div>

            {/* Guest / Skip Option */}
            <div className="text-center pt-3 pb-2">
              <button
                type="button"
                onClick={onBack}
                className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
              >
                暫不登入，先以訪客身份逛逛 →
              </button>
            </div>
          </div>
        )}

        {/* ======================= REGISTER VIEW ======================= */}
        {mode === 'register' && (
          <div className="space-y-4">
            {/* New User Reward Banner */}
            <div className="bg-gradient-to-r from-[#FFF4EC] to-[#FEF3C7] text-[#C2410C] rounded-2xl p-3 flex items-center space-x-3 border border-orange-100 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-lg shadow-2xs shrink-0">
                🎁
              </div>
              <div className="text-xs">
                <span className="font-bold text-neutral-900 block">新用戶專屬福利</span>
                <span className="text-neutral-600">
                  註冊即贈 <strong className="text-[#16A34A] font-bold">$12 USDT</strong> 體驗金，享卡片免年費
                </span>
              </div>
            </div>

            {/* Register Form */}
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 pt-1">
              {/* Field 1: Email */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  郵箱地址
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    placeholder="請輸入常用郵箱地址"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 text-neutral-800 placeholder-neutral-400 transition"
                  />
                </div>
              </div>

              {/* Field 2: Verification Code */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  郵箱驗證碼
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <ShieldCheck size={16} />
                  </div>
                  <input
                    type="text"
                    placeholder="請輸入6位驗證碼"
                    value={regCode}
                    onChange={(e) => setRegCode(e.target.value)}
                    className="w-full pl-10 pr-28 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 text-neutral-800 placeholder-neutral-400 transition"
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={codeCountdown > 0}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#FF6B00] hover:text-[#E05E00] disabled:text-neutral-400 bg-orange-50 disabled:bg-neutral-100 px-2.5 py-1.5 rounded-lg transition"
                  >
                    {codeCountdown > 0 ? `${codeCountdown}s 後重新獲取` : '獲取驗證碼'}
                  </button>
                </div>
              </div>

              {/* Field 3: Password */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  登入密碼
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    placeholder="至少6位字母與數字組合"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 text-neutral-800 placeholder-neutral-400 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1"
                  >
                    {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Field 4: Optional Invitation Code */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowInviteField(!showInviteField)}
                  className="flex items-center space-x-1 text-xs text-neutral-600 hover:text-neutral-900 font-medium py-1"
                >
                  <span>邀請碼 (選填)</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${showInviteField ? 'rotate-180' : ''}`}
                  />
                </button>
                {showInviteField && (
                  <input
                    type="text"
                    placeholder="請輸入推薦人邀請碼"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 mt-1 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 text-neutral-800 placeholder-neutral-400 transition"
                  />
                )}
              </div>

              {/* Agreement Checkbox */}
              <div className="flex items-start space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setAgreedTerms(!agreedTerms)}
                  className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-colors shrink-0 ${
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
                  我已閱讀並同意 BYBIT 的{' '}
                  <span className="text-[#FF6B00] font-medium">服務條款</span> 和{' '}
                  <span className="text-[#FF6B00] font-medium">隱私政策</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-[#FF6B00] text-white rounded-xl font-bold text-base hover:bg-[#E05E00] active:scale-[0.99] transition-all shadow-md shadow-orange-500/20 cursor-pointer"
              >
                立即註冊並領取福利
              </button>
            </form>

            {/* Quick Switch to Login */}
            <div className="text-center pt-2 text-xs text-neutral-600">
              已有 BYBIT 賬號？{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#FF6B00] font-bold hover:underline"
              >
                立即登入 →
              </button>
            </div>

            {/* Social Logins */}
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <span className="relative bg-white px-3 text-xs text-neutral-400">
                無需繁瑣填寫，快速註冊
              </span>
            </div>

            <div className="flex items-center justify-center space-x-6 pb-2">
              <button
                type="button"
                onClick={() => handleSocialLogin('telegram')}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer text-xs font-semibold text-neutral-700"
              >
                <svg className="w-5 h-5 fill-[#24A1DE]" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.74-.56 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
                </svg>
                <span>Telegram 註冊</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer text-xs font-semibold text-neutral-700"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                <span>Google 註冊</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

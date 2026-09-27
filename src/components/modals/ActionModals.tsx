import React, { useState } from 'react';
import {
  ChevronLeft,
  Copy,
  Check,
  QrCode,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Coins,
  Camera,
  RefreshCw,
  Send,
  Lock,
  Headphones,
  Users,
  Award,
  Share2,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Wallet,
  Image,
} from 'lucide-react';
import { CryptoAsset, Transaction } from '../../types';

interface ActionModalsProps {
  activeModal: string | null;
  onClose: () => void;
  assets: CryptoAsset[];
  transactions: Transaction[];
  onDeposit: (amount: number, symbol: string) => void;
  onWithdraw: (amount: number, symbol: string, address: string) => void;
  onTransfer: (amount: number, symbol: string, recipient: string) => void;
  onToast: (msg: string) => void;
  onSwitchModal?: (modalId: string) => void;
}

export const ActionModals: React.FC<ActionModalsProps> = ({
  activeModal,
  onClose,
  assets,
  transactions,
  onDeposit,
  onWithdraw,
  onTransfer,
  onToast,
  onSwitchModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [network, setNetwork] = useState('TRC20');
  const [amountInput, setAmountInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('USDT');
  const [flashOn, setFlashOn] = useState(false);

  // Customer Service state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: '您好！我是 BYBIT 官方 7x24 小時智能客服，請問有什麼可以為您服務？', time: '11:20' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Staking state
  const [stakingDays, setStakingDays] = useState(30);

  if (!activeModal) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    onToast('已複製到剪貼簿');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountInput);
    if (!val || val <= 0) {
      onToast('請輸入有效的充值數量');
      return;
    }
    onDeposit(val, selectedSymbol);
    onToast(`充值模擬成功！已為您的錢包到賬 ${val} ${selectedSymbol}`);
    setAmountInput('');
    onClose();
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountInput);
    if (!val || val <= 0) {
      onToast('請輸入提現數量');
      return;
    }
    if (!addressInput) {
      onToast('請輸入提現目標錢包地址');
      return;
    }
    const currentBal = assets.find((a) => a.symbol === selectedSymbol)?.balance || 0;
    if (val > currentBal) {
      onToast(`餘額不足，當前可用 ${currentBal} ${selectedSymbol}`);
      return;
    }
    onWithdraw(val, selectedSymbol, addressInput);
    onToast(`提現訂單已提交審核，預計 1-3 分鐘到賬`);
    setAmountInput('');
    setAddressInput('');
    onClose();
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountInput);
    if (!val || val <= 0) {
      onToast('請輸入轉賬金額');
      return;
    }
    if (!addressInput) {
      onToast('請輸入接收方 BYBIT 賬號/UID/郵箱');
      return;
    }
    const currentBal = assets.find((a) => a.symbol === selectedSymbol)?.balance || 0;
    if (val > currentBal) {
      onToast(`餘額不足，當前可用 ${currentBal} ${selectedSymbol}`);
      return;
    }
    onTransfer(val, selectedSymbol, addressInput);
    onToast(`內部劃轉成功！0手續費即時到賬`);
    setAmountInput('');
    setAddressInput('');
    onClose();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = { sender: 'user', text: chatInput, time: '剛才' };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '感謝您的諮詢。BYBIT 專業在線客服代表已接入對話，正在處理您的請求，請稍候。',
          time: '剛才',
        },
      ]);
    }, 800);
  };

  // Dynamic Page Title
  const getPageTitle = () => {
    switch (activeModal) {
      case 'deposit':
        return '數字貨幣充值';
      case 'withdraw':
        return '安全提現';
      case 'transfer':
        return '內部轉賬劃轉';
      case 'scan':
        return '掃一掃';
      case 'receive':
        return '我的收款碼';
      case 'staking':
        return '質押理財 (餘幣寶)';
      case 'trx':
        return 'TRX 能量加速站';
      case 'chat':
        return '在線客服';
      case 'invite':
        return '邀請計劃';
      case 'history':
        return '資金明細';
      case 'risk':
        return '安全體檢';
      case 'rewards':
        return '福利中心';
      default:
        return 'BYBIT 業務';
    }
  };

  const isScan = activeModal === 'scan';

  return (
    <div className={`absolute inset-0 z-40 flex flex-col animate-in slide-in-from-right duration-200 select-none ${
      isScan ? 'bg-[#0B0E14] text-white' : 'bg-[#F8F9FA] text-neutral-900'
    }`}>
      
      {/* Native App Top Header Bar */}
      <div className={`w-full px-4 pt-3 pb-3 flex items-center justify-between border-b shrink-0 ${
        isScan
          ? 'border-neutral-800/80 bg-[#0B0E14]/90 backdrop-blur-md text-white'
          : 'border-neutral-100 bg-white/95 backdrop-blur-xs text-neutral-900'
      }`}>
        <button
          onClick={onClose}
          className={`p-1 -ml-1 active:scale-95 transition cursor-pointer ${
            isScan ? 'text-white hover:text-[#FF6B00]' : 'text-neutral-800 hover:text-black'
          }`}
          title="返回"
        >
          <ChevronLeft size={24} className="stroke-[2.2]" />
        </button>

        <h2 className={`text-[17px] font-bold tracking-tight ${isScan ? 'text-white' : 'text-neutral-900'}`}>
          {getPageTitle()}
        </h2>

        {/* Right Action Button according to page */}
        <div className="flex items-center space-x-1">
          {isScan ? (
            <button
              onClick={() => {
                onToast('已從相冊識別二維碼：收款地址已自動讀取');
                onClose();
              }}
              className="px-2.5 py-1 text-xs font-semibold text-white/90 hover:text-[#FF6B00] active:scale-95 transition cursor-pointer flex items-center space-x-1"
              title="相冊"
            >
              <Image size={17} />
              <span>相冊</span>
            </button>
          ) : activeModal === 'deposit' || activeModal === 'withdraw' || activeModal === 'transfer' ? (
            <button
              onClick={() => onToast('已為您載入近 30 天資金流水')}
              className="p-1 text-neutral-600 hover:text-[#FF6B00] active:scale-95 transition cursor-pointer"
              title="明細"
            >
              <Clock size={20} />
            </button>
          ) : activeModal === 'invite' ? (
            <button
              onClick={() => onToast('邀請宣傳海報已保存至相冊')}
              className="p-1 text-neutral-600 hover:text-[#FF6B00] active:scale-95 transition cursor-pointer"
              title="分享"
            >
              <Share2 size={20} />
            </button>
          ) : (
            <button
              onClick={() => onToast('若有疑問請隨時聯絡官方客服')}
              className="p-1 text-neutral-600 hover:text-[#FF6B00] active:scale-95 transition cursor-pointer"
              title="幫助"
            >
              <HelpCircle size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Main Page Scrollable Area */}
      <div className={`flex-1 overflow-y-auto ${isScan ? 'p-0 flex flex-col justify-between' : 'px-4 py-4 space-y-4'}`}>
        
        {/* ===================== 1. DEPOSIT (充值) ===================== */}
        {activeModal === 'deposit' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
              <label className="text-xs font-bold text-neutral-700 block">充值幣種與網絡</label>
              
              <div className="flex gap-2 p-1 bg-neutral-100 rounded-xl">
                {['TRC20', 'ERC20', 'BEP20', 'SOL'].map((net) => (
                  <button
                    key={net}
                    onClick={() => setNetwork(net)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      network === net ? 'bg-white text-[#FF6B00] shadow-xs' : 'text-neutral-500'
                    }`}
                  >
                    {net}
                  </button>
                ))}
              </div>

              {/* QR Code display */}
              <div className="bg-neutral-50 border border-neutral-100 p-5 rounded-2xl flex flex-col items-center">
                <div className="w-44 h-44 bg-white p-3 rounded-2xl border border-neutral-200 flex items-center justify-center shadow-xs">
                  <div className="w-full h-full border-2 border-dashed border-[#FF6B00]/40 rounded-xl flex flex-col items-center justify-center p-2 text-center">
                    <QrCode size={110} className="text-neutral-800" />
                    <span className="text-[10px] text-neutral-400 font-mono mt-1 font-bold">BYBIT-{network}</span>
                  </div>
                </div>
                <span className="text-xs text-neutral-500 mt-2.5 font-medium">請向此地址充值 {selectedSymbol} ({network})</span>
              </div>

              {/* Deposit Address Box */}
              <div>
                <label className="text-xs font-semibold text-neutral-600 block mb-1">充值地址</label>
                <div className="flex items-center justify-between p-3.5 bg-neutral-100 rounded-xl font-mono text-xs text-neutral-800 break-all select-all">
                  <span>TBybit888XyZ9qK1Wp4Lt8VnRt62MvQx</span>
                  <button
                    onClick={() => handleCopy('TBybit888XyZ9qK1Wp4Lt8VnRt62MvQx')}
                    className="ml-2 text-[#FF6B00] shrink-0 p-1.5 hover:bg-neutral-200 rounded-lg cursor-pointer"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick simulation deposit */}
            <form onSubmit={handleDepositSubmit} className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
              <label className="text-xs font-bold text-neutral-700 block">
                模擬快速充值入賬 (測試沙盒)
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="輸入充值數量 e.g. 500"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#FF6B00]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#FF6B00] text-white rounded-xl text-xs font-bold hover:bg-[#E05E00] cursor-pointer shrink-0"
                >
                  立即到賬
                </button>
              </div>
              <p className="text-[11px] text-neutral-400">
                最小充值金額 10 USDT，區塊確認數 1 次，即時入賬。
              </p>
            </form>
          </div>
        )}

        {/* ===================== 2. WITHDRAW (提現) ===================== */}
        {activeModal === 'withdraw' && (
          <form onSubmit={handleWithdrawSubmit} className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3.5">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">提幣幣種</label>
                <select
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#FF6B00] bg-white text-neutral-800"
                >
                  {assets.map((a) => (
                    <option key={a.symbol} value={a.symbol}>
                      {a.symbol} (餘額: {a.balance})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">提現錢包地址</label>
                <input
                  type="text"
                  placeholder="粘貼或輸入外部目標地址"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-neutral-700">提現數量</label>
                  <span className="text-xs text-neutral-400">
                    可用: {assets.find((a) => a.symbol === selectedSymbol)?.balance || 0} {selectedSymbol}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="最小提現數量 10"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#FF6B00] pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const bal = assets.find((a) => a.symbol === selectedSymbol)?.balance || 0;
                      setAmountInput(bal.toString());
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#FF6B00] cursor-pointer"
                  >
                    全部
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-2 text-xs text-neutral-500">
              <div className="flex justify-between">
                <span>網絡手續費 (Gas)</span>
                <span className="font-semibold text-neutral-800">1.00 USDT</span>
              </div>
              <div className="flex justify-between">
                <span>到賬時間</span>
                <span className="text-[#FF6B00] font-medium">預計 1-3 分鐘</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#FF6B00] text-white font-bold rounded-xl text-sm hover:bg-[#E05E00] shadow-md shadow-orange-500/20 cursor-pointer"
            >
              確認安全提現
            </button>
          </form>
        )}

        {/* ===================== 3. TRANSFER (內部轉賬) ===================== */}
        {activeModal === 'transfer' && (
          <form onSubmit={handleTransferSubmit} className="space-y-4">
            <div className="bg-[#FFF4EC] text-[#C2410C] p-4 rounded-2xl text-xs font-medium border border-orange-100">
              ✨ BYBIT 內部用戶劃轉 0 手續費，即時到賬，無需等待區塊確認！
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3.5">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">對方賬號 / 郵箱 / UID</label>
                <input
                  type="text"
                  placeholder="輸入對方的 BYBIT 賬號或 UID"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">轉賬數量 (USDT)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#FF6B00] text-white font-bold rounded-xl text-sm hover:bg-[#E05E00] shadow-md shadow-orange-500/20 cursor-pointer"
            >
              立即劃轉
            </button>
          </form>
        )}

        {/* ===================== 4. SCAN (掃一掃 原生獨立全屏取景框頁面) ===================== */}
        {activeModal === 'scan' && (
          <div className="flex-1 flex flex-col justify-between py-6 select-none relative overflow-hidden h-full min-h-[520px]">
            {/* Viewfinder Target Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative px-6">
              
              {/* Camera Scanner Viewport */}
              <div className="w-68 h-68 relative flex items-center justify-center">
                {/* 4 Corner Markers */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#FF6B00] rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#FF6B00] rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#FF6B00] rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#FF6B00] rounded-br-lg" />

                {/* Laser scan line with gradient glow */}
                <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent shadow-[0_0_15px_#FF6B00] animate-bounce" />

                {/* Subtle grid pattern background to simulate camera sensor */}
                <div className="w-full h-full bg-neutral-900/40 rounded-xl border border-white/10 flex items-center justify-center backdrop-blur-2xs">
                  <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/30 text-xs">
                    +
                  </div>
                </div>
              </div>

              {/* Instructional Text */}
              <p className="text-neutral-400 text-xs font-medium text-center mt-6">
                將二維碼 / 條形碼放入框內，即可自動掃描
              </p>

              {/* Flashlight button */}
              <button
                type="button"
                onClick={() => {
                  setFlashOn(!flashOn);
                  onToast(!flashOn ? '手電筒已開啟照亮' : '手電筒已關閉');
                }}
                className={`mt-6 flex flex-col items-center space-y-1.5 cursor-pointer p-2 rounded-xl transition-all ${
                  flashOn ? 'text-yellow-400' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                  flashOn ? 'bg-yellow-400/20 border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.5)]' : 'bg-neutral-800/80 border-neutral-700'
                }`}>
                  <Zap size={22} className={flashOn ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'} />
                </div>
                <span className="text-[11px] font-medium">{flashOn ? '關閉手電筒' : '點擊照亮'}</span>
              </button>
            </div>

            {/* Bottom Actions Bar */}
            <div className="shrink-0 px-6 pt-3 pb-4 flex items-center justify-around border-t border-neutral-800/80 bg-[#0B0E14]/90">
              <button
                type="button"
                onClick={() => {
                  if (onSwitchModal) onSwitchModal('receive');
                }}
                className="flex items-center space-x-2 text-xs font-bold text-neutral-300 hover:text-white px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 cursor-pointer active:scale-95 transition"
              >
                <QrCode size={16} className="text-[#FF6B00]" />
                <span>我的收款碼</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onToast('已從相冊識別二維碼：收款地址已自動讀取');
                  onClose();
                }}
                className="flex items-center space-x-2 text-xs font-bold text-white px-4 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] cursor-pointer active:scale-95 transition shadow-md shadow-orange-500/20"
              >
                <Image size={16} />
                <span>相冊選取</span>
              </button>
            </div>
          </div>
        )}

        {/* ===================== 5. RECEIVE (收款碼 原生獨立頁面) ===================== */}
        {activeModal === 'receive' && (
          <div className="flex-1 flex flex-col justify-between py-2 space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-200/90 flex flex-col items-center w-full max-w-xs">
                {/* Logo and Tag */}
                <div className="w-full flex items-center justify-between mb-3 pb-2 border-b border-neutral-100 text-xs">
                  <div className="flex items-center space-x-1.5 font-bold text-neutral-800">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                    <span>Bybit Pay 快速收款</span>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded">
                    即時到賬
                  </span>
                </div>

                <div className="w-52 h-52 bg-neutral-50 rounded-2xl p-4 flex flex-col items-center justify-center border border-dashed border-[#FF6B00]">
                  <QrCode size={150} className="text-neutral-900" />
                  <span className="text-xs font-bold text-[#FF6B00] mt-2">BYBIT-PAY-ID: 982143</span>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-xs text-neutral-500 font-medium">掃描二維碼向我轉賬 (USDT)</p>
                  <p className="text-sm font-bold text-neutral-800 mt-1 font-mono break-all">TBybitPay888OfficialKey</p>
                </div>
              </div>

              {/* Set Amount & Switch to Scan quick buttons */}
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => onToast('已為您切換為指定收款金額模式')}
                  className="px-4 py-1.5 rounded-full border border-neutral-300 text-xs font-medium text-neutral-700 hover:border-orange-400 bg-white cursor-pointer"
                >
                  設置金額
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onSwitchModal) onSwitchModal('scan');
                  }}
                  className="px-4 py-1.5 rounded-full border border-neutral-300 text-xs font-medium text-neutral-700 hover:border-orange-400 bg-white cursor-pointer flex items-center space-x-1"
                >
                  <Camera size={14} className="text-[#FF6B00]" />
                  <span>切換掃一掃</span>
                </button>
              </div>
            </div>

            <div className="flex space-x-3 w-full pt-2">
              <button
                type="button"
                onClick={() => handleCopy('TBybitPay888OfficialKey')}
                className="flex-1 py-3.5 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
              >
                複製收款地址
              </button>
              <button
                type="button"
                onClick={() => onToast('收款海報已保存至手機相冊')}
                className="flex-1 py-3.5 rounded-xl bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#E05E00] cursor-pointer shadow-md shadow-orange-500/20"
              >
                保存收款海報
              </button>
            </div>
          </div>
        )}

        {/* ===================== 6. STAKING (質押理財) ===================== */}
        {activeModal === 'staking' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-orange-100">活期 / 定期質押最高年化</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">保本保息</span>
              </div>
              <div className="text-3xl font-extrabold mt-1">12.80% <span className="text-sm font-normal">APY</span></div>
              <p className="text-xs text-orange-100/90 mt-1">每日結算利息，隨存隨取，0 手續費</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3.5">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-2">理財期限選擇</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { days: 7, apy: '8.5%' },
                    { days: 30, apy: '10.8%' },
                    { days: 90, apy: '12.8%' },
                  ].map((p) => (
                    <button
                      key={p.days}
                      onClick={() => setStakingDays(p.days)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        stakingDays === p.days
                          ? 'border-[#FF6B00] bg-orange-50/50 text-[#FF6B00] font-bold'
                          : 'border-neutral-200 text-neutral-600'
                      }`}
                    >
                      <div className="text-xs">{p.days} 天</div>
                      <div className="text-[11px] font-extrabold text-[#FF6B00]">{p.apy}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">申購金額 (USDT)</label>
                <input
                  type="number"
                  placeholder="最小起投 100 USDT"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            <button
              onClick={() => {
                onToast('質押訂單已成功鎖定，每日 00:00 自動派發利息！');
                onClose();
              }}
              className="w-full py-3.5 bg-[#FF6B00] text-white font-bold rounded-xl text-sm hover:bg-[#E05E00] shadow-md shadow-orange-500/20 cursor-pointer"
            >
              立即申購理財
            </button>
          </div>
        )}

        {/* ===================== 7. TRX ACCELERATION (TRX能量) ===================== */}
        {activeModal === 'trx' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-5 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-2">
                <Zap size={22} />
                <span className="font-extrabold text-base">TRON 能量租賃 & 燃燒加速</span>
              </div>
              <p className="text-xs text-rose-100 mt-1.5 leading-relaxed">
                節省高達 80% TRC20 轉賬 Gas 手續費，每筆僅需幾美分！
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
              <label className="text-xs font-bold text-neutral-700 block">租賃時長選擇</label>
              <div className="grid grid-cols-3 gap-2">
                {['1小時', '24小時', '3天'].map((t, idx) => (
                  <button
                    key={t}
                    onClick={() => onToast(`已選擇能量租賃時長：${t}`)}
                    className={`p-3 rounded-xl border text-xs font-bold cursor-pointer ${
                      idx === 1 ? 'border-red-500 bg-red-50 text-red-600' : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onToast('⚡ TRX 能量包已成功注入您的錢包地址');
                onClose();
              }}
              className="w-full py-3.5 bg-[#EF0027] text-white font-bold rounded-xl text-sm hover:bg-[#d60023] shadow-md shadow-red-500/20 cursor-pointer"
            >
              一鍵加速 (節省 80% 手續費)
            </button>
          </div>
        )}

        {/* ===================== 8. CUSTOMER SERVICE (在線客服) ===================== */}
        {activeModal === 'chat' && (
          <div className="flex flex-col h-[74vh]">
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#FF6B00] text-white rounded-br-xs'
                        : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-neutral-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="pt-3 border-t border-neutral-100 flex space-x-2 shrink-0">
              <input
                type="text"
                placeholder="請描述您的問題..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#FF6B00] bg-white"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#FF6B00] text-white rounded-xl hover:bg-[#E05E00] cursor-pointer"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

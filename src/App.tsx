import React, { useState, useEffect } from 'react';
import { TabType, AuthMode, CryptoAsset, CardProduct, UserCard, Transaction } from './types';
import {
  INITIAL_ASSETS,
  CARD_PRODUCTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_TRANSACTIONS,
} from './data/mockData';
import { IosStatusBar } from './components/common/IosStatusBar';
import { IosHomeIndicator } from './components/common/IosHomeIndicator';
import { BottomNav } from './components/common/BottomNav';
import { HomeView } from './views/HomeView';
import { CardsView } from './views/CardsView';
import { AssetsView } from './views/AssetsView';
import { ProfileView } from './views/ProfileView';
import { WelfareCenterView } from './views/WelfareCenterView';
import { ExchangeView } from './views/ExchangeView';
import { AuthView } from './views/AuthView';
import { ActionModals } from './components/modals/ActionModals';
import { CardApplyView } from './views/CardApplyView';
import { NotificationsView } from './views/NotificationsView';
import { LanguageView } from './views/LanguageView';
import { SecurityCourseView } from './views/SecurityCourseView';
import { InviteFriendsView } from './views/InviteFriendsView';
import { Smartphone, Monitor, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & View states
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [isIphoneFrame, setIsIphoneFrame] = useState<boolean>(true);

  // User state (starts in logged out state: clicking anywhere pops up register)
  const [user, setUser] = useState({ name: '訪客', email: '' });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Financial & Assets state
  const [assets, setAssets] = useState<CryptoAsset[]>(INITIAL_ASSETS);
  const [hideBalance, setHideBalance] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [userCards, setUserCards] = useState<UserCard[]>([]);

  // Auth independent page state - App opens directly into Login view
  const [isAuthPageOpen, setIsAuthPageOpen] = useState<boolean>(true);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [activeActionModal, setActiveActionModal] = useState<string | null>(null);
  const [selectedCardProduct, setSelectedCardProduct] = useState<CardProduct | null>(null);
  const [notifModalOpen, setNotifModalOpen] = useState<boolean>(false);
  const [welfareCenterOpen, setWelfareCenterOpen] = useState<boolean>(false);
  const [langModalOpen, setLangModalOpen] = useState<boolean>(false);
  const [securityCourseOpen, setSecurityCourseOpen] = useState<boolean>(false);
  const [inviteFriendsOpen, setInviteFriendsOpen] = useState<boolean>(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Calculate total USD value
  const totalUsd = assets.reduce((sum, item) => sum + item.balance * item.usdPrice, 0);

  // Handlers
  const handleDeposit = (amount: number, symbol: string) => {
    setAssets((prev) =>
      prev.map((a) => (a.symbol === symbol ? { ...a, balance: a.balance + amount } : a))
    );
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'deposit',
      title: `${symbol} 快速充值`,
      amount,
      symbol,
      timestamp: '剛剛',
      status: 'completed',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleWithdraw = (amount: number, symbol: string, address: string) => {
    setAssets((prev) =>
      prev.map((a) => (a.symbol === symbol ? { ...a, balance: Math.max(0, a.balance - amount) } : a))
    );
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'withdraw',
      title: `${symbol} 提現轉出`,
      amount,
      symbol,
      timestamp: '剛剛',
      status: 'completed',
      toAddress: address,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleTransfer = (amount: number, symbol: string, recipient: string) => {
    setAssets((prev) =>
      prev.map((a) => (a.symbol === symbol ? { ...a, balance: Math.max(0, a.balance - amount) } : a))
    );
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'transfer',
      title: `內部轉賬至 ${recipient.slice(0, 10)}...`,
      amount,
      symbol,
      timestamp: '剛剛',
      status: 'completed',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleSwap = (
    fromSymbol: string,
    toSymbol: string,
    fromAmount: number,
    toAmount: number
  ) => {
    setAssets((prev) =>
      prev.map((a) => {
        if (a.symbol === fromSymbol) return { ...a, balance: Math.max(0, a.balance - fromAmount) };
        if (a.symbol === toSymbol) return { ...a, balance: a.balance + toAmount };
        return a;
      })
    );
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'exchange',
      title: `閃兌 ${fromSymbol} ➔ ${toSymbol}`,
      amount: fromAmount,
      symbol: fromSymbol,
      timestamp: '剛剛',
      status: 'completed',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleCardApplySuccess = (newCard: UserCard) => {
    setUserCards((prev) => [newCard, ...prev]);
    // Deduct fee if not gift card
    if (!newCard.cardType.includes('禮品卡')) {
      const fee = newCard.cardType.includes('虛擬') ? 10 : 100;
      setAssets((prev) =>
        prev.map((a) => (a.symbol === 'USDT' ? { ...a, balance: Math.max(0, a.balance - fee) } : a))
      );
    }
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'card_apply',
      title: `開通 ${newCard.cardType}`,
      amount: newCard.cardType.includes('虛擬') ? 10 : newCard.cardType.includes('禮品卡') ? 0 : 100,
      symbol: 'USDT',
      timestamp: '剛剛',
      status: 'completed',
    };
    setTransactions((prev) => [newTx, ...prev]);
    setCurrentTab('cards');
  };

  const handleToggleCardFreeze = (cardId: string) => {
    setUserCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? { ...c, status: c.status === 'active' ? 'frozen' : 'active' }
          : c
      )
    );
    showToast('卡片狀態已更新');
  };

  const handleOpenAuth = (mode: AuthMode = 'register') => {
    setAuthMode(mode);
    setIsAuthPageOpen(true);
  };

  const usdtBalance = assets.find((a) => a.symbol === 'USDT')?.balance || 0;

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-900 font-sans flex flex-col items-center justify-start sm:py-6 select-none relative overflow-x-hidden">
      
      {/* Top Controls Bar for Desktop Preview / View Mode Switcher */}
      <div className="w-full max-w-md px-4 py-2 flex items-center justify-between text-xs text-neutral-400 z-20">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
          <span className="font-bold text-neutral-300">BYBIT iOS H5 App</span>
          <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">v2.6.0</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Login / Register trigger */}
          <button
            onClick={() => handleOpenAuth(isLoggedIn ? 'login' : 'register')}
            className="px-2.5 py-1 bg-[#FF6B00] hover:bg-[#E05E00] text-white rounded-lg transition-colors cursor-pointer font-medium"
          >
            {isLoggedIn ? '切換賬號' : '註冊 / 登入'}
          </button>

          {/* Switch Phone Frame vs Full View */}
          <button
            onClick={() => setIsIphoneFrame(!isIphoneFrame)}
            className="hidden sm:flex items-center space-x-1 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors cursor-pointer"
            title="切換 iPhone 視圖"
          >
            {isIphoneFrame ? <Monitor size={13} /> : <Smartphone size={13} />}
            <span>{isIphoneFrame ? '全屏 H5' : 'iPhone 框'}</span>
          </button>
        </div>
      </div>

      {/* Main Container: iPhone Mock Frame or Responsive Web H5 Container */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col bg-white overflow-hidden ${
          isIphoneFrame
            ? 'max-w-[420px] h-[100dvh] sm:h-[870px] sm:rounded-[52px] sm:border-[10px] sm:border-neutral-800 shadow-[0_25px_70px_rgba(0,0,0,0.8)]'
            : 'max-w-md min-h-[100dvh] shadow-xl'
        }`}
      >
        {/* iOS Dynamic Island & Status Bar */}
        <IosStatusBar darkText={true} />

        {isAuthPageOpen ? (
          /* =================== INDEPENDENT AUTH PAGE (獨立註冊登入頁面) =================== */
          <AuthView
            initialMode={authMode}
            onBack={() => setIsAuthPageOpen(false)}
            onSuccess={(u) => {
              setUser(u);
              setIsLoggedIn(true);
              setIsAuthPageOpen(false);
            }}
            onToast={showToast}
            onOpenCustomerService={() => setActiveActionModal('chat')}
            onOpenLanguage={() => setLangModalOpen(true)}
          />
        ) : (
          <>
            {/* Content Area according to active tab */}
            <div className="flex-1 flex flex-col overflow-hidden relative bg-[#F9FAFB]">
              {currentTab === 'home' && (
                <HomeView
                  assets={assets}
                  totalUsd={totalUsd}
                  hideBalance={hideBalance}
                  onToggleHideBalance={() => setHideBalance(!hideBalance)}
                  onOpenModal={(id) => {
                    if (id === 'language') setLangModalOpen(true);
                    else if (id === 'profile') setCurrentTab('profile');
                    else if (id === 'notifications') setNotifModalOpen(true);
                    else if (id === 'rewards') setWelfareCenterOpen(true);
                    else if (id === 'security') setSecurityCourseOpen(true);
                    else if (id === 'invite') setInviteFriendsOpen(true);
                    else {
                      setActiveActionModal(id);
                    }
                  }}
                  onNavigateTab={(tab) => setCurrentTab(tab)}
                  onToast={showToast}
                  userName={user.name}
                />
              )}

              {currentTab === 'exchange' && (
                <ExchangeView
                  assets={assets}
                  onSwap={handleSwap}
                  onToast={showToast}
                />
              )}

              {currentTab === 'cards' && (
                <CardsView
                  onBack={() => setCurrentTab('home')}
                  onSelectProduct={(product) => {
                    setSelectedCardProduct(product);
                  }}
                  userCards={userCards}
                  onToggleCardFreeze={handleToggleCardFreeze}
                  onToast={showToast}
                />
              )}

              {(currentTab === 'profile' || currentTab === 'assets') && (
                <ProfileView
                  user={user}
                  isLoggedIn={isLoggedIn}
                  onLogout={() => {
                    setIsLoggedIn(false);
                    setUser({ name: '訪客', email: 'guest@bybit.com' });
                  }}
                  onOpenAuth={() => handleOpenAuth('login')}
                  onToast={showToast}
                  onOpenCustomerService={() => setActiveActionModal('chat')}
                  onOpenLanguage={() => setLangModalOpen(true)}
                />
              )}
            </div>

            {/* Bottom Navigation Bar */}
            <BottomNav currentTab={currentTab} onSelectTab={(tab) => setCurrentTab(tab)} />
          </>
        )}

        {/* iOS Home Indicator Bar */}
        <IosHomeIndicator dark={true} />

        {/* Welfare Center Full View (福利中心) */}
        {welfareCenterOpen && (
          <WelfareCenterView
            onBack={() => setWelfareCenterOpen(false)}
            onToast={showToast}
          />
        )}

        {/* Security Course Independent Full View (BYBIT安全課 獨立頁面) */}
        {securityCourseOpen && (
          <SecurityCourseView
            onBack={() => setSecurityCourseOpen(false)}
            onToast={showToast}
            onOpenCustomerService={() => setActiveActionModal('chat')}
          />
        )}

        {/* Independent Action Views (充值、提現、劃轉、掃一掃、收款碼、質押理財、TRX能量、在線客服 獨立頁面) */}
        {activeActionModal && (
          <ActionModals
            activeModal={activeActionModal}
            onClose={() => setActiveActionModal(null)}
            assets={assets}
            transactions={transactions}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
            onTransfer={handleTransfer}
            onToast={showToast}
            onSwitchModal={(modalId) => {
              if (modalId === 'invite') {
                setActiveActionModal(null);
                setInviteFriendsOpen(true);
              } else {
                setActiveActionModal(modalId);
              }
            }}
          />
        )}

        {/* Invite Friends Independent Full View (邀請好友 獨立頁面) */}
        {inviteFriendsOpen && (
          <InviteFriendsView
            onBack={() => setInviteFriendsOpen(false)}
            onToast={showToast}
          />
        )}
        {/* Notifications Independent Full View (消息與公告中心 獨立頁面) */}
        {notifModalOpen && (
          <NotificationsView
            onBack={() => setNotifModalOpen(false)}
            notifications={INITIAL_NOTIFICATIONS}
            onMarkAllRead={() => showToast('已將全部公告標記為已讀')}
            onToast={showToast}
          />
        )}

        {/* Language Selection Independent Full View (語言與地區 獨立頁面) */}
        {langModalOpen && (
          <LanguageView
            onBack={() => setLangModalOpen(false)}
            onToast={showToast}
          />
        )}

        {/* Card Apply Independent Full View (卡片申請 獨立全屏頁面) */}
        {selectedCardProduct && (
          <CardApplyView
            cardProduct={selectedCardProduct}
            onBack={() => setSelectedCardProduct(null)}
            onSuccess={handleCardApplySuccess}
            onToast={showToast}
            usdtBalance={usdtBalance}
          />
        )}
      </div>
    </div>
  );
}

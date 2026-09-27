import { CryptoAsset, CardProduct, UserCard, Transaction, NotificationItem } from '../types';

export const INITIAL_ASSETS: CryptoAsset[] = [
  {
    symbol: 'USDT',
    name: 'Tether USD',
    balance: 0.0,
    usdPrice: 1.0,
    iconBg: 'bg-[#26A17B]',
    iconColor: 'text-white',
    iconType: 'usdt',
    network: 'TRC20 / ERC20',
  },
  {
    symbol: 'TRX',
    name: 'TRON',
    balance: 0.0,
    usdPrice: 0.235,
    iconBg: 'bg-[#EF0027]',
    iconColor: 'text-white',
    iconType: 'trx',
    network: 'TRON',
  },
];

export const CARD_PRODUCTS: CardProduct[] = [
  {
    id: 'visa-platinum-virtual',
    title: 'Visa Bybit Card',
    type: 'virtual',
    openFee: '1 USDT',
    topupRate: '0%',
    settleCurrency: 'USD',
    cardCategory: '虛擬卡',
    buttonText: '1USDT 申请卡',
    hasTag: true,
    tagColor: 'bg-[#FF3B30]',
    imageTheme: 'green_glow',
  },
  {
    id: 'visa-platinum-physical',
    title: 'Visa Bybit Card',
    type: 'physical',
    openFee: '10 USDT',
    topupRate: '0%',
    settleCurrency: 'USD',
    cardCategory: '實體卡',
    buttonText: '10 USDT 申請卡',
    hasTag: true,
    tagColor: 'bg-[#FF3B30]',
    imageTheme: 'dual_black',
  },
  {
    id: 'visa-gift-card',
    title: 'Visa禮品卡',
    type: 'gift',
    openFee: '免費',
    topupRate: '0%',
    settleCurrency: 'USD',
    cardCategory: '禮品卡',
    buttonText: '立刻綁定',
    description: '如果您獲得了 BYBIT 官方贈送的 Visa 禮品卡，請點擊進行綁定',
    imageTheme: 'gift_box',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'System Upgrade 系統升級及各幣種節點維護說明',
    content: 'BYBIT 平台將於近期進行伺服器與區塊鏈節點架構升級，期間充提幣服務將保持正常，感謝您的支持。',
    time: '10分鐘前',
    read: false,
    type: 'system',
  },
  {
    id: 'notif-2',
    title: '註冊新人大禮包已就緒',
    content: '恭喜您已獲得專屬新手禮遇，前往福利中心可領取高達 $12 新人迎新金！',
    time: '1小時前',
    read: false,
    type: 'activity',
  },
  {
    id: 'notif-3',
    title: 'Visa 實體卡第二期早鳥預約開啟',
    content: '全球通用，支持 Apple Pay / Google Pay，費率 0%，全球 ATM 便捷提現。',
    time: '昨天',
    read: false,
    type: 'activity',
  },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1001',
    type: 'deposit',
    title: 'USDT 充值 (TRC20)',
    amount: 500,
    symbol: 'USDT',
    timestamp: '2026-09-26 18:24',
    status: 'completed',
    txHash: '0x8f2a...c391',
  },
  {
    id: 'tx-1002',
    type: 'exchange',
    title: '閃兌 USDT 至 TRX',
    amount: 50,
    symbol: 'USDT',
    timestamp: '2026-09-25 14:10',
    status: 'completed',
  },
  {
    id: 'tx-1003',
    type: 'card_apply',
    title: 'Visa Bybit 虛擬卡申領',
    amount: 10,
    symbol: 'USDT',
    timestamp: '2026-09-24 09:30',
    status: 'completed',
  },
];

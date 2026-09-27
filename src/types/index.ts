export type TabType = 'home' | 'exchange' | 'cards' | 'profile' | 'assets';

export type AuthMode = 'login' | 'register';

export interface CryptoAsset {
  symbol: string;
  name: string;
  balance: number;
  usdPrice: number;
  iconBg: string;
  iconColor: string;
  iconType: 'usdt' | 'trx' | 'pht' | 'php' | 'usd_ph' | 'hkd_ph';
  network?: string;
}

export interface CardProduct {
  id: string;
  title: string;
  type: 'virtual' | 'physical' | 'gift';
  openFee: string;
  topupRate: string;
  settleCurrency: string;
  cardCategory: string;
  buttonText: string;
  hasTag?: boolean;
  tagColor?: string;
  description?: string;
  imageTheme: 'green_glow' | 'dual_black' | 'gift_box';
}

export interface UserCard {
  id: string;
  cardType: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  balance: number;
  currency: string;
  status: 'active' | 'frozen';
  holderName: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer' | 'exchange' | 'card_apply';
  title: string;
  amount: number;
  symbol: string;
  timestamp: string;
  status: 'completed' | 'processing' | 'failed';
  txHash?: string;
  toAddress?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  time: string;
  read: boolean;
  type: 'system' | 'activity' | 'security';
}

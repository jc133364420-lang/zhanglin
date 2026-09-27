import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'zh-CN', name: '中文 (简体)', nativeName: '简体中文', flag: '🇨🇳', region: '中国大陆' },
  { code: 'zh-TW', name: '繁体中文', nativeName: '繁體中文', flag: '🇭🇰', region: '中國香港 / 台灣' },
  { code: 'en', name: '英文', nativeName: 'English', flag: '🇺🇸', region: 'United States / Global' },
  { code: 'ja', name: '日语', nativeName: '日本語', flag: '🇯🇵', region: '日本' },
  { code: 'ko', name: '韩语', nativeName: '한국어', flag: '🇰🇷', region: '대한민국' },
  { code: 'vi', name: '越南语', nativeName: 'Tiếng Việt', flag: '🇻🇳', region: 'Việt Nam' },
  { code: 'ar', name: '阿拉伯语', nativeName: 'العربية', flag: '🇸🇦', region: 'العالم العربي' },
  { code: 'id', name: '印度尼西亚语', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', region: 'Indonesia' },
  { code: 'ru', name: '俄语', nativeName: 'Русский', flag: '🇷🇺', region: 'Россия' },
  { code: 'pt', name: '葡萄牙语', nativeName: 'Português', flag: '🇧🇷', region: 'Brasil / Portugal' },
  { code: 'tr', name: '土耳其语', nativeName: 'Türkçe', flag: '🇹🇷', region: 'Türkiye' },
  { code: 'de', name: '德语', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Deutschland' },
  { code: 'hi', name: '印度语', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'भारत' },
  { code: 'es', name: '西班牙语', nativeName: 'Español', flag: '🇪🇸', region: 'España / Latinoamérica' },
];

export type TranslationKey = string;

export const TRANSLATIONS: Record<string, Record<TranslationKey, string>> = {
  'zh-CN': {
    nav_home: '首页',
    nav_exchange: '闪兑',
    nav_cards: '预付卡',
    nav_profile: '我的',
    nav_assets: '资产',
    action_deposit: '充值',
    action_withdraw: '提现',
    action_transfer: '内部转账',
    action_scan: '扫一扫',
    action_receive: '收款码',
    action_staking: '质押理财',
    action_chat: '客服',
    action_trx: 'TRX加速',
    total_assets: '总资产折合',
    notice: '公告',
    notice_content: '系统升级及各币种节点优化说明',
    quick_functions: '快捷服务',
    hot_assets: '热门资产',
    my_cards: '我的卡包',
    apply_card: '立即办卡',
    login_register: '登录 / 注册',
    logout: '退出登录',
    lang_title: '语言切换',
    switch_lang: '选择语言',
    guest: '访客',
    online_cs: '在线客服',
    // Cards
    cards_list_title: '卡片列表',
    cards_tab_zone: '卡片专区',
    cards_tab_mycards: '我的卡片',
    cards_open_fee: '开卡费',
    cards_topup_rate: '充值费率',
    cards_settle_cur: '结算币种',
    cards_type: '卡片类型',
    cards_virtual: '虚拟卡',
    cards_physical: '实体卡',
    cards_apply_btn_1u: '1USDT 申请卡',
    cards_apply_btn_10u: '10 USDT 申请卡',
    cards_apply_title: '申请 Bybit Mastercard',
    cards_benefits_title: '卡片核心权益',
    cards_benefit_0fee: '0% 充值手续费',
    cards_benefit_global: '全球 1.3 亿商户',
    cards_benefit_applepay: '支持 Apple Pay / 3DS',
    cards_benefit_reserve: '资产 100% 准备金',
    cards_holder_name: '卡面持卡人姓名 (英文或拼音)',
    cards_holder_name_placeholder: '例如: ZHANG WEI 或 JOHN DOE',
    cards_shipping_addr: '实体卡邮寄地址',
    cards_pay_method: '扣缴方式：',
    cards_pay_wallet_usdt: '钱包 USDT 余额即时扣除',
    cards_available_bal: '可用 USDT 余额：',
    cards_cost_fee: '开卡工本费：',
    cards_agree_terms: '我已完整阅读并同意《Bybit 卡持卡人服务协议》、《全球反洗钱与合规条款》及《个人隐私安全保护协定》。',
    cards_confirm_apply: '确认开卡并启用',
    cards_applying: '正在为您开卡...',
    cards_available_limit: '卡片可用额度',
    cards_freeze: '冻结卡片',
    cards_unfreeze: '解冻卡片',
    cards_frozen_status: '已冻结',
    cards_no_cards: '尚无已启用的卡片',
    cards_go_apply: '前往申领',
    // Swap
    swap_title: '极速闪兑',
    swap_subtitle: '0 手续费 · 极速成交 · 深度聚合',
    swap_pay: '支付',
    swap_get: '获得 (预计)',
    swap_balance: '可用余额:',
    swap_max: '最大',
    swap_reference_rate: '参考汇率',
    swap_fee_label: '交易手续费',
    swap_fee_free: '0 手续费 (免手续费)',
    swap_slippage: '滑点保护',
    swap_confirm_btn: '立即闪兑',
    swap_processing: '正在极速撮合...',
    // Profile
    profile_my_equity: '我的总资产折合 (USD)',
    profile_hidden: '已隐藏',
    profile_vip_tag: 'VIP 尊享用户',
    profile_uid: 'UID',
    profile_kyc_passed: '已实名认证',
    profile_invite_friends: '邀请好友',
    profile_invite_desc: '享最高 30% 永久返佣',
    profile_welfare_center: '福利中心',
    profile_welfare_desc: '领 $12 新人开卡大礼包',
    profile_lang_setting: '语言与地区',
    profile_online_service: '官方在线客服',
    profile_service_desc: '24/7 全天候中英文即时解答',
    profile_settings: '通用设置',
    profile_logout: '退出登录',
    profile_login_now: '立即登录 / 注册',
    // Invite
    invite_page_title: '邀请好友享返佣',
    invite_share_poster: '生成分享海报',
    invite_banner_tag: 'BYBIT PARTNER PROGRAM 全球合伙人',
    invite_banner_heading: '邀请好友注册办卡\n坐享最高 30% 永久返佣',
    invite_banner_sub: '好友充值交易或开卡，佣金实时结算秒到账！',
    invite_my_code: '我的专属邀请码',
    invite_my_link: '专属推广链接',
    invite_copy_code: '复制邀请码',
    invite_copy_link: '复制链接',
    invite_total_rebate: '累计返佣收益',
    invite_total_users: '成功邀请人数',
    invite_rebate_rate: '当前返佣比例',
    invite_tier_progress: '阶梯返佣升级进度',
    invite_records_title: '最新返佣流水明细',
    // Welfare
    welfare_page_title: '福利中心',
    welfare_banner_title: '新手专属迎新福利',
    welfare_banner_desc: '完成新手任务，立领高达 12 USDT 奖励',
    welfare_claimed: '已领取',
    welfare_claim: '立即领取',
    // Notifications
    notif_page_title: '消息与公告中心',
    notif_mark_all: '全部已读',
    // Common
    common_back: '返回',
    common_confirm: '确认',
    common_cancel: '取消',
    common_copy: '复制',
    common_copied: '已复制到剪贴板',
    common_all: '全部',
    common_close: '关闭',
  },
  'zh-TW': {
    nav_home: '首頁',
    nav_exchange: '閃兌',
    nav_cards: '預付卡',
    nav_profile: '我的',
    nav_assets: '資產',
    action_deposit: '充值',
    action_withdraw: '提現',
    action_transfer: '內部轉賬',
    action_scan: '掃一掃',
    action_receive: '收款碼',
    action_staking: '質押理財',
    action_chat: '客服',
    action_trx: 'TRX加速',
    total_assets: '總資產折合',
    notice: '公告',
    notice_content: '系統升級及各幣種節點優化說明',
    quick_functions: '快捷服務',
    hot_assets: '熱門資產',
    my_cards: '我的卡包',
    apply_card: '立即辦卡',
    login_register: '登錄 / 註冊',
    logout: '退出登錄',
    lang_title: '語言切換',
    switch_lang: '選擇語言',
    guest: '訪客',
    online_cs: '在線客服',
    // Cards
    cards_list_title: '卡片列表',
    cards_tab_zone: '卡片專區',
    cards_tab_mycards: '我的卡片',
    cards_open_fee: '開卡費',
    cards_topup_rate: '充值費率',
    cards_settle_cur: '結算幣種',
    cards_type: '卡片類型',
    cards_virtual: '虛擬卡',
    cards_physical: '實體卡',
    cards_apply_btn_1u: '1USDT 申請卡',
    cards_apply_btn_10u: '10 USDT 申請卡',
    cards_apply_title: '申請 Bybit Mastercard',
    cards_benefits_title: '卡片核心權益',
    cards_benefit_0fee: '0% 充值手續費',
    cards_benefit_global: '全球 1.3 億商戶',
    cards_benefit_applepay: '支持 Apple Pay / 3DS',
    cards_benefit_reserve: '資產 100% 準備金',
    cards_holder_name: '卡面持卡人姓名 (英文或拼音)',
    cards_holder_name_placeholder: '例如: ZHANG WEI 或 JOHN DOE',
    cards_shipping_addr: '實體卡郵寄地址',
    cards_pay_method: '扣繳方式：',
    cards_pay_wallet_usdt: '錢包 USDT 餘額即時扣除',
    cards_available_bal: '可用 USDT 餘額：',
    cards_cost_fee: '開卡工本費：',
    cards_agree_terms: '我已完整閱讀並同意《Bybit 卡持卡人服務合約》、《全球反洗錢與合規條款》及《個人隱私安全保護協定》。',
    cards_confirm_apply: '確認開卡並啟用',
    cards_applying: '正在為您開卡...',
    cards_available_limit: '卡片可用額度',
    cards_freeze: '凍結卡片',
    cards_unfreeze: '解凍卡片',
    cards_frozen_status: '已凍結',
    cards_no_cards: '尚無已啟用的卡片',
    cards_go_apply: '前往申領',
    // Swap
    swap_title: '極速閃兌',
    swap_subtitle: '0 手續費 · 極速成交 · 深度聚合',
    swap_pay: '支付',
    swap_get: '獲得 (預計)',
    swap_balance: '可用餘額:',
    swap_max: '最大',
    swap_reference_rate: '參考匯率',
    swap_fee_label: '交易手續費',
    swap_fee_free: '0 手續費 (免手續費)',
    swap_slippage: '滑點保護',
    swap_confirm_btn: '立即閃兌',
    swap_processing: '正在極速撮合...',
    // Profile
    profile_my_equity: '我的總資產折合 (USD)',
    profile_hidden: '已隱藏',
    profile_vip_tag: 'VIP 尊享用戶',
    profile_uid: 'UID',
    profile_kyc_passed: '已實名認證',
    profile_invite_friends: '邀請好友',
    profile_invite_desc: '享最高 30% 永久返傭',
    profile_welfare_center: '福利中心',
    profile_welfare_desc: '領 $12 新人開卡大禮包',
    profile_lang_setting: '語言與地區',
    profile_online_service: '官方在線客服',
    profile_service_desc: '24/7 全天候中英文即時解答',
    profile_settings: '通用設置',
    profile_logout: '退出登錄',
    profile_login_now: '立即登錄 / 註冊',
    // Invite
    invite_page_title: '邀請好友享返傭',
    invite_share_poster: '生成分享海報',
    invite_banner_tag: 'BYBIT PARTNER PROGRAM 全球合夥人',
    invite_banner_heading: '邀請好友註冊辦卡\n坐享最高 30% 永久返傭',
    invite_banner_sub: '好友充值交易或開卡，傭金即時結算秒到賬！',
    invite_my_code: '我的專屬邀請碼',
    invite_my_link: '專屬推廣鏈接',
    invite_copy_code: '複製邀請碼',
    invite_copy_link: '複製鏈接',
    invite_total_rebate: '累計返傭收益',
    invite_total_users: '成功邀請人數',
    invite_rebate_rate: '當前返傭比例',
    invite_tier_progress: '階梯返傭升級進度',
    invite_records_title: '最新返傭流水明細',
    // Welfare
    welfare_page_title: '福利中心',
    welfare_banner_title: '新手專屬迎新福利',
    welfare_banner_desc: '完成新手任務，立領高達 12 USDT 獎勵',
    welfare_claimed: '已領取',
    welfare_claim: '立即領取',
    // Notifications
    notif_page_title: '消息與公告中心',
    notif_mark_all: '全部已讀',
    // Common
    common_back: '返回',
    common_confirm: '確認',
    common_cancel: '取消',
    common_copy: '複製',
    common_copied: '已複製到剪貼簿',
    common_all: '全部',
    common_close: '關閉',
  },
  'en': {
    nav_home: 'Home',
    nav_exchange: 'Swap',
    nav_cards: 'Cards',
    nav_profile: 'Profile',
    nav_assets: 'Assets',
    action_deposit: 'Deposit',
    action_withdraw: 'Withdraw',
    action_transfer: 'Transfer',
    action_scan: 'Scan',
    action_receive: 'Receive',
    action_staking: 'Earn',
    action_chat: 'Support',
    action_trx: 'TRX Boost',
    total_assets: 'Total Balance',
    notice: 'Notice',
    notice_content: 'System upgrade and node optimization announcement',
    quick_functions: 'Quick Services',
    hot_assets: 'Top Assets',
    my_cards: 'My Cards',
    apply_card: 'Apply Card',
    login_register: 'Log In / Sign Up',
    logout: 'Log Out',
    lang_title: 'Language Switcher',
    switch_lang: 'Select Language',
    guest: 'Guest',
    online_cs: 'Online Support',
    // Cards
    cards_list_title: 'Cards',
    cards_tab_zone: 'Card Market',
    cards_tab_mycards: 'My Cards',
    cards_open_fee: 'Issuance Fee',
    cards_topup_rate: 'Top-up Fee',
    cards_settle_cur: 'Settlement',
    cards_type: 'Card Type',
    cards_virtual: 'Virtual Card',
    cards_physical: 'Physical Card',
    cards_apply_btn_1u: 'Apply for 1 USDT',
    cards_apply_btn_10u: 'Apply for 10 USDT',
    cards_apply_title: 'Apply Bybit Mastercard',
    cards_benefits_title: 'Core Card Benefits',
    cards_benefit_0fee: '0% Top-up Fee',
    cards_benefit_global: '130M+ Merchants Worldwide',
    cards_benefit_applepay: 'Supports Apple Pay / 3DS',
    cards_benefit_reserve: '100% Reserve Assets',
    cards_holder_name: 'Cardholder Name (English)',
    cards_holder_name_placeholder: 'e.g. JOHN DOE',
    cards_shipping_addr: 'Shipping Address',
    cards_pay_method: 'Payment Method:',
    cards_pay_wallet_usdt: 'Direct USDT Wallet Deduction',
    cards_available_bal: 'Available USDT Balance:',
    cards_cost_fee: 'Card Issuance Fee:',
    cards_agree_terms: 'I have read and agree to the Bybit Cardholder Agreement and Privacy Policy.',
    cards_confirm_apply: 'Confirm & Activate Card',
    cards_applying: 'Activating your card...',
    cards_available_limit: 'Available Limit',
    cards_freeze: 'Freeze Card',
    cards_unfreeze: 'Unfreeze Card',
    cards_frozen_status: 'Frozen',
    cards_no_cards: 'No active cards yet',
    cards_go_apply: 'Apply Now',
    // Swap
    swap_title: 'Instant Swap',
    swap_subtitle: '0 Fees · Instant Settlement · Best Rates',
    swap_pay: 'You Pay',
    swap_get: 'You Receive (Est.)',
    swap_balance: 'Balance:',
    swap_max: 'MAX',
    swap_reference_rate: 'Exchange Rate',
    swap_fee_label: 'Trading Fee',
    swap_fee_free: '0 Fees (Free)',
    swap_slippage: 'Slippage Protection',
    swap_confirm_btn: 'Swap Now',
    swap_processing: 'Processing swap...',
    // Profile
    profile_my_equity: 'Total Net Value (USD)',
    profile_hidden: 'Hidden',
    profile_vip_tag: 'VIP Member',
    profile_uid: 'UID',
    profile_kyc_passed: 'Verified',
    profile_invite_friends: 'Invite Friends',
    profile_invite_desc: 'Up to 30% lifetime rebate',
    profile_welfare_center: 'Rewards Hub',
    profile_welfare_desc: 'Claim $12 Welcome Gift',
    profile_lang_setting: 'Language & Region',
    profile_online_service: '24/7 Live Support',
    profile_service_desc: '24/7 Instant multilingual help',
    profile_settings: 'Settings',
    profile_logout: 'Log Out',
    profile_login_now: 'Log In / Register',
    // Invite
    invite_page_title: 'Referral Program',
    invite_share_poster: 'Share Poster',
    invite_banner_tag: 'BYBIT PARTNER PROGRAM',
    invite_banner_heading: 'Invite Friends & Earn\nUp to 30% Lifetime Rebate',
    invite_banner_sub: 'Real-time settlement for friend deposits and card transactions!',
    invite_my_code: 'My Referral Code',
    invite_my_link: 'Referral Link',
    invite_copy_code: 'Copy Code',
    invite_copy_link: 'Copy Link',
    invite_total_rebate: 'Total Earnings',
    invite_total_users: 'Invited Friends',
    invite_rebate_rate: 'Commission Rate',
    invite_tier_progress: 'Tier Progress',
    invite_records_title: 'Recent Earnings',
    // Welfare
    welfare_page_title: 'Rewards Hub',
    welfare_banner_title: 'Newcomer Exclusive Rewards',
    welfare_banner_desc: 'Complete tasks to earn up to 12 USDT',
    welfare_claimed: 'Claimed',
    welfare_claim: 'Claim Now',
    // Notifications
    notif_page_title: 'Notifications & Notices',
    notif_mark_all: 'Mark All Read',
    // Common
    common_back: 'Back',
    common_confirm: 'Confirm',
    common_cancel: 'Cancel',
    common_copy: 'Copy',
    common_copied: 'Copied to clipboard',
    common_all: 'All',
    common_close: 'Close',
  },
  'ja': {
    nav_home: 'ホーム',
    nav_exchange: 'スワップ',
    nav_cards: 'カード',
    nav_profile: 'マイページ',
    nav_assets: '資産',
    action_deposit: '入金',
    action_withdraw: '出金',
    action_transfer: '振替',
    action_scan: 'スキャン',
    action_receive: '受取',
    action_staking: '運用',
    action_chat: 'サポート',
    action_trx: 'TRX加速',
    total_assets: '総資産額',
    notice: 'お知らせ',
    notice_content: 'システムアップグレード及びノード最適化のお知らせ',
    quick_functions: 'クイックサービス',
    hot_assets: '人気暗号資産',
    my_cards: '保有カード',
    apply_card: 'カード発行',
    login_register: 'ログイン / 新規登録',
    logout: 'ログアウト',
    lang_title: '言語切替',
    switch_lang: '言語を選択',
    guest: 'ゲスト',
    online_cs: 'カスタマーサポート',
  },
  'ko': {
    nav_home: '홈',
    nav_exchange: '스왑',
    nav_cards: '카드',
    nav_profile: '마이',
    nav_assets: '자산',
    action_deposit: '입금',
    action_withdraw: '출금',
    action_transfer: '내부이체',
    action_scan: '스캔',
    action_receive: 'QR받기',
    action_staking: '재테크',
    action_chat: '고객센터',
    action_trx: 'TRX가속',
    total_assets: '총 자산 환산',
    notice: '공지사항',
    notice_content: '시스템 업그레이드 및 노드 최적화 안내',
    quick_functions: '빠른 서비스',
    hot_assets: '인기 자산',
    my_cards: '내 카드',
    apply_card: '카드 신청',
    login_register: '로그인 / 회원가입',
    logout: '로그아웃',
    lang_title: '언어 설정',
    switch_lang: '언어 선택',
    guest: '게스트',
    online_cs: '온라인 상담',
  },
  'vi': {
    nav_home: 'Trang chủ',
    nav_exchange: 'Hoán đổi',
    nav_cards: 'Thẻ Bybit',
    nav_profile: 'Cá nhân',
    nav_assets: 'Tài sản',
    action_deposit: 'Nạp tiền',
    action_withdraw: 'Rút tiền',
    action_transfer: 'Chuyển nội bộ',
    action_scan: 'Quét QR',
    action_receive: 'Nhận tiền',
    action_staking: 'Kiếm lời',
    action_chat: 'Hỗ trợ',
    action_trx: 'Tăng tốc TRX',
    total_assets: 'Tổng tài sản quy đổi',
    notice: 'Thông báo',
    notice_content: 'Nâng cấp hệ thống và tối ưu hóa node mạng lưới',
    quick_functions: 'Dịch vụ nhanh',
    hot_assets: 'Tài sản phổ biến',
    my_cards: 'Thẻ của tôi',
    apply_card: 'Mở thẻ ngay',
    login_register: 'Đăng nhập / Đăng ký',
    logout: 'Đăng xuất',
    lang_title: 'Chuyển đổi ngôn ngữ',
    switch_lang: 'Chọn ngôn ngữ',
    guest: 'Khách',
    online_cs: 'Hỗ trợ trực tuyến',
  },
  'ar': {
    nav_home: 'الرئيسية',
    nav_exchange: 'تبادل',
    nav_cards: 'البطاقات',
    nav_profile: 'حسابي',
    nav_assets: 'الأصول',
    action_deposit: 'إيداع',
    action_withdraw: 'سحب',
    action_transfer: 'تحويل داخلي',
    action_scan: 'مسح QR',
    action_receive: 'استلام',
    action_staking: 'أرباح',
    action_chat: 'الدعم',
    action_trx: 'تسريع TRX',
    total_assets: 'إجمالي الأصول المقدرة',
    notice: 'إشعار',
    notice_content: 'ترقية النظام وتحسين عقد الشبكة',
    quick_functions: 'خدمات سريعة',
    hot_assets: 'أبرز الأصول',
    my_cards: 'بطاقاتي',
    apply_card: 'طلب بطاقة',
    login_register: 'تسجيل الدخول / إنشاء حساب',
    logout: 'تسجيل الخروج',
    lang_title: 'تبديل اللغة',
    switch_lang: 'اختر اللغة',
    guest: 'زائر',
    online_cs: 'خدمة العملاء',
  },
  'id': {
    nav_home: 'Beranda',
    nav_exchange: 'Tukar',
    nav_cards: 'Kartu',
    nav_profile: 'Profil',
    nav_assets: 'Aset',
    action_deposit: 'Setor',
    action_withdraw: 'Tarik',
    action_transfer: 'Transfer Internal',
    action_scan: 'Pindai',
    action_receive: 'Terima QR',
    action_staking: 'Investasi',
    action_chat: 'Bantuan',
    action_trx: 'TRX Turbo',
    total_assets: 'Total Estimasi Saldo',
    notice: 'Pengumuman',
    notice_content: 'Pembaruan sistem dan optimalisasi node jaringan',
    quick_functions: 'Layanan Cepat',
    hot_assets: 'Aset Populer',
    my_cards: 'Kartu Saya',
    apply_card: 'Buka Kartu',
    login_register: 'Masuk / Daftar',
    logout: 'Keluar Akun',
    lang_title: 'Ganti Bahasa',
    switch_lang: 'Pilih Bahasa',
    guest: 'Tamu',
    online_cs: 'Layanan Pelanggan',
  },
  'ru': {
    nav_home: 'Главная',
    nav_exchange: 'Обмен',
    nav_cards: 'Карты',
    nav_profile: 'Профиль',
    nav_assets: 'Активы',
    action_deposit: 'Депозит',
    action_withdraw: 'Вывод',
    action_transfer: 'Перевод',
    action_scan: 'Сканировать',
    action_receive: 'Получить QR',
    action_staking: 'Стейкинг',
    action_chat: 'Поддержка',
    action_trx: 'TRX Разгон',
    total_assets: 'Общий баланс',
    notice: 'Объявление',
    notice_content: 'Обновление системы и оптимизация сетевых нод',
    quick_functions: 'Быстрые сервисы',
    hot_assets: 'Популярные активы',
    my_cards: 'Мои карты',
    apply_card: 'Оформить карту',
    login_register: 'Вход / Регистрация',
    logout: 'Выйти',
    lang_title: 'Смена языка',
    switch_lang: 'Выберите язык',
    guest: 'Гость',
    online_cs: 'Онлайн поддержка',
  },
  'pt': {
    nav_home: 'Início',
    nav_exchange: 'Troca',
    nav_cards: 'Cartões',
    nav_profile: 'Perfil',
    nav_assets: 'Ativos',
    action_deposit: 'Depositar',
    action_withdraw: 'Sacar',
    action_transfer: 'Transferência',
    action_scan: 'Escanear',
    action_receive: 'Receber',
    action_staking: 'Rendimentos',
    action_chat: 'Suporte',
    action_trx: 'Acelerar TRX',
    total_assets: 'Saldo Total Estimado',
    notice: 'Aviso',
    notice_content: 'Atualização do sistema e otimização dos nós de rede',
    quick_functions: 'Serviços Rápidos',
    hot_assets: 'Ativos Populares',
    my_cards: 'Meus Cartões',
    apply_card: 'Solicitar Cartão',
    login_register: 'Entrar / Cadastrar',
    logout: 'Sair da Conta',
    lang_title: 'Mudar Idioma',
    switch_lang: 'Selecionar Idioma',
    guest: 'Visitante',
    online_cs: 'Suporte Online',
  },
  'tr': {
    nav_home: 'Ana Sayfa',
    nav_exchange: 'Takas',
    nav_cards: 'Kartlar',
    nav_profile: 'Profil',
    nav_assets: 'Varlıklar',
    action_deposit: 'Yatır',
    action_withdraw: 'Çek',
    action_transfer: 'Dahili Transfer',
    action_scan: 'Tara',
    action_receive: 'Al (QR)',
    action_staking: 'Kazan',
    action_chat: 'Destek',
    action_trx: 'TRX Hızlandır',
    total_assets: 'Toplam Tahmini Bakiye',
    notice: 'Duyuru',
    notice_content: 'Sistem güncellemesi ve ağ düğümü optimizasyonu',
    quick_functions: 'Hızlı İşlemler',
    hot_assets: 'Popüler Varlıklar',
    my_cards: 'Kartlarım',
    apply_card: 'Kart Başvurusu',
    login_register: 'Giriş Yap / Kaydol',
    logout: 'Çıkış Yap',
    lang_title: 'Dil Değiştir',
    switch_lang: 'Dil Seçin',
    guest: 'Misafir',
    online_cs: 'Canlı Destek',
  },
  'de': {
    nav_home: 'Startseite',
    nav_exchange: 'Tausch',
    nav_cards: 'Karten',
    nav_profile: 'Profil',
    nav_assets: 'Assets',
    action_deposit: 'Einzahlen',
    action_withdraw: 'Auszahlen',
    action_transfer: 'Transfer',
    action_scan: 'Scannen',
    action_receive: 'Empfangen',
    action_staking: 'Staking',
    action_chat: 'Support',
    action_trx: 'TRX Turbo',
    total_assets: 'Gesamtguthaben',
    notice: 'Hinweis',
    notice_content: 'System-Upgrade und Node-Optimierungsmitteilung',
    quick_functions: 'Schnelldienste',
    hot_assets: 'Beliebte Assets',
    my_cards: 'Meine Karten',
    apply_card: 'Karte beantragen',
    login_register: 'Anmelden / Registrieren',
    logout: 'Abmelden',
    lang_title: 'Sprachauswahl',
    switch_lang: 'Sprache wählen',
    guest: 'Gast',
    online_cs: 'Kundenservice',
  },
  'hi': {
    nav_home: 'होम',
    nav_exchange: 'विनिमय',
    nav_cards: 'कार्ड्स',
    nav_profile: 'प्रोफ़ाइल',
    nav_assets: 'संपत्ति',
    action_deposit: 'जमा करें',
    action_withdraw: 'निकासी',
    action_transfer: 'आंतरिक ट्रांसफर',
    action_scan: 'स्कैन',
    action_receive: 'प्राप्त करें',
    action_staking: 'कमाई',
    action_chat: 'सहायता',
    action_trx: 'TRX बूस्ट',
    total_assets: 'कुल अनुमानित संपत्ति',
    notice: 'सूचना',
    notice_content: 'सिस्टम अपग्रेड और नेटवर्क नोड ऑप्टिमाइज़ेशन',
    quick_functions: 'त्वरित सेवाएं',
    hot_assets: 'शीर्ष संपत्तियां',
    my_cards: 'मेरे कार्ड',
    apply_card: 'कार्ड आवेदन',
    login_register: 'लॉग इन / साइन अप',
    logout: 'लॉग आउट',
    lang_title: 'भाषा बदलें',
    switch_lang: 'भाषा चुनें',
    guest: 'अतिथि',
    online_cs: 'ऑनलाइन ग्राहक सेवा',
  },
  'es': {
    nav_home: 'Inicio',
    nav_exchange: 'Canjear',
    nav_cards: 'Tarjetas',
    nav_profile: 'Perfil',
    nav_assets: 'Activos',
    action_deposit: 'Depositar',
    action_withdraw: 'Retirar',
    action_transfer: 'Transferir',
    action_scan: 'Escanear',
    action_receive: 'Recibir',
    action_staking: 'Ganancias',
    action_chat: 'Soporte',
    action_trx: 'Acelerar TRX',
    total_assets: 'Balance Total Estimado',
    notice: 'Aviso',
    notice_content: 'Actualización del sistema y optimización de nodos de red',
    quick_functions: 'Servicios Rápidos',
    hot_assets: 'Activos Populares',
    my_cards: 'Mis Tarjetas',
    apply_card: 'Solicitar Tarjeta',
    login_register: 'Iniciar Sesión / Registro',
    logout: 'Cerrar Sesión',
    lang_title: 'Cambiar Idioma',
    switch_lang: 'Seleccionar Idioma',
    guest: 'Invitado',
    online_cs: 'Atención al Cliente',
  },
};

interface LanguageContextType {
  currentLang: Language;
  setLanguageByCode: (code: string) => void;
  resetToSystemLanguage: () => void;
  isSystemAuto: boolean;
  systemDetectedLang: Language;
  t: (key: string, defaultText?: string) => string;
  languages: Language[];
}

export const detectSystemLanguageCode = (): string => {
  if (typeof navigator === 'undefined') return 'zh-CN';

  const candidates: string[] = [];
  if (navigator.languages && navigator.languages.length > 0) {
    candidates.push(...navigator.languages);
  }
  if (navigator.language) {
    candidates.push(navigator.language);
  }

  for (const raw of candidates) {
    if (!raw) continue;
    const lower = raw.toLowerCase().trim();

    // Chinese variations
    if (lower === 'zh-tw' || lower === 'zh-hk' || lower === 'zh-mo' || lower.includes('hant')) {
      return 'zh-TW';
    }
    if (lower === 'zh-cn' || lower === 'zh-sg' || lower.includes('hans') || lower === 'zh') {
      return 'zh-CN';
    }

    // Exact matches or startsWith
    const exact = SUPPORTED_LANGUAGES.find(
      (l) => l.code.toLowerCase() === lower || lower.startsWith(l.code.toLowerCase() + '-')
    );
    if (exact) return exact.code;

    // Primary tag match (e.g. "en-GB" -> "en", "ja-JP" -> "ja")
    const primary = lower.split('-')[0];
    const prefixMatch = SUPPORTED_LANGUAGES.find((l) => l.code.toLowerCase() === primary);
    if (prefixMatch) return prefixMatch.code;
  }

  return 'zh-CN';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSystemAuto, setIsSystemAuto] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('bybit_app_lang_mode');
      return stored ? stored === 'auto' : true;
    } catch {
      return true;
    }
  });

  const [currentCode, setCurrentCode] = useState<string>(() => {
    try {
      const storedMode = localStorage.getItem('bybit_app_lang_mode');
      const storedCode = localStorage.getItem('bybit_app_language');
      if (storedMode === 'manual' && storedCode && SUPPORTED_LANGUAGES.some((l) => l.code === storedCode)) {
        return storedCode;
      }
    } catch {
      // fallback
    }
    return detectSystemLanguageCode();
  });

  // Keep track of detected system language
  const [systemDetectedCode, setSystemDetectedCode] = useState<string>(detectSystemLanguageCode());

  // Listen to system language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      const detected = detectSystemLanguageCode();
      setSystemDetectedCode(detected);
      if (isSystemAuto) {
        setCurrentCode(detected);
      }
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, [isSystemAuto]);

  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentCode) || SUPPORTED_LANGUAGES[0];

  const systemDetectedLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === systemDetectedCode) || SUPPORTED_LANGUAGES[0];

  const setLanguageByCode = (code: string) => {
    if (SUPPORTED_LANGUAGES.some((l) => l.code === code)) {
      setCurrentCode(code);
      setIsSystemAuto(false);
      try {
        localStorage.setItem('bybit_app_language', code);
        localStorage.setItem('bybit_app_lang_mode', 'manual');
      } catch {
        // ignore
      }
    }
  };

  const resetToSystemLanguage = () => {
    const detected = detectSystemLanguageCode();
    setSystemDetectedCode(detected);
    setCurrentCode(detected);
    setIsSystemAuto(true);
    try {
      localStorage.setItem('bybit_app_lang_mode', 'auto');
      localStorage.removeItem('bybit_app_language');
    } catch {
      // ignore
    }
  };

  const t = (key: string, defaultText?: string): string => {
    const langDict = TRANSLATIONS[currentCode] || TRANSLATIONS['zh-CN'];
    if (langDict && langDict[key]) return langDict[key];
    const fallbackDict = TRANSLATIONS['zh-TW'] || TRANSLATIONS['zh-CN'];
    if (fallbackDict && fallbackDict[key]) return fallbackDict[key];
    return defaultText !== undefined ? defaultText : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setLanguageByCode,
        resetToSystemLanguage,
        isSystemAuto,
        systemDetectedLang,
        t,
        languages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

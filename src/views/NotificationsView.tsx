import React, { useState } from 'react';
import { ChevronLeft, Bell, CheckCircle2, Megaphone, Wallet, Sparkles, Trash2 } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsViewProps {
  onBack: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onToast: (msg: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  onBack,
  notifications,
  onMarkAllRead,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'announcement' | 'wallet' | 'promo'>('all');
  const [readIds, setReadIds] = useState<{ [key: string]: boolean }>({});

  const handleMarkAll = () => {
    const allIds: { [key: string]: boolean } = {};
    notifications.forEach((n) => {
      allIds[n.id] = true;
    });
    setReadIds(allIds);
    onMarkAllRead();
    onToast('已將所有通知標記為已讀');
  };

  const handleItemClick = (id: string, title: string) => {
    setReadIds((prev) => ({ ...prev, [id]: true }));
    onToast(`已查看：${title}`);
  };

  const getFilteredNotifications = () => {
    if (activeTab === 'announcement') {
      return notifications.filter((n) => n.id.includes('ann') || n.title.includes('系統') || n.title.includes('公告'));
    }
    if (activeTab === 'wallet') {
      return notifications.filter((n) => n.title.includes('充值') || n.title.includes('資產') || n.title.includes('卡'));
    }
    if (activeTab === 'promo') {
      return notifications.filter((n) => n.title.includes('福利') || n.title.includes('邀請') || n.title.includes('禮包') || n.title.includes('返傭'));
    }
    return notifications;
  };

  const filteredList = getFilteredNotifications();

  return (
    <div className="absolute inset-0 z-40 bg-[#F8F9FA] flex flex-col animate-in slide-in-from-right duration-200 select-none">
      {/* Top Header Bar */}
      <div className="w-full px-4 pt-3 pb-3 flex items-center justify-between border-b border-neutral-100 bg-white shrink-0">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-neutral-800 hover:text-black active:scale-95 transition cursor-pointer"
          title="返回"
        >
          <ChevronLeft size={24} className="stroke-[2.2]" />
        </button>

        <div className="flex items-center space-x-1.5">
          <Bell size={19} className="text-[#FF6B00]" />
          <h2 className="text-[17px] font-bold text-neutral-900 tracking-tight">
            消息與公告中心
          </h2>
        </div>

        <button
          onClick={handleMarkAll}
          className="text-xs text-[#FF6B00] font-bold hover:underline py-1 cursor-pointer"
        >
          全部已讀
        </button>
      </div>

      {/* Tabs Filter */}
      <div className="shrink-0 px-4 py-2 bg-white border-b border-neutral-100 flex space-x-2">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#FF6B00] text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          全部
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('announcement')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'announcement'
              ? 'bg-[#FF6B00] text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          官方公告
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('wallet')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'wallet'
              ? 'bg-[#FF6B00] text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          賬戶動態
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('promo')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'promo'
              ? 'bg-[#FF6B00] text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          活動福利
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {filteredList.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center text-neutral-400">
            <Bell size={40} className="stroke-[1.5] text-neutral-300 mb-2" />
            <p className="text-xs">暫無此類別消息</p>
          </div>
        ) : (
          filteredList.map((item) => {
            const isRead = readIds[item.id];
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id, item.title)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white shadow-2xs hover:border-orange-200 ${
                  isRead ? 'border-neutral-200/80 opacity-70' : 'border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    {!isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#FF6B00] shrink-0" />
                    )}
                    <span className="text-xs font-bold text-neutral-900 leading-snug">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-medium shrink-0 ml-2">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed pl-4">
                  {item.content}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

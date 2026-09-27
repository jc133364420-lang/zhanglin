import React from 'react';
import { TabType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const { t } = useLanguage();
  const tabs: { id: TabType; label: string; icon: (active: boolean) => React.ReactNode }[] = [
    {
      id: 'home',
      label: t('nav_home'),
      icon: (active) => (
        <svg
          className={`w-6 h-6 transition-transform ${active ? 'scale-105' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? '2.3' : '1.8'}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
          <polyline points="9 21 9 12 15 12 15 21" />
        </svg>
      ),
    },
    {
      id: 'exchange',
      label: t('nav_exchange'),
      icon: (active) => (
        <svg
          className={`w-6 h-6 transition-transform ${active ? 'scale-105' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? '2.3' : '1.8'}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 10h14l-4-4" />
          <path d="M17 14H3l4 4" />
        </svg>
      ),
    },
    {
      id: 'cards',
      label: t('nav_cards'),
      icon: (active) => (
        <svg
          className={`w-6 h-6 transition-transform ${active ? 'scale-105' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? '2.3' : '1.8'}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="5" width="20" height="14" rx="3" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <circle cx="6" cy="15" r="1.2" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'profile',
      label: t('nav_profile'),
      icon: (active) => (
        <svg
          className={`w-6 h-6 transition-transform ${active ? 'scale-105' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? '2.3' : '1.8'}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-t border-neutral-200/80 px-4 pt-1.5 pb-0.5 flex justify-around items-center select-none z-30">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center py-1 cursor-pointer transition-colors active:scale-95 ${
              isActive ? 'text-[#FF6B00]' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <div className="relative">
              {tab.icon(isActive)}
              {tab.id === 'cards' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EF4444] rounded-full animate-pulse" />
              )}
            </div>
            <span className={`text-[11px] mt-1 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

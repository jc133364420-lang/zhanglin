import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface WelfareCenterViewProps {
  onBack: () => void;
  onToast: (msg: string) => void;
}

export const WelfareCenterView: React.FC<WelfareCenterViewProps> = ({ onBack, onToast }) => {
  return (
    <div className="absolute inset-0 z-40 bg-[#F8F9FA] flex flex-col animate-in slide-in-from-right duration-200 select-none">
      {/* Top Header Bar */}
      <div className="w-full px-4 pt-3 pb-3 flex items-center justify-between border-b border-neutral-100/60 bg-white/70 backdrop-blur-xs">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-neutral-800 hover:text-black active:scale-95 transition cursor-pointer"
          title="返回"
        >
          <ChevronLeft size={24} className="stroke-[2.2]" />
        </button>

        {/* Center Title */}
        <h2 className="text-[17px] font-semibold text-neutral-800 tracking-tight">
          福利中心
        </h2>

        {/* Top Right Activity Records Box Icon */}
        <button
          onClick={() => onToast('目前無已領取或過期的活動記錄')}
          className="p-1 -mr-1 text-neutral-800 hover:text-black active:scale-95 transition cursor-pointer"
          title="領取記錄"
        >
          <svg
            className="w-5 h-5 text-neutral-800"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Box lid & base */}
            <path d="M4 7h16" />
            <path d="M5 7l1.5 12a2 2 0 0 0 2 1.8h7a2 2 0 0 0 2-1.8L19 7" />
            <path d="M9 11h6" />
            <path d="M7 4h10l1 3H6l1-3z" />
          </svg>
        </button>
      </div>

      {/* Main Content Area: Centered Empty State Graphic */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-16 px-6">
        {/* Empty State Illustration */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Top-left small orange sparkle */}
          <div className="absolute top-1 left-7 w-2.5 h-2.5 rotate-45 border border-[#FF8A00]" />

          {/* Glowing Orange Gift Box */}
          <div className="relative">
            <svg
              className="w-20 h-20 drop-shadow-[0_8px_16px_rgba(255,107,0,0.22)]"
              viewBox="0 0 80 80"
              fill="none"
            >
              <defs>
                <linearGradient id="giftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFA043" />
                  <stop offset="100%" stopColor="#FF6B00" />
                </linearGradient>
                <linearGradient id="lidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB366" />
                  <stop offset="100%" stopColor="#FF7A1A" />
                </linearGradient>
              </defs>

              {/* Gift Box Base */}
              <rect x="18" y="32" width="44" height="34" rx="4" fill="url(#giftGradient)" />
              {/* Box vertical ribbon */}
              <rect x="36" y="32" width="8" height="34" fill="#FFFFFF" fillOpacity="0.32" />

              {/* Gift Box Lid */}
              <rect x="14" y="24" width="52" height="11" rx="3" fill="url(#lidGradient)" />
              {/* Lid vertical ribbon */}
              <rect x="36" y="24" width="8" height="11" fill="#FFFFFF" fillOpacity="0.4" />

              {/* Ribbon Bows on Top */}
              <path
                d="M38 24C34 16 23 17 25 22C27 26 36 24 38 24Z"
                fill="#FFD199"
                fillOpacity="0.9"
              />
              <path
                d="M42 24C46 16 57 17 55 22C53 26 44 24 42 24Z"
                fill="#FFD199"
                fillOpacity="0.9"
              />
              <circle cx="40" cy="24" r="3" fill="#FFE5CC" />
            </svg>

            {/* Alert Exclamation Circle Badge overlapping top right of gift box */}
            <div className="absolute -top-1 -right-2 w-10 h-10 rounded-full bg-[#FFE8D6] border-[2px] border-white shadow-xs flex items-center justify-center">
              <span className="text-[#FF6B00] font-bold text-lg select-none">!</span>
            </div>
          </div>
        </div>

        {/* Muted Text */}
        <p className="mt-4 text-[13.5px] text-neutral-400 font-normal tracking-wide">
          目前暫無任何活動
        </p>

        {/* Interactive refresh on tap */}
        <button
          onClick={() => onToast('已為您刷新，目前暫無最新福利活動')}
          className="mt-6 px-4 py-1.5 text-xs text-neutral-400 hover:text-neutral-600 bg-neutral-100/60 hover:bg-neutral-100 rounded-full transition cursor-pointer"
        >
          點擊刷新
        </button>
      </div>
    </div>
  );
};

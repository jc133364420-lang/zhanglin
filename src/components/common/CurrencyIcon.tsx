import React from 'react';

interface CurrencyIconProps {
  type: 'usdt' | 'trx' | 'pht' | 'php' | 'usd_ph' | 'hkd_ph' | string;
  size?: 'sm' | 'md' | 'lg';
}

export const CurrencyIcon: React.FC<CurrencyIconProps> = ({ type, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  }[size];

  switch (type.toLowerCase()) {
    case 'usdt':
      return (
        <div className={`${sizeClasses} rounded-full bg-[#26A17B] flex items-center justify-center text-white font-bold shadow-sm select-none`}>
          <span className="font-extrabold tracking-tighter scale-110">₮</span>
        </div>
      );
    case 'usdc':
      return (
        <div className={`${sizeClasses} rounded-full bg-[#2775CA] flex items-center justify-center text-white font-bold shadow-sm select-none`}>
          <span className="font-black text-xs tracking-tight">USDC</span>
        </div>
      );
    case 'trx':
      return (
        <div className={`${sizeClasses} rounded-full bg-[#EF0027] flex items-center justify-center text-white font-bold shadow-sm select-none`}>
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M2.5 4.5l19 3.5-12 13-7-16.5zm3.2 2.8l4.4 10.3 7.8-8.5-12.2-1.8z" />
          </svg>
        </div>
      );
    case 'pht':
      return (
        <div className={`${sizeClasses} rounded-full bg-[#0066FF] flex items-center justify-center text-white font-black shadow-sm select-none`}>
          <span className="text-[13px] font-black">₱</span>
        </div>
      );
    case 'php':
      return (
        <div className={`${sizeClasses} rounded-full overflow-hidden border border-neutral-200 flex items-center justify-center shadow-sm select-none relative bg-white`}>
          {/* Philippine flag styling */}
          <div className="w-full h-full flex flex-col">
            <div className="w-full h-1/2 bg-[#0038A8]" />
            <div className="w-full h-1/2 bg-[#CE1126]" />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-1/2 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white relative -left-1">
              <span className="absolute -left-3.5 -top-2 text-[8px] text-yellow-500 font-bold">★</span>
            </div>
          </div>
        </div>
      );
    case 'usd_ph':
      return (
        <div className={`${sizeClasses} rounded-full overflow-hidden border border-neutral-200 flex items-center justify-center shadow-sm select-none relative bg-[#B22234]`}>
          {/* US flag stripes & canton */}
          <div className="w-full h-full flex flex-col justify-between py-0.5">
            <div className="h-[2px] bg-white w-full" />
            <div className="h-[2px] bg-white w-full" />
            <div className="h-[2px] bg-white w-full" />
          </div>
          <div className="absolute top-0 left-0 w-4 h-4 bg-[#3C3B6E] flex items-center justify-center text-[7px] text-white">
            ★
          </div>
        </div>
      );
    case 'hkd_ph':
      return (
        <div className={`${sizeClasses} rounded-full bg-[#C8102E] flex items-center justify-center text-white shadow-sm select-none border border-neutral-200`}>
          <span className="text-xs">🌸</span>
        </div>
      );
    default:
      return (
        <div className={`${sizeClasses} rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 font-bold`}>
          $
        </div>
      );
  }
};

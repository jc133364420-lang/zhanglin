import React from 'react';

interface BybitLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showCardBadge?: boolean;
  dark?: boolean;
  className?: string;
}

export const BybitLogo: React.FC<BybitLogoProps> = ({
  size = 'md',
  showCardBadge = true,
  dark = false,
  className = '',
}) => {
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const barWidth = size === 'sm' ? 'w-[3.5px]' : size === 'lg' ? 'w-[6px]' : 'w-[4.5px]';
  const barHeight = size === 'sm' ? 'h-[14px]' : size === 'lg' ? 'h-[22px]' : 'h-[17px]';
  const barMargin = size === 'sm' ? 'mx-[1.5px]' : size === 'lg' ? 'mx-[3px]' : 'mx-[2px]';
  const badgeText = size === 'sm' ? 'text-[9px] px-1 py-0.5' : 'text-[10px] px-1.5 py-0.5';

  const textColor = dark ? 'text-white' : 'text-neutral-900';

  return (
    <div className={`flex items-center space-x-2 select-none ${className}`}>
      {/* Official Bybit wordmark with the iconic orange vertical bar */}
      <div className="flex items-center tracking-tight font-sans leading-none">
        <span className={`font-black ${textSize} ${textColor} tracking-[-0.035em]`}>
          BYB
        </span>
        {/* The iconic Bybit orange vertical bar from the brand logo */}
        <span
          className={`inline-block ${barWidth} ${barHeight} bg-[#F7A600] rounded-[1.5px] ${barMargin} self-center shadow-xs`}
          style={{ backgroundColor: '#F7A600' }}
        />
        <span className={`font-black ${textSize} ${textColor} tracking-[-0.035em]`}>
          T
        </span>
      </div>

      {showCardBadge && (
        <span
          className={`font-black tracking-wider uppercase rounded-md leading-none border shadow-2xs ${badgeText} ${
            dark
              ? 'text-[#F7A600] bg-neutral-800/80 border-orange-500/30'
              : 'text-[#F7A600] bg-[#FFF8EE] border-[#FFE7C4]'
          }`}
        >
          CARD
        </span>
      )}
    </div>
  );
};

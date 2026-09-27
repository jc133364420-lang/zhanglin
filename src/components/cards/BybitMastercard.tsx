import React from 'react';

interface BybitMastercardProps {
  holderName?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  showCvv?: boolean;
  className?: string;
  compact?: boolean;
}

export const BybitMastercard: React.FC<BybitMastercardProps> = ({
  holderName = 'BYBIT VIP USER',
  cardNumber,
  expiry = '09/30',
  cvv = '882',
  showCvv = false,
  className = '',
  compact = false,
}) => {
  return (
    <div
      className={`relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-lg border border-neutral-200/90 select-none bg-gradient-to-br from-[#FAFBFC] via-[#FFFFFF] to-[#EFF2F6] ${className}`}
    >
      {/* Background Sweeping Vector Wave Lines (Official Bybit Card Pattern) */}
      <svg
        viewBox="0 0 450 284"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <g stroke="#9CA3AF" strokeWidth="1.2" opacity="0.45">
          {/* Main sweeping upward arc group */}
          <path d="M-30 220 C 80 180, 160 120, 480 30" />
          <path d="M-30 230 C 85 188, 165 126, 480 38" />
          <path d="M-30 240 C 90 196, 170 132, 480 46" />
          <path d="M-30 250 C 95 204, 175 138, 480 54" />
          <path d="M-30 260 C 100 212, 180 144, 480 62" />
          <path d="M-30 270 C 105 220, 185 150, 480 70" />
          <path d="M-30 280 C 110 228, 190 156, 480 78" />

          {/* Center wavy crossing ribbon */}
          <path d="M-20 150 C 110 100, 190 110, 470 15" strokeWidth="1" opacity="0.4" />
          <path d="M-20 160 C 115 108, 195 116, 470 23" strokeWidth="1" opacity="0.4" />
          <path d="M-20 170 C 120 116, 200 122, 470 31" strokeWidth="1" opacity="0.4" />
          <path d="M-20 180 C 125 124, 205 128, 470 39" strokeWidth="1" opacity="0.4" />

          {/* Vertical descending curve bundle from top center to right */}
          <path d="M 230 -10 C 235 90, 260 180, 470 210" strokeWidth="1.4" opacity="0.5" />
          <path d="M 236 -10 C 241 94, 267 184, 470 218" strokeWidth="1.4" opacity="0.5" />
          <path d="M 242 -10 C 247 98, 274 188, 470 226" strokeWidth="1.4" opacity="0.5" />
          <path d="M 248 -10 C 253 102, 281 192, 470 234" strokeWidth="1.4" opacity="0.5" />
          <path d="M 254 -10 C 259 106, 288 196, 470 242" strokeWidth="1.4" opacity="0.5" />
          <path d="M 260 -10 C 265 110, 295 200, 470 250" strokeWidth="1.4" opacity="0.5" />

          {/* Lower faint echo waves */}
          <path d="M-10 190 C 140 170, 260 170, 470 170" strokeWidth="0.8" opacity="0.3" />
          <path d="M-10 205 C 140 182, 260 182, 470 182" strokeWidth="0.8" opacity="0.3" />
        </g>
      </svg>

      {/* Card Content Layer */}
      <div className="relative z-10 w-full h-full p-4 sm:p-5 flex flex-col justify-between">
        {/* Top Header: Official BYBIT Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              viewBox="0 0 135 34"
              className={compact ? 'h-5 w-auto' : 'h-6 sm:h-7 w-auto'}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* BYB */}
              <text
                x="0"
                y="27"
                fill="#000000"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="30"
                letterSpacing="1"
              >
                BYB
              </text>
              {/* Orange Bar for I */}
              <rect x="75" y="4" width="7" height="25" rx="1.5" fill="#FF8A00" />
              {/* T */}
              <text
                x="86"
                y="27"
                fill="#000000"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="30"
                letterSpacing="1"
              >
                T
              </text>
            </svg>
          </div>

          {/* Contactless waves & Chip indicator for full view */}
          {!compact && (
            <div className="flex items-center space-x-2 text-neutral-400">
              <svg className="w-4 h-4 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                <path d="M12 19a9 9 0 0 0 0-14" />
                <path d="M15.5 21.5a13 13 0 0 0 0-19" />
              </svg>
            </div>
          )}
        </div>

        {/* Middle Area: Card Number (if present or in detailed card mode) */}
        {cardNumber ? (
          <div className="my-auto py-1">
            <div
              className={`font-mono font-bold tracking-widest text-neutral-800 drop-shadow-2xs ${
                compact ? 'text-xs' : 'text-sm sm:text-base'
              }`}
            >
              {cardNumber}
            </div>
          </div>
        ) : (
          <div className="my-auto" />
        )}

        {/* Bottom Bar: Cardholder info on left, Mastercard Logo on right */}
        <div className="flex items-end justify-between">
          <div className="space-y-0.5">
            {!compact && (
              <div className="text-[8px] font-mono tracking-wider text-neutral-400 font-semibold uppercase">
                CARDHOLDER
              </div>
            )}
            <div
              className={`font-mono font-bold uppercase text-neutral-800 tracking-wider truncate max-w-[170px] ${
                compact ? 'text-[10px]' : 'text-xs'
              }`}
            >
              {holderName}
            </div>

            {!compact && expiry && (
              <div className="flex items-center space-x-3 text-[10px] text-neutral-500 font-mono pt-0.5">
                <div>
                  <span className="text-[8px] text-neutral-400 mr-1">EXP</span>
                  <span className="font-bold text-neutral-800">{expiry}</span>
                </div>
                {cvv && (
                  <div>
                    <span className="text-[8px] text-neutral-400 mr-1">CVV</span>
                    <span className="font-bold text-neutral-800">{showCvv ? cvv : '•••'}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Official Mastercard Interlocking Red and Orange Circles */}
          <div className="relative flex items-center shrink-0 mb-0.5">
            <svg
              viewBox="0 0 68 40"
              className={compact ? 'h-6 w-auto' : 'h-8 sm:h-9 w-auto'}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left Circle: Red */}
              <circle cx="20" cy="20" r="19" fill="#EB001B" />
              {/* Right Circle: Orange */}
              <circle cx="44" cy="20" r="19" fill="#F79E1B" />
              {/* Overlapping intersection */}
              <path
                d="M 32 6.6 A 19 19 0 0 1 32 33.4 A 19 19 0 0 1 32 6.6 Z"
                fill="#FF5F00"
              />
              {/* TM Symbol */}
              <text
                x="61"
                y="36"
                fill="#6B7280"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="6"
                fontWeight="700"
              >
                TM
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

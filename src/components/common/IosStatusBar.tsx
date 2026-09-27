import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

interface IosStatusBarProps {
  darkText?: boolean;
}

export const IosStatusBar: React.FC<IosStatusBarProps> = ({ darkText = true }) => {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const textColor = darkText ? 'text-neutral-900' : 'text-white';

  return (
    <div className={`w-full pt-2 pb-1 px-7 flex items-center justify-between text-xs font-semibold select-none z-30 ${textColor}`}>
      {/* Left: Time */}
      <span className="font-semibold tracking-tight text-[14px]">{time}</span>

      {/* Center: Dynamic Island Pill */}
      <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 space-x-1.5 shadow-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-[#121212] border border-neutral-800 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#1e293b]" />
        </div>
      </div>

      {/* Right: Icons (Signal, Wifi, Battery) */}
      <div className="flex items-center space-x-2">
        <div className="flex items-end space-x-0.5 h-3">
          <div className="w-[3px] h-1.5 bg-current rounded-xs" />
          <div className="w-[3px] h-2 bg-current rounded-xs" />
          <div className="w-[3px] h-2.5 bg-current rounded-xs" />
          <div className="w-[3px] h-3 bg-current rounded-xs" />
        </div>
        <Wifi size={14} className="stroke-[2.5]" />
        <div className="flex items-center">
          <Battery size={18} className="stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
};

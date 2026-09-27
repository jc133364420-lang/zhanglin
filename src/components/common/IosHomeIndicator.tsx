import React from 'react';

interface IosHomeIndicatorProps {
  dark?: boolean;
}

export const IosHomeIndicator: React.FC<IosHomeIndicatorProps> = ({ dark = true }) => {
  return (
    <div className="w-full h-6 flex items-center justify-center pointer-events-none pb-1">
      <div className={`w-32 h-1 rounded-full ${dark ? 'bg-neutral-900/60' : 'bg-white/60'}`} />
    </div>
  );
};

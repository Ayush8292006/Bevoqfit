import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    '100% OVERSIZED T-SHIRTS ONLY',
    '280 GSM HEAVYWEIGHT FRENCH TERRY',
    'ZERO COLLAR SAG GUARANTEE',
    'FORWARD PITCHED DROP SHOULDERS',
    '300 GSM STREET ARMOR',
    'ACID & MINERAL SMOKE WASH',
    'ARCHIVAL 3D PUFF PRINT',
    'WEAR YOUR ATTITUDE'
  ];

  return (
    <div className="relative py-4 bg-white text-black overflow-hidden select-none border-y border-white">
      <div className="flex w-max animate-marquee">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center shrink-0 mx-6">
            <span className="font-display text-sm sm:text-base font-black uppercase tracking-[0.25em]">
              {text}
            </span>
            <span className="ml-6 w-2 h-2 rounded-full bg-black inline-block animate-ping" />
          </div>
        ))}
      </div>
    </div>
  );
};

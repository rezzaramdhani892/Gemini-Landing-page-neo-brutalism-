import React from 'react';

interface MarqueeProps {
  text: string[];
  reverse?: boolean;
  color?: string;
}

export default function Marquee({ text, reverse = false, color = 'bg-neo-yellow' }: MarqueeProps) {
  // Duplicate array several times to ensure continuous flow
  const items = [...text, ...text, ...text, ...text, ...text];

  return (
    <div className={`w-full overflow-hidden border-y-4 border-black ${color} py-3 select-none flex`}>
      <div className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}>
        {items.map((str, idx) => (
          <span 
            key={idx} 
            className="font-display text-sm md:text-lg font-black tracking-widest uppercase mr-12 text-black flex items-center shrink-0"
          >
            ✦ {str}
          </span>
        ))}
      </div>
    </div>
  );
}

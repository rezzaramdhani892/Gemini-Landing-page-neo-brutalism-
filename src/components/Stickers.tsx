import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Grab, Palette, Code, Coffee, Bug, Sparkles, Star, Heart, Flame } from 'lucide-react';
import { STICKERS } from '../data';

// Map string keys to Lucide React icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Grab,
  Palette,
  Code,
  Coffee,
  Bug,
  Sparkles,
  Star,
  Heart,
  Flame,
};

export default function Stickers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stickersList, setStickersList] = useState(
    STICKERS.map((sticker, idx) => ({
      ...sticker,
      rotation: (idx * 15 - 30) % 25, // initial dynamic rotations
      scale: 1,
    }))
  );

  const [customStickers, setCustomStickers] = useState<{
    id: string;
    text: string;
    icon: string;
    color: string;
    rotation: number;
    x: number;
    y: number;
  }[]>([]);

  const [inputValue, setInputValue] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('Flame');

  const handleAddSticker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newSticker = {
      id: `custom-${Date.now()}`,
      text: inputValue.toUpperCase(),
      icon: selectedEmoji,
      color: [
        'bg-neo-yellow',
        'bg-neo-pink',
        'bg-neo-green',
        'bg-neo-blue',
        'bg-neo-orange',
        'bg-neo-purple'
      ][Math.floor(Math.random() * 6)],
      rotation: Math.floor(Math.random() * 40) - 20,
      x: 20 + Math.random() * 50,
      y: 20 + Math.random() * 50,
    };

    setCustomStickers((prev) => [...prev, newSticker]);
    setInputValue('');
  };

  return (
    <div className="w-full flex flex-col h-full bg-[#FAF6F0] brutalist-border p-6 brutalist-shadow bg-grid">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-black pb-4 mb-4">
        <div>
          <h3 className="font-display text-xl font-black uppercase text-black flex items-center gap-2">
            <Sparkles className="w-6 h-6 fill-neo-yellow" />
            STICKER LAB
          </h3>
          <p className="font-sans text-xs text-stone-600 uppercase mt-1">
            Drag the pieces, make your own sticker, decorate the canvas!
          </p>
        </div>
        
        {/* Custom Sticker Input form */}
        <form onSubmit={handleAddSticker} className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            maxLength={18}
            placeholder="STICKER TEXT..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full md:w-44 brutalist-border-sm bg-white px-2 py-1.5 font-mono text-xs focus:bg-neo-yellow outline-none uppercase"
          />
          <select
            value={selectedEmoji}
            onChange={(e) => setSelectedEmoji(e.target.value)}
            className="brutalist-border-sm bg-white px-2 py-1.5 font-mono text-xs focus:bg-neo-green outline-none"
          >
            <option value="Flame">🔥</option>
            <option value="Heart">❤️</option>
            <option value="Sparkles">✨</option>
            <option value="Star">⭐️</option>
            <option value="Coffee">☕️</option>
          </select>
          <button
            type="submit"
            className="bg-black text-white px-3 py-1.5 font-mono text-xs brutalist-border-sm hover:bg-neo-orange active:translate-x-0.5 active:translate-y-0.5 font-bold uppercase shrink-0 cursor-pointer"
          >
            CREATE
          </button>
        </form>
      </div>

      {/* Sandbox stage */}
      <div 
        ref={containerRef}
        className="flex-1 relative w-full h-[320px] md:h-[350px] bg-white brutalist-border-sm overflow-hidden pattern-dots"
      >
        {/* Helper guide */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none pointer-events-none">
          <span className="font-display text-3xl md:text-5xl font-black uppercase tracking-widest text-center">
            DRAG ZONE
          </span>
        </div>

        {/* Default stickers */}
        {stickersList.map((st) => {
          const IconComp = iconMap[st.icon] || Grab;
          return (
            <motion.div
              key={st.id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragMomentum={false}
              whileDrag={{ scale: 1.15, rotate: 0, zIndex: 50 }}
              style={{
                left: `${st.defaultX}%`,
                top: `${st.defaultY}%`,
              }}
              className={`absolute cursor-grab active:cursor-grabbing px-4 py-2 brutalist-border-sm ${st.color} brutalist-shadow-sm flex items-center gap-2 select-none select-none`}
              animate={{ rotate: st.rotation }}
            >
              <IconComp className="w-4 h-4 shrink-0" />
              <span className="font-mono text-xs font-extrabold uppercase whitespace-nowrap">
                {st.text}
              </span>
            </motion.div>
          );
        })}

        {/* Custom user generated stickers */}
        {customStickers.map((st) => {
          const IconComp = iconMap[st.icon] || Flame;
          return (
            <motion.div
              key={st.id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragMomentum={false}
              whileDrag={{ scale: 1.15, rotate: 0, zIndex: 50 }}
              style={{
                left: `${st.x}%`,
                top: `${st.y}%`,
              }}
              className={`absolute cursor-grab active:cursor-grabbing px-4 py-2 brutalist-border-sm ${st.color} brutalist-shadow-sm flex items-center gap-2 select-none`}
              animate={{ rotate: st.rotation }}
            >
              <IconComp className="w-4 h-4 shrink-0" />
              <span className="font-mono text-xs font-extrabold uppercase whitespace-nowrap">
                {st.text}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCustomStickers(prev => prev.filter(c => c.id !== st.id));
                }}
                className="ml-1 text-[10px] w-4 h-4 rounded-full bg-black text-white flex items-center justify-center hover:bg-red-500 hover:text-black font-mono font-bold"
              >
                ×
              </button>
            </motion.div>
          );
        })}
      </div>
      
      <div className="flex justify-between items-center mt-3 text-[10px] font-mono text-stone-500 uppercase">
        <span>Stickers on Board: {stickersList.length + customStickers.length}</span>
        <span>Drag elasticity Enabled ✦</span>
      </div>
    </div>
  );
}

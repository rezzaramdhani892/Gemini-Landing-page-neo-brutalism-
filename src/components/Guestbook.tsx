import React, { useState, useEffect } from 'react';
import { MessageSquare, Calendar, Trash2, Send, Heart, Skull, Target, Coffee, Zap } from 'lucide-react';
import { GuestbookEntry } from '../types';

const INITIAL_ENTRIES: GuestbookEntry[] = [
  {
    id: "g-1",
    name: "ALEX CHEN",
    message: "This layout is super authentic! Finally a website that isn't just another boring SaaS template with blur gradients. Incredible styling!",
    emoji: "⚡️",
    timestamp: "2026-06-10",
    color: "bg-neo-yellow",
    rotation: -2
  },
  {
    id: "g-2",
    name: "SARAH_OS_DEV",
    message: "The guestbook physics and interactive sandbox are so satisfying. Booking you for our branding redesign ASAP.",
    emoji: "💖",
    timestamp: "2026-06-11",
    color: "bg-neo-pink",
    rotation: 1
  },
  {
    id: "g-3",
    name: "BRUTAL_ENGR",
    message: "Solid grids, no fluff. Exactly what developers need today. Keep breaking the templates!",
    emoji: "💀",
    timestamp: "2026-06-11",
    color: "bg-neo-green",
    rotation: -1.5
  }
];

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🔥');
  const [error, setError] = useState('');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('neo-guestbook-v1');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        setEntries(INITIAL_ENTRIES);
      }
    } else {
      setEntries(INITIAL_ENTRIES);
      localStorage.setItem('neo-guestbook-v1', JSON.stringify(INITIAL_ENTRIES));
    }
  }, []);

  const saveEntries = (newEntries: GuestbookEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('neo-guestbook-v1', JSON.stringify(newEntries));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('HOW SHOULD I CALL YOU? (NAME REQUIRED)');
      return;
    }
    if (!message.trim()) {
      setError('SAY SOMETHING COOL! (MESSAGE REQUIRED)');
      return;
    }

    const COLORS = ['bg-neo-yellow', 'bg-neo-pink', 'bg-neo-green', 'bg-neo-blue', 'bg-neo-orange', 'bg-neo-purple'];
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const randomRotation = Math.random() * 4 - 2; // -2 to +2 degrees rotation

    const newEntry: GuestbookEntry = {
      id: `user-${Date.now()}`,
      name: name.slice(0, 30).toUpperCase(),
      message: message.slice(0, 160).trim(),
      emoji: selectedEmoji,
      timestamp: new Date().toISOString().split('T')[0],
      color: randomColor,
      rotation: randomRotation
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);
    setName('');
    setMessage('');
    setSelectedEmoji('🔥');
  };

  const handleDelete = (id: string) => {
    const updated = entries.filter(item => item.id !== id);
    saveEntries(updated);
  };

  const handleReset = () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO RESTORE ORIGINAL MESSAGES?")) {
      saveEntries(INITIAL_ENTRIES);
    }
  };

  return (
    <div className="w-full h-full bg-[#FAF6F0] brutalist-border p-6 brutalist-shadow bg-grid flex flex-col justify-between">
      <div>
        {/* Title & Introduction */}
        <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-5">
          <div>
            <h3 className="font-display text-xl font-black uppercase text-black flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              AUTHENTIC GUESTBOOK
            </h3>
            <p className="font-sans text-xs text-stone-600 uppercase mt-1">
              Verify your trace on the wall. No cloud trackers, purely local records.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="text-[10px] bg-stone-200 hover:bg-red-200 border-2 border-black font-mono font-bold px-2 py-1 uppercase select-none cursor-pointer"
          >
            RESET
          </button>
        </div>

        {/* Input Form Fields */}
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-[11px] font-mono font-black uppercase mb-1">
                ENTER PSEUDONYM
              </label>
              <input
                type="text"
                placeholder="YOUR NAME OR HANDLE"
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full brutalist-border bg-white px-3 py-2 font-mono text-xs focus:bg-neo-yellow outline-none uppercase"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-mono font-black uppercase mb-1">
                STAMP SYMBOL
              </label>
              <select
                value={selectedEmoji}
                onChange={(e) => setSelectedEmoji(e.target.value)}
                className="w-full brutalist-border bg-white p-[8px] font-mono text-xs focus:bg-neo-green outline-none"
              >
                <option value="🔥">🔥 FLAME</option>
                <option value="❤️">❤️ HEART</option>
                <option value="⚡️">⚡️ LIGHTNING</option>
                <option value="💀">💀 SKULL</option>
                <option value="☕️">☕️ ESPRESSO</option>
                <option value="👾">👾 GLITCH</option>
                <option value="👽">👽 SECRETS</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-black uppercase mb-1">
              RECORD MESSAGE
            </label>
            <textarea
              placeholder="WHAT IS YOUR IMPRESSION?"
              maxLength={160}
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full brutalist-border bg-white p-3 font-mono text-xs focus:bg-neo-blue outline-none uppercase resize-none"
            />
          </div>

          {error && (
            <p className="text-xs bg-neo-pink text-white font-mono p-1.5 border-2 border-black font-bold text-center">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-neo-orange hover:text-black py-2 font-display text-sm font-black tracking-widest uppercase brutalist-border hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-100 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            STAMP MESSAGE TO THE BOARD
          </button>
        </form>
      </div>

      {/* Guest entries list */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 pb-2">
        {entries.length === 0 ? (
          <div className="text-center py-6 border-2 border-dashed border-black">
            <p className="font-mono text-xs text-stone-500 uppercase">
              The guestbook is currently empty. Be the first to leave a message!
            </p>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className={`p-4 brutalist-border ${entry.color} brutalist-shadow-sm transition-all relative break-words`}
              style={{ transform: `rotate(${entry.rotation}deg)` }}
            >
              <div className="flex justify-between items-start mb-1 text-xs">
                <span className="font-display font-black tracking-wider uppercase text-black">
                  {entry.name}
                </span>
                <span className="text-lg select-none">
                  {entry.emoji}
                </span>
              </div>
              
              <p className="font-mono text-xs text-black leading-relaxed">
                {entry.message}
              </p>

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-black/20 text-[10px] font-mono text-stone-700">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {entry.timestamp}
                </span>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="hover:text-red-600 transition-colors cursor-pointer select-none"
                  title="Delete message"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

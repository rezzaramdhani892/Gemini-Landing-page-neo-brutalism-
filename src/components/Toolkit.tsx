import React, { useState, useEffect } from 'react';
import { Coffee, HelpCircle, Terminal, RefreshCw, Zap, Award, Sun, Moon } from 'lucide-react';

const ORACLE_QUOTES = [
  "COFFEE IN, BUGS OUT. COFFEE OUT, SYSTEM OFF.",
  "MY CODE WORKS SO WELL EVEN THE BROWSER IS SURPRISED.",
  "SHIP IT TODAY, STRUGGLE TOMORROW. CARPE DIEM.",
  "DO NOT REFACTOR WHAT IS ALREADY MIRACULOUSLY COHESIVE.",
  "CENTERING DIVS IS A SPIRITUAL JOURNEY, NOT A SKILL.",
  "THE ONLY REAL DATA BASE IS LOCAL STORAGE RE-HYDRATED.",
  "IF IT COMPILES, IT IS STYLISH. NO EX_USES.",
  "THICK BORDERS BRING MEANING TO A MEANINGLESS WEB."
];

export default function Toolkit() {
  const [caffeineLevel, setCaffeineLevel] = useState(3);
  const [oracleIndex, setOracleIndex] = useState(0);
  const [systemClock, setSystemClock] = useState('');
  const [isCaffeineBouncing, setIsCaffeineBouncing] = useState(false);

  // Update Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemClock(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCaffeineClick = () => {
    setIsCaffeineBouncing(true);
    setCaffeineLevel(prev => {
      if (prev >= 12) return 1; // loop back
      return prev + 1;
    });
    setTimeout(() => {
      setIsCaffeineBouncing(false);
    }, 150);
  };

  const rollOracle = () => {
    let nextIdx = Math.floor(Math.random() * ORACLE_QUOTES.length);
    while (nextIdx === oracleIndex) {
      nextIdx = Math.floor(Math.random() * ORACLE_QUOTES.length);
    }
    setOracleIndex(nextIdx);
  };

  const getCaffeineResponse = (lvl: number) => {
    if (lvl <= 3) return "CALM SEED - READY FOR INPUT";
    if (lvl <= 6) return "STABLE STATE - DWELLING IN TS";
    if (lvl <= 9) return "PERFECT COMPILING momentum";
    return "WARNING: REACHING OMNIPOTENCE";
  };

  const getCaffeineColor = (lvl: number) => {
    if (lvl <= 3) return "bg-neo-blue";
    if (lvl <= 6) return "bg-neo-green";
    if (lvl <= 9) return "bg-neo-yellow";
    return "bg-neo-pink";
  };

  return (
    <div className="w-full h-full bg-[#FAF6F0] brutalist-border p-6 brutalist-shadow bg-grid flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-5">
          <h3 className="font-display text-xl font-black uppercase text-black flex items-center gap-2">
            <Terminal className="w-6 h-6 fill-neo-green" />
            OPERATOR DESK
          </h3>
          <span className="font-mono text-xs bg-black text-white px-2 py-1 select-none font-bold">
            OS // WORKER_v1.9
          </span>
        </div>

        {/* Real-time ticker panel */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="brutalist-border bg-white p-3 brutalist-shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
            <span className="absolute top-1 left-1.5 font-mono text-[9px] uppercase font-black text-stone-500">
              LOCAL OPERATOR
            </span>
            <span className="font-mono text-xs text-stone-700 mt-2">UTC LOCAL</span>
            <p className="font-display text-base md:text-lg font-black tracking-widest text-black mt-1">
              {systemClock || "00:00:00"}
            </p>
          </div>

          <div className="brutalist-border bg-white p-3 brutalist-shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
            <span className="absolute top-1 left-1.5 font-mono text-[9px] uppercase font-black text-stone-500">
              STABILIZER STATUS
            </span>
            <span className="font-mono text-xs text-stone-700 mt-2">ACTIVE FOR GIGS</span>
            <p className="font-display text-xs md:text-sm font-black tracking-wide text-neo-orange mt-1">
              ⬤ GREEN SIGNAL
            </p>
          </div>
        </div>

        {/* Caffeine Tracker module */}
        <div className="border-4 border-black bg-white p-4 mb-5 brutalist-shadow-sm relative">
          <span className="absolute -top-3.5 left-3 bg-neo-pink text-white border-2 border-black font-mono text-[10px] px-2 py-0.5 font-black uppercase rounded-none select-none">
            FUEL CONVERTER
          </span>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-1 justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleCaffeineClick}
                className={`w-12 h-12 bg-neo-orange text-black brutalist-border cursor-pointer select-none font-black flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${isCaffeineBouncing ? 'translate-y-1' : ''}`}
                title="Add a cup of Coffee"
              >
                <Coffee className="w-6 h-6 text-black fill-current" />
              </button>
              <div>
                <p className="font-display text-sm font-black uppercase">
                  CAFFEINE LEVEL: {caffeineLevel} / 12
                </p>
                <p className="font-mono text-[10px] text-stone-600 uppercase mt-0.5">
                  {getCaffeineResponse(caffeineLevel)}
                </p>
              </div>
            </div>

            {/* Coffee meter display bricks */}
            <div className="flex gap-1 bg-black p-1 brutalist-border-sm w-full md:w-auto overflow-hidden">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-6 w-3 border-r border-black/30 transition-colors ${idx < caffeineLevel ? getCaffeineColor(caffeineLevel) : 'bg-stone-800'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Oracle widget */}
        <div className="border-4 border-black bg-neo-yellow p-4 brutalist-shadow-sm relative overflow-hidden flex flex-col justify-between">
          <span className="absolute top-1.5 right-2 text-stone-800 opacity-20">
            <Award className="w-16 h-16" />
          </span>
          <div>
            <span className="font-mono text-[10px] font-black uppercase text-stone-800">
              MAXWELL'S ORACLE SAYINGS //
            </span>
            <p className="font-display text-sm md:text-base font-extrabold text-black uppercase mt-2 leading-snug tracking-wider">
              "{ORACLE_QUOTES[oracleIndex]}"
            </p>
          </div>
          <div className="flex justify-between items-center mt-4 border-t-2 border-black pt-2">
            <span className="font-mono text-[9px] font-bold text-stone-700">INDEX: 00{oracleIndex + 1}</span>
            <button
              onClick={rollOracle}
              className="bg-black text-neo-yellow hover:bg-white hover:text-black font-mono text-[10px] font-black px-2 py-1 brutalist-border-sm flex items-center gap-1 cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5"
            >
              <RefreshCw className="w-3 h-3 animate-spin duration-3000" />
              ROTATE IDEA
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t-2 border-black/10 flex justify-between items-center text-[10px] font-mono text-stone-500 uppercase">
        <span>No server queries dispatched</span>
        <span>Static sandbox environment</span>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  MapPin, 
  FileText, 
  Sparkles, 
  Code2, 
  ExternalLink,
  Cpu,
  Bookmark
} from 'lucide-react';

import { USER_INFO, SKILLS } from './data';
import Marquee from './components/Marquee';
import Stickers from './components/Stickers';
import Guestbook from './components/Guestbook';
import Toolkit from './components/Toolkit';
import ProjectShowcase from './components/ProjectShowcase';
import ContactTerminal from './components/ContactTerminal';

export default function App() {
  const [copiedLocation, setCopiedLocation] = useState(false);

  const handleCopyLocation = () => {
    navigator.clipboard.writeText(USER_INFO.location);
    setCopiedLocation(true);
    setTimeout(() => setCopiedLocation(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-blackSelection selection:bg-neo-yellow selection:text-black py-4 px-4 md:py-8 md:px-8 flex flex-col items-center">
      
      {/* Structural Container */}
      <div className="w-full max-w-7xl flex flex-col gap-8">
        
        {/* Navigation / Header Sticker */}
        <header className="w-full flex flex-col sm:flex-row justify-between items-stretch gap-4">
          {/* Logo brand badge */}
          <div className="bg-black text-white px-5 py-3 brutalist-border flex items-center gap-3 brutalist-shadow select-none">
            <span className="w-4 h-4 bg-neo-yellow animate-ping rounded-full inline-block" />
            <span className="font-display text-sm md:text-base font-black tracking-widest uppercase">
              MAXWELL.OS // 2026
            </span>
          </div>

          {/* Social Badges / Static link items */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-neo-yellow text-black p-3 hover:bg-black hover:text-neo-yellow brutalist-border brutalist-shadow-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-neo-pink text-black p-3 hover:bg-black hover:text-neo-pink brutalist-border brutalist-shadow-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-neo-blue text-black p-3 hover:bg-black hover:text-neo-blue brutalist-border brutalist-shadow-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
              title="X Profile"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <button
              onClick={() => alert("CV DOWNLOAD STAGE INJECTED IN STATIC BUILD STATE: ⬤ AVAILABLE")}
              className="bg-white text-black font-mono font-bold text-xs uppercase px-4 py-3 brutalist-border brutalist-shadow-sm hover:bg-neo-orange hover:translate-y-[-1px] active:translate-y-0 active:translate-x-0 cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              GET RESUME
            </button>
          </div>
        </header>

        {/* Dynamic Entry Banner Marquee */}
        <Marquee 
          text={[
            "NEO-BRUTALISM IS THE FUTURE", 
            "REJECT BORING WEB DESIGN", 
            "RELIABLE LOCAL STORAGE persistence", 
            "100% DESIGN CONTRAST GUARANTEED", 
            "FAST COMPILE SPEEDS"
          ]} 
          color="bg-neo-yellow" 
        />

        {/* Hero Section / Profile Introduction block */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Hero Left Column -- Info / Bio / Title */}
          <div className="lg:col-span-7 bg-[#FAF6F0] brutalist-border p-6 md:p-8 brutalist-shadow bg-grid flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-neo-pink border-2 border-black text-xs font-mono font-black uppercase text-white tracking-wider brutalist-shadow-sm select-none">
                <Code2 className="w-3.5 h-3.5" />
                SYSTEM LIVE & RECRUITING
              </div>

              {/* Big Display typography */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-none tracking-tight text-black uppercase">
                HI, I'M <span className="bg-neo-yellow px-1 inline-block brutalist-border-sm rotate-1 translate-y-1">{USER_INFO.name}</span>
                <br />
                <span className="text-neo-orange font-bold text-2xl sm:text-3xl block mt-2">
                  {USER_INFO.role}
                </span>
              </h1>

              {/* Description bio statement */}
              <p className="font-sans text-sm md:text-base text-stone-800 uppercase leading-relaxed font-bold border-l-4 border-black pl-4">
                {USER_INFO.bio}
              </p>
            </div>

            {/* Meta Tags & Details info */}
            <div className="space-y-4 pt-4 border-t-2 border-black/15">
              <div className="flex flex-wrap gap-1.5">
                {USER_INFO.tags.map((tg, idx) => (
                  <span 
                    key={idx} 
                    className="px-2.5 py-1 bg-white brutalist-border-sm text-[10px] sm:text-xs font-mono font-black text-black select-none uppercase hover:bg-neo-blue"
                  >
                    {tg}
                  </span>
                ))}
              </div>

              {/* Location Tag copyable badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-stone-600 bg-stone-100 p-2 border border-stone-300">
                  <MapPin className="w-4 h-4 text-neo-pink" />
                  <span>{USER_INFO.location}</span>
                </div>
                <button
                  onClick={handleCopyLocation}
                  className="px-3 py-1.5 bg-black text-white hover:bg-neo-green hover:text-black font-mono text-[10px] font-bold uppercase brutalist-border-sm cursor-pointer select-none transition-all active:translate-x-0.5 active:translate-y-0.5"
                >
                  {copiedLocation ? "COPIED STATE ⬤" : "COPY TIMEZONE ID"}
                </button>
              </div>
            </div>
          </div>

          {/* Hero Right Column -- Interactive Portrait Frame */}
          <div className="lg:col-span-5 border-4 border-black bg-neo-yellow brutalist-shadow relative overflow-hidden flex items-center justify-center p-6 md:p-8 select-none">
            {/* Corner Decorative Stamps */}
            <div className="absolute top-3 left-3 bg-white border-2 border-black font-mono text-[9px] px-1.5 py-0.5 font-black uppercase text-black">
              ORIGINAL_IMG
            </div>
            <div className="absolute bottom-3 right-3 bg-neon-green bg-neo-pink border-2 border-black font-mono text-[9px] px-1.5 py-0.5 font-black uppercase text-white">
              PORTFOLIO // v1
            </div>

            <div className="relative border-4 border-black bg-white p-3 brutalist-shadow flex flex-col justify-between items-center w-full max-w-sm">
              <img 
                src={USER_INFO.avatar} 
                alt="Maxwell Avatar" 
                referrerPolicy="no-referrer"
                className="w-full aspect-square object-cover border-2 border-black grayscale contrast-125 hover:grayscale-0 transition-all duration-300 pointer-events-none"
              />
              <div className="w-full border-t-2 border-black mt-3 pt-3 flex justify-between items-center">
                <span className="font-display text-xs font-black uppercase">MAX DEVEREUX.PIX</span>
                <span className="font-mono text-[10px] text-stone-500 uppercase">200 DPI</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Board: Operator Desk & Sticker Lab */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <Toolkit />
          <Stickers />
        </section>

        {/* Reverse Secondary Marquee banner for section break */}
        <Marquee 
          text={[
            "SECURE PORTS ACTIVATED", 
            "THE SYSTEM RENDERS LIVE IN YOUR BROWSER", 
            "DESIGN IS ANARCHY DESIGN IS JUSTICE", 
            "DRAG STICKERS AROUND DESIGN LAB", 
            "GUESTBOOK ENVELOPE SEALED"
          ]} 
          reverse={true} 
          color="bg-neo-pink" 
        />

        {/* Main Projects Section */}
        <section id="projects">
          <ProjectShowcase />
        </section>

        {/* Skills Ledger section */}
        <section className="w-full flex flex-col bg-white brutalist-border p-6 brutalist-shadow bg-grid relative overflow-hidden">
          <span className="absolute top-1.5 right-2 text-stone-200 opacity-20 pointer-events-none">
            <Cpu className="w-24 h-24" />
          </span>
          
          <div className="border-b-4 border-black pb-4 mb-6">
            <h3 className="font-display text-xl font-black uppercase text-black flex items-center gap-2">
              <Cpu className="w-6 h-6" />
              CAPABILITIES DIRECTORY
            </h3>
            <p className="font-sans text-xs text-stone-600 uppercase mt-1">
              Ledger tracking structural fluency standards and core tooling proficiencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((sk) => (
              <div key={sk.name} className="brutalist-border-sm bg-stone-50 p-4 brutalist-shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-display text-xs font-black uppercase">{sk.name}</span>
                    <span className="font-mono text-[10px] p-0.5 px-2.5 bg-black text-white font-bold select-none uppercase">
                      {sk.category}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-stone-700 uppercase mt-2.5 leading-normal">
                    {sk.description}
                  </p>
                </div>
                
                {/* Visual Level Bars */}
                <div className="space-y-1.5 pt-2 border-t border-black/10">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span>CAPACITY FLUENCY LEVEL</span>
                    <span className="font-bold">{sk.level} / 10</span>
                  </div>
                  <div className="h-5 bg-stone-250 bg-stone-200 brutalist-border-sm p-0.5 flex">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-full flex-1 border-r border-[#FAF6F0] last:border-0 ${i < sk.level ? sk.color : 'bg-stone-300/40'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Interaction Section: Guestbook & Contact Terminal */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6">
            <Guestbook />
          </div>
          <div className="lg:col-span-6">
            <ContactTerminal />
          </div>
        </section>

        {/* Custom brutalist Footer */}
        <footer className="border-t-4 border-black pt-6 pb-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono select-none">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 fill-neo-yellow text-black" />
            <span className="font-black uppercase">
              CRAFTED FROM PURE CORE PRINCIPLES. 2026.
            </span>
          </div>
          <div className="text-stone-600 text-center md:text-right uppercase">
            <span>STATIC PERSISTENCE GUARANTEE (LOCAL STORAGE) ✦ NO TRACKERS</span>
            <br />
            <span className="text-[10px] mt-1 inline-block">SYSTEM LICENSED APACHE-2.0</span>
          </div>
        </footer>

      </div>
    </div>
  );
}

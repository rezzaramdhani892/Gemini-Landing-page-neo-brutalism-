import React, { useState } from 'react';
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
  Bookmark,
  Settings,
  Plus,
  Trash2,
  X,
  RotateCcw,
  Save,
  Check
} from 'lucide-react';

import { USER_INFO, PROJECTS, SKILLS } from './data';
import { Project, Skill } from './types';
import Marquee from './components/Marquee';
import Stickers from './components/Stickers';
import Guestbook from './components/Guestbook';
import Toolkit from './components/Toolkit';
import ProjectShowcase from './components/ProjectShowcase';
import ContactTerminal from './components/ContactTerminal';

export default function App() {
  const [copiedLocation, setCopiedLocation] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills'>('profile');

  // Stateful profile
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('neo-profile-v1');
    return saved ? JSON.parse(saved) : USER_INFO;
  });

  // Stateful projects list
  const [projectsList, setProjectsList] = useState<Project[]>(() => {
    const saved = localStorage.getItem('neo-projects-v1');
    return saved ? JSON.parse(saved) : PROJECTS;
  });

  // Stateful skills list
  const [skillsList, setSkillsList] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('neo-skills-v1');
    return saved ? JSON.parse(saved) : SKILLS;
  });

  // Inline forms state
  const [editName, setEditName] = useState(profile.name);
  const [editRole, setEditRole] = useState(profile.role);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editLocation, setEditLocation] = useState(profile.location);
  const [editAvatar, setEditAvatar] = useState(profile.avatar);
  const [editTagsString, setEditTagsString] = useState(profile.tags.join(', '));

  // Projects form state
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjDetail, setNewProjDetail] = useState('');
  const [newProjTags, setNewProjTags] = useState('');
  const [newProjUrl, setNewProjUrl] = useState('https://github.com');
  const [newProjColor, setNewProjColor] = useState<'yellow'|'pink'|'green'|'blue'|'purple'|'orange'>('orange');
  const [newProjStat1Value, setNewProjStat1Value] = useState('11.5k');
  const [newProjStat1Label, setNewProjStat1Label] = useState('Stars');
  const [newProjStat2Value, setNewProjStat2Value] = useState('9.8/10');
  const [newProjStat2Label, setNewProjStat2Label] = useState('Rating');

  const handleCopyLocation = () => {
    navigator.clipboard.writeText(profile.location);
    setCopiedLocation(true);
    setTimeout(() => setCopiedLocation(false), 2000);
  };

  // Save changes
  const saveProfile = () => {
    const tagsArray = editTagsString.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0);
    const updated = {
      ...profile,
      name: editName.toUpperCase(),
      role: editRole.toUpperCase(),
      bio: editBio,
      location: editLocation.toUpperCase(),
      avatar: editAvatar,
      tags: tagsArray
    };
    setProfile(updated);
    localStorage.setItem('neo-profile-v1', JSON.stringify(updated));
    alert("PROFILE DATA SAVED SUCCESSFULLY! ⬤");
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim() || !newProjDesc.trim()) {
      alert("TITLE AND DESCRIPTION REQUIRED!");
      return;
    }

    const tagsArray = newProjTags.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0);
    const newProj: Project = {
      id: `custom-p-${Date.now()}`,
      title: newProjTitle.toUpperCase(),
      description: newProjDesc,
      detailedText: newProjDetail || newProjDesc,
      tags: tagsArray.length > 0 ? tagsArray : ['React', 'TypeScript'],
      color: newProjColor,
      link: newProjUrl,
      stats: [
        { label: newProjStat1Label || 'Stars', value: newProjStat1Value || '1.2k' },
        { label: newProjStat2Label || 'Integrations', value: newProjStat2Value || '100%' },
        { label: 'Platform', value: 'Web' }
      ]
    };

    const updated = [...projectsList, newProj];
    setProjectsList(updated);
    localStorage.setItem('neo-projects-v1', JSON.stringify(updated));

    // Clear form
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjDetail('');
    setNewProjTags('');
    alert("PROJECT ADDED TO DIRECTORY! ⬤");
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm("ARE YOU SURE YOU WANT TO DISPATCH AND REMOVE THIS PROJECT?")) {
      const updated = projectsList.filter(p => p.id !== id);
      setProjectsList(updated);
      localStorage.setItem('neo-projects-v1', JSON.stringify(updated));
    }
  };

  const handleSkillLevelChange = (index: number, level: number) => {
    const updated = [...skillsList];
    updated[index].level = Math.max(1, Math.min(10, level));
    setSkillsList(updated);
    localStorage.setItem('neo-skills-v1', JSON.stringify(updated));
  };

  // Reset all
  const resetToDefaults = () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO CLEAR ALL LOCAL WORK AND RESTORE ORIGINAL THEMES AND PROJECTS?")) {
      localStorage.removeItem('neo-profile-v1');
      localStorage.removeItem('neo-projects-v1');
      localStorage.removeItem('neo-skills-v1');
      setProfile(USER_INFO);
      setProjectsList(PROJECTS);
      setSkillsList(SKILLS);
      
      // Update form values
      setEditName(USER_INFO.name);
      setEditRole(USER_INFO.role);
      setEditBio(USER_INFO.bio);
      setEditLocation(USER_INFO.location);
      setEditAvatar(USER_INFO.avatar);
      setEditTagsString(USER_INFO.tags.join(', '));
      alert("SYSTEM REVERTED TO DEFAULTS! ⬤");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black selection:bg-neo-yellow selection:text-black py-4 px-4 md:py-8 md:px-8 flex flex-col items-center">
      
      {/* Structural Container */}
      <div className="w-full max-w-7xl flex flex-col gap-8">
        
        {/* Navigation / Header Sticker */}
        <header className="w-full flex flex-col sm:flex-row justify-between items-stretch gap-4">
          {/* Logo brand badge */}
          <div className="bg-black text-white px-5 py-3 brutalist-border flex items-center gap-3 brutalist-shadow select-none">
            <span className="w-4 h-4 bg-neo-green animate-ping rounded-full inline-block" />
            <span className="font-display text-2xl md:text-3xl tracking-tighter uppercase">
              {profile.name.replace(/\s+/g, '.') || 'MY.PORTFOLIO'}
            </span>
          </div>

          {/* Social Badges / Static link items */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowEditor(true)}
              className="bg-neo-green text-black font-mono font-black text-xs uppercase px-4 py-3 brutalist-border brutalist-shadow-sm hover:translate-y-[2px] transition-transform cursor-pointer flex items-center gap-2 active:shadow-none"
            >
              <Settings className="w-4 h-4 animate-spin-slow" />
              BUILD / CLAIM PORTFOLIO
            </button>
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
            `WELCOME TO THE LIVE PORTFOLIO OF ${profile.name}`, 
            "REJECT BORING WEB TEMPLATES", 
            "TAILORED IN NEO-BRUTALIST ARCHITECTURES", 
            "USER CUSTOMIZATIONS ENGAGED", 
            "100% DESIGN CONTRAST GUARANTEED"
          ]} 
          color="bg-neo-yellow" 
        />

        {/* Hero Section / Profile Introduction block */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Hero Left Column -- Info / Bio / Title */}
          <div className="lg:col-span-7 bg-[#FAFAFA] brutalist-border p-6 md:p-8 brutalist-shadow bg-grid flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-neo-pink border-2 border-black text-xs font-mono font-black uppercase text-white tracking-wider brutalist-shadow-sm select-none">
                <Code2 className="w-3.5 h-3.5" />
                STATUS: AVAILABLE FOR COLLABORATION
              </div>

              {/* Big Display typography */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black leading-[0.85] uppercase tracking-tight text-black mt-2">
                Building<br/>Digital<br/>Utopia
              </h1>
              
              <div className="font-sans text-xl md:text-2xl font-bold uppercase mt-4 text-stone-800">
                Hi, I'm <span className="bg-neo-yellow px-2 inline-block brutalist-border-sm rotate-1 translate-y-1 text-black font-display text-2xl md:text-3xl">{profile.name}</span>, <br />
                <span className="text-neo-orange font-bold font-display text-lg md:text-xl block mt-2">
                  {profile.role}
                </span>
              </div>

              {/* Description bio statement */}
              <p className="font-sans text-sm md:text-base text-stone-700 uppercase leading-relaxed font-bold border-l-4 border-black pl-4 my-4">
                {profile.bio}
              </p>
            </div>

            {/* Meta Tags & Details info */}
            <div className="space-y-4 pt-4 border-t-2 border-black/15">
              <div className="flex flex-wrap gap-1.5">
                {profile.tags.map((tg: string, idx: number) => (
                  <span 
                    key={idx} 
                    className="px-2.5 py-1 bg-white brutalist-border-sm text-[10px] sm:text-xs font-mono font-black text-black select-none uppercase hover:bg-neo-blue"
                  >
                    #{tg}
                  </span>
                ))}
              </div>

              {/* Location Tag copyable badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-stone-600 bg-stone-150 p-2 border border-stone-300">
                  <MapPin className="w-4 h-4 text-neo-pink" />
                  <span>{profile.location}</span>
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
            <div className="absolute bottom-3 right-3 bg-neo-pink border-2 border-black font-mono text-[9px] px-1.5 py-0.5 font-black uppercase text-white">
              PORTFOLIO // v1
            </div>

            <div className="relative border-4 border-black bg-white p-3 brutalist-shadow flex flex-col justify-between items-center w-full max-w-sm">
              <img 
                src={profile.avatar} 
                alt="Profile Avatar Image" 
                referrerPolicy="no-referrer"
                className="w-full aspect-square object-cover border-2 border-black grayscale contrast-110 hover:grayscale-0 transition-all duration-300 pointer-events-none"
              />
              <div className="w-full border-t-2 border-black mt-3 pt-3 flex justify-between items-center">
                <span className="font-display text-sm font-black uppercase">{profile.name.split(' ')[0]}.PIX</span>
                <span className="font-mono text-[10px] text-stone-500 uppercase">300 DPI</span>
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
            "PORTFOLIO CONFIGURATIONS ACTIVE", 
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
          <ProjectShowcase projectsList={projectsList} />
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
              Ledger tracking structural fluency standards and core tooling proficiencies. Live editable!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsList.map((sk, index) => (
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
                  <div className="h-5 bg-stone-200 brutalist-border-sm p-0.5 flex">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-full flex-1 border-r border-[#FAF6F0] last:border-0 ${i < sk.level ? sk.color : 'bg-stone-300/45'}`} 
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

      {/* PORTFOLIO BUILDER CONTROL DECK MODAL DRAWER */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white brutalist-border-md brutalist-shadow-lg text-black overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Title banner */}
            <div className="p-4 border-b-4 border-black bg-neo-green font-display text-base md:text-lg font-black tracking-widest uppercase flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Settings className="w-5 h-5 animate-spin-slow" />
                PORTFOLIO CONTROL DECK v1.0
              </span>
              <button 
                onClick={() => setShowEditor(false)}
                className="w-8 h-8 bg-black text-white hover:bg-neo-orange hover:text-black border-2 border-black font-mono font-black flex items-center justify-center cursor-pointer active:translate-y-0.5"
              >
                ×
              </button>
            </div>

            {/* Selector Nav Tabs toolbar */}
            <div className="flex border-b-4 border-black bg-stone-100 select-none">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-3 text-center font-display text-xs md:text-sm font-black uppercase border-r-4 border-black last:border-r-0 ${activeTab === 'profile' ? 'bg-neo-yellow text-black' : 'bg-transparent text-stone-600 hover:text-black'}`}
              >
                1. EDIT PROFILE
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex-1 py-3 text-center font-display text-xs md:text-sm font-black uppercase border-r-4 border-black last:border-r-0 ${activeTab === 'projects' ? 'bg-neo-pink text-black' : 'bg-transparent text-stone-600 hover:text-black'}`}
              >
                2. MANAGE PROJECTS
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`flex-1 py-3 text-center font-display text-xs md:text-sm font-black uppercase border-r-4 border-black last:border-r-0 ${activeTab === 'skills' ? 'bg-neo-blue text-black' : 'bg-transparent text-stone-600 hover:text-black'}`}
              >
                3. EDIT FLUENCY
              </button>
            </div>

            {/* Scrollable inputs space */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* TAB 1: Edit Profile */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <span className="font-mono text-[10px] font-black uppercase text-stone-500 block mb-2">
                    BIOGRAPHICAL VARIABLES //
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-black uppercase mb-1">REAL NAME OR ALIAS</label>
                      <input 
                        type="text" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full brutalist-border bg-stone-50 p-2 font-mono text-xs uppercase"
                        placeholder="E.G. REZZA RAMDHANI"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-black uppercase mb-1">PROFESSIONAL TITLE</label>
                      <input 
                        type="text" 
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="w-full brutalist-border bg-stone-50 p-2 font-mono text-xs uppercase"
                        placeholder="E.G. CHIEF WEB ARCHITECT"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-black uppercase mb-1">PORTRAIT AVATAR URL / PATH</label>
                    <input 
                      type="text" 
                      value={editAvatar}
                      onChange={(e) => setEditAvatar(e.target.value)}
                      className="w-full brutalist-border bg-stone-50 p-2 font-mono text-xs"
                      placeholder="E.G. URL TO RAW GRAPHIC..."
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-black uppercase mb-1">ABOUT DESCRIPTION (BIO STATEMENT)</label>
                    <textarea 
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      rows={3}
                      className="w-full brutalist-border bg-stone-50 p-3 font-sans text-xs uppercase"
                      placeholder="TELL YOUR AUDIENCE WHAT YOU DEV..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-black uppercase mb-1">LOCATION & TIMEZONE</label>
                      <input 
                        type="text" 
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        className="w-full brutalist-border bg-stone-50 p-2 font-mono text-xs uppercase"
                        placeholder="E.G. INDONESIA / UTC+7"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-black uppercase mb-1">TAGLINES (COMMA SEPARATED)</label>
                      <input 
                        type="text" 
                        value={editTagsString}
                        onChange={(e) => setEditTagsString(e.target.value)}
                        className="w-full brutalist-border bg-stone-50 p-2 font-mono text-xs uppercase"
                        placeholder="E.G. REACT, BACKEND, CSS"
                      />
                    </div>
                  </div>

                  <button
                    onClick={saveProfile}
                    className="w-full mt-4 bg-black text-white hover:bg-neo-yellow hover:text-black font-display py-2.5 text-xs font-black tracking-widest uppercase brutalist-border hover:translate-x-[-1px] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    SAVE PROFILE SETTINGS
                  </button>
                </div>
              )}

              {/* TAB 2: Manage Projects */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Newly Created Form */}
                  <form onSubmit={handleAddProject} className="border-4 border-black bg-stone-50 p-4 relative block space-y-4">
                    <span className="absolute -top-3.5 left-3 bg-neo-pink text-white border-2 border-black font-mono text-[10px] px-2 py-0.5 font-black uppercase rounded-none select-none">
                      ADD CUSTOM PROJECT WORK //
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-[10px] font-mono font-black uppercase mb-0.5">PROJECT TITLE</label>
                        <input 
                          type="text" 
                          required
                          value={newProjTitle}
                          onChange={(e) => setNewProjTitle(e.target.value)}
                          placeholder="E.G. NEXUS CENTRAL"
                          className="w-full brutalist-border-sm bg-white p-1.5 font-mono text-xs uppercase"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-black uppercase mb-0.5">THEME ACCENT COLOR</label>
                        <select 
                          value={newProjColor} 
                          onChange={(e) => setNewProjColor(e.target.value as any)}
                          className="w-full brutalist-border-sm bg-white p-1.5 font-mono text-xs focus:bg-neo-yellow"
                        >
                          <option value="yellow">YELLOW Accent</option>
                          <option value="pink">PINK Accent</option>
                          <option value="green">GREEN Accent</option>
                          <option value="blue">BLUE Accent</option>
                          <option value="purple">PURPLE Accent</option>
                          <option value="orange">ORANGE Accent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-black uppercase mb-0.5">SHORT DESCRIPTION</label>
                      <input 
                        type="text" 
                        required
                        value={newProjDesc}
                        onChange={(e) => setNewProjDesc(e.target.value)}
                        placeholder="E.G. A SECURE DATABASE WRAPPER BUILT ON NODEJS"
                        className="w-full brutalist-border-sm bg-white p-1.5 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-black uppercase mb-0.5">LONG DESCRIPTION / DETAIL PAGE</label>
                      <textarea 
                        value={newProjDetail}
                        onChange={(e) => setNewProjDetail(e.target.value)}
                        placeholder="DESCRIBE ARCHITECTURES, REQ FRAMEWORKS, AND UNIQUE FEATS..."
                        rows={2}
                        className="w-full brutalist-border-sm bg-white p-2 font-mono text-xs uppercase resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono font-black uppercase mb-0.5">TAGS (COMMA SEPR)</label>
                        <input 
                          type="text" 
                          value={newProjTags}
                          onChange={(e) => setNewProjTags(e.target.value)}
                          placeholder="HTML, NODE, REDUX"
                          className="w-full brutalist-border-sm bg-white p-1.5 font-mono text-xs uppercase"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-black uppercase mb-0.5">GITHUB REPO URL</label>
                        <input 
                          type="text" 
                          value={newProjUrl}
                          onChange={(e) => setNewProjUrl(e.target.value)}
                          placeholder="HTTPS://GITHUB.COM/..."
                          className="w-full brutalist-border-sm bg-white p-1.5 font-mono text-xs"
                        />
                      </div>
                    </div>

                    {/* Stats metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={newProjStat1Label} 
                          onChange={(e) => setNewProjStat1Label(e.target.value)}
                          placeholder="STAT 1 LABEL (E.G. STARS)" 
                          className="w-1/2 brutalist-border-sm bg-white p-1.5 font-mono text-[10px] uppercase"
                        />
                        <input 
                          type="text" 
                          value={newProjStat1Value} 
                          onChange={(e) => setNewProjStat1Value(e.target.value)}
                          placeholder="STAT 1 VALUE (E.G. 1.5K)" 
                          className="w-1/2 brutalist-border-sm bg-white p-1.5 font-mono text-[10px]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={newProjStat2Label} 
                          onChange={(e) => setNewProjStat2Label(e.target.value)}
                          placeholder="STAT 2 LABEL (E.G. RATING)" 
                          className="w-1/2 brutalist-border-sm bg-white p-1.5 font-mono text-[10px] uppercase"
                        />
                        <input 
                          type="text" 
                          value={newProjStat2Value} 
                          onChange={(e) => setNewProjStat2Value(e.target.value)}
                          placeholder="STAT 2 VALUE (E.G. 9.8)" 
                          className="w-1/2 brutalist-border-sm bg-white p-1.5 font-mono text-[10px]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-black text-white hover:bg-neo-green hover:text-black py-2.5 font-display text-xs font-black tracking-widest text-center uppercase brutalist-border w-full cursor-pointer hover:translate-x-[-1px] transition-all"
                    >
                      + COMPILE AND ADD PROJECT
                    </button>
                  </form>

                  {/* List check of existing projects */}
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] font-black uppercase text-stone-500 block">
                      CURRENT ARCHIVE DIRECTORY ({projectsList.length}) //
                    </span>

                    <div className="space-y-2">
                      {projectsList.map((p) => (
                        <div key={p.id} className="flex justify-between items-center bg-stone-50 brutalist-border-sm p-3">
                          <div>
                            <p className="font-display text-xs font-black uppercase text-black">{p.title}</p>
                            <p className="font-mono text-[10px] text-stone-500">{p.tags.join(' | ').toUpperCase()}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="p-1 px-2.5 bg-neo-pink hover:bg-black hover:text-white text-black font-mono font-bold text-xs brutalist-border-sm cursor-pointer"
                          >
                            DELETE
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Modify Skills */}
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <span className="font-mono text-[10px] font-black uppercase text-stone-500 block mb-2">
                    SKILL FLUENCY RATIOS //
                  </span>

                  <div className="space-y-4">
                    {skillsList.map((sk, idx) => (
                      <div key={sk.name} className="bg-stone-50 brutalist-border-sm p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <p className="font-display text-xs font-black uppercase">{sk.name}</p>
                          <p className="font-mono text-[10px] text-stone-500 uppercase">{sk.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            value={sk.level}
                            onChange={(e) => handleSkillLevelChange(idx, parseInt(e.target.value))}
                            className="bg-black text-black accent-black w-24 sm:w-32"
                          />
                          <span className="font-mono font-bold text-xs w-12 text-center bg-black text-white px-1.5 py-0.5">
                            {sk.level}/10
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Footer buttons of the control deck */}
            <div className="p-4 border-t-4 border-black bg-stone-50 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              <button
                onClick={resetToDefaults}
                className="bg-[#FAFAFA] text-black hover:bg-red-200 hover:text-red-700 py-2.5 px-4 font-mono text-[10px] font-black uppercase brutalist-border-sm flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                RESET ALL PORTFOLIO DIRECTORY VALUES
              </button>
              
              <button
                onClick={() => setShowEditor(false)}
                className="bg-black text-white hover:bg-neo-green hover:text-black py-2.5 px-6 font-display text-xs font-black tracking-widest uppercase brutalist-border flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                COMPLETE CUSTOMIZATION
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data';
import { FolderGit, ExternalLink, ArrowRight, Tag, X, Star, Calendar, Flame } from 'lucide-react';

interface ProjectShowcaseProps {
  projectsList?: Project[];
}

export default function ProjectShowcase({ projectsList = PROJECTS }: ProjectShowcaseProps) {
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Extract all unique tags
  const allTags = ['ALL', ...Array.from(new Set(projectsList.flatMap(p => p.tags)))];

  // Filter projects list
  const filteredProjects = selectedTag === 'ALL'
    ? projectsList
    : projectsList.filter(p => p.tags.includes(selectedTag));

  const getBrutalistColorClass = (color: string) => {
    switch (color) {
      case 'yellow': return 'bg-neo-yellow';
      case 'pink': return 'bg-neo-pink';
      case 'green': return 'bg-neo-green';
      case 'blue': return 'bg-neo-blue';
      case 'purple': return 'bg-neo-purple';
      case 'orange': return 'bg-neo-orange';
      default: return 'bg-white';
    }
  };

  return (
    <div className="w-full flex flex-col h-full bg-[#FAF6F0] brutalist-border p-6 brutalist-shadow bg-grid relative rounded-none">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-black pb-4 mb-6">
        <div>
          <h3 className="font-display text-xl md:text-2xl font-black uppercase text-black flex items-center gap-2">
            <FolderGit className="w-6 h-6" />
            ENGINEERED WORKS
          </h3>
          <p className="font-sans text-xs text-stone-600 uppercase mt-1">
            Browse open source code bases and experimental software solutions.
          </p>
        </div>

        {/* Tag Filter row */}
        <div className="flex flex-wrap gap-1.5 max-w-full">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1 font-mono text-[10px] md:text-xs font-bold uppercase brutalist-border-sm transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-black text-white hover:bg-stone-800'
                  : 'bg-white text-black hover:bg-neo-yellow'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {filteredProjects.map((project) => {
          const colorClass = getBrutalistColorClass(project.color);
          return (
            <div
              key={project.id}
              className={`brutalist-border bg-white brutalist-shadow text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between group overflow-hidden relative`}
            >
              {/* Top Banner accent */}
              <div className={`h-3 border-b-4 border-black ${colorClass}`} />

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title & Tags */}
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-display text-lg font-black uppercase group-hover:text-neo-orange transition-colors">
                      {project.title}
                    </h4>
                    <span className="shrink-0 p-1 bg-black text-white text-[9px] font-mono font-bold uppercase select-none">
                      #{project.id.slice(0,4)}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-stone-700 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Inline list of tags */}
                  <div className="flex flex-wrap gap-1 mb-5">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 font-mono text-[10px] font-bold uppercase bg-stone-100 brutalist-border-sm text-stone-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions footer */}
                  <div className="flex justify-between items-center border-t-2 border-black/15 pt-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-mono font-black uppercase flex items-center gap-1.5 hover:text-neo-orange group-hover:translate-x-0.5 transition-transform cursor-pointer"
                    >
                      EXPLORE ARCHIVE
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 px-2 border-2 border-black bg-stone-50 hover:bg-neo-yellow active:translate-y-0.5 transition-all text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      GITHUB
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Details Modal Drawer Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/65 z-50 flex items-center justify-center p-4 backdrop-blur-xs select-none">
          <div 
            className="w-full max-w-xl bg-[#FAF6F0] brutalist-border-md brutalist-shadow-lg text-black overflow-hidden relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Title bar */}
            <div className={`p-4 border-b-4 border-black flex justify-between items-center ${getBrutalistColorClass(selectedProject.color)}`}>
              <span className="font-display text-sm md:text-base font-black tracking-widest uppercase text-black flex items-center gap-2">
                <Flame className="w-5 h-5 fill-current" />
                DOCK ARCHIVE: {selectedProject.title}
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 bg-black text-white hover:bg-neo-orange hover:text-black border-2 border-black font-black flex items-center justify-center cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 select-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Contents */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              <div>
                <span className="font-mono text-[10px] font-black uppercase text-stone-500 block mb-1">
                  DETAILED FUNCTIONAL ARCHITECTURE //
                </span>
                <p className="font-sans text-xs md:text-sm text-stone-800 leading-relaxed uppercase">
                  {selectedProject.detailedText}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 border-4 border-black bg-white p-3 brutalist-shadow-sm">
                {selectedProject.stats.map((st, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center text-center p-1.5 border-r border-black/15 last:border-0">
                    <span className="font-mono text-[9px] font-black uppercase text-stone-500">
                      {st.label}
                    </span>
                    <span className="font-display text-xs md:text-sm font-black text-black mt-1 uppercase">
                      {st.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div>
                <span className="font-mono text-[10px] font-black uppercase text-stone-500 block mb-2">
                  CONSTRUCTED TECHNOLOGIES //
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 font-mono text-xs font-black uppercase bg-neo-yellow brutalist-border-sm text-black"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links action bar */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-black/15">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-black text-white hover:bg-neo-green hover:text-black py-2.5 font-display text-xs font-black tracking-widest text-center uppercase brutalist-border hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  PULL SOURCE REPO
                </a>
                <button
                  onClick={() => {
                    alert("DEMO LAUNCHED: Environment is pre-served inside standard sandbox state! ⬤");
                  }}
                  className="flex-1 bg-white text-black hover:bg-neo-orange hover:text-black py-2.5 font-display text-xs font-black tracking-widest text-center uppercase brutalist-border hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer border-black"
                >
                  <Star className="w-4 h-4 fill-current text-neo-yellow" />
                  LAUNCH PREVIEW
                </button>
              </div>
            </div>
            
            {/* Status bar */}
            <div className="bg-black text-[9px] font-mono text-stone-400 p-2 text-center uppercase">
              STATUS ACTIVE // COMPILED SECURELY ORG
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

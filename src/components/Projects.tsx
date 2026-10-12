import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { siteData } from '../data/site';
import { ExternalLink, ChevronRight, X } from 'lucide-react';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-void-200 relative explore-area" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-[10px] tracking-[0.2em] text-primary/40 mb-4 uppercase border-l border-primary/20 pl-4">
          02 // SELECTED WORK
        </h2>
        
        <h3 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter uppercase text-primary mb-8">
          SELECTED<br/>SYSTEMS
        </h3>

        <p className="font-sans text-sm md:text-base text-primary/60 font-light leading-relaxed max-w-xl mb-32">
          A collection of systems, interfaces and experiments built across backend engineering, full-stack development and applied AI.
        </p>
        
        <div className="flex flex-col gap-32 md:gap-48">
          {siteData.projects.map((project, index) => (
            <ProjectItem 
              key={project.id} 
              project={project} 
              index={index} 
              onExpand={() => setActiveProject(project.id)}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetail 
            project={siteData.projects.find(p => p.id === activeProject)!} 
            onClose={() => setActiveProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectItem({ project, index, onExpand }: { project: any, index: number, onExpand: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group project-card relative`}>
      
      {/* Huge Number */}
      <div className="absolute top-[-10%] left-0 text-[10rem] md:text-[20rem] font-display font-bold text-void-100 z-0 select-none opacity-50 tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.02)' }}>
        0{index + 1}
      </div>

      {/* Image Container with 3D Tilt */}
      <motion.div 
        className="w-full lg:w-3/5 h-[40vh] md:h-[60vh] relative overflow-hidden z-10 cursor-none"
        onClick={onExpand}
        whileHover={{ scale: 0.98, rotateX: 2, rotateY: isEven ? -2 : 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ perspective: 1000 }}
      >
        <motion.div 
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ y: yImage }}
        >
          {/* Subtle Light Sweep */}
          <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full group-hover:animate-[sweep_2s_ease-in-out_infinite] z-20 pointer-events-none" />
          
          <div className="absolute inset-0 bg-void-200/40 group-hover:bg-transparent transition-colors duration-700 z-10" />
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105 grayscale group-hover:grayscale-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%2305070D"/></svg>`;
            }}
          />
        </motion.div>
      </motion.div>

      {/* Details */}
      <div className={`w-full lg:w-2/5 flex flex-col justify-center z-10 ${isEven ? 'lg:items-start text-left' : 'lg:items-start text-left'}`}>
        <div className="font-mono text-[10px] text-cyan-400 mb-4 tracking-widest uppercase">
          PROJECT_{String(index + 1).padStart(2, '0')} // {project.subtitle}
        </div>
        
        <h3 className="font-display text-4xl md:text-5xl font-medium mb-6 leading-[0.9] tracking-tight group-hover:text-cyan-400 transition-colors duration-500">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tech: string) => (
            <span key={tech} className="font-mono text-[10px] text-primary/60 uppercase border border-primary/10 px-2 py-1 rounded-sm">
              {tech}
            </span>
          ))}
        </div>
        
        <p className="font-sans text-sm text-primary/60 mb-8 font-light leading-relaxed max-w-sm">
          {project.description}
        </p>

        <div className="flex items-center gap-6">
          <button 
            onClick={onExpand}
            className="font-mono text-xs text-primary hover:text-cyan-400 transition-colors tracking-widest uppercase flex items-center gap-2 group cursor-none"
          >
            VIEW DETAILS <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="w-[1px] h-4 bg-primary/20" />
          
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono text-xs text-primary/60 hover:text-cyan-400 transition-colors tracking-widest uppercase flex items-center gap-2 cursor-none"
          >
            GITHUB ↗
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onClose }: { project: any, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-void-100/90 backdrop-blur-md overflow-y-auto"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="relative w-full max-w-4xl bg-void-200 border border-primary/10 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-full my-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-void-100 rounded-full border border-primary/20 text-primary/60 hover:text-cyan-400 hover:border-cyan-400 transition-colors cursor-none"
        >
          <X className="w-4 h-4" />
        </button>
        
        {/* Image side */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative border-b md:border-b-0 md:border-r border-primary/10">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-void-200 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h4 className="font-display text-3xl font-medium tracking-tight mb-2">{project.title}</h4>
            <div className="font-mono text-[9px] text-cyan-400 tracking-widest uppercase">{project.subtitle}</div>
          </div>
        </div>

        {/* Content side */}
        <div className="w-full md:w-3/5 p-6 md:p-10 overflow-y-auto flex flex-col gap-8">
          
          <div>
            <div className="font-mono text-[10px] text-primary/40 uppercase tracking-widest mb-3 border-l border-primary/20 pl-3">PROBLEM</div>
            <p className="font-sans text-sm text-primary/80 font-light leading-relaxed">{project.details.problem}</p>
          </div>
          
          <div>
            <div className="font-mono text-[10px] text-primary/40 uppercase tracking-widest mb-3 border-l border-primary/20 pl-3">SOLUTION</div>
            <p className="font-sans text-sm text-primary/80 font-light leading-relaxed">{project.details.solution}</p>
          </div>

          <div>
            <div className="font-mono text-[10px] text-primary/40 uppercase tracking-widest mb-3 border-l border-primary/20 pl-3">ARCHITECTURE</div>
            <p className="font-sans text-sm text-primary/80 font-light leading-relaxed">{project.details.architecture}</p>
          </div>

          <div>
            <div className="font-mono text-[10px] text-primary/40 uppercase tracking-widest mb-3 border-l border-primary/20 pl-3">KEY FEATURES</div>
            <ul className="flex flex-col gap-2">
              {project.details.features.map((feature: string, i: number) => (
                <li key={i} className="font-sans text-sm text-primary/70 font-light flex gap-3">
                  <span className="text-cyan-500/50 mt-1">●</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] text-primary/40 uppercase tracking-widest mb-3 border-l border-primary/20 pl-3">TECH STACK</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string) => (
                <span key={tech} className="font-mono text-[10px] text-primary/60 uppercase border border-primary/10 px-2 py-1 rounded-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-primary/10 flex gap-6">
             <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[10px] text-primary hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-none"
            >
              GITHUB REPO
            </a>
            {project.link !== "#" && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[10px] text-primary hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-none"
              >
                <ExternalLink className="w-4 h-4" /> LIVE DEMO
              </a>
            )}
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

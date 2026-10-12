import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '../data/site';

// Group skills by category for the mobile view
const categories = ['Language', 'Framework', 'Database', 'Tools', 'Other'];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<typeof siteData.skills[0] | null>(null);

  // For constellation: use all skills
  const allSkills = siteData.skills;

  return (
    <section id="skills" className="py-32 md:py-48 px-6 bg-void-100 min-h-screen relative flex flex-col items-center justify-center overflow-hidden explore-area">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 mix-blend-screen architectural-grid" />

      <div className="w-full max-w-5xl mx-auto relative z-10">

        <h2 className="font-mono text-[10px] tracking-[0.2em] text-primary/40 mb-4 uppercase border-l border-primary/20 pl-4">
          03 // STACK
        </h2>

        {/* Mobile Editorial List (hidden on md+) */}
        <div className="md:hidden flex flex-col gap-12 mt-12">
          {categories.map(cat => {
            const catSkills = allSkills.filter(s => s.category === cat);
            if (catSkills.length === 0) return null;
            return (
              <div key={cat} className="flex flex-col gap-4">
                <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest border-l border-cyan-400/30 pl-3">{cat}</div>
                <div className="flex flex-wrap gap-2">
                  {catSkills.map(skill => (
                    <span key={skill.name} className="font-mono text-xs text-primary/70 border border-primary/10 px-3 py-1.5 rounded-sm hover:border-cyan-400/40 hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Futuristic Constellation (hidden on mobile) */}
        <div className="hidden md:flex relative items-center justify-center h-[650px] mt-0">

          {/* Center Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none flex flex-col items-center gap-2">
            <div className="font-display text-3xl tracking-widest text-primary/80">{siteData.profile.initials}</div>
            <div className="font-mono text-[8px] text-cyan-400 tracking-widest uppercase">SYSTEM</div>
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse mt-1" />
          </div>

          {/* Inner orbit ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-primary/5 rounded-full pointer-events-none" />
          {/* Outer orbit ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] border border-primary/5 rounded-full pointer-events-none border-dashed" />

          {/* Skill nodes scattered in two orbital layers */}
          {allSkills.map((skill, i) => {
            const total = allSkills.length;
            const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
            // Alternate inner/outer radius based on category
            const isInner = ['Framework', 'Database'].includes(skill.category);
            const baseRadius = isInner ? 150 : 260;
            const jitter = ((i * 37) % 30) - 15; // deterministic jitter
            const r = baseRadius + jitter;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            const isHovered = hoveredSkill?.name === skill.name;

            return (
              <motion.div
                key={skill.name}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-none"
                initial={{ x: 0, y: 0, opacity: 0 }}
                whileInView={{ x, y, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                onHoverStart={() => setHoveredSkill(skill)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <div className="relative group flex flex-col items-center">
                  {/* Dot */}
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full mb-1.5"
                    animate={{
                      backgroundColor: isHovered ? 'rgb(0, 217, 255)' : 'rgba(244, 247, 250, 0.2)',
                      scale: isHovered ? 1.8 : 1,
                      boxShadow: isHovered ? '0 0 12px rgba(0, 217, 255, 0.6)' : 'none'
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  {/* Label */}
                  <span className={`font-mono text-[9px] tracking-widest whitespace-nowrap transition-colors duration-200 ${isHovered ? 'text-cyan-400' : 'text-primary/35'}`}>
                    {skill.name}
                  </span>

                  {/* Connecting line to center (rendered when hovered) */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.svg
                        className="absolute top-1/2 left-1/2 pointer-events-none z-[-1]"
                        style={{
                          translateX: '-50%',
                          translateY: '-50%',
                          width: Math.abs(x) * 2 + 40,
                          height: Math.abs(y) * 2 + 40,
                          overflow: 'visible'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <line
                          x1="50%" y1="50%"
                          x2={`calc(50% - ${x}px)`} y2={`calc(50% - ${y}px)`}
                          stroke="rgba(0,217,255,0.25)"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Hover Info Panel */}
      <div className="hidden md:block absolute bottom-12 left-12 h-28 z-20">
        <AnimatePresence mode="wait">
          {hoveredSkill ? (
            <motion.div
              key={hoveredSkill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-2"
            >
              <div className="font-display text-2xl text-cyan-400 uppercase tracking-widest">{hoveredSkill.name}</div>
              <div className="font-mono text-[9px] text-primary/40 uppercase tracking-widest border-l border-primary/20 pl-2">{hoveredSkill.category}</div>
              <div className="font-sans text-xs text-primary/60 font-light max-w-[240px] mt-1">{hoveredSkill.description}</div>
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[9px] text-primary/20 uppercase tracking-widest"
            >
              HOVER A NODE TO EXPLORE
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category legend (desktop) */}
      <div className="hidden md:flex absolute bottom-12 right-12 flex-col gap-2 z-20">
        {categories.map(cat => (
          <div key={cat} className="flex items-center gap-2 font-mono text-[9px] text-primary/25 uppercase tracking-widest">
            <div className="w-1 h-1 rounded-full bg-primary/20" />
            {cat}
          </div>
        ))}
      </div>

    </section>
  );
}

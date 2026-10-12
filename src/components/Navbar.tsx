import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '../data/site';

const links = [
  { name: 'WORK', id: '01', href: '#projects' },
  { name: 'STACK', id: '02', href: '#skills' },
  { name: 'ABOUT', id: '03', href: '#about' },
  { name: 'EDUCATION', id: '04', href: '#education' },
  { name: 'CONTACT', id: '05', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="pointer-events-auto flex items-center justify-between md:justify-center gap-4 md:gap-8 px-6 py-3 rounded-full bg-void-100/40 backdrop-blur-xl border border-primary/10 transition-all duration-500 hover:border-primary/30 hover:bg-void-100/80 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        
        <a href="#home" className="font-display font-medium text-lg cursor-none tracking-tighter text-primary flex items-center gap-2">
          {siteData.profile.initials}
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-50" />
        </a>
        
        <div className="w-[1px] h-4 bg-primary/20 hidden md:block" />
        
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            const isHovered = hoveredLink === link.name;
            
            return (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="font-mono text-[9px] tracking-widest px-4 py-2 rounded-full transition-all duration-300 cursor-none relative group overflow-hidden"
              >
                {/* Active/Hover Background */}
                <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${isActive ? 'bg-primary/10' : 'bg-transparent group-hover:bg-primary/5'}`} />
                
                {/* Active Indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-1 rounded-full bg-cyan-400"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </AnimatePresence>

                <span className={`relative z-10 flex gap-2 transition-colors duration-300 ${isActive || isHovered ? 'text-primary' : 'text-primary/50'}`}>
                  <span className="opacity-40">{link.id}</span>
                  <span className={isHovered ? 'animate-pulse' : ''}>{link.name}</span>
                </span>
              </a>
            );
          })}
        </div>

        <div className="w-[1px] h-4 bg-primary/20 hidden md:block" />

        <a 
          href={siteData.resume} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center font-mono text-[9px] tracking-widest text-void-100 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-none uppercase px-4 py-2 rounded-full relative group overflow-hidden"
        >
          {/* Subtle button shine */}
          <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite] z-0" />
          <span className="relative z-10 flex items-center gap-1">RESUME ↗</span>
        </a>

      </nav>
    </motion.header>
  );
}

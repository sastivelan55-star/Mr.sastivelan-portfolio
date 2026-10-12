import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { siteData } from '../data/site';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll('.mask-line');
      
      gsap.fromTo(lines, 
        { y: 100, opacity: 0, rotateX: -20 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 1.5, 
          stagger: 0.15, 
          ease: 'power4.out', 
          delay: 0.2 
        }
      );
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen w-full flex items-center overflow-hidden bg-void-100">
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen architectural-grid" />
      <motion.div 
        className="absolute w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0"
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 2 }}
        style={{ top: '20%', right: '10%' }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row justify-between items-center h-full pt-32 pb-24 gap-12 lg:gap-0">
        
        {/* Left Column: Text Content */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center">
          
          {/* System Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-mono text-[10px] md:text-xs tracking-widest text-primary/40 uppercase mb-8 md:mb-12 flex flex-col gap-1 border-l border-primary/20 pl-4"
          >
            <span>{siteData.profile.initials} / SYSTEM 01</span>
            <span>{siteData.profile.role}</span>
            <span>CHENNAI / INDIA</span>
          </motion.div>

          {/* Name & Tagline */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="font-sans font-light text-2xl md:text-3xl text-primary/80 mb-4"
            >
              {siteData.profile.name.split(' ').map((part, i) => <div key={i}>{part}</div>)}
            </motion.div>
            
            {/* Massive Typography */}
            <div ref={headlineRef} className="font-display font-medium text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.9] tracking-tighter uppercase text-primary">
              <div className="overflow-hidden mask-reveal pb-2"><div className="mask-line origin-bottom">BUILDING</div></div>
              <div className="overflow-hidden mask-reveal pb-2"><div className="mask-line origin-bottom">BACKEND SYSTEMS &</div></div>
              <div className="overflow-hidden mask-reveal pb-2"><div className="mask-line origin-bottom text-cyan-400">AI-POWERED</div></div>
              <div className="overflow-hidden mask-reveal pb-2"><div className="mask-line origin-bottom">WEB APPS.</div></div>
            </div>
          </div>
          
          {/* Short Intro */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="font-sans text-sm md:text-base text-primary/60 max-w-md font-light leading-relaxed mb-12"
          >
            {siteData.about.heroIntro}
          </motion.p>

          {/* Actions & Status row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-16"
          >
            <div className="flex flex-col gap-4">
              <a href="#projects" className="font-mono text-xs text-primary hover:text-cyan-400 transition-colors tracking-widest uppercase flex items-center gap-2 group cursor-none">
                VIEW SELECTED WORK <span className="group-hover:translate-x-2 transition-transform">→</span>
              </a>
              <a href={siteData.resume} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-primary/60 hover:text-cyan-400 transition-colors tracking-widest uppercase flex items-center gap-2 cursor-none">
                DOWNLOAD RESUME ↗
              </a>
            </div>

            <div className="flex flex-col gap-2 border-l border-primary/20 pl-4">
              {siteData.profile.status.map((status, i) => (
                <div key={i} className="font-mono text-[9px] text-primary/40 tracking-widest uppercase flex items-center gap-2">
                  <span className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-cyan-500 animate-pulse' : 'bg-primary/20'}`} />
                  {status}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive Digital Identity Module */}
        <motion.div 
          className="w-full lg:w-2/5 relative h-[50vh] lg:h-[70vh] mt-12 lg:mt-0 flex justify-center lg:justify-end"
          style={{ opacity }}
        >
          <div className="relative w-full max-w-md h-full group">
            {/* Asymmetric Spatial Frame */}
            <div className="absolute -inset-4 border border-primary/10 group-hover:border-primary/20 transition-colors duration-700 z-0" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-cyan-500/50 z-20" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-cyan-500/50 z-20" />

            {/* Metadata Tags */}
            <div className="absolute -left-12 top-12 font-mono text-[8px] text-primary/30 uppercase tracking-widest -rotate-90 hidden lg:block">
              IDENTITY // {siteData.profile.initials}-001
            </div>
            <div className="absolute -right-8 bottom-24 font-mono text-[8px] text-primary/30 uppercase tracking-widest rotate-90 hidden lg:block">
              STATUS // AVAILABLE
            </div>

            {/* Main Image Container with Parallax & Reactivity */}
            <motion.div 
              className="relative w-full h-full overflow-hidden bg-void-200 z-10"
              animate={{
                x: mousePosition.x * -10,
                y: mousePosition.y * -10,
                rotateX: mousePosition.y * 5,
                rotateY: mousePosition.x * -5,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              style={{ perspective: 1000 }}
            >
              {/* Atmospheric Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent mix-blend-overlay z-20" />
              
              {/* Grain / Noise Overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none z-30 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

              {/* Scanning Light Sweep on Hover */}
              <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:animate-[sweep_2s_ease-in-out_infinite] z-20 pointer-events-none" />
              
              {/* Technical Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(244,247,250,0.03)_1px,transparent_1px)] bg-[size:100%_4px] z-20 pointer-events-none" />

              <img 
                src="/me.jpg" 
                alt={siteData.profile.name}
                className="w-full h-full object-cover object-center mix-blend-luminosity grayscale group-hover:grayscale-[0.5] contrast-125 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%2305070D"/></svg>';
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Hero Area / Information Rail */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-0 w-full border-t border-primary/10 bg-void-100/50 backdrop-blur-sm z-20 hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-12 flex justify-between items-center font-mono text-[9px] text-primary/40 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="animate-bounce">↓</span> SCROLL TO EXPLORE
          </div>
          
          <div className="flex items-center gap-8">
            <span>03 PROJECTS</span>
            <span className="w-1 h-1 bg-primary/20 rounded-full" />
            <span>10+ TECHNOLOGIES</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-[1px] bg-primary/10 overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-cyan-400/50 w-1/3"
                animate={{ x: ['-100%', '300%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </div>
            <span>2026 // AVAILABLE FOR WORK</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteData } from '../data/site';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="about" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-void-100 relative overflow-hidden" ref={containerRef}>

      <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-screen architectural-grid" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">

        {/* Left: Large editorial heading */}
        <div className="w-full lg:w-1/2">
          <h2 className="font-mono text-[10px] tracking-[0.2em] text-primary/40 mb-8 uppercase border-l border-primary/20 pl-4">
            03.5 // ABOUT
          </h2>
          <motion.div
            style={{ y }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter uppercase leading-[0.88] text-primary"
          >
            <div>I BUILD</div>
            <div className="text-primary/40">SYSTEMS THAT</div>
            <div className="text-primary/20">DO SOMETHING.</div>
          </motion.div>
        </div>

        {/* Right: Bio + metadata */}
        <div className="w-full lg:w-1/2 flex flex-col justify-end pt-0 lg:pt-24">

          {/* Bio — from resume professional summary */}
          <div className="font-sans text-base md:text-lg text-primary/70 leading-relaxed font-light mb-12">
            <p>
              I'm <span className="text-primary font-normal">{siteData.profile.fullName}</span>, a Computer Science student focused on backend and full-stack development.
            </p>
            <br />
            <p>
              I have hands-on experience building web applications and REST APIs using Python, Flask, React, Java, and Spring Boot — along with familiarity with databases, Git, Docker, and deploying live applications.
            </p>
            <br />
            <p className="text-primary/50">
              Looking for an entry-level opportunity to apply my skills and gain practical industry experience.
            </p>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-8 border-t border-primary/10 pt-10">

            <div className="flex flex-col gap-3">
              <div className="font-mono text-[9px] text-primary/40 uppercase tracking-widest border-l border-primary/20 pl-2">FOCUS</div>
              {siteData.about.metadata.focus.map((item) => (
                <div key={item} className="font-mono text-xs text-primary/70 uppercase tracking-widest">{item}</div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-mono text-[9px] text-primary/40 uppercase tracking-widest border-l border-primary/20 pl-2">CURRENTLY</div>
              {siteData.about.metadata.currently.map((item) => (
                <div key={item} className="font-mono text-xs text-primary/70 uppercase tracking-widest">{item}</div>
              ))}
            </div>

            <div className="col-span-2 flex flex-col gap-3 pt-4 border-t border-primary/5">
              <div className="font-mono text-[9px] text-primary/40 uppercase tracking-widest border-l border-primary/20 pl-2">LOCATION</div>
              <div className="font-mono text-xs text-primary/70 uppercase tracking-widest">{siteData.profile.location}</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

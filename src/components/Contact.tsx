import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '../data/site';
import { Mail, FileText } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 min-h-[90vh] flex flex-col justify-between bg-void-100 relative overflow-hidden">
      
      {/* Background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3 z-0" />

      <div className="flex-grow flex flex-col justify-center max-w-7xl mx-auto w-full relative z-10">
        
        <h2 className="font-mono text-[10px] tracking-[0.2em] text-primary/40 mb-12 uppercase border-l border-primary/20 pl-4">
          05 // CONTACT
        </h2>

        <div className="font-display font-medium text-5xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-tighter uppercase mb-24 text-primary">
          <div className="overflow-hidden mask-reveal pb-2"><div className="mask-line origin-bottom">LET'S</div></div>
          <div className="overflow-hidden mask-reveal pb-2"><div className="mask-line origin-bottom">BUILD</div></div>
          <div className="overflow-hidden mask-reveal pb-2"><div className="mask-line origin-bottom">SOMETHING</div></div>
          <div className="overflow-hidden mask-reveal pb-2"><div className="mask-line origin-bottom text-cyan-400">USEFUL.</div></div>
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 border-t border-primary/10 pt-16">
          
          <div className="flex flex-col gap-12">
            
            <div className="flex flex-col items-start gap-4">
              <span className="font-mono text-[10px] text-primary/40 uppercase tracking-widest">PRIMARY CONTACT</span>
              <button 
                onClick={handleCopyEmail}
                className="group font-sans text-2xl md:text-4xl text-primary font-light hover:text-cyan-400 transition-colors flex items-center gap-4 cursor-none relative"
              >
                {siteData.contact.email}
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] text-primary/40 uppercase tracking-widest">AVAILABLE FOR</span>
              <div className="flex flex-wrap gap-4">
                {siteData.contact.availableFor.map(item => (
                  <span key={item} className="font-mono text-[10px] text-primary/70 uppercase border border-primary/10 px-3 py-1.5 rounded-sm bg-primary/5">
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div className="flex flex-wrap gap-6 lg:gap-8">
            <button onClick={handleCopyEmail} className="flex items-center gap-2 font-mono text-[10px] text-primary/60 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-none group">
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" /> COPY EMAIL
            </button>
            <a href={siteData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-[10px] text-primary/60 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-none group">
              GITHUB ↗
            </a>
            <a href={siteData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-[10px] text-primary/60 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-none group">
              LINKEDIN ↗
            </a>
            <a href={siteData.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest cursor-none group relative">
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" /> RESUME ↗
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          </div>

        </div>
      </div>

      <footer className="w-full max-w-7xl mx-auto mt-32 flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[9px] text-primary/30 uppercase tracking-widest relative z-10 border-t border-primary/5 pt-8">
        <div className="flex items-center gap-6">
          <span className="text-primary/50 text-base">{siteData.profile.initials}</span>
          <div className="w-[1px] h-3 bg-primary/20" />
          <span>{siteData.profile.name}</span>
          <div className="hidden md:block w-[1px] h-3 bg-primary/20" />
          <span className="hidden md:block">{siteData.profile.role}</span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href={siteData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors cursor-none">GITHUB</a>
          <a href={siteData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors cursor-none">LINKEDIN</a>
          <button onClick={handleCopyEmail} className="hover:text-primary transition-colors cursor-none">EMAIL</button>
          <div className="w-[1px] h-3 bg-primary/20" />
          <span>&copy; {new Date().getFullYear()}</span>
        </div>

        <div className="text-primary/20 text-center md:text-right w-full md:w-auto">
          DESIGNED + BUILT BY {siteData.profile.name.toUpperCase()}
        </div>
      </footer>

      {/* Copy Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed bottom-12 left-1/2 px-6 py-3 bg-void-200/90 backdrop-blur-md border border-cyan-500/30 rounded-full z-[200] flex items-center gap-3 shadow-[0_0_20px_rgba(0,217,255,0.1)]"
          >
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest">EMAIL COPIED</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

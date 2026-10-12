import { siteData } from '../data/site';

export default function Education() {
  return (
    <section id="education" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-void-200 relative border-t border-primary/5">
      <div className="max-w-7xl mx-auto">

        <h2 className="font-mono text-[10px] tracking-[0.2em] text-primary/40 mb-16 uppercase border-l border-primary/20 pl-4">
          04 // EDUCATION &amp; CERTIFICATIONS
        </h2>

        <div className="flex flex-col lg:flex-row gap-24 lg:gap-32">

          {/* Education */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest mb-4">EDUCATION</div>
            {siteData.education.map((edu, index) => (
              <div key={index} className="group flex flex-col gap-4 pb-8 border-b border-primary/10 last:border-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                    {edu.degree}
                  </h3>
                  <div className="font-mono text-xs text-primary/40 tracking-widest shrink-0">
                    {edu.period}
                  </div>
                </div>
                <div className="font-sans text-sm text-primary/60 font-light">{edu.institution}</div>
                <div className="font-mono text-[10px] text-primary/40 uppercase tracking-widest">{edu.details}</div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest mb-4">CERTIFICATIONS</div>
            {siteData.certifications.map((cert, index) => (
              <div key={index} className="group flex flex-col gap-4 pb-8 border-b border-primary/10 last:border-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <div className="font-mono text-xs text-primary/40 tracking-widest shrink-0">{cert.date}</div>
                </div>
                <div className="font-sans text-sm text-primary/60 font-light">{cert.issuer}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cert.skills.map(skill => (
                    <span key={skill} className="font-mono text-[9px] text-primary/50 uppercase border border-primary/10 px-2 py-1 rounded-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Languages spoken */}
            <div className="mt-8 pt-8 border-t border-primary/10 flex flex-col gap-4">
              <div className="font-mono text-[9px] text-primary/40 uppercase tracking-widest border-l border-primary/20 pl-2">
                LANGUAGES SPOKEN
              </div>
              <div className="flex gap-4">
                {siteData.languages.map(lang => (
                  <span key={lang} className="font-mono text-xs text-primary/70 uppercase">{lang}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

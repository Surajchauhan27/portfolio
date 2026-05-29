import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { ArrowUpRight, Lock, Github, ExternalLink, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/config';

const ProjectCard = memo(function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  /* Spotlight */
  const onMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - r.left}px`);
    card.style.setProperty('--y', `${e.clientY - r.top}px`);
  }, []);

  /* 3D tilt */
  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia('(pointer:coarse)').matches) return;

    const onMove = (e) => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height / 2) / r.height) * -6;
      const ry = ((e.clientX - r.left - r.width  / 2) / r.width ) *  6;
      card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015,1.015,1.015)`;
    };
    const onLeave = () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card spotlight-card sr border-b border-gray-800/60 overflow-hidden relative transition-colors duration-500"
      style={{
        background: hovered ? `rgba(${project.accent === '#22d3ee' ? '34,211,238' : project.accent === '#f59e0b' ? '245,158,11' : project.accent === '#10b981' ? '16,185,129' : '139,92,246'},.012)` : 'transparent',
        transformStyle: 'preserve-3d',
        transitionProperty: 'background,box-shadow',
      }}
      data-delay={index * 80}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
    >

      {project.featured && (
        <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
          <Sparkles size={10} className="text-cyan-400" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400">Featured</span>
        </div>
      )}

      {/* Accent top-line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px transition-all duration-500"
        style={{ background: hovered ? `linear-gradient(90deg, transparent, ${project.accent}, transparent)` : 'transparent' }} />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 min-h-[340px] sm:min-h-[400px]">

        {/* Info */}
        <div className="col-span-1 md:col-span-6 p-6 sm:p-8 md:p-14 flex flex-col justify-center" style={{ transform: 'translateZ(14px)' }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">{project.emoji}</span>
            <span className="font-mono text-xs text-gray-700">{project.num}</span>
            <div className="h-px w-8" style={{ background: project.accent + '60' }} />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: project.accent }}>{project.category}</span>
          </div>

          <h3
            className="text-xl sm:text-2xl md:text-4xl font-black text-white mb-4 tracking-[-0.02em] transition-all duration-500"
            style={{ transform: hovered ? 'translateX(6px)' : 'translateX(0)' }}>
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 max-w-lg">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-7">
            {project.tools.map((t, j) => (
              <span key={j}
                className="px-3 py-1.5 bg-gray-900/80 border border-gray-800 rounded-lg font-mono text-[10px] text-gray-500 uppercase tracking-wider hover:border-gray-700 hover:text-gray-300 transition-all">
                {t}
              </span>
            ))}
          </div>

          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold transition-colors hover:underline"
              style={{ color: project.accent }}>
              <Github size={14} /> View on GitHub <ArrowUpRight size={13} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-gray-700 font-mono text-xs uppercase tracking-widest">
              <Lock size={12} /> Private Project
            </span>
          )}
        </div>

        {/* Image */}
        <div className="col-span-1 md:col-span-6 relative bg-gray-900/30 overflow-hidden min-h-[220px] sm:min-h-[280px]"
          style={{ transform: 'translateZ(6px)' }}>
          <img src={project.image} alt={project.title}
            className="project-img w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            style={{ opacity: hovered ? .55 : .2 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden" />

          {/* Category badge overlay */}
          <div className="absolute bottom-5 right-5 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md border transition-all duration-500"
            style={{
              background: hovered ? `${project.accent}18` : 'rgba(0,0,0,.4)',
              borderColor: hovered ? `${project.accent}40` : 'rgba(255,255,255,.06)',
            }}>
            <span className="text-lg">{project.emoji}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">{project.category}</span>
          </div>

          {/* Hover play button */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: project.accent,
              opacity: hovered ? 1 : 0,
              transform: `translate(-50%,-50%) scale(${hovered ? 1 : .6})`,
            }}>
            <ArrowUpRight size={22} className="text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}); // end memo(ProjectCard)

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        sectionRef.current?.querySelectorAll('.sr:not(.in)').forEach((el, i) => {
          setTimeout(() => el.classList.add('in'), parseInt(el.dataset.delay || 0));
        });
      }
    }, { threshold: 0.04 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="bg-black border-b border-gray-800 scroll-mt-20">

      {/* Header */}
      <div className="px-4 sm:px-6 md:px-12 py-14 sm:py-16 md:py-20 flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-800 sr gap-4">
        <div>
          <span className="section-num">03 / Selected Work</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-[-0.04em] text-white">Projects</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md">
            Data analysis, AI, and visualization projects built with real-world data.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/30">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{PROJECTS.length} Projects</span>
          </div>
        </div>
      </div>

      {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}

      {/* Bottom CTA */}
      <div className="py-14 sm:py-20 flex flex-col items-center gap-4 sr">
        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-600">More on GitHub</p>
        <a href="https://github.com/Surajchauhan27" target="_blank" rel="noreferrer"
          className="group flex items-center gap-3 border border-gray-700 hover:border-cyan-500/50 text-gray-300 hover:text-white px-10 py-4 rounded-full font-bold text-sm transition-all hover:bg-gray-900">
          <Github size={16} />
          Explore All Repositories
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}

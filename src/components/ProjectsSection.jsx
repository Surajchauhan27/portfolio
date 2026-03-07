import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Lock, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    num: '01', category: 'AI · Python', title: 'AuraBot AI Assistant',
    description: 'An intelligent AI assistant built in Python that functions like a personal ChatGPT — answering questions, handling automation tasks, and integrating with external APIs.',
    tools: ['Python','OpenAI API','Automation','APIs'],
    github: 'https://github.com/Surajchauhan27', live: null, featured: true,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1069e702b-1772175188279.png',
  },
  {
    num: '02', category: 'Power BI · Excel', title: 'Sales Analysis Dashboard',
    description: 'An interactive Power BI dashboard surfacing monthly revenue trends, top-performing SKUs, and growth opportunities from raw sales data.',
    tools: ['Power BI','Excel','DAX','Data Modeling'],
    github: null, live: null,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c1d78923-1772145230121.png',
  },
  {
    num: '03', category: 'Excel · Power Query', title: 'Data Cleaning Project',
    description: 'Transformed raw, messy datasets into structured, analysis-ready formats using advanced Excel techniques, Power Query automation, and VBA scripting.',
    tools: ['Excel','Power Query','VBA','Data Wrangling'],
    github: null, live: null,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f9625c89-1772374872325.png',
  },
  {
    num: '04', category: 'Python · Pandas', title: 'Python EDA Project',
    description: 'Exploratory data analysis using Pandas and Matplotlib to uncover hidden correlations, outliers, and trends from real-world datasets with visual storytelling.',
    tools: ['Python','Pandas','Matplotlib','NumPy'],
    github: null, live: null,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11f50ba4a-1772374872730.png',
  },
];

function ProjectCard({ project, index }) {
  const cardRef  = useRef(null);
  const [hovered, setHovered] = useState(false);

  /* per-card tilt on desktop */
  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia('(pointer:coarse)').matches) return;

    const onMove = (e) => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height/2) / r.height) * -7;
      const ry = ((e.clientX - r.left - r.width /2) / r.width ) *  7;
      card.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.018,1.018,1.018)`;
    };
    const onLeave = () => {
      card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <div ref={cardRef}
      className="sr border-b border-gray-800/60 overflow-hidden relative transition-colors duration-500"
      style={{
        transitionProperty: 'background,box-shadow',
        background: hovered ? 'rgba(34,211,238,.012)' : 'transparent',
        boxShadow: hovered ? '0 0 60px rgba(34,211,238,.04)' : 'none',
        transformStyle: 'preserve-3d',
      }}
      data-delay={index * 80}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {project.featured && (
        <div className="absolute top-5 right-5 sm:top-8 sm:right-10 z-30">
          <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono text-[9px] uppercase tracking-widest text-cyan-400">
            Featured
          </span>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 min-h-[340px] sm:min-h-[380px]">

        {/* Info */}
        <div className="col-span-1 md:col-span-6 p-6 sm:p-8 md:p-14 flex flex-col justify-center" style={{ transform: 'translateZ(12px)' }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-gray-700">{project.num}</span>
            <div className="h-px w-8 bg-cyan-500/30" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">{project.category}</span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-white mb-4 tracking-[-0.02em] transition-all duration-500"
            style={{ transform: hovered ? 'translateX(6px)' : 'translateX(0)' }}>
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 max-w-lg">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tools.map((t, j) => (
              <span key={j} className="px-2.5 py-1 bg-gray-900 border border-gray-800 rounded-lg font-mono text-[10px] text-gray-500 uppercase tracking-wider hover:border-cyan-500/30 hover:text-cyan-400 transition-all">
                {t}
              </span>
            ))}
          </div>

          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
              <Github size={14} /> View on GitHub <ArrowUpRight size={13} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-gray-700 font-mono text-xs uppercase tracking-widest">
              <Lock size={12} /> Private Project
            </span>
          )}
        </div>

        {/* Image */}
        <div className="col-span-1 md:col-span-6 relative bg-gray-900/30 overflow-hidden min-h-[200px] sm:min-h-[260px]"
          style={{ transform: 'translateZ(6px)' }}>
          <img src={project.image} alt={project.title}
            className="w-full h-full object-cover transition-all duration-700"
            style={{ opacity: hovered ? .5 : .22, transform: hovered ? 'scale(1.05)' : 'scale(1.02)' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center transition-all duration-500"
            style={{ opacity: hovered ? 1 : 0, transform: `translate(-50%,-50%) scale(${hovered ? 1 : .7})` }}>
            <ArrowUpRight size={20} className="text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        sectionRef.current.querySelectorAll('.sr:not(.in)').forEach((el, i) => {
          setTimeout(() => el.classList.add('in'), parseInt(el.dataset.delay || 0));
        });
      }
    }, { threshold: 0.04 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="bg-black border-b border-gray-800 scroll-mt-20">

      <div className="px-4 sm:px-6 md:px-12 py-14 sm:py-16 md:py-20 flex justify-between items-end border-b border-gray-800 sr">
        <div>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-cyan-400 block mb-3">03 / Selected Work</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-[-0.04em] text-white">Projects</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md">
            Data analysis, AI, and visualization projects built with real-world data.
          </p>
        </div>
        <span className="font-mono text-xs text-gray-700 hidden md:block">{projects.length} projects</span>
      </div>

      {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}

      <div className="py-14 sm:py-16 md:py-20 flex justify-center sr">
        <a href="https://github.com/Surajchauhan27" target="_blank" rel="noreferrer"
          className="group flex items-center gap-3 border border-gray-700 hover:border-cyan-500/50 text-gray-300 hover:text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm transition-all hover:bg-gray-900">
          <Github size={15} />
          Explore All Repositories
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}

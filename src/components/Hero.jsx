import React, { useEffect, useRef, useState } from 'react';
import { generateResumePDF } from '../utils/generateResume';

const heroImages = [
  { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a9da76e1-1766910587676.png', alt: 'Data analyst' },
  { src: 'https://images.unsplash.com/photo-1618422168439-4b03d3a05b15?w=1400&q=80',        alt: 'Python code' },
  { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bae23a0e-1772222560515.png', alt: 'Data charts' },
];

const stats = [
  { value: '4+',  label: 'Projects Built'  },
  { value: '6+',  label: 'Tools Mastered'  },
  { value: 'BCA', label: 'Graduate'         },
];

export default function HeroSection() {
  const carouselRef = useRef(0);
  const slidesRef   = useRef([]);
  const [mousePos, setMousePos]     = useState({ x: 0, y: 0 });
  const [visible, setVisible]       = useState(false);
  const [currentSlide, setSlide]    = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });

    const slides = slidesRef.current;
    if (slides[0]) slides[0].classList.add('opacity-100');

    const iv = setInterval(() => {
      if (!slides[carouselRef.current]) return;
      slides[carouselRef.current].classList.replace('opacity-100','opacity-0');
      carouselRef.current = (carouselRef.current + 1) % slides.length;
      slides[carouselRef.current].classList.replace('opacity-0','opacity-100');
      setSlide(carouselRef.current);
    }, 5000);

    return () => { clearTimeout(t); clearInterval(iv); window.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <section className="relative min-h-screen grid grid-cols-1 md:grid-cols-12 border-b border-gray-800 bg-black overflow-hidden">

      {/* Mouse glow */}
      <div className="pointer-events-none absolute inset-0 z-30 opacity-25 hidden md:block"
        style={{ background: `radial-gradient(650px at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,.13), transparent 68%)` }} />

      {/* Grid texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.028]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Glowing top border */}
      <div className="absolute top-0 inset-x-0 h-px z-20"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(34,211,238,.5),transparent)' }} />

      {/* ─── LEFT carousel ─── */}
      <div className="col-span-1 md:col-span-9 relative overflow-hidden bg-black min-h-[65vh] md:min-h-screen">
        {heroImages.map((img, i) => (
          <div key={i} ref={el => slidesRef.current[i] = el}
            className="absolute inset-0 transition-opacity duration-1000 opacity-0">
            <img src={img.src} alt={img.alt}
              className="w-full h-full object-cover object-center opacity-20 scale-105" />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t  from-black via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r  from-transparent to-black/55 z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 sm:p-8 md:p-16 pt-24 sm:pt-28 md:pt-32">

          {/* Badges */}
          <div className={`flex flex-wrap items-center gap-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-green-500/30 bg-green-500/5 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-green-400">Available for Hire</span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-gray-800 bg-black/40 backdrop-blur-sm">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-gray-500">Haldwani, Uttarakhand</span>
            </div>
          </div>

          {/* Headline + CTAs */}
          <div>
            <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.38em] text-cyan-400 mb-4">Data & Research Analyst</p>
              <h1 className="text-[clamp(3rem,9vw,8.5rem)] font-black leading-[0.83] tracking-[-0.04em] text-white mb-1">Suraj</h1>
              <h1 className="text-[clamp(3rem,9vw,8.5rem)] font-black leading-[0.83] tracking-[-0.04em]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">Singh</span>
              </h1>
              <h1 className="text-[clamp(3rem,9vw,8.5rem)] font-black leading-[0.83] tracking-[-0.04em] text-gray-700">Chauhan</h1>
            </div>

            {/* Skill chips */}
            <div className={`flex flex-wrap gap-2 mt-6 sm:mt-8 transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {['Python','Power BI','Excel','Data Visualization','Research'].map(s => (
                <span key={s}
                  className="px-3 py-1.5 border border-gray-700/60 rounded-full text-[9px] sm:text-[10px] uppercase tracking-widest font-mono text-gray-400 bg-gray-900/50 backdrop-blur-sm hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-default">
                  {s}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className={`flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a href="#projects"
                className="group btn-glow bg-cyan-500 hover:bg-cyan-400 text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                View Projects
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <button onClick={generateResumePDF}
                className="group flex items-center gap-2 bg-gray-900/80 backdrop-blur-md border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-800 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm transition-all">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Photo */}
        <div className="absolute bottom-10 right-5 sm:bottom-14 sm:right-10 md:bottom-16 md:right-16 z-20 hidden sm:block">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-60 transition-all duration-700" />
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gray-800 bg-gray-900">
              <img src="/assets/assets/my-photo.jpg.png" alt="Suraj Singh Chauhan"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                onError={e => e.target.src='https://ui-avatars.com/api/?name=SC&background=0a0f1e&color=22d3ee&size=200&bold=true'} />
            </div>
            <div className="absolute bottom-1 right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-green-400 border-[3px] border-black animate-pulse shadow-lg" />
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-5 sm:bottom-8 sm:left-8 md:left-16 z-20 flex gap-2">
          {heroImages.map((_,i) => (
            <div key={i} className={`h-0.5 rounded-full transition-all duration-500 ${i===currentSlide?'w-8 bg-cyan-400':'w-3 bg-gray-700'}`} />
          ))}
        </div>
      </div>

      {/* ─── RIGHT stats ─── */}
      <div className="col-span-1 md:col-span-3 flex md:flex-col bg-[#030303] border-l border-gray-800/50">
        {stats.map((stat, i) => (
          <div key={i}
            className={`tilt flex-1 p-6 sm:p-8 border-b border-gray-800/40 flex flex-col justify-center items-center md:items-start group cursor-default transition-all duration-500 hover:bg-cyan-500/[0.025] ${visible?'opacity-100 translate-x-0':'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: `${600+i*150}ms` }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-700 mb-2">0{i+1}</div>
            <h2 className="tilt-inner text-3xl sm:text-4xl md:text-5xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-[-0.04em] mb-1">
              {stat.value}
            </h2>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-600 group-hover:text-gray-400 transition-colors">
              {stat.label}
            </span>
          </div>
        ))}

        <div className="p-8 flex flex-col items-center gap-2 opacity-25">
          <div className="w-px h-10 bg-gradient-to-b from-cyan-600 to-transparent animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-gray-600">Scroll</span>
        </div>
      </div>
    </section>
  );
}

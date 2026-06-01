import React, { useRef, useEffect, useState } from 'react';
import { Github, ExternalLink, ArrowRight, Code2, Zap, Star } from 'lucide-react';

/* ─── Project Data ──────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: 'Blinkit Sales Analysis',
    subtitle: 'Power BI Dashboard',
    category: 'Data Analytics',
    emoji: '🛒',
    accent: '#F4845F',
    gradient: 'linear-gradient(135deg, #F4845F 0%, #e85d2f 100%)',
    image: '/blinkit_dashboard.png',
    description: 'Analyzed 10,000+ rows of grocery sales data. Built interactive Power BI dashboard with ETL, KPI metrics, revenue analysis, and outlet size comparison.',
    tools: ['Power BI', 'SQL', 'Excel', 'Python'],
    github: 'https://github.com/Surajchauhan27/blinkit-sales-analysis',
    live: 'https://surajchauhan27.github.io/blinkit-sales-analysis',
    stats: [{ label: 'Rows', value: '10K+' }, { label: 'KPIs', value: '12' }],
    tag: 'ANALYTICS',
  },
  {
    id: 2,
    title: 'Netflix Data Insights',
    subtitle: 'Python · EDA',
    category: 'Data Science',
    emoji: '🎬',
    accent: '#6BBF7A',
    gradient: 'linear-gradient(135deg, #6BBF7A 0%, #3a9e52 100%)',
    image: '/netflix_analysis.png',
    description: 'Cleaned and analyzed 5,500+ Netflix records. Created 12+ visual charts mapping genre popularity, age ratings, releases, and recommendation patterns.',
    tools: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    github: 'https://github.com/Surajchauhan27/netflix-analytics',
    live: 'https://surajchauhan27.github.io/netflix-analytics/',
    stats: [{ label: 'Records', value: '5.5K' }, { label: 'Charts', value: '12+' }],
    tag: 'EDA',
  },
  {
    id: 3,
    title: 'AuraBot AI Chatbot',
    subtitle: 'React · Node · AI',
    category: 'Full-Stack AI',
    emoji: '🤖',
    accent: '#E882B4',
    gradient: 'linear-gradient(135deg, #E882B4 0%, #c44b8e 100%)',
    image: '/aurabot_chatbot.png',
    description: 'Futuristic full-stack AI chatbot with telemetry analytics, AI response synthesis, mock conversational AI mode, and interactive responsive UI.',
    tools: ['React.js', 'Node.js', 'AI APIs', 'JavaScript'],
    github: 'https://github.com/Surajchauhan27/AI-chatbot',
    live: 'https://ai-chatbot2k.netlify.app',
    stats: [{ label: 'Users', value: 'Live' }, { label: 'AI Mode', value: 'ON' }],
    tag: 'AI · FULL-STACK',
  },
  {
    id: 4,
    title: 'Web Portfolio & BI',
    subtitle: 'React · Vite · Power BI',
    category: 'Web Development',
    emoji: '📊',
    accent: '#6EB5FF',
    gradient: 'linear-gradient(135deg, #6EB5FF 0%, #3a85e8 100%)',
    image: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    description: 'Modern, fully responsive web portfolios and dynamic visual dashboards integrating custom animations, charts, and API integrations.',
    tools: ['React.js', 'Tailwind CSS', 'Vite', 'Power BI'],
    github: 'https://github.com/Surajchauhan27',
    live: 'https://github.com/Surajchauhan27',
    stats: [{ label: 'Projects', value: '10+' }, { label: 'Stack', value: 'React' }],
    tag: 'WEB · BI',
  },
];

/* ─── Flip Card ─────────────────────────────────────────────── */
function FlipCard({ project, index, inView }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{
        height: '480px',
        perspective: '1400px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(70px) scale(0.9)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 130}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 130}ms`,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
      role="article"
      aria-label={project.title}
    >
      {/* Inner flipper */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.72s cubic-bezier(0.4, 0.2, 0.2, 1)',
          willChange: 'transform',
        }}
      >

        {/* ════ FRONT FACE ════ */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '20px',
            overflow: 'hidden',
            background: '#08080f',
            border: `1px solid ${project.accent}28`,
            boxShadow: `0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px ${project.accent}10`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', height: '58%', overflow: 'hidden', flexShrink: 0 }}>
            <img
              src={project.image}
              alt={project.title}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
            />
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to bottom, rgba(0,0,0,0) 45%, #08080f 100%)`,
              pointerEvents: 'none',
            }} />
            {/* Tag badge */}
            <div style={{
              position: 'absolute', top: 12, left: 12,
              background: `${project.accent}22`,
              border: `1px solid ${project.accent}50`,
              borderRadius: '999px', padding: '4px 11px',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px', fontWeight: 700,
                letterSpacing: '0.15em', color: project.accent,
                textTransform: 'uppercase',
              }}>{project.tag}</span>
            </div>
            {/* Emoji */}
            <span style={{
              position: 'absolute', top: 10, right: 12,
              fontSize: '22px',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
            }}>{project.emoji}</span>
          </div>

          {/* Text */}
          <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px', letterSpacing: '0.2em',
                color: project.accent, textTransform: 'uppercase', opacity: 0.75, marginBottom: 6,
              }}>{project.category}</div>
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '17px', fontWeight: 800, color: '#fff',
                margin: '0 0 4px', lineHeight: 1.2, letterSpacing: '-0.02em',
              }}>{project.title}</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px', color: 'rgba(255,255,255,0.4)',
                margin: 0,
              }}>{project.subtitle}</p>
            </div>
            {/* Hover hint */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 12 }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                border: `1px solid ${project.accent}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: project.accent, opacity: 0.7 }} />
              </div>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em',
              }}>HOVER TO EXPLORE</span>
            </div>
          </div>

          {/* Bottom accent */}
          <div style={{ height: '2px', background: project.gradient, flexShrink: 0 }} />
        </div>

        {/* ════ BACK FACE ════ */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'linear-gradient(150deg, #0e0e1a 0%, #090910 100%)',
            border: `1px solid ${project.accent}45`,
            boxShadow: `0 0 0 1px ${project.accent}15, 0 16px 56px ${project.accent}22`,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            gap: '12px',
          }}
        >
          {/* Top accent bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: project.gradient, borderRadius: '20px 20px 0 0',
          }} />

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '10px',
              background: `${project.accent}18`,
              border: `1px solid ${project.accent}35`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', flexShrink: 0,
            }}>{project.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '8px', color: project.accent,
                letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7,
              }}>PROJECT</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px', fontWeight: 800, color: '#fff',
                lineHeight: 1.2, letterSpacing: '-0.01em',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{project.title}</div>
            </div>
            <div style={{
              background: `${project.accent}18`,
              border: `1px solid ${project.accent}35`,
              borderRadius: '8px', padding: '5px 6px',
              flexShrink: 0,
            }}>
              <Zap size={11} color={project.accent} />
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${project.accent}35, transparent)` }} />

          {/* Stats */}
          <div style={{ display: 'flex', gap: 8 }}>
            {project.stats.map((s, i) => (
              <div key={i} style={{
                flex: 1, background: `${project.accent}0e`,
                border: `1px solid ${project.accent}22`,
                borderRadius: '10px', padding: '8px 6px', textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px', fontWeight: 800, color: project.accent, lineHeight: 1,
                }}>{s.value}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '8px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.08em', marginTop: 3,
                }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px', color: 'rgba(255,255,255,0.68)',
            lineHeight: 1.6, margin: 0, flex: 1,
          }}>{project.description}</p>

          {/* Tools */}
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px', color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 7,
            }}>STACK</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {project.tools.map(tool => (
                <span key={tool} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px', fontWeight: 700,
                  color: project.accent,
                  background: `${project.accent}10`,
                  border: `1px solid ${project.accent}28`,
                  borderRadius: '5px', padding: '3px 7px',
                  letterSpacing: '0.04em',
                }}>{tool}</span>
              ))}
            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="proj-btn-ghost"
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px', padding: '10px 8px',
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                transition: 'background 0.2s, border-color 0.2s',
                cursor: 'pointer',
              }}
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="proj-btn-live"
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: project.gradient,
                border: `1px solid ${project.accent}80`,
                borderRadius: '10px', padding: '10px 8px',
                color: '#fff',
                textDecoration: 'none',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                boxShadow: `0 4px 18px ${project.accent}35`,
                transition: 'opacity 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
            >
              <ExternalLink size={13} />
              <span>Live Demo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section Header ────────────────────────────────────────── */
function SectionHeader({ inView }) {
  return (
    <div style={{
      textAlign: 'center', marginBottom: '64px',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(34,211,238,0.08)',
        border: '1px solid rgba(34,211,238,0.2)',
        borderRadius: '999px', padding: '6px 16px', marginBottom: '22px',
      }}>
        <Code2 size={12} color="#22d3ee" />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px', fontWeight: 700,
          color: '#22d3ee', letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>Selected Work</span>
        <div style={{
          width: 6, height: 6, borderRadius: '50%', background: '#22d3ee',
          animation: 'pulse-proj 2s ease-in-out infinite',
        }} />
      </div>

      <h2 style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 'clamp(38px, 7vw, 78px)',
        fontWeight: 900, color: '#fff',
        margin: '0 0 14px', lineHeight: 1, letterSpacing: '-0.03em',
      }}>
        Featured{' '}
        <span style={{
          background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>Projects</span>
      </h2>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 'clamp(13px, 1.6vw, 16px)',
        color: 'rgba(255,255,255,0.42)',
        margin: '0 auto', maxWidth: '460px', lineHeight: 1.65,
      }}>
        Hover each card to flip and explore the description, stack &amp; live links
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 24 }}>
        <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.4))' }} />
        <Star size={10} color="rgba(34,211,238,0.5)" fill="rgba(34,211,238,0.5)" />
        <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, rgba(34,211,238,0.4), transparent)' }} />
      </div>
    </div>
  );
}

/* ─── Main Export ───────────────────────────────────────────── */
export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#000',
        padding: 'clamp(80px, 10vw, 130px) clamp(16px, 5vw, 80px)',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @keyframes pulse-proj {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(34,211,238,0.6); }
          50% { opacity: 0.7; transform: scale(1.25); box-shadow: 0 0 0 5px rgba(34,211,238,0); }
        }
        @keyframes orb-drift-a {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -30px); }
        }
        @keyframes orb-drift-b {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 25px); }
        }
        .proj-btn-ghost:hover {
          background: rgba(255,255,255,0.12) !important;
          border-color: rgba(255,255,255,0.28) !important;
        }
        .proj-btn-live:hover {
          opacity: 0.88 !important;
          transform: translateY(-1px) !important;
        }
      `}</style>

      {/* Ambient orbs */}
      <div style={{
        position: 'absolute', top: '8%', left: '-8%',
        width: '550px', height: '550px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.045) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none',
        animation: 'orb-drift-a 16s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '-5%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
        animation: 'orb-drift-b 20s ease-in-out infinite',
      }} />

      {/* Cyber grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(34,211,238,0.022) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,211,238,0.022) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader inView={inView} />

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(270px, 100%), 1fr))',
          gap: 'clamp(16px, 2.5vw, 26px)',
          alignItems: 'start',
        }}>
          {PROJECTS.map((project, i) => (
            <FlipCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: 'center', marginTop: 60,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease 650ms, transform 0.7s ease 650ms',
        }}>
          <a
            href="https://github.com/Surajchauhan27"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(34,211,238,0.07)',
              border: '1px solid rgba(34,211,238,0.22)',
              borderRadius: '999px', padding: '14px 30px',
              color: '#22d3ee', textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px', fontWeight: 600,
              letterSpacing: '0.02em',
              transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(34,211,238,0.13)';
              e.currentTarget.style.borderColor = 'rgba(34,211,238,0.45)';
              e.currentTarget.style.boxShadow = '0 0 28px rgba(34,211,238,0.18)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(34,211,238,0.07)';
              e.currentTarget.style.borderColor = 'rgba(34,211,238,0.22)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Github size={16} />
            View All Projects on GitHub
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

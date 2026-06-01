import { Mail, Twitter, Github } from 'lucide-react';

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4';

const socialLinks = [
  { icon: Mail,    label: 'Mail'    },
  { icon: Twitter, label: 'Twitter' },
  { icon: Github,  label: 'Github'  },
];

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden rounded-b-[32px]">
      {/* Background video */}
      <video
        src={HERO_VIDEO}
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/30" />

      {/* Content */}
      <div className="relative z-10 max-w-[1831px] mx-auto px-5 sm:px-8 md:px-12 h-full flex flex-col">

        {/* ── Header ── */}
        <div className="flex items-center justify-between pt-7 sm:pt-9">

          {/* Logo */}
          <span
            className="text-cream text-base uppercase tracking-widest"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            Orbis.Nft
          </span>

          {/* Desktop Nav */}
          <nav
            className="liquid-glass hidden lg:flex items-center gap-2 rounded-[28px] px-[52px] py-[24px]"
          >
            {['Homepage', 'Gallery', 'Buy NFT', 'FAQ', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-cream/80 hover:text-neon transition-colors duration-200 px-4 text-[13px] uppercase"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Desktop Social Icons */}
          <div className="hidden lg:flex flex-col gap-2">
            {socialLinks.map(({ icon: Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="liquid-glass w-14 h-14 flex items-center justify-center rounded-[1rem] text-cream hover:bg-white/10 transition-all duration-200"
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>

        {/* ── Hero Copy ── */}
        <div className="flex-1 flex flex-col justify-center lg:ml-32">
          <div className="relative max-w-[780px]">
            <h1
              className="text-cream uppercase leading-[1.05] md:leading-[1] text-[40px] sm:text-[60px] md:text-[75px] lg:text-[90px]"
              style={{ fontFamily: 'Anton, sans-serif' }}
            >
              Beyond earth
              <br />
              and ( its ) familiar
              <br />
              boundaries
            </h1>

            {/* Cursive accent */}
            <span
              className="absolute -right-4 sm:right-0 top-2 sm:top-4 text-neon -rotate-1 opacity-90 mix-blend-exclusion text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] pointer-events-none select-none"
              style={{ fontFamily: 'Condiment, cursive' }}
            >
              Nft collection
            </span>
          </div>

          {/* Mobile Social Icons */}
          <div className="flex lg:hidden gap-3 mt-8">
            {socialLinks.map(({ icon: Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="liquid-glass w-14 h-14 flex items-center justify-center rounded-[1rem] text-cream hover:bg-white/10 transition-all duration-200"
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

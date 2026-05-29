import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle, Send, Mail, Linkedin, Github, ExternalLink, MapPin, Clock, Sparkles } from 'lucide-react';
import { useSpotlight, useSafeTimeout } from '../hooks/useEffects';
import { PERSONAL, SOCIALS } from '../data/config';

/* Icon map — keeps data file clean of React imports */
const ICON_MAP = { Mail, Linkedin, Github };

export default function ContactSection() {
  const [form, setForm]           = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState(false);
  const [focused, setFocused]     = useState(null);
  const [sending, setSending]     = useState(false);

  const sectionRef = useRef(null);

  // ✅ FIXED: spotlight extracted from 4-component copy-paste into single hook
  useSpotlight(sectionRef);

  // ✅ FIXED: safe timeout — auto-clears on unmount, no setState on dead component
  const safeTimeout = useSafeTimeout();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const keysReady =
      SERVICE_ID  && !SERVICE_ID.includes('your_') &&
      TEMPLATE_ID && !TEMPLATE_ID.includes('your_') &&
      PUBLIC_KEY  && !PUBLIC_KEY.includes('your_');

    if (!keysReady) {
      /* Fallback: open email client with message pre-filled */
      const subject = encodeURIComponent(form.subject || `Portfolio message from ${form.name}`);
      const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
      window.open(`mailto:${PERSONAL.email}?subject=${subject}&body=${body}`, '_blank');
      setSending(false);
      setSubmitted(true);
      // ✅ FIXED: safeTimeout instead of raw setTimeout
      safeTimeout(() => setSubmitted(false), 6000);
      return;
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name:  form.name,
        from_email: form.email,
        subject:    form.subject || 'Portfolio Contact',
        message:    form.message,
        reply_to:   form.email,
      }, PUBLIC_KEY);

      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      safeTimeout(() => setSubmitted(false), 6000); // ✅ FIXED
    } catch (err) {
      console.error('[ContactSection] EmailJS send failed:', err);
      setError(true);
      safeTimeout(() => setError(false), 5000); // ✅ FIXED
    } finally {
      setSending(false);
    }
  };

  const inputCls = (f) => [
    'form-input w-full bg-gray-900/50 border rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-700 transition-all font-sans resize-none',
    focused === f
      ? 'border-cyan-500/50 bg-gray-900/70'
      : 'border-gray-800 hover:border-gray-700',
  ].join(' ');

  return (
    <section id="contact" ref={sectionRef}
      className="relative border-b border-gray-800 scroll-mt-20 bg-black text-white overflow-hidden">

      {/* BG glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[180px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.035) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'rgba(139,92,246,.04)' }} />

      {/* ── Banner ── */}
      <div className="relative px-6 sm:px-8 py-20 sm:py-28 text-center border-b border-gray-800">
        <div className="relative z-10 max-w-4xl mx-auto sr">
          <span className="section-num inline-block">06 / Contact</span>
          <h2 className="text-5xl sm:text-6xl md:text-[7rem] font-black tracking-[-0.05em] leading-[0.88] mb-8">
            Let's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-glow">
              work
            </span>
            {' '}together.
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Open to entry-level Data Analyst and Research Analyst roles. I respond within 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-800 bg-gray-900/30 text-gray-500">
              <MapPin size={13} className="text-cyan-400/70" /> {PERSONAL.location}
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-800 bg-gray-900/30 text-gray-500">
              <Clock size={13} className="text-blue-400/70" /> {PERSONAL.timezone}
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-green-500/20 bg-green-500/5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-mono text-[11px] uppercase tracking-widest">Available Now</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Form + Details ── */}
      <div className="grid grid-cols-1 md:grid-cols-12">

        {/* Form column */}
        <div className="col-span-1 md:col-span-7 p-6 sm:p-8 md:p-14 border-b md:border-b-0 md:border-r border-gray-800 sr sr-left">

          <div className="flex items-center gap-2 mb-8">
            <Sparkles size={16} className="text-cyan-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">Send a Message</h3>
          </div>

          {submitted && (
            <div className="mb-6 p-4 rounded-2xl flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20">
              <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-cyan-400">Message ready! 🎉</p>
                <p className="text-xs text-cyan-400/60 mt-0.5">Your email client opened — just hit Send and I'll reply within 24 hours.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-2xl flex items-center gap-3 bg-red-500/10 border border-red-500/20">
              <div className="w-5 h-5 rounded-full border-2 border-red-400 flex items-center justify-center flex-shrink-0">
                <span className="text-red-400 text-[10px] font-black">!</span>
              </div>
              <div>
                <p className="text-sm font-bold text-red-400">Failed to send ❌</p>
                <p className="text-xs text-red-400/60 mt-0.5">
                  Please email me directly at{' '}
                  <a href={`mailto:${PERSONAL.email}`} className="underline hover:text-red-300">{PERSONAL.email}</a>
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest block mb-2 text-gray-600">Your Name *</label>
                <input type="text" required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                  placeholder="e.g. Priya Sharma"
                  className={inputCls('name')} />
              </div>
              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest block mb-2 text-gray-600">Email Address *</label>
                <input type="email" required value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  placeholder="you@company.com"
                  className={inputCls('email')} />
              </div>
            </div>
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest block mb-2 text-gray-600">Subject</label>
              <input type="text" value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                placeholder="Job opportunity / collaboration / question"
                className={inputCls('subject')} />
            </div>
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest block mb-2 text-gray-600">Message *</label>
              <textarea required rows={5} value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                placeholder="Tell me about the opportunity or project..."
                className={inputCls('message')} />
            </div>
            <button type="submit" disabled={sending}
              className="btn-glow w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-60 text-black py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[.99] shadow-xl shadow-cyan-500/20">
              {sending ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                  Sending...
                </>
              ) : (
                <>Send Message <Send size={16} /></>
              )}
            </button>
          </form>
        </div>

        {/* Details column */}
        <div className="col-span-1 md:col-span-5 p-6 sm:p-8 md:p-14 flex flex-col justify-center gap-7 sr sr-right" data-delay="150">

          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-widest mb-5 text-gray-600">Get in Touch</h4>
            <div className="space-y-3">
              {SOCIALS.map((s) => {
                const Icon = ICON_MAP[s.label === 'Email' ? 'Mail' : s.label === 'LinkedIn' ? 'Linkedin' : 'Github'];
                return (
                  <a key={s.label} href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    className="spotlight-card tilt group flex items-center gap-3.5 p-4 rounded-xl border border-gray-800 hover:border-gray-700 hover:bg-gray-900/40 transition-all">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                      <Icon size={17} style={{ color: s.color }} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-600 mb-0.5">{s.emoji} {s.label}</p>
                      <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">{s.value}</p>
                    </div>
                    <ExternalLink size={12} className="text-gray-700 group-hover:text-gray-400 transition-colors ml-auto flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Availability card */}
          <div className="spotlight-card tilt p-6 rounded-2xl border border-gray-800 hover:border-cyan-500/20 transition-all"
            style={{ background: 'linear-gradient(135deg, rgba(34,211,238,.04), rgba(59,130,246,.04))' }}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">Available for Work</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Actively seeking <strong className="text-gray-200">entry-level Data Analyst</strong> or{' '}
              <strong className="text-gray-200">Research Analyst</strong> roles.
              Open to full-time, internships, and freelance projects.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Full-time', 'Internship', 'Freelance', 'Remote'].map(t => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-gray-900 border border-gray-800 font-mono text-[9px] uppercase tracking-wider text-gray-500">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Response time */}
          <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-800/60 bg-gray-900/20">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Clock size={16} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Fast Response</p>
              <p className="text-xs text-gray-500">Typically replies within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

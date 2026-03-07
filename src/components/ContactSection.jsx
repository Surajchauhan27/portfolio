import React, { useState } from 'react';
import { CheckCircle, Send, Mail, Linkedin, Github, ExternalLink, MapPin, Clock } from 'lucide-react';

const socials = [
  { icon: Mail,     label: 'Email',    value: 'surajchauhan22281@gmail.com',   href: 'mailto:surajchauhan22281@gmail.com' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/codewithsuraj', href: 'https://linkedin.com/in/codewithsuraj' },
  { icon: Github,   label: 'GitHub',   value: 'github.com/Surajchauhan27',     href: 'https://github.com/Surajchauhan27' },
];

const inputBase = 'w-full bg-gray-900/50 border rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-700 outline-none transition-all font-sans resize-none';

export default function ContactSection() {
  const [form, setForm]         = useState({ name:'', email:'', subject:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]   = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name:'', email:'', subject:'', message:'' });
  };

  const iClass = (f) =>
    `${inputBase} ${focused===f ? 'border-cyan-500/60 bg-gray-900/70 shadow-[0_0_0_3px_rgba(34,211,238,.06)]' : 'border-gray-800 hover:border-gray-700'}`;

  return (
    <section id="contact"
      className="relative border-b border-gray-800 scroll-mt-20 bg-black text-white overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/4 rounded-full blur-[140px] pointer-events-none" />

      {/* Banner */}
      <div className="relative px-6 sm:px-8 py-16 sm:py-20 md:py-28 text-center border-b border-gray-800">
        <div className="relative z-10 max-w-3xl mx-auto sr">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] block mb-5 text-cyan-400">06 / Contact</span>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-[-0.05em] leading-[0.9] mb-7">
            Let's work{' '}
            <span className="text-cyan-400" style={{ textShadow: '0 0 50px rgba(34,211,238,.35)' }}>together.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 max-w-lg mx-auto">
            Open to entry-level Data Analyst and Research Analyst roles. I respond within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin size={13} className="text-cyan-400/60" /> Haldwani, Uttarakhand
            </div>
            <div className="w-1 h-1 bg-gray-700 rounded-full" />
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={13} className="text-cyan-400/60" /> IST (UTC+5:30)
            </div>
            <div className="w-1 h-1 bg-gray-700 rounded-full" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-mono text-[11px] uppercase tracking-widest">Available Now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form + details */}
      <div className="grid grid-cols-1 md:grid-cols-12">

        {/* Form */}
        <div className="col-span-1 md:col-span-7 p-6 sm:p-8 md:p-14 border-b md:border-b-0 md:border-r border-gray-800 sr sr-left">
          <h3 className="text-lg sm:text-xl font-bold mb-7 text-white">Send a Message</h3>

          {submitted && (
            <div className="mb-5 p-4 rounded-xl flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20">
              <CheckCircle size={18} className="text-cyan-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-cyan-400">Message sent!</p>
                <p className="text-xs text-cyan-400/60 mt-0.5">I'll get back to you within 24 hours.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest block mb-2 text-gray-600">Your Name *</label>
                <input type="text" required value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                  placeholder="e.g. Priya Sharma" className={iClass('name')} />
              </div>
              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest block mb-2 text-gray-600">Email Address *</label>
                <input type="email" required value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  placeholder="you@company.com" className={iClass('email')} />
              </div>
            </div>
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest block mb-2 text-gray-600">Subject</label>
              <input type="text" value={form.subject}
                onChange={e => setForm({...form, subject: e.target.value})}
                onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                placeholder="Job opportunity / collaboration / question" className={iClass('subject')} />
            </div>
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest block mb-2 text-gray-600">Message *</label>
              <textarea required rows={5} value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                placeholder="Tell me about the opportunity..."
                className={iClass('message')} />
            </div>
            <button type="submit"
              className="btn-glow w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[.99]">
              Send Message <Send size={16} />
            </button>
          </form>
        </div>

        {/* Details */}
        <div className="col-span-1 md:col-span-5 p-6 sm:p-8 md:p-14 flex flex-col justify-center gap-7 sr sr-right" data-delay="150">

          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-widest mb-4 text-gray-600">Get in Touch</h4>
            <div className="space-y-3">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a key={i} href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    className="tilt group flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border border-gray-800 hover:border-cyan-500/30 hover:bg-gray-900/50 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border group-hover:border-cyan-500/20 transition-all flex-shrink-0">
                      <Icon size={16} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-600 mb-0.5">{s.label}</p>
                      <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">{s.value}</p>
                    </div>
                    <ExternalLink size={12} className="text-gray-700 group-hover:text-cyan-400 transition-colors ml-auto flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Available card */}
          <div className="tilt p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 hover:border-cyan-500/20 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">Available for Work</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Actively seeking <strong className="text-gray-200">entry-level Data Analyst</strong> or{' '}
              <strong className="text-gray-200">Research Analyst</strong> roles.
              Open to full-time, internships, and freelance projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

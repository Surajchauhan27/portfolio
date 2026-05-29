/**
 * Shared UI Atoms
 * ───────────────
 * Reusable, composable components used across multiple sections.
 * Previously this JSX was duplicated inline in every section.
 *
 * Rules for this file:
 * - No business data (import from config for that)
 * - No section-specific logic
 * - Props-only, fully controlled
 * - All components are memo'd — they never need to re-render from parent state
 */
import React, { memo } from 'react';

/* ─────────────────────────────────────────────────────────────
 * SectionHeader
 * Consistent header block used at the top of every section.
 *
 * Usage:
 *   <SectionHeader num="02 / Expertise" title="Technical" accent="Arsenal"
 *     sub="Tools & skills I wield to turn data into decisions" />
 * ───────────────────────────────────────────────────────────── */
export const SectionHeader = memo(function SectionHeader({ num, title, accent, sub, RightSlot }) {
  return (
    <div className="flex items-end justify-between mb-14 sr">
      <div>
        {num && <span className="section-num">{num}</span>}
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-[-0.04em] text-white">
          {title}{' '}
          {accent && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {accent}
            </span>
          )}
        </h2>
        {sub && <p className="text-gray-500 text-sm mt-2">{sub}</p>}
      </div>
      {RightSlot && <div className="flex-shrink-0">{RightSlot}</div>}
    </div>
  );
});

/* ─────────────────────────────────────────────────────────────
 * Tag
 * Small monospace label chip. Used for tools, categories, types.
 * ───────────────────────────────────────────────────────────── */
export const Tag = memo(function Tag({ children, accent, className = '' }) {
  return (
    <span
      className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all ${className}`}
      style={accent ? {
        background:  `${accent}10`,
        color:       `${accent}bb`,
        border:      `1px solid ${accent}20`,
      } : undefined}
    >
      {children}
    </span>
  );
});

/* ─────────────────────────────────────────────────────────────
 * ToolChip
 * Emoji + label tile for the tools/stack grid.
 * ───────────────────────────────────────────────────────────── */
export const ToolChip = memo(function ToolChip({ name, emoji }) {
  return (
    <div className="tag-item flex flex-col items-center gap-1.5 p-2.5 rounded-xl text-center bg-gray-800/40 border border-gray-700/40 hover:border-cyan-500/40 hover:bg-gray-800/60 transition-all cursor-default group">
      <span className="text-lg group-hover:scale-110 transition-transform">{emoji}</span>
      <span className="font-mono text-[8px] uppercase tracking-wider text-gray-500 group-hover:text-gray-300 transition-colors leading-none">
        {name}
      </span>
    </div>
  );
});

/* ─────────────────────────────────────────────────────────────
 * IconBox
 * Colored icon container matching a section's accent color.
 * ───────────────────────────────────────────────────────────── */
export const IconBox = memo(function IconBox({ icon: Icon, accent, size = 16, className = '' }) {
  if (!Icon) return null;
  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        background: `${accent}15`,
        border:     `1px solid ${accent}25`,
      }}
    >
      <Icon size={size} style={{ color: accent }} className="opacity-70 group-hover:opacity-100 transition-opacity" />
    </div>
  );
});

/* ─────────────────────────────────────────────────────────────
 * StatusPill
 * Availability / status badge (green dot + label).
 * ───────────────────────────────────────────────────────────── */
export const StatusPill = memo(function StatusPill({ label = 'Available Now', className = '' }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full border border-green-500/20 bg-green-500/5 ${className}`}>
      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
      <span className="text-green-400 font-mono text-[11px] uppercase tracking-widest">{label}</span>
    </div>
  );
});

/* ─────────────────────────────────────────────────────────────
 * GlassCard
 * Spotlight + tilt enabled card wrapper.
 * Automatically picks up CSS spotlight effect from useSpotlight hook.
 * ───────────────────────────────────────────────────────────── */
export const GlassCard = memo(function GlassCard({ children, className = '', style, ...rest }) {
  return (
    <div
      className={`spotlight-card tilt ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});

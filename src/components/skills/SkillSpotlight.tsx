import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FolderGit2,
  Copy,
  Check,
  Volume2,
  Cpu,
  Layers,
  Terminal
} from 'lucide-react';
import { SkillItem, PROJECT_NAMES } from '../../data/skills';
import { OFFICIAL_LOGOS } from '../../data/officialLogos';
import { TechLogo } from './TechLogo';
import { playMechanicalClick } from './audio';
import { getTechQuote } from '../../data/techQuotes';

interface SkillSpotlightProps {
  activeSkill: SkillItem;
  currentIndex: number;
  totalCount: number;
  onPrevSkill: () => void;
  onNextSkill: () => void;
  onSelectProject?: (projectId: string) => void;
}

/**
 * SkillSpotlight (Aerospace Holographic Telemetry Cockpit)
 * 
 * Replaces generic glass boxes with a dedicated high-tech command deck:
 * - Magnetic Orbital Core: Levitating official emblem with technical HUD reticle
 * - Interactive 3D Keycap Switch: Tap to bottom-out with mechanical "thock" click
 * - Live Architectural Telemetry Matrix: Tier, proficiency, tags, projects
 * - Quick import snippet copy action with visual confirmation
 */
export const SkillSpotlight: React.FC<SkillSpotlightProps> = ({
  activeSkill,
  currentIndex,
  totalCount,
  onPrevSkill,
  onNextSkill,
  onSelectProject,
}) => {
  const brandColor = activeSkill.brandColor || '#A855F7';
  const proficiency = activeSkill.proficiency || 94;
  const logoMeta = OFFICIAL_LOGOS[activeSkill.id];
  const keycapBg = logoMeta?.keycapBg || brandColor;

  const [copied, setCopied] = useState(false);
  const [isKeycapPressed, setIsKeycapPressed] = useState(false);

  const relatedProjectKey = activeSkill.relatedProjects?.[0];
  const relatedProjectMeta = relatedProjectKey ? PROJECT_NAMES[relatedProjectKey] : null;

  // Import snippet helper
  const importSnippet = activeSkill.id === 'react'
    ? "import React, { useState } from 'react';"
    : activeSkill.id === 'nextjs'
    ? "import Link from 'next/link';"
    : activeSkill.id === 'tailwind'
    ? "@import 'tailwindcss';"
    : activeSkill.id === 'motion'
    ? "import { motion } from 'motion/react';"
    : activeSkill.id === 'threejs'
    ? "import * as THREE from 'three';"
    : `import { ${activeSkill.name.replace(/[^a-zA-Z]/g, '')} } from '${activeSkill.id}';`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(importSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeycapClick = () => {
    setIsKeycapPressed(true);
    playMechanicalClick(1.0, false);
    setTimeout(() => setIsKeycapPressed(false), 140);
  };

  return (
    <div className="w-full relative z-20 flex flex-col items-center">
      {/* Cockpit Frame */}
      <div
        className="w-full relative rounded-3xl p-5 sm:p-7 bg-[#030014]/55 backdrop-blur-xl border border-[#7042f88b]/45 overflow-hidden transition-all duration-500 flex flex-col justify-between"
        style={{
          boxShadow: `0 18px 55px rgba(0, 0, 0, 0.75), 0 0 35px ${brandColor}33, inset 0 1px 0 rgba(255, 255, 255, 0.18)`,
        }}
      >
        {/* Dynamic Atmospheric Radiance */}
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-700 opacity-25"
          style={{ backgroundColor: brandColor }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-colors duration-700 opacity-15"
          style={{ backgroundColor: brandColor }}
        />

        {/* Cybernetic Grid Mesh Background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50" />

        {/* ─── 1. TOP HEADER: ARCHITECTURE TIER & PAGER HUD ─── */}
        <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/[0.08] relative z-10">
          {/* Architecture Tier Badge */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shadow-sm"
              style={{ backgroundColor: brandColor }}
            />
            <span className="font-mono text-[11px] sm:text-xs tracking-wider text-purple-200 uppercase font-semibold">
              TIER 0{activeSkill.row} <span className="text-white/30">//</span> {activeSkill.category || activeSkill.rowTitle}
            </span>
          </div>

          {/* Native Pager Controller */}
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-full p-1 pl-3 font-mono">
            <span className="text-[11px] sm:text-xs text-neutral-300 font-semibold tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')}
              <span className="text-white/30 mx-1">/</span>
              {String(totalCount).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={onPrevSkill}
                aria-label="Previous skill"
                className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer focus:outline-none"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={onNextSkill}
                aria-label="Next skill"
                className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer focus:outline-none"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ─── 2. MIDDLE CONTENT: MAGNETIC CORE + TELEMETRY ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkill.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 py-5 flex flex-col justify-between gap-5 relative z-10"
          >
            {/* Visual Core + Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              {/* Magnetic Containment Core with 3D Keycap Switch */}
              <div className="relative shrink-0 flex items-center justify-center">
                {/* Rotating HUD Reticle Ring */}
                <div
                  className="absolute -inset-2.5 rounded-2xl border border-dashed border-white/20 animate-spin pointer-events-none"
                  style={{ animationDuration: '30s' }}
                />
                <div
                  className="absolute -inset-4 rounded-3xl blur-md opacity-50 pointer-events-none transition-colors duration-500"
                  style={{ backgroundColor: brandColor }}
                />

                {/* 3D Tactile Keycap (Interactive button) */}
                <button
                  type="button"
                  onClick={handleKeycapClick}
                  className={`
                    relative flex flex-col items-center justify-center
                    w-20 h-20 sm:w-22 sm:h-22 rounded-2xl cursor-pointer
                    transition-all duration-100 ease-out focus:outline-none
                    ${
                      isKeycapPressed
                        ? 'translate-y-1.5 shadow-[0_2px_0_rgba(0,0,0,0.9)]'
                        : 'shadow-[0_8px_0_rgba(0,0,0,0.85),0_12px_24px_rgba(0,0,0,0.7)] hover:-translate-y-0.5'
                    }
                  `}
                  style={{
                    backgroundColor: keycapBg,
                    borderTop: '1px solid rgba(255, 255, 255, 0.4)',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRight: '1px solid rgba(0, 0, 0, 0.4)',
                    borderBottom: '4px solid rgba(0, 0, 0, 0.65)',
                  }}
                  title="Click to trigger mechanical keystroke"
                >
                  {/* Keycap Top Dish Concave Highlight */}
                  <div className="absolute inset-1 rounded-xl bg-gradient-to-b from-white/25 via-transparent to-black/30 pointer-events-none" />

                  {/* Center Official Vector Logo (Scheme A CDN + Scheme B Iconify) */}
                  <div className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
                    <TechLogo id={activeSkill.id} size={42} color="#FFFFFF" />
                  </div>

                  {/* Sound Trigger Icon */}
                  <div className="absolute bottom-1 right-1.5 text-white/50 group-hover:text-white transition-colors">
                    <Volume2 size={11} />
                  </div>
                </button>
              </div>

              {/* Title & Architectural Role */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    ONLINE // ACTIVE
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400">
                    Source: {logoMeta?.source || 'Official Standard Vector'}
                  </span>
                </div>

                <h3 className="text-3d-headline text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  {activeSkill.name}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-purple-300 tracking-wider">
                  {activeSkill.role || activeSkill.category}
                </p>

                {/* ─── EXCLUSIVE ONE-LINER QUOTE SHOWCASE (Matching Design Reference) ─── */}
                <div
                  className="mt-3 py-2.5 px-4 rounded-xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-md relative overflow-hidden"
                  style={{
                    boxShadow: `0 0 25px ${brandColor}20, inset 0 0 12px ${brandColor}15`,
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l"
                    style={{ backgroundColor: brandColor }}
                  />
                  <p className="text-sm sm:text-base md:text-lg text-white font-semibold italic tracking-wide">
                    &ldquo;{getTechQuote(activeSkill.id, activeSkill.shortDescription)}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Architecture Description */}
            <div className="space-y-2 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
              <p className="text-sm sm:text-base text-neutral-100 font-medium leading-relaxed">
                {activeSkill.shortDescription}
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {activeSkill.positioning}
              </p>
            </div>

            {/* Telemetry Matrix Grid */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              {/* Proficiency Arc Index */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-purple-400" />
                    MASTERY RATING
                  </span>
                  <span className="font-bold" style={{ color: brandColor }}>
                    {proficiency}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${proficiency}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: brandColor,
                      boxShadow: `0 0 10px ${brandColor}`,
                    }}
                  />
                </div>
              </div>

              {/* Quick Terminal Snippet */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <Terminal size={12} className="text-cyan-400" />
                    IMPORT SPEC
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="hover:text-white transition-colors cursor-pointer"
                    title="Copy snippet"
                  >
                    {copied ? (
                      <Check size={12} className="text-emerald-400" />
                    ) : (
                      <Copy size={12} />
                    )}
                  </button>
                </div>
                <div className="text-[10px] text-neutral-300 truncate mt-2 font-mono">
                  {importSnippet}
                </div>
              </div>
            </div>

            {/* Feature Capability Badges */}
            {activeSkill.features && activeSkill.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {activeSkill.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.03] border border-white/[0.08] text-neutral-300 hover:text-white transition-colors"
                  >
                    #{feature}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ─── 3. BOTTOM FOOTER: RELATED PRODUCTION SYSTEM ─── */}
        {relatedProjectKey && relatedProjectMeta && (
          <div className="pt-4 mt-2 border-t border-white/[0.08] flex items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-2">
              <FolderGit2 size={14} className="text-purple-400 shrink-0" />
              <span className="text-xs text-neutral-400 font-mono">
                Production System:
              </span>
              <strong className="text-xs text-white font-medium">
                {relatedProjectMeta.title}
              </strong>
            </div>

            {onSelectProject && (
              <button
                type="button"
                onClick={() => onSelectProject(relatedProjectKey)}
                className="px-3 py-1 rounded-full text-xs font-mono font-medium text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 transition-colors cursor-pointer"
              >
                Inspect Architecture &rarr;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

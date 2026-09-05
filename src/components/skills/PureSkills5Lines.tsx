import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Code2, Play, Pause, Grid, MoveHorizontal } from 'lucide-react';
import { SKILLS_DATA, SkillItem } from '../../data/skills';
import { TechLogo } from './TechLogo';

interface PureSkills5LinesProps {
  onSelectProject?: (projectId: string) => void;
}

interface SkillRowDef {
  id: string;
  lineNum: string;
  title: string;
  subtitle: string;
  skillIds: string[];
  direction: 'left' | 'right';
  speedSec: number;
}

export const SKILL_ROWS: SkillRowDef[] = [
  {
    id: 'row-1',
    lineNum: '01',
    title: 'Core Frontend & Interaction',
    subtitle: 'Type-safe reactive architectures & high-performance UI engineering',
    skillIds: ['typescript', 'javascript', 'react', 'nextjs', 'svelte', 'tailwind', 'motion', 'gsap', 'html5', 'vite'],
    direction: 'left',
    speedSec: 38,
  },
  {
    id: 'row-2',
    lineNum: '02',
    title: '3D Spatial & Creative Graphics',
    subtitle: 'WebGL pipelines, programmable GLSL shaders & real-time compute',
    skillIds: ['threejs', 'r3f', 'webgl', 'webgpu', 'glsl', 'spline', 'blender', 'draco', 'uvbaking', 'canvas'],
    direction: 'right',
    speedSec: 42,
  },
  {
    id: 'row-3',
    lineNum: '03',
    title: 'Scalable Backend & Cloud Systems',
    subtitle: 'Distributed microservices, in-memory caching & type-safe RPCs',
    skillIds: ['nodejs', 'express', 'redis', 'postgresql', 'supabase', 'prisma', 'drizzle', 'trpc', 'graphql', 'docker'],
    direction: 'left',
    speedSec: 40,
  },
  {
    id: 'row-4',
    lineNum: '04',
    title: 'Applied AI, Protocols & Tooling',
    subtitle: 'Context-augmented RAG engines, vector search & agent orchestration',
    skillIds: ['vercelai', 'langchain', 'llamaindex', 'openai', 'pgvector', 'mcp', 'figma', 'designsystems', 'git', 'rive'],
    direction: 'right',
    speedSec: 44,
  },
  {
    id: 'row-5',
    lineNum: '05',
    title: 'Web3 Protocols & Decentralized State',
    subtitle: 'EVM smart contracts, account abstraction & cryptographic auth',
    skillIds: ['solidity', 'viem', 'wagmi', 'ethers', 'foundry', 'privy', 'erc4337', 'thegraph', 'ipfs', 'siwe'],
    direction: 'left',
    speedSec: 36,
  },
];

export const PureSkills5Lines: React.FC<PureSkills5LinesProps> = ({ onSelectProject }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [displayMode, setDisplayMode] = useState<'flow' | 'grid'>('flow');

  // Map skill IDs to rich data objects
  const getSkillById = (id: string): SkillItem => {
    const found = SKILLS_DATA.find((s) => s.id === id);
    if (found) return found;
    return {
      id,
      name: id.toUpperCase(),
      row: 1,
      rowTitle: 'Core Stack',
      category: 'General',
      categoryKey: 'frontend',
      brandColor: '#38BDF8',
      positioning: 'Production-ready technical competency.',
      experience: '3+ yrs',
      tags: ['Core', 'Production'],
      proficiency: 90,
      role: 'Core Stack',
      relatedProjects: [],
    };
  };

  return (
    <div className="w-full relative flex flex-col items-center">
      {/* Editorial Header - Pure & Restrained */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16 text-center flex flex-col items-center">
        {/* Minimal Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-5 text-[11px] font-mono tracking-widest uppercase text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>5 Core Lines // 50 Technologies</span>
        </div>

        {/* Crisp Typographic Headline */}
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Architectural Tech Stack
        </h2>

        {/* Clean, Non-hyped Subline */}
        <p className="max-w-2xl text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
          Curated 5-tier technical foundation spanning reactive interfaces, high-performance 3D graphics,
          distributed cloud backends, AI protocols, and decentralized systems.
        </p>

        {/* Pure Floating Controls: Mode Switcher & Flow Play/Pause */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-neutral-900/80 border border-white/[0.08] backdrop-blur-md">
            <button
              type="button"
              onClick={() => setDisplayMode('flow')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                displayMode === 'flow'
                  ? 'bg-white/10 text-white font-medium shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <MoveHorizontal className="w-3.5 h-3.5" />
              <span>Flow Mode</span>
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                displayMode === 'grid'
                  ? 'bg-white/10 text-white font-medium shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid Mode</span>
            </button>
          </div>

          {displayMode === 'flow' && (
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-white/[0.08] text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer backdrop-blur-md"
              title={isPaused ? 'Resume auto-flow' : 'Pause auto-flow'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
          )}
        </div>
      </div>

      {/* The 5 Clean Lines */}
      <div className="w-full flex flex-col gap-6 sm:gap-8 relative z-20">
        {SKILL_ROWS.map((row) => {
          const skillsInRow = row.skillIds.map(getSkillById);

          return (
            <div key={row.id} className="w-full flex flex-col gap-2.5">
              {/* Row Meta Header (Clean, minimal label) */}
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-baseline justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-purple-400/90 tracking-wider">
                    {row.lineNum}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-neutral-200 tracking-tight">
                    {row.title}
                  </span>
                  <span className="hidden md:inline-block text-xs text-neutral-500 font-normal">
                    — {row.subtitle}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-neutral-500">
                  {skillsInRow.length} Technologies
                </span>
              </div>

              {/* Badges Container */}
              {displayMode === 'flow' ? (
                /* Flow Mode: Infinite Smooth Ambient Drift */
                <div
                  className="w-full overflow-hidden py-1 relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div
                    className={`flex items-center gap-3 sm:gap-4 w-max ${
                      row.direction === 'left' ? 'skills-drift-left' : 'skills-drift-right'
                    }`}
                    style={{
                      animationPlayState: isPaused ? 'paused' : 'running',
                      animationDuration: `${row.speedSec}s`,
                    }}
                  >
                    {/* Render 2 identical sets for smooth 50% translateX loop */}
                    {[...skillsInRow, ...skillsInRow].map((skill, idx) => (
                      <SkillBadge
                        key={`${row.id}-${skill.id}-${idx}`}
                        skill={skill}
                        isSelected={selectedSkill?.id === skill.id}
                        onSelect={() => setSelectedSkill(skill)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                /* Grid Mode: Pure Static Wrap Grid */
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 py-1">
                    {skillsInRow.map((skill) => (
                      <SkillBadge
                        key={`${row.id}-${skill.id}`}
                        skill={skill}
                        isSelected={selectedSkill?.id === skill.id}
                        onSelect={() => setSelectedSkill(skill)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Minimal Bottom Inspection Drawer when a skill is selected */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-2xl"
          >
            <div className="relative rounded-2xl p-5 sm:p-6 bg-neutral-900/95 border border-white/[0.12] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(0,0,0,0.5)]">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                title="Close inspection"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4 sm:gap-5">
                {/* Tech Logo */}
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-3 shrink-0 flex items-center justify-center border transition-all"
                  style={{
                    backgroundColor: `${selectedSkill.brandColor}12`,
                    borderColor: `${selectedSkill.brandColor}35`,
                  }}
                >
                  <TechLogo id={selectedSkill.id} size={36} color={selectedSkill.brandColor} />
                </div>

                {/* Tech Info */}
                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {selectedSkill.name}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium border"
                      style={{
                        backgroundColor: `${selectedSkill.brandColor}15`,
                        color: selectedSkill.brandColor,
                        borderColor: `${selectedSkill.brandColor}30`,
                      }}
                    >
                      {selectedSkill.category}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {selectedSkill.experience}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3">
                    {selectedSkill.positioning || selectedSkill.shortDescription || selectedSkill.editorialSummary}
                  </p>

                  {/* Role & Projects */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/[0.08]">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                      <Code2 className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Role: <strong className="text-neutral-200">{selectedSkill.role || 'Production Core'}</strong></span>
                    </div>

                    {selectedSkill.relatedProjects && selectedSkill.relatedProjects.length > 0 && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-neutral-400 font-mono">Used In:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedSkill.relatedProjects.map((projId) => (
                            <button
                              key={projId}
                              type="button"
                              onClick={() => {
                                setSelectedSkill(null);
                                if (onSelectProject) onSelectProject(projId);
                                const el = document.getElementById('projects');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-neutral-200 hover:text-white font-mono text-[11px] transition-colors cursor-pointer"
                            >
                              <span>{projId}</span>
                              <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * SkillBadge
 * 
 * Minimalist, high-end badge pill:
 * - Accurate official SVG logo
 * - Clean typography
 * - Soft brand glow aura on hover
 * - Zero clutter
 */
interface SkillBadgeProps {
  skill: SkillItem;
  isSelected?: boolean;
  onSelect: () => void;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 select-none cursor-pointer border shrink-0 ${
        isSelected
          ? 'bg-white/[0.12] border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)] -translate-y-0.5'
          : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.07] hover:border-white/20 hover:-translate-y-0.5'
      }`}
      style={{
        boxShadow: isSelected ? `0 0 25px ${skill.brandColor}30` : undefined,
      }}
    >
      {/* Official Vector SVG Logo */}
      <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
        <TechLogo id={skill.id} size={22} color={skill.brandColor} />
      </div>

      {/* Skill Name */}
      <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white tracking-tight whitespace-nowrap transition-colors">
        {skill.name}
      </span>

      {/* Subtle Brand Accent Dot */}
      <span
        className="w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: skill.brandColor }}
      />
    </button>
  );
};

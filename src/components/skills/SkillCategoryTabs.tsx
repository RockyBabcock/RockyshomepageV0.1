import React from 'react';
import { motion } from 'motion/react';
import { SkillItem } from '../../data/skills';

export type SkillCategoryKey = 'all' | 'frontend' | 'backend' | 'spatial' | 'databases' | 'devops';

export interface SkillCategoryTab {
  id: SkillCategoryKey;
  label: string;
  count: number;
  description: string;
  glowColor: string;
}

export const CATEGORY_TABS: SkillCategoryTab[] = [
  {
    id: 'all',
    label: 'All Stack',
    count: 50,
    description: 'Comprehensive Architecture Overview across 5 Tiers',
    glowColor: '#A855F7',
  },
  {
    id: 'frontend',
    label: 'Frontend & UI',
    count: 12,
    description: 'TypeScript, React, Next.js, Motion & Design Tokens',
    glowColor: '#38BDF8',
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    count: 10,
    description: 'Node.js, Express, Microservices, tRPC & AI SDK',
    glowColor: '#22C55E',
  },
  {
    id: 'spatial',
    label: '3D & Spatial',
    count: 10,
    description: 'Three.js, WebGL, Shaders, R3F & Asset Optimization',
    glowColor: '#E056FD',
  },
  {
    id: 'databases',
    label: 'Databases',
    count: 5,
    description: 'PostgreSQL, Supabase, Prisma, Drizzle & pgvector',
    glowColor: '#336791',
  },
  {
    id: 'devops',
    label: 'DevOps & Tooling',
    count: 13,
    description: 'Docker, Git, Web3 Protocols, EVM, Foundry & Figma',
    glowColor: '#F97316',
  },
];

interface SkillCategoryTabsProps {
  activeCategory: SkillCategoryKey;
  onSelectCategory: (category: SkillCategoryKey) => void;
  filteredSkills: SkillItem[];
}

/**
 * SkillCategoryTabs
 * Architectural bridge connecting the top "50 Technologies · 5 Tiers" headline
 * with the interactive stage below.
 * 
 * Features:
 * - Breathing status indicator light on each category
 * - Live dynamic count badge
 * - Active glowing layout pill
 * - High accessibility & keyboard navigability
 */
export const SkillCategoryTabs: React.FC<SkillCategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 mb-8 sm:mb-12 relative z-20 flex flex-col items-center">
      {/* Dock Bar */}
      <nav
        aria-label="Skill Architecture Categories"
        className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-full bg-[#0a071e]/80 border border-white/[0.08] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(112,66,248,0.12)] max-w-full"
      >
        {CATEGORY_TABS.map((tab) => {
          const isSelected = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectCategory(tab.id)}
              className={`relative group px-3 sm:px-4 py-2 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                isSelected
                  ? 'text-white font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
              }`}
            >
              {/* Active Tab Ambient Pill Glow */}
              {isSelected && (
                <motion.div
                  layoutId="active-category-tab-glow"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 via-indigo-600/35 to-cyan-500/25 border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.3)] -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}

              {/* Breathing Status Indicator Light */}
              <span className="relative flex h-2 w-2">
                {isSelected && (
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: tab.glowColor }}
                  />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 transition-all duration-300 ${
                    isSelected ? 'opacity-100 shadow-[0_0_8px_currentColor]' : 'opacity-40 group-hover:opacity-70'
                  }`}
                  style={{ backgroundColor: tab.glowColor }}
                />
              </span>

              {/* Tab Label */}
              <span>{tab.label}</span>

              {/* Live Count Badge */}
              <span
                className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-all duration-300 ${
                  isSelected
                    ? 'bg-purple-500/30 text-purple-200 border border-purple-400/30 font-bold'
                    : 'bg-white/[0.05] text-neutral-400 border border-white/[0.05] group-hover:text-neutral-300'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

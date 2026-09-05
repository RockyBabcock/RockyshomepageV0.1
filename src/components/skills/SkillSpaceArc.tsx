import React from 'react';
import { motion } from 'motion/react';
import { Orbit, Sparkles } from 'lucide-react';
import { SkillItem } from '../../data/skills';
import { OFFICIAL_LOGOS } from '../../data/officialLogos';
import { TechLogo } from './TechLogo';

interface SkillSpaceArcProps {
  skills: SkillItem[];
  activeSkill: SkillItem;
  onSelectSkill: (skill: SkillItem) => void;
}

/**
 * SkillSpaceArc
 * 
 * Directly inspired by Reference Image 2:
 * Floating celestial planetary constellation arc of authentic multi-color tech badges!
 * 
 * Features:
 * - Multi-tier floating orbital rows drifting across deep cosmic space
 * - 100% authentic multi-color SVGs directly from canonical Devicon repository
 *   (HTML5 orange shield with 5, CSS3 blue shield with 3, JS yellow badge with JS,
 *   React cyan atom, Tailwind waves, Next.js hexagon, Node.js hexagon, etc.)
 * - Zero-gravity vertical floating physics with staggered phase delays
 * - Radiant brand glow auras on hover and selection
 */
export const SkillSpaceArc: React.FC<SkillSpaceArcProps> = ({
  skills,
  activeSkill,
  onSelectSkill,
}) => {
  // Split skills into balanced cosmic orbital rows
  const tier1 = skills.slice(0, 14);
  const tier2 = skills.slice(14, 28);
  const tier3 = skills.slice(28, 42);
  const tier4 = skills.slice(42);

  const tiers = [
    { title: 'Core Interface & Runtimes', items: tier1, speed: 6, delay: 0 },
    { title: '3D Spatial & Backend Cloud', items: tier2, speed: 7, delay: 0.4 },
    { title: 'Protocols & Smart Contracts', items: tier3, speed: 6.5, delay: 0.8 },
    { title: 'AI Orchestration & Tooling', items: tier4, speed: 8, delay: 1.2 },
  ].filter((t) => t.items.length > 0);

  return (
    <div className="w-full flex flex-col items-center relative z-20">
      {/* Outer Cosmic Container */}
      <div className="w-full relative rounded-3xl p-5 sm:p-8 bg-[#09061c]/85 backdrop-blur-2xl border border-purple-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(147,51,234,0.15)] overflow-hidden">
        {/* Orbital Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-white/[0.08] relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25">
              <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '16s' }} />
              <span className="font-mono text-[11px] text-cyan-300 font-semibold tracking-wider uppercase">
                Planetary Orbital Arc
              </span>
            </div>
            <span className="hidden sm:inline-block text-xs text-neutral-400 font-mono">
              Cosmic Multi-Tier Stack
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: activeSkill.brandColor }}
            />
            <span className="font-mono text-[11px] text-white font-medium">
              Hovered: {activeSkill.name}
            </span>
          </div>
        </div>

        {/* Multi-Tier Orbital Rows */}
        <div className="flex flex-col gap-6 sm:gap-8 relative z-10 py-2">
          {tiers.map((tier, tIdx) => (
            <div key={tIdx} className="flex flex-col gap-2.5">
              {/* Tier Heading */}
              <div className="flex items-center justify-between px-2">
                <span className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-wider uppercase font-semibold">
                  Orbit Tier 0{tIdx + 1} // {tier.title}
                </span>
                <span className="font-mono text-[10px] text-neutral-500">
                  {tier.items.length} Nodes
                </span>
              </div>

              {/* Floating Arc Badges Row */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4 rounded-2xl bg-black/40 border border-white/[0.06] backdrop-blur-md relative overflow-hidden">
                {/* Orbit Path Guide Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/15 to-transparent pointer-events-none" />

                {tier.items.map((skill, sIdx) => {
                  const isActive = activeSkill.id === skill.id;
                  const logoMeta = OFFICIAL_LOGOS[skill.id];
                  const brandColor = skill.brandColor || '#8B5CF6';

                  // Staggered vertical float duration & delay
                  const floatDelay = (sIdx % 4) * 0.4;
                  const floatDuration = 3 + (sIdx % 3) * 0.8;

                  return (
                    <motion.button
                      key={skill.id}
                      type="button"
                      onClick={() => onSelectSkill(skill)}
                      animate={{
                        y: [-3, 3, -3],
                      }}
                      transition={{
                        duration: floatDuration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: floatDelay,
                      }}
                      whileHover={{ scale: 1.15, y: -6 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        group relative flex items-center justify-center
                        w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                        rounded-2xl transition-all duration-300 cursor-pointer
                        focus:outline-none
                        ${
                          isActive
                            ? 'bg-white/[0.12] border-2 border-white shadow-[0_0_25px_rgba(255,255,255,0.4)] z-20'
                            : 'bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] hover:border-white/40'
                        }
                      `}
                      style={{
                        boxShadow: isActive
                          ? `0 0 30px ${brandColor}99, 0 8px 24px rgba(0,0,0,0.8)`
                          : undefined,
                      }}
                      title={skill.name}
                      aria-label={`Select ${skill.name}`}
                    >
                      {/* Aura Halo on Hover / Active */}
                      <div
                        className={`
                          absolute -inset-2 rounded-2xl blur-lg transition-opacity duration-300 pointer-events-none
                          ${isActive ? 'opacity-80' : 'opacity-0 group-hover:opacity-40'}
                        `}
                        style={{ backgroundColor: brandColor }}
                      />

                      {/* Official Vector Logo (Scheme A CDN + Scheme B Iconify) */}
                      <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center">
                        <TechLogo id={skill.id} size={32} color={brandColor} />
                      </div>

                      {/* Tooltip Badge on Hover */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-white/20 text-[10px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg">
                        {skill.name}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Orbital Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/[0.08] text-neutral-400 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Click any celestial badge to lock orbital telemetry</span>
          </div>
          <span className="text-purple-300 text-[11px]">
            Hover nodes for gravitational lift & brand aura
          </span>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Sparkles, Command } from 'lucide-react';
import { SkillItem } from '../../data/skills';
import { OFFICIAL_LOGOS } from '../../data/officialLogos';
import { TechLogo } from './TechLogo';
import { playMechanicalClick } from './audio';

interface SkillKeycapsBoardProps {
  skills: SkillItem[];
  activeSkill: SkillItem;
  onSelectSkill: (skill: SkillItem) => void;
}

/**
 * SkillKeycapsBoard
 * 
 * Directly inspired by Reference Image 1:
 * A 3D tactile mechanical keyboard deck of official tech keycaps!
 * 
 * Features:
 * - Authentic 3D sculpted keycap profiles with dish top, beveled walls & drop extrusion
 * - Brand-accurate background colors for every individual keycap
 * - 100% official vector SVGs from canonical Devicon & Simple-Icons
 * - Interactive mechanical switch depression (4px downward travel + shadow compression)
 * - Synthesized mechanical "thock" switch sound on click (with mute control)
 * - LED switch underglow lighting up around active/hovered switches
 */
export const SkillKeycapsBoard: React.FC<SkillKeycapsBoardProps> = ({
  skills,
  activeSkill,
  onSelectSkill,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [pressedKeyId, setPressedKeyId] = useState<string | null>(null);

  const handleKeyPress = useCallback(
    (skill: SkillItem) => {
      setPressedKeyId(skill.id);
      playMechanicalClick(1.0, isMuted);
      onSelectSkill(skill);

      setTimeout(() => {
        setPressedKeyId(null);
      }, 140);
    },
    [isMuted, onSelectSkill]
  );

  // Group skills by category rows for clean mechanical layout
  const rows = [
    {
      title: 'Frontend & UI Core',
      rowNumber: 1,
      items: skills.filter((s) => s.row === 1),
    },
    {
      title: '3D, Spatial & Graphics',
      rowNumber: 2,
      items: skills.filter((s) => s.row === 2),
    },
    {
      title: 'Backend, DB & Cloud',
      rowNumber: 3,
      items: skills.filter((s) => s.row === 3),
    },
    {
      title: 'Web3 & Protocols',
      rowNumber: 4,
      items: skills.filter((s) => s.row === 4),
    },
    {
      title: 'AI, Design & DevTools',
      rowNumber: 5,
      items: skills.filter((s) => s.row === 5),
    },
  ].filter((r) => r.items.length > 0);

  return (
    <div className="w-full flex flex-col items-center relative z-20">
      {/* Keyboard Chassis Frame */}
      <div className="w-full relative rounded-3xl p-5 sm:p-7 md:p-8 bg-[#0b081e]/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(124,58,237,0.15)] overflow-hidden">
        {/* Chassis Top Plate Accent & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-white/[0.08] relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25">
              <Command className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-mono text-[11px] text-purple-300 font-semibold tracking-wider uppercase">
                Tactile Switchboard Deck
              </span>
            </div>
            <span className="hidden sm:inline-block text-xs text-neutral-400 font-mono">
              Cherry MX Profile · 50 Keycaps
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-neutral-300 transition-colors"
              title={isMuted ? 'Unmute Mechanical Sound' : 'Mute Mechanical Sound'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-[11px]">Sound Off</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="text-[11px] text-emerald-300">Thock Sound ON</span>
                </>
              )}
            </button>

            {/* Selected Keycap Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: activeSkill.brandColor }}
              />
              <span className="font-mono text-[11px] text-white font-medium">
                {activeSkill.name}
              </span>
            </div>
          </div>
        </div>

        {/* 3D Keycaps Matrix */}
        <div className="flex flex-col gap-5 sm:gap-6 relative z-10">
          {rows.map((row) => (
            <div key={row.rowNumber} className="flex flex-col gap-2">
              {/* Row Legend */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
                  <span className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                    Row 0{row.rowNumber} // {row.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">
                  {row.items.length} Keys
                </span>
              </div>

              {/* Keycaps Flex Grid */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-black/40 border border-white/[0.05] shadow-inner">
                {row.items.map((skill) => {
                  const isActive = activeSkill.id === skill.id;
                  const isPressed = pressedKeyId === skill.id;
                  const logoMeta = OFFICIAL_LOGOS[skill.id];
                  const keycapBg = logoMeta?.keycapBg || skill.brandColor || '#3B82F6';
                  const brandColor = skill.brandColor || '#8B5CF6';

                  return (
                    <div
                      key={skill.id}
                      className="relative group select-none"
                    >
                      {/* RGB Switch LED Underglow */}
                      <div
                        className={`absolute -inset-1 rounded-2xl blur-md transition-opacity duration-300 pointer-events-none ${
                          isActive
                            ? 'opacity-80'
                            : 'opacity-0 group-hover:opacity-40'
                        }`}
                        style={{ backgroundColor: brandColor }}
                      />

                      {/* 3D Mechanical Keycap Button */}
                      <button
                        type="button"
                        onClick={() => handleKeyPress(skill)}
                        className={`
                          relative flex flex-col items-center justify-center
                          w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] md:w-[66px] md:h-[66px]
                          rounded-xl cursor-pointer transition-all duration-100 ease-out
                          focus:outline-none
                          ${
                            isPressed
                              ? 'translate-y-1.5 shadow-[0_2px_0_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.6)]'
                              : isActive
                              ? 'translate-y-0.5 shadow-[0_4px_0_rgba(0,0,0,0.9),0_6px_12px_rgba(0,0,0,0.7)]'
                              : 'hover:-translate-y-0.5 shadow-[0_6px_0_rgba(0,0,0,0.85),0_10px_16px_rgba(0,0,0,0.6)]'
                          }
                        `}
                        style={{
                          backgroundColor: keycapBg,
                          borderTop: '1px solid rgba(255, 255, 255, 0.35)',
                          borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRight: '1px solid rgba(0, 0, 0, 0.35)',
                          borderBottom: '4px solid rgba(0, 0, 0, 0.55)',
                        }}
                        aria-label={`Select ${skill.name}`}
                      >
                        {/* Concave Keycap Dish (Subtle inner curvature & highlight) */}
                        <div className="absolute inset-1 rounded-lg bg-gradient-to-b from-white/20 via-transparent to-black/35 pointer-events-none" />

                        {/* Top Dish Chamfer Border */}
                        <div
                          className={`
                            relative z-10 flex flex-col items-center justify-center
                            w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] md:w-[50px] md:h-[50px]
                            rounded-lg transition-transform duration-100
                            ${isActive ? 'scale-105' : 'group-hover:scale-102'}
                          `}
                        >
                          {/* Official Vector Logo (Scheme A CDN + Scheme B Iconify) */}
                          <TechLogo id={skill.id} size={26} color="#FFFFFF" />

                          {/* Key Label Text (Minimalist legend) */}
                          <span
                            className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-tight text-white/90 drop-shadow mt-0.5 max-w-[48px] truncate text-center"
                            style={{
                              textShadow: '0 1px 2px rgba(0,0,0,0.9)',
                            }}
                          >
                            {skill.name.split(' ')[0]}
                          </span>
                        </div>

                        {/* Active Keycap Pip Dot */}
                        {isActive && (
                          <div
                            className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full shadow-[0_0_4px_white]"
                            style={{ backgroundColor: '#FFFFFF' }}
                          />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Keyboard Deck Footer Instructions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/[0.08] text-neutral-400 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.1] text-[10px] text-white">
              CLICK / TAP
            </span>
            <span>Press any switch to inspect full architectural telemetry</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-purple-300">
              Active: <strong className="text-white">{activeSkill.name}</strong> ({activeSkill.category})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

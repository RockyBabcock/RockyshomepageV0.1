import React from 'react';
import { motion } from 'motion/react';

export const SkillText: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 z-10 mb-6 sm:mb-10 pt-4 sm:pt-6">
      {/* Editorial Header with Horizontal Rule (matching Arsalan Kaleem .sec-head) */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-purple-300/90 shrink-0">
          [ 03 // TECH STACK MATRIX ]
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/40 via-white/10 to-transparent" />
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500 hidden sm:inline">
          50 TECHNOLOGIES · 5 TIERS
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase text-white font-['Bricolage_Grotesque'] leading-none"
        >
          Skills &amp; Technologies
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-400 text-sm sm:text-base font-light max-w-md lg:text-right"
        >
          Building responsive web systems, real-time architectures, and interactive 3D spatial experiences.
        </motion.p>
      </div>
    </div>
  );
};

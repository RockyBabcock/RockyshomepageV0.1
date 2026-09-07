import React, { useEffect, useRef, useState } from 'react';

interface HomeSectionProps {
  scrollY: number;
  onNavigate?: (targetId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ scrollY, onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const signatureRef = useRef<HTMLImageElement>(null);
  const occRef = useRef<HTMLParagraphElement>(null);
  const scrollCtaRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check for user's reduced-motion preferences
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (word1Ref.current) {
        word1Ref.current.style.transform = 'none';
        word1Ref.current.style.opacity = '1';
      }
      if (word2Ref.current) {
        word2Ref.current.style.transform = 'none';
        word2Ref.current.style.opacity = '1';
      }
      if (signatureRef.current) {
        signatureRef.current.style.opacity = '1';
        signatureRef.current.style.transform = 'translateY(-50%)';
      }
      if (occRef.current) {
        occRef.current.style.opacity = '1';
        occRef.current.style.transform = 'none';
      }
      if (scrollCtaRef.current) {
        scrollCtaRef.current.style.opacity = '1';
        scrollCtaRef.current.style.transform = 'none';
      }
      return;
    }

    // Set initial animation state
    const words = [word1Ref.current, word2Ref.current];
    words.forEach((el) => {
      if (!el) return;
      el.style.transform = 'translateY(115%) rotate(4deg)';
      el.style.opacity = '0';
      el.style.transition =
        'transform 1.1s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.9s ease';
    });

    if (signatureRef.current) {
      signatureRef.current.style.opacity = '0';
      signatureRef.current.style.transform = 'translateY(-50%) scale(0.92)';
      signatureRef.current.style.transition =
        'opacity 1.2s ease 0.6s, transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.6s';
    }

    if (occRef.current) {
      occRef.current.style.opacity = '0';
      occRef.current.style.transform = 'translateY(20px)';
      occRef.current.style.transition =
        'opacity 0.9s ease 0.75s, transform 0.9s cubic-bezier(0.165, 0.84, 0.44, 1) 0.75s';
    }

    if (scrollCtaRef.current) {
      scrollCtaRef.current.style.opacity = '0';
      scrollCtaRef.current.style.transform = 'translateY(20px)';
      scrollCtaRef.current.style.transition =
        'opacity 0.9s ease 0.9s, transform 0.9s cubic-bezier(0.165, 0.84, 0.44, 1) 0.9s';
    }

    // Trigger entrance animation with RAF
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        words.forEach((el, idx) => {
          if (!el) return;
          setTimeout(() => {
            el.style.transform = 'translateY(0%) rotate(0deg)';
            el.style.opacity = '1';
          }, 200 + idx * 120);
        });

        if (signatureRef.current) {
          signatureRef.current.style.opacity = '1';
          signatureRef.current.style.transform = 'translateY(-50%) scale(1)';
        }

        if (occRef.current) {
          occRef.current.style.opacity = '1';
          occRef.current.style.transform = 'translateY(0)';
        }

        if (scrollCtaRef.current) {
          scrollCtaRef.current.style.opacity = '1';
          scrollCtaRef.current.style.transform = 'translateY(0)';
        }
      });
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  // Parallax translation (GPU accelerated translate3d)
  const parallaxOffsetY = scrollY * 0.16;

  const handleScrollCueClick = () => {
    if (onNavigate) {
      onNavigate('work');
    } else {
      const workEl = document.getElementById('work');
      if (workEl) {
        workEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // The non-linear gradient alpha mask:
  // Top 0-20% is highly transparent for cosmic nebula & 3D stars,
  // 35-55% blends watercolor halo into nebula,
  // 70-100% renders tulips fully opaque solid colors.
  const zenithMaskGradient =
    'linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.18) 18%, rgba(0,0,0,0.52) 36%, rgba(0,0,0,0.88) 56%, #000 72%, #000 100%)';

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden box-border select-none"
      aria-label="Hero section — Rocky Babcock"
    >
      {/* ─────────────────────────────────────────────────────────────
          LAYER 1: LOWER-MID LAYER — DYNAMIC NEBULAE & ENERGY FIELDS
          Inverted 180° blackhole fluid video extending from viewport zenith
          with mix-blend-screen (70-85% opacity) & purple-ultramarine radial glow
         ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-[1]"
        aria-hidden="true"
      >
        {/* Blackhole video inverted 180° to project downward from zenith */}
        <div className="absolute -top-[160px] sm:-top-[220px] md:-top-[260px] left-1/2 -translate-x-1/2 w-[140vw] sm:w-[125vw] max-w-[1700px] h-[105vh] sm:h-[120vh] rotate-180 mix-blend-screen opacity-80 pointer-events-none overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover select-none pointer-events-none"
            src="/videos/blackhole.webm"
          />
        </div>

        {/* Radial gradient glow blending deep purple and ultramarine */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 12%, rgba(147, 51, 234, 0.55) 0%, rgba(79, 70, 229, 0.35) 30%, transparent 75%)',
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: MIDDLE LAYER — WATERCOLOR ART FOREGROUND
          Main watercolor artwork with subtle parallax and key masking constraint
          allowing zenith transparency so the nebula & starfield show through
         ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-[2] overflow-hidden"
        style={{
          maskImage: zenithMaskGradient,
          WebkitMaskImage: zenithMaskGradient,
          transform: `translate3d(0, ${parallaxOffsetY}px, 0)`,
          willChange: 'transform',
        }}
        aria-hidden="true"
      >
        {/* Subtle skeleton shimmer while image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#030014]/30 via-purple-950/20 to-indigo-950/40 animate-pulse" />
        )}

        <img
          src="/assets/imgs/home-back.jpg"
          alt="Rocky Babcock watercolor tulip garden with rainbow halo"
          draggable={false}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-bottom sm:object-center select-none transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3: TOP LAYER — MUSAB HASSAN-STYLE TYPOGRAPHY
          Display Serif title in pure white with tight kerning,
          interwoven handwritten signature PNG overlapping the surname,
          drop-shadow contrast protection, centered occupation & ↓ SCROLL
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center pt-[14vh] sm:pt-[16vh] pb-[6vh] sm:pb-[8vh] px-4 pointer-events-none box-border">
        <div className="flex flex-col items-center justify-center text-center pointer-events-auto max-w-full">
          {/* Main Title Block */}
          <h1
            className="flex flex-col items-start text-left m-0 p-0 font-normal select-none"
            style={{
              fontFamily: 'var(--title-font)',
              filter: 'drop-shadow(0 4px 24px rgba(0, 0, 0, 0.65))',
            }}
          >
            {/* First Line: rocky */}
            <div className="overflow-hidden inline-flex pb-1">
              <span
                ref={word1Ref}
                className="inline-block text-white lowercase will-change-transform"
                style={{
                  fontSize: 'clamp(3.8rem, 12vw, 11.5rem)',
                  lineHeight: 0.86,
                  letterSpacing: '-0.04em',
                }}
              >
                rocky
              </span>
            </div>

            {/* Second Line: handwritten signature + babcock */}
            <div className="relative inline-flex items-baseline overflow-visible">
              {/* Authentic handwritten white signature PNG overlapping the surname */}
              <img
                ref={signatureRef}
                src="/assets/imgs/signature-white.png"
                alt="Rocky Babcock handwritten signature"
                draggable={false}
                className="absolute right-[82%] sm:right-[85%] md:right-[88%] top-[45%] -translate-y-1/2 w-[34vw] max-w-[270px] min-w-[125px] pointer-events-none select-none z-20"
                style={{
                  filter: 'drop-shadow(0 2px 14px rgba(0, 0, 0, 0.7))',
                }}
              />

              <div className="overflow-hidden inline-flex pb-1">
                <span
                  ref={word2Ref}
                  className="inline-block text-white lowercase will-change-transform relative z-10"
                  style={{
                    fontSize: 'clamp(3.8rem, 12vw, 11.5rem)',
                    lineHeight: 0.86,
                    letterSpacing: '-0.04em',
                  }}
                >
                  babcock
                </span>
              </div>
            </div>
          </h1>

          {/* Minimalist Sub-Headline (Monospaced, clean letterspacing) */}
          <div className="w-full text-center mt-[3vh] sm:mt-[4vh] overflow-hidden">
            <p
              ref={occRef}
              className="m-0 font-mono text-xs sm:text-sm md:text-base text-white/90 tracking-[0.14em] font-light lowercase will-change-transform"
              style={{
                filter: 'drop-shadow(0 2px 12px rgba(0, 0, 0, 0.75))',
              }}
            >
              creative technologist & frontend developer
            </p>
          </div>

          {/* Interactive ↓ SCROLL anchor button with hover motion */}
          <div className="w-full flex justify-center mt-[2.5vh] sm:mt-[3.2vh] overflow-hidden">
            <button
              ref={scrollCtaRef}
              type="button"
              onClick={handleScrollCueClick}
              className="group font-mono text-xs sm:text-sm tracking-[0.28em] uppercase text-white/85 hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 py-2 px-3 border-none bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded clickable will-change-transform"
              aria-label="Scroll down to projects"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.65))',
              }}
            >
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-1 text-sm sm:text-base font-normal">
                ↓
              </span>
              <span className="font-mono tracking-[0.28em]">SCROLL</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

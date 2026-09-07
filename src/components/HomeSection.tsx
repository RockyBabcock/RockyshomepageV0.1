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
        signatureRef.current.style.transform = 'none';
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

    // Set initial animation state with Musab Hassan's masked reveal coordinates:
    // transform: translate3d(0, 130%, 0) rotate(7deg) -> translate3d(0, 0%, 0) rotate(0deg)
    const words = [word1Ref.current, word2Ref.current];
    words.forEach((el) => {
      if (!el) return;
      el.style.transform = 'translate3d(0, 130%, 0) rotate(7deg)';
      el.style.opacity = '0';
      el.style.transition =
        'transform 1.25s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.85s ease';
    });

    if (signatureRef.current) {
      signatureRef.current.style.opacity = '0';
      signatureRef.current.style.transform = 'translate3d(0, 16px, 0) scale(0.96) rotate(-4deg)';
      signatureRef.current.style.transition =
        'opacity 1.2s ease 0.45s, transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.45s';
    }

    if (occRef.current) {
      occRef.current.style.opacity = '0';
      occRef.current.style.transform = 'translate3d(0, 20px, 0)';
      occRef.current.style.transition =
        'opacity 0.9s ease 0.65s, transform 0.9s cubic-bezier(0.165, 0.84, 0.44, 1) 0.65s';
    }

    if (scrollCtaRef.current) {
      scrollCtaRef.current.style.opacity = '0';
      scrollCtaRef.current.style.transform = 'translate3d(0, 20px, 0)';
      scrollCtaRef.current.style.transition =
        'opacity 0.9s ease 0.8s, transform 0.9s cubic-bezier(0.165, 0.84, 0.44, 1) 0.8s';
    }

    // Trigger staggered entrance animation
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (word1Ref.current) {
          setTimeout(() => {
            word1Ref.current!.style.transform = 'translate3d(0, 0%, 0) rotate(0deg)';
            word1Ref.current!.style.opacity = '1';
          }, 200);
        }

        if (word2Ref.current) {
          setTimeout(() => {
            word2Ref.current!.style.transform = 'translate3d(0, 0%, 0) rotate(0deg)';
            word2Ref.current!.style.opacity = '1';
          }, 340);
        }

        if (signatureRef.current) {
          setTimeout(() => {
            signatureRef.current!.style.opacity = '1';
            signatureRef.current!.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(-4deg)';
          }, 460);
        }

        if (occRef.current) {
          setTimeout(() => {
            occRef.current!.style.opacity = '1';
            occRef.current!.style.transform = 'translate3d(0, 0, 0)';
          }, 650);
        }

        if (scrollCtaRef.current) {
          setTimeout(() => {
            scrollCtaRef.current!.style.opacity = '1';
            scrollCtaRef.current!.style.transform = 'translate3d(0, 0, 0)';
          }, 800);
        }
      });
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  // Parallax translation for floating frame (GPU accelerated translate3d)
  const parallaxOffsetY = scrollY * 0.12;

  const handleScrollCueClick = () => {
    if (onNavigate) {
      onNavigate('work');
    } else {
      const workEl = document.getElementById('work');
      if (workEl) {
        const offset10vh = window.innerHeight * 0.1;
        const targetY = Math.max(0, workEl.offsetTop - offset10vh);
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden box-border select-none flex items-center justify-center bg-[#ebe8e1]"
      aria-label="Hero section — Rocky Babcock"
    >
      {/* ─────────────────────────────────────────────────────────────
          LAYER 1: FULL-SCREEN BOTANICAL WATERCOLOR ARTWORK (home-back.jpg)
          The watercolor tulip garden and blue watercolor sky fill the entire
          canvas, establishing the light, artistic museum atmosphere.
         ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-[1] overflow-hidden"
        style={{
          transform: `translate3d(0, ${parallaxOffsetY}px, 0)`,
          willChange: 'transform',
        }}
        aria-hidden="true"
      >
        <img
          src="/assets/imgs/home-back.jpg"
          alt="Rocky Babcock watercolor tulip garden"
          draggable={false}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center select-none transition-opacity duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: ATMOSPHERIC NEBULA & RADIANT CENTER HALO
          Multi-layer transparent compositing matching reference visual target:
          - Broad low-frequency outer haze in upper-middle sky (extremely subtle)
          - Mid haze diffusion in pastel lavender/lilac/blue
          - Soft radiant center halo (pale white/lilac core fading into watercolor)
          - Upright celestial accretion arc (blackhole.webm) with zero hard edges
          - Soft bloom-like horizon lens flare
          No hard edges, no opaque dark space, no color cast over the flowers.
         ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute left-1/2 pointer-events-none select-none z-[3] flex flex-col items-center justify-center overflow-visible mix-blend-screen"
        style={{
          top: '24%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(380px, 60vw, 760px)',
          height: 'clamp(280px, 44vw, 540px)',
        }}
        aria-hidden="true"
      >
        {/* 1. Broad Low-Frequency Outer Haze (gentle pastel lavender & blue atmospheric glow) */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '150%',
            height: '130%',
            left: '50%',
            top: '48%',
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(ellipse 80% 65% at 50% 48%, rgba(167, 139, 250, 0.09) 0%, rgba(139, 92, 246, 0.05) 36%, rgba(147, 197, 253, 0.02) 62%, transparent 82%)',
            filter: 'blur(54px)',
          }}
        />

        {/* 2. Mid Haze & Center Halo (soft, low-luminance bloom seamlessly merging into watercolor) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255, 255, 255, 0.22) 0%, rgba(233, 213, 255, 0.14) 28%, rgba(196, 181, 253, 0.07) 50%, transparent 80%)',
            filter: 'blur(32px)',
          }}
        />

        {/* 3. Celestial Accretion Arcs (blackhole.webm) with soft, toned-down luminance */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            maskImage:
              'radial-gradient(ellipse 88% 80% at 50% 50%, black 40%, rgba(0,0,0,0.62) 68%, transparent 96%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 88% 80% at 50% 50%, black 40%, rgba(0,0,0,0.62) 68%, transparent 96%)',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-[125%] h-[125%] max-w-none object-cover select-none pointer-events-none opacity-45"
            style={{
              objectPosition: 'center 46%',
              filter: 'brightness(0.76) contrast(1.05)',
            }}
            src="/videos/blackhole.webm"
          />
        </div>

        {/* 4. Delicate Horizontal Radiant Horizon Flare Beam with subtle, non-glaring bloom */}
        <div
          className="absolute w-[180%] max-w-[1200px] h-[1.5px] sm:h-[2px] pointer-events-none"
          style={{
            left: '50%',
            top: '51%',
            transform: 'translate(-50%, -50%)',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(167, 139, 250, 0.06) 18%, rgba(216, 180, 254, 0.45) 38%, rgba(255, 255, 255, 0.65) 50%, rgba(216, 180, 254, 0.45) 62%, rgba(167, 139, 250, 0.06) 82%, transparent 100%)',
            boxShadow:
              '0 0 10px 2px rgba(167, 139, 250, 0.20), 0 0 20px 4px rgba(196, 181, 253, 0.10)',
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3: FOREGROUND TYPOGRAPHIC LOCKUP (MUSAB HASSAN EDITORIAL)
          Balanced composition:
          - 'rocky' and 'babcock' display serif centered below the celestial crown.
          - Handwritten signature positioned with artistic breathing room to the
            upper-left flank of 'rocky', clearing the 'babcock' letters.
          - Occupation tagline and interactive '↓ SCROLL' cue aligned cleanly below.
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 pointer-events-none box-border pt-12 sm:pt-16 pb-4">
        {/* Core title and signature cluster */}
        <div className="relative flex flex-col items-center pointer-events-auto">
          {/* Handcrafted white signature placed to upper-left flank with artistic breathing room */}
          <div className="absolute -left-[24vw] sm:-left-[190px] md:-left-[250px] lg:-left-[290px] top-[2%] sm:top-[4%] md:top-[6%] pointer-events-none z-20">
            <img
              ref={signatureRef}
              src="/assets/imgs/signature-white.png"
              alt="Rocky Babcock handwritten signature"
              draggable={false}
              className="w-[40vw] sm:w-[28vw] md:w-[22vw] max-w-[280px] min-w-[155px] h-auto object-contain select-none will-change-transform"
              style={{
                filter:
                  'drop-shadow(0 3px 14px rgba(0, 0, 0, 0.55)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.75))',
              }}
            />
          </div>

          {/* Editorial Display Title Block */}
          <h1
            className="flex flex-col items-center m-0 p-0 font-normal select-none"
            style={{
              fontFamily: 'var(--title-font)',
              filter:
                'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.55)) drop-shadow(0 1px 4px rgba(0, 0, 0, 0.75))',
            }}
          >
            {/* First Word: rocky */}
            <div className="overflow-hidden inline-flex pb-1">
              <span
                ref={word1Ref}
                className="inline-block text-white lowercase will-change-transform"
                style={{
                  fontSize: 'clamp(4.2rem, 11vw, 9.4rem)',
                  lineHeight: 0.86,
                  letterSpacing: '-0.035em',
                  fontFamily: 'var(--title-font)',
                }}
              >
                rocky
              </span>
            </div>

            {/* Second Word: babcock */}
            <div className="overflow-hidden inline-flex pb-1">
              <span
                ref={word2Ref}
                className="inline-block text-white lowercase will-change-transform"
                style={{
                  fontSize: 'clamp(4.2rem, 11vw, 9.4rem)',
                  lineHeight: 0.86,
                  letterSpacing: '-0.035em',
                  fontFamily: 'var(--title-font)',
                }}
              >
                babcock
              </span>
            </div>
          </h1>

          {/* Minimalist Occupation Tagline */}
          <div className="overflow-hidden mt-4 sm:mt-5 md:mt-6">
            <p
              ref={occRef}
              className="m-0 text-xs sm:text-sm md:text-base text-white/95 tracking-[0.14em] font-normal lowercase text-center will-change-transform"
              style={{
                fontFamily: 'var(--body-font)',
                filter:
                  'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.65)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
              }}
            >
              creative technologist &amp; frontend developer
            </p>
          </div>

          {/* Interactive '↓ SCROLL' Action Cue */}
          <div className="overflow-hidden mt-3 sm:mt-4 md:mt-5">
            <button
              ref={scrollCtaRef}
              type="button"
              onClick={handleScrollCueClick}
              className="group font-mono text-xs sm:text-sm tracking-[0.28em] uppercase text-white/90 hover:text-white flex items-center gap-2 cursor-pointer transition-all duration-300 py-2 px-4 border-none bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded clickable will-change-transform"
              aria-label="Scroll down to studio projects"
              style={{
                filter:
                  'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.65)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
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


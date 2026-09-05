import React, { useEffect, useRef } from 'react';

interface HomeSectionProps {
  scrollY: number;
  onNavigate?: (targetId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ scrollY, onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const path4Ref = useRef<SVGPathElement>(null);
  const mobilePath1Ref = useRef<SVGPathElement>(null);
  const mobilePath2Ref = useRef<SVGPathElement>(null);
  const mobilePath3Ref = useRef<SVGPathElement>(null);
  const mobilePath4Ref = useRef<SVGPathElement>(null);

  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
  const occRef = useRef<HTMLParagraphElement>(null);
  const scrollCtaRef = useRef<HTMLButtonElement>(null);

  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Instantly resolve animations for users requesting reduced motion
      [path1Ref.current, path2Ref.current, path3Ref.current, path4Ref.current,
       mobilePath1Ref.current, mobilePath2Ref.current, mobilePath3Ref.current, mobilePath4Ref.current].forEach((p) => {
        if (p) p.style.strokeDashoffset = '0';
      });
      [word1Ref.current, word2Ref.current, occRef.current, scrollCtaRef.current].forEach((el) => {
        if (el) {
          el.style.transform = 'translateY(0%) rotate(0deg)';
          el.style.opacity = '1';
        }
      });
      if (bgWrapperRef.current) {
        bgWrapperRef.current.style.height = '100%';
        bgWrapperRef.current.style.transform = 'scale(1)';
        bgWrapperRef.current.style.boxShadow = '3px 9px 18px rgba(0, 0, 0, 0.2)';
      }
      if (bgImgRef.current) {
        bgImgRef.current.style.transform = 'translateY(0%) scale(1)';
      }
      return;
    }

    // Animate desktop & mobile signature paths
    const anim = [{ strokeDashoffset: '0' }];
    const animatePath = (path: SVGPathElement | null, duration: number, delay: number, easing: string) => {
      if (!path) return;
      path.animate(anim, {
        duration,
        delay,
        easing,
        fill: 'forwards',
      });
    };

    animatePath(path1Ref.current, 1000, 500, 'cubic-bezier(.72,.3,.25,1)');
    animatePath(path2Ref.current, 300, 1500, 'cubic-bezier(.47,.41,.26,1)');
    animatePath(path3Ref.current, 200, 1800, 'cubic-bezier(.47,.41,.26,1)');
    animatePath(path4Ref.current, 1000, 2000, 'cubic-bezier(.47,.41,.26,1)');

    animatePath(mobilePath1Ref.current, 1000, 500, 'cubic-bezier(.72,.3,.25,1)');
    animatePath(mobilePath2Ref.current, 300, 1500, 'cubic-bezier(.47,.41,.26,1)');
    animatePath(mobilePath3Ref.current, 200, 1800, 'cubic-bezier(.47,.41,.26,1)');
    animatePath(mobilePath4Ref.current, 1000, 2000, 'cubic-bezier(.47,.41,.26,1)');

    // Animate title and details with robust double-RAF timing
    const elements = [word1Ref.current, word2Ref.current, occRef.current, scrollCtaRef.current];
    elements.forEach((el, index) => {
      if (!el) return;
      el.style.transform = 'translateY(130%) rotate(7deg)';
      el.style.opacity = '0';
      el.style.transition = `transform 0.9s cubic-bezier(0.165, 0.84, 0.44, 1) ${
        500 + index * 90
      }ms, opacity 0.8s ease ${500 + index * 90}ms`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (el) {
            el.style.transform = 'translateY(0%) rotate(0deg)';
            el.style.opacity = '1';
          }
        });
      });
    });

    // Animate background image container
    if (bgWrapperRef.current && bgImgRef.current) {
      bgWrapperRef.current.style.height = '0';
      bgWrapperRef.current.style.transform = 'scale(1.3)';
      bgImgRef.current.style.transform = 'translateY(80%) scale(1.4)';

      setTimeout(() => {
        if (bgWrapperRef.current) {
          bgWrapperRef.current.style.transition =
            'height 1.5s cubic-bezier(0.165, 0.84, 0.44, 1), transform 1.5s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.6s ease 1s';
          bgWrapperRef.current.style.height = '100%';
          bgWrapperRef.current.style.transform = 'scale(1)';
          bgWrapperRef.current.style.boxShadow = '3px 9px 18px rgba(0, 0, 0, 0.2)';
        }
        if (bgImgRef.current) {
          bgImgRef.current.style.transition =
            'transform 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
          bgImgRef.current.style.transform = 'translateY(0%) scale(1)';
        }
      }, 500);
    }
  }, []);

  // Parallax translation
  const parallaxOffsetY = scrollY * 0.2;

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

  return (
    <div
      id="home"
      ref={sectionRef}
      className="relative w-screen h-screen px-[6vw] sm:px-[7vw] pt-[16vh] sm:pt-[20vh] pb-[8vh] sm:pb-[10vh] box-border overflow-hidden"
    >
      {/* Space Portfolio Purple Blackhole Ambient Light Overlay (/videos/blackhole.webm) */}
      <div className="rotate-180 absolute -top-[240px] sm:-top-[340px] left-0 w-full h-[110vh] sm:h-[125vh] -z-10 pointer-events-none opacity-40 sm:opacity-55 mix-blend-screen overflow-hidden select-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover select-none"
          src="/videos/blackhole.webm"
        />
      </div>

      <div className="relative h-full w-full z-10">
        <div className="flex flex-row justify-between items-center w-[95%] h-full relative box-border max-[1024px]:justify-center max-[1024px]:w-full">
          {/* Left Column: Signature (desktop and tablet) */}
          <div className="hidden md:flex relative h-full flex-col justify-center items-start spatial-float">
            <svg
              id="signature"
              className="w-[24vh] lg:w-[30vh] xl:w-[35vh] -ml-[2vh] lg:-ml-[6vh] transition-all duration-300"
              viewBox="0 0 190 136.9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Rocky Babcock handwritten signature"
            >
              <g>
                <path
                  ref={path1Ref}
                  className="path-1"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  d="M38.1,51c0,0,4.9-34.4,39.6-37.7c11.1-1.1-11.5,86.2-48.9,87.5c-18.5,0.6,19-69.3,51.7-84.4c21.3-9.8,15.3,26,15.3,26s6.2-9.3,7.9-6.1c1.7,3.1,0.1,5.1,6.9-1.9c1-1.2,13.9,3.3,18.8-1.3c1.4-1.3,6.4,1.3,6.4,1.3"
                />
                <path
                  ref={path2Ref}
                  className="path-2"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  d="M132.2,48.3l-23.9,78.8"
                />
                <path
                  ref={path3Ref}
                  className="path-3"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  d="M110.3,55.3c0,0-0.7,11.7-2.8,18s-6.7,20.2-6.9,24.1"
                />
                <path
                  ref={path4Ref}
                  className="path-4"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  d="M122,74.4c0,0-5.9-8-17.1-6.7c-11.1,1.3-20.2,11.3-21.1,12.6c-0.9,1.3-10,9.6,2.2,15s38.9-7.2,38.9-7.2s17.8-10,18.9-10s-4.6,5.9-4.3,7.2c0.4,1.3,2.8,2,7.2-1.5c1-0.8,17.2-0.8,22.2,1c1.9,0.7,3.5-0.2,5-1.4c1-0.8,9.4,2,9.4,2"
                />
              </g>
            </svg>
          </div>

          {/* Right Column: Name, Bio, and CTA */}
          <div className="relative h-full flex flex-col justify-center min-[1250px]:justify-end mr-[4vw] text-left max-[1250px]:mr-0">
            {/* Mobile-only compact signature accent */}
            <div className="md:hidden flex mb-2.5 opacity-70">
              <svg
                id="signature-mobile"
                className="w-[18vh] max-w-[130px] -ml-[1vh]"
                viewBox="0 0 190 136.9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <g>
                  <path
                    ref={mobilePath1Ref}
                    className="path-1"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    d="M38.1,51c0,0,4.9-34.4,39.6-37.7c11.1-1.1-11.5,86.2-48.9,87.5c-18.5,0.6,19-69.3,51.7-84.4c21.3-9.8,15.3,26,15.3,26s6.2-9.3,7.9-6.1c1.7,3.1,0.1,5.1,6.9-1.9c1-1.2,13.9,3.3,18.8-1.3c1.4-1.3,6.4,1.3,6.4,1.3"
                  />
                  <path
                    ref={mobilePath2Ref}
                    className="path-2"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    d="M132.2,48.3l-23.9,78.8"
                  />
                  <path
                    ref={mobilePath3Ref}
                    className="path-3"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    d="M110.3,55.3c0,0-0.7,11.7-2.8,18s-6.7,20.2-6.9,24.1"
                  />
                  <path
                    ref={mobilePath4Ref}
                    className="path-4"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    d="M122,74.4c0,0-5.9-8-17.1-6.7c-11.1,1.3-20.2,11.3-21.1,12.6c-0.9,1.3-10,9.6,2.2,15s38.9-7.2,38.9-7.2s17.8-10,18.9-10s-4.6,5.9-4.3,7.2c0.4,1.3,2.8,2,7.2-1.5c1-0.8,17.2-0.8,22.2,1c1.9,0.7,3.5-0.2,5-1.4c1-0.8,9.4,2,9.4,2"
                  />
                </g>
              </svg>
            </div>

            {/* Masked Title Words with refined vertical rhythm */}
            <h1 className="title font-normal drop-shadow-[0px_5px_10px_rgba(0,0,0,0.3)] tracking-tight select-none">
              <span className="overflow-hidden inline-flex pb-1">
                <span ref={word1Ref} className="inline-block opacity-0 will-change-transform">
                  Rocky
                </span>
              </span>
              <br />
              <span className="overflow-hidden inline-flex pb-1">
                <span ref={word2Ref} className="inline-block opacity-0 will-change-transform">
                  Babcock
                </span>
              </span>
            </h1>

            {/* Occupation Tagline */}
            <div className="overflow-hidden mt-[3.5vh] sm:mt-[5vh] max-w-xl">
              <p
                ref={occRef}
                className="paragraph opacity-0 will-change-transform text-white/90 text-sm sm:text-base md:text-lg tracking-wide font-light"
              >
                creative technologist & frontend developer
              </p>
            </div>

            {/* Accessible & Interactive Scroll Indicator */}
            <div className="mt-[4.5vh] sm:mt-[6.5vh] mr-[4vw] sm:mr-[7vw] inline-flex overflow-hidden">
              <button
                ref={scrollCtaRef}
                type="button"
                onClick={handleScrollCueClick}
                className="opacity-0 inline-flex flex-row items-center font-[family-name:var(--body-font)] uppercase text-[1.8vh] sm:text-[2vh] tracking-[0.4vh] text-white/90 hover:text-white transition-colors duration-200 border-none bg-transparent cursor-pointer p-0 group clickable focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60 rounded"
                aria-label="Scroll to work projects"
              >
                <div className="overflow-hidden h-[2vh] mr-[1.5vh] flex items-center">
                  <img
                    src="/assets/imgs/scroll_arrow.png"
                    alt=""
                    className="h-[2.3vh] group-hover:translate-y-0.5 transition-transform"
                    style={{ animation: 'scrollArrowLoop 3s ease infinite' }}
                  />
                </div>
                <span className="group-hover:tracking-[0.5vh] transition-all duration-300">scroll</span>
              </button>
            </div>
          </div>

          {/* Hero Parallax Background Image */}
          <div
            ref={bgWrapperRef}
            className="absolute left-0 z-[-1] w-[80%] h-full ml-[5%] rounded-[1.5vh] overflow-hidden select-none max-[1250px]:w-full max-[1250px]:ml-0 max-[1250px]:opacity-60 max-[750px]:opacity-40"
            style={{
              transform: `translate3d(0, ${parallaxOffsetY}px, 0)`,
            }}
          >
            <img
              ref={bgImgRef}
              src="/assets/imgs/home-back.jpg"
              alt="Home Background"
              draggable="false"
              className="w-full h-full object-cover rounded-[1.5vh]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


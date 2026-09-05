import React, { useEffect, useRef } from 'react';

interface HomeSectionProps {
  scrollY: number;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ scrollY }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const path4Ref = useRef<SVGPathElement>(null);

  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
  const occRef = useRef<HTMLParagraphElement>(null);
  const scrollCtaRef = useRef<HTMLDivElement>(null);

  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Animate signature paths
    const anim = [{ strokeDashoffset: '0' }];
    if (path1Ref.current) {
      path1Ref.current.animate(anim, {
        duration: 1000,
        delay: 500,
        easing: 'cubic-bezier(.72,.3,.25,1)',
        fill: 'forwards',
      });
    }
    if (path2Ref.current) {
      path2Ref.current.animate(anim, {
        duration: 300,
        delay: 1500,
        easing: 'cubic-bezier(.47,.41,.26,1)',
        fill: 'forwards',
      });
    }
    if (path3Ref.current) {
      path3Ref.current.animate(anim, {
        duration: 200,
        delay: 1800,
        easing: 'cubic-bezier(.47,.41,.26,1)',
        fill: 'forwards',
      });
    }
    if (path4Ref.current) {
      path4Ref.current.animate(anim, {
        duration: 1000,
        delay: 2000,
        easing: 'cubic-bezier(.47,.41,.26,1)',
        fill: 'forwards',
      });
    }

    // Animate title and details
    const elements = [word1Ref.current, word2Ref.current, occRef.current, scrollCtaRef.current];
    elements.forEach((el, index) => {
      if (!el) return;
      el.style.transform = 'translateY(130%) rotate(7deg)';
      el.style.transition = `transform 0.9s cubic-bezier(0.165, 0.84, 0.44, 1) ${
        500 + index * 90
      }ms, opacity 0.8s ease ${500 + index * 90}ms`;
      requestAnimationFrame(() => {
        el.style.transform = 'translateY(0%) rotate(0deg)';
        el.style.opacity = '1';
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

  return (
    <div
      id="home"
      ref={sectionRef}
      className="relative w-screen h-screen px-[7vw] pt-[23vh] pb-[12vh] box-border overflow-hidden"
    >
      {/* Space Portfolio Signature Purple Blackhole Ambient Light (/videos/blackhole.webm) */}
      <div className="rotate-180 absolute -top-[240px] sm:-top-[340px] left-0 w-full h-[110vh] sm:h-[125vh] -z-10 pointer-events-none opacity-55 sm:opacity-70 mix-blend-screen overflow-hidden select-none">
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
        <div className="flex flex-row justify-between items-center w-[95%] h-full relative box-border max-[1250px]:justify-center max-[1250px]:w-full">
          {/* Left Column: Signature (desktop only) */}
          <div className="hidden min-[1250px]:flex relative h-full flex-col justify-center items-start spatial-float">
            <svg
              id="signature"
              className="w-[35vh] -ml-[6vh]"
              viewBox="0 0 190 136.9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          <div className="relative h-full flex flex-col justify-end mr-[5vw] text-left max-[1250px]:mr-0 max-[1250px]:justify-center">
            {/* Masked Title Words */}
            <h1 className="title font-normal drop-shadow-[0px_5px_10px_rgba(0,0,0,0.3)]">
              <span className="overflow-hidden inline-flex">
                <span ref={word1Ref} className="inline-block opacity-0 will-change-transform">
                  Rocky
                </span>
              </span>
              <br />
              <span className="overflow-hidden inline-flex">
                <span ref={word2Ref} className="inline-block opacity-0 will-change-transform">
                  Babcock
                </span>
              </span>
            </h1>

            {/* Occupation Tagline */}
            <div className="overflow-hidden mt-[8vh] max-[750px]:w-[75%]">
              <p
                ref={occRef}
                className="paragraph opacity-0 will-change-transform"
              >
                creative technologist & frontend developer
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-[10vh] mr-[7vw] inline-flex overflow-hidden">
              <div
                ref={scrollCtaRef}
                className="opacity-0 inline-flex flex-row items-center font-[family-name:var(--body-font)] uppercase text-[2vh] tracking-[0.5vh] text-white"
              >
                <div className="overflow-hidden h-[2vh] mr-[1.5vh] flex items-center">
                  <img
                    src="/assets/imgs/scroll_arrow.png"
                    alt=""
                    className="h-[2.3vh]"
                    style={{ animation: 'scrollArrowLoop 3s ease infinite' }}
                  />
                </div>
                <span>scroll</span>
              </div>
            </div>
          </div>

          {/* Hero Parallax Background Image */}
          <div
            ref={bgWrapperRef}
            className="absolute left-0 z-[-1] w-[80%] h-full ml-[5%] rounded-[1.5vh] overflow-hidden select-none max-[1250px]:w-full max-[1250px]:ml-0 max-[1250px]:opacity-70 max-[750px]:opacity-30"
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

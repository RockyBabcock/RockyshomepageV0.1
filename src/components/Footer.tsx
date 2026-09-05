import React, { useEffect, useRef, useState } from 'react';
import { onScrolledIntoView } from '../utils';
import { SiteData } from '../types';

interface FooterProps {
  siteData?: SiteData | null;
}

export const Footer: React.FC<FooterProps> = ({ siteData }) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const path4Ref = useRef<SVGPathElement>(null);

  const [inView, setInView] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!footerRef.current) return;
    onScrolledIntoView(footerRef.current, () => {
      setInView(true);

      const anim = [{ strokeDashoffset: '0' }];
      if (path1Ref.current) {
        path1Ref.current.animate(anim, {
          duration: 1000,
          delay: 0,
          easing: 'cubic-bezier(.72,.3,.25,1)',
          fill: 'forwards',
        });
      }
      if (path2Ref.current) {
        path2Ref.current.animate(anim, {
          duration: 300,
          delay: 1000,
          easing: 'cubic-bezier(.47,.41,.26,1)',
          fill: 'forwards',
        });
      }
      if (path3Ref.current) {
        path3Ref.current.animate(anim, {
          duration: 200,
          delay: 1300,
          easing: 'cubic-bezier(.47,.41,.26,1)',
          fill: 'forwards',
        });
      }
      if (path4Ref.current) {
        path4Ref.current.animate(anim, {
          duration: 1000,
          delay: 1500,
          easing: 'cubic-bezier(.47,.41,.26,1)',
          fill: 'forwards',
        });
      }
    });
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="w-screen bg-[#131314] flex flex-col md:flex-row justify-between px-[13vw] py-[15vh] mt-[25vh] box-border relative z-10"
    >
      {/* Left side info */}
      <div
        className={`flex flex-col justify-between transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Brand logo */}
        <div className="mb-[5vh]">
          <img src="/assets/imgs/logo.svg" alt="logo" className="h-[6vh] inline-block" />
        </div>

        {/* Availability & Email */}
        <div className="mb-[5vh]">
          {siteData?.availablity_date === 'TBD' ? (
            <p className="text-[2.3vh] text-white/90 leading-relaxed font-[family-name:var(--body-font)]">
              I am currently not available for freelance work, <br className="hidden md:inline" />
              but you may reach me on my email for any inquiries.
            </p>
          ) : siteData?.availablity_date ? (
            <p className="text-[2.3vh] text-white/90 leading-relaxed font-[family-name:var(--body-font)]">
              i am available for freelance work after <br className="hidden md:inline" />
              {siteData.availablity_date}.
            </p>
          ) : (
            <p className="text-[2.3vh] text-white/90 leading-relaxed font-[family-name:var(--body-font)]">
              i am currently accepting freelance work, <br className="hidden md:inline" />
              you may reach me on my email.
            </p>
          )}

          <div className="mt-4">
            <a
              href="mailto:holmepavolini@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="button text-[2.5vh] text-white no-underline font-[family-name:var(--body-font)]"
            >
              holmepavolini@gmail.com
            </a>
          </div>
        </div>

        {/* Copyright & Open Source Credit */}
        <div className="text-white/40 text-left">
          <p className="text-[1.8vh] font-[family-name:var(--body-font)] mb-2 font-normal text-white/40">
            © {currentYear}
          </p>
          <p className="text-[1.5vh] leading-[130%] text-white/40">
            designed and developed by Rocky Babcock
            <br />
            <a
              href="https://github.com/RockyBabcock/Rockyshomepage"
              target="_blank"
              rel="noreferrer"
              className="button no-decor text-white/40 text-[1.4vh] mt-1 inline-block"
            >
              this website is open source on github
            </a>
          </p>
        </div>
      </div>

      {/* Right side animated signature decoration */}
      <div className="hidden md:flex flex-col justify-center items-end">
        <svg
          id="signature"
          className="w-[20vh]"
          viewBox="0 0 190 136.9"
          style={{ stroke: 'rgb(79, 78, 85)' }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              ref={path1Ref}
              className="path-1"
              stroke="rgb(79, 78, 85)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="miter"
              d="M38.1,51c0,0,4.9-34.4,39.6-37.7c11.1-1.1-11.5,86.2-48.9,87.5c-18.5,0.6,19-69.3,51.7-84.4c21.3-9.8,15.3,26,15.3,26s6.2-9.3,7.9-6.1c1.7,3.1,0.1,5.1,6.9-1.9c1-1.2,13.9,3.3,18.8-1.3c1.4-1.3,6.4,1.3,6.4,1.3"
            />
            <path
              ref={path2Ref}
              className="path-2"
              stroke="rgb(79, 78, 85)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="miter"
              d="M132.2,48.3l-23.9,78.8"
            />
            <path
              ref={path3Ref}
              className="path-3"
              stroke="rgb(79, 78, 85)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="miter"
              d="M110.3,55.3c0,0-0.7,11.7-2.8,18s-6.7,20.2-6.9,24.1"
            />
            <path
              ref={path4Ref}
              className="path-4"
              stroke="rgb(79, 78, 85)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="miter"
              d="M122,74.4c0,0-5.9-8-17.1-6.7c-11.1,1.3-20.2,11.3-21.1,12.6c-0.9,1.3-10,9.6,2.2,15s38.9-7.2,38.9-7.2s17.8-10,18.9-10s-4.6,5.9-4.3,7.2c0.4,1.3,2.8,2,7.2-1.5c1-0.8,17.2-0.8,22.2,1c1.9,0.7,3.5-0.2,5-1.4c1-0.8,9.4,2,9.4,2"
            />
          </g>
        </svg>
      </div>
    </footer>
  );
};

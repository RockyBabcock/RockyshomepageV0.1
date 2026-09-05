import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (targetId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 950);
      if (window.innerWidth > 950) {
        setMobileMenuActive(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (targetId: string) => {
    setMobileMenuActive(false);
    onNavigate(targetId);
  };

  return (
    <nav className="fixed top-4 sm:top-6 left-0 w-full z-[100] px-6 sm:px-10 md:px-14 flex flex-row justify-between items-center box-border pointer-events-none transition-all duration-300">
      {/* Brand Logo */}
      <div className="overflow-hidden h-8 sm:h-9 w-10 sm:w-12 mix-blend-exclusion cursor-pointer pointer-events-auto">
        <button
          onClick={() => handleNavClick('home')}
          className="border-none bg-transparent cursor-pointer p-0 m-0 w-full h-full flex items-center justify-center clickable"
          aria-label="Scroll to home"
        >
          <img
            src="/assets/imgs/logo.svg"
            alt="Logo"
            draggable="false"
            className="h-full w-full object-contain"
          />
        </button>
      </div>

      {/* Desktop & Mobile Menu */}
      <div className="flex items-center pointer-events-auto">
        {/* Desktop Menu - Refined typography to avoid header collisions */}
        <ul className="hidden md:flex list-none mix-blend-exclusion overflow-hidden m-0 p-0 items-center gap-1">
          <li className="font-mono uppercase text-xs tracking-[0.2em] inline-flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="border-none bg-transparent text-white/90 uppercase font-inherit text-inherit tracking-inherit cursor-pointer clickable hover:text-white transition-colors"
            >
              Home
            </button>
            <span className="mx-2 text-white/40">·</span>
          </li>
          <li className="font-mono uppercase text-xs tracking-[0.2em] inline-flex items-center">
            <button
              onClick={() => handleNavClick('work')}
              className="border-none bg-transparent text-white/90 uppercase font-inherit text-inherit tracking-inherit cursor-pointer clickable hover:text-white transition-colors"
            >
              Work
            </button>
            <span className="mx-2 text-white/40">·</span>
          </li>
          <li className="font-mono uppercase text-xs tracking-[0.2em] inline-flex items-center">
            <button
              onClick={() => handleNavClick('skills')}
              className="border-none bg-transparent text-white/90 uppercase font-inherit text-inherit tracking-inherit cursor-pointer clickable hover:text-white transition-colors"
            >
              Skills
            </button>
            <span className="mx-2 text-white/40">·</span>
          </li>
          <li className="font-mono uppercase text-xs tracking-[0.2em] inline-flex items-center">
            <a
              href="mailto:holmepavolini@gmail.com"
              className="text-white/90 uppercase font-inherit text-inherit tracking-inherit no-underline clickable hover:text-white transition-colors"
            >
              Contact
            </a>
            <span className="mx-2 text-white/40">·</span>
          </li>
          <li className="font-mono uppercase text-xs tracking-[0.2em] inline-flex items-center">
            <a
              href="https://github.com/RockyBabcock/Rockyshomepage"
              target="_blank"
              rel="noreferrer"
              className="text-white/90 uppercase font-inherit text-inherit tracking-inherit no-underline clickable hover:text-white transition-colors"
            >
              Github
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuActive(!mobileMenuActive)}
            className="border-none bg-transparent cursor-pointer p-2 z-[110] relative clickable"
            aria-label="Toggle Navigation Menu"
          >
            <div className="flex flex-col justify-center w-[3vh] h-[2.2vh] gap-[5px] transition-all duration-300">
              <span
                className={`block h-[2px] bg-white transition-all duration-300 ${
                  mobileMenuActive ? 'translate-y-[7px] rotate-[-45deg] w-full' : 'w-full'
                }`}
              />
              <span
                className={`block h-[2px] bg-white transition-all duration-300 ${
                  mobileMenuActive ? 'opacity-0 w-0' : 'w-full'
                }`}
              />
              <span
                className={`block h-[2px] bg-white transition-all duration-300 ${
                  mobileMenuActive ? '-translate-y-[7px] rotate-[45deg] w-full' : 'w-full'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen bg-[#131314] z-[105] transition-all duration-700 ease-[cubic-bezier(0.58,0.14,0.06,0.97)] overflow-hidden flex flex-col justify-center px-[10vw] pt-[10vh] ${
          mobileMenuActive ? 'w-screen left-0 pointer-events-auto' : 'w-0 pointer-events-none'
        }`}
      >
        <ul className="list-none flex flex-col justify-center w-full m-0 p-0">
          <li className="font-[family-name:var(--body-font)] font-bold lowercase text-[9vw] py-[2vh] border-b border-white/30">
            <button
              onClick={() => handleNavClick('home')}
              className="border-none bg-transparent text-white font-inherit text-inherit cursor-pointer text-left w-full clickable"
            >
              home
            </button>
          </li>
          <li className="font-[family-name:var(--body-font)] font-bold lowercase text-[9vw] py-[2vh] border-b border-white/30">
            <button
              onClick={() => handleNavClick('work')}
              className="border-none bg-transparent text-white font-inherit text-inherit cursor-pointer text-left w-full clickable"
            >
              work
            </button>
          </li>
          <li className="font-[family-name:var(--body-font)] font-bold lowercase text-[9vw] py-[2vh] border-b border-white/30">
            <button
              onClick={() => handleNavClick('skills')}
              className="border-none bg-transparent text-white font-inherit text-inherit cursor-pointer text-left w-full clickable"
            >
              skills
            </button>
          </li>
          <li className="font-[family-name:var(--body-font)] font-bold lowercase text-[9vw] py-[2vh] border-b border-white/30">
            <a
              href="mailto:holmepavolini@gmail.com"
              className="text-white no-underline font-inherit text-inherit block w-full clickable"
            >
              contact
            </a>
          </li>
          <li className="font-[family-name:var(--body-font)] font-bold lowercase text-[9vw] py-[2vh]">
            <a
              href="https://github.com/RockyBabcock/Rockyshomepage"
              target="_blank"
              rel="noreferrer"
              className="text-white no-underline font-inherit text-inherit block w-full clickable"
            >
              github
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

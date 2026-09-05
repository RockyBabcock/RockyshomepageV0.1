import React from 'react';

interface LoaderProps {
  progress: number;
  loadingDone: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ progress, loadingDone }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col justify-center items-center z-[1000] bg-[#222224] transition-opacity duration-700">
      <div className="relative block h-[2px] w-80 max-w-[80vw]">
        <div
          className={`absolute top-0 h-full w-full bg-white/10 transition-all duration-700 ${
            loadingDone ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div
          className="absolute top-0 h-full bg-white transition-all duration-500 ease-out"
          style={{
            width: loadingDone ? '0%' : `${progress}%`,
            right: loadingDone ? 0 : 'auto',
            left: loadingDone ? 'auto' : 0,
          }}
        />
      </div>
    </div>
  );
};

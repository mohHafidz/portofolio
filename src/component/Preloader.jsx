import React from 'react';
import { Dot } from 'lucide-react';

function Preloader({ isLoading }) {
  return (
    <div
      className={`
        fixed inset-0 z-[100] flex items-center justify-center
        bg-portfolio-main transition-all duration-700 ease-in-out
        ${isLoading ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
      `}
    >
      <div className={`transition-all duration-1000 ${isLoading ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold flex flex-row items-end gap-1 leading-none text-white animate-pulse">
          <span>FITS</span>

          <svg width="0" height="0">
            <defs>
              <linearGradient id="dotGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9BA8AB" />
                <stop offset="100%" stopColor="#4A5C6A" />
              </linearGradient>
            </defs>
          </svg>

          <Dot
            className="w-8 h-8 md:w-10 md:h-10"
            stroke="url(#dotGradient)"
            strokeWidth={2.5}
          />

          <span className="bg-gradient-to-b from-ketiga to-kelima bg-clip-text text-transparent">
            DEV
          </span>
        </h1>
      </div>
    </div>
  );
}

export default Preloader;

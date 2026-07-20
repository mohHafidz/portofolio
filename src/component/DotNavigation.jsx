import React from 'react';

function DotNavigation({ activeSection, onDotClick }) {
  const sections = [
    { name: "Home" },
    { name: "About Journey" },
    { name: "Skills & Expertise" },
    { name: "Projects" }
  ];

  return (
    <div className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 sm:gap-4">
      {sections.map((sec, index) => (
        <div key={index} className="relative group flex items-center justify-end">
          
          {/* Tooltip Label (Sembunyikan di mobile agar tidak nyangkut saat di-tap) */}
          <span className="
            absolute right-6 sm:right-8 
            bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg
            text-xs font-medium text-white
            opacity-0 md:group-hover:opacity-100
            translate-x-2 md:group-hover:translate-x-0
            transition-all duration-300 pointer-events-none
            border border-white/20
            whitespace-nowrap
            hidden md:block
          ">
            {sec.name}
          </span>

          {/* Dot */}
          <button 
            onClick={() => onDotClick(index)}
            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center focus:outline-none"
            aria-label={`Scroll to ${sec.name}`}
          >
            <div className={`
              rounded-full transition-all duration-300
              ${activeSection === index 
                ? "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 md:group-hover:bg-white/70"}
            `} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default DotNavigation;

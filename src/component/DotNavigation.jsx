import React from 'react';

function DotNavigation({ activeSection, onDotClick }) {
  const sections = [
    { name: "Home" },
    { name: "About Journey" },
    { name: "Skills & Expertise" },
    { name: "Projects" }
  ];

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
      {sections.map((sec, index) => (
        <div key={index} className="relative group flex items-center justify-end">
          
          {/* Tooltip Label */}
          <span className="
            absolute right-8 
            bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg
            text-xs font-medium text-white
            opacity-0 group-hover:opacity-100
            translate-x-2 group-hover:translate-x-0
            transition-all duration-300 pointer-events-none
            border border-white/20
            whitespace-nowrap
          ">
            {sec.name}
          </span>

          {/* Dot */}
          <button 
            onClick={() => onDotClick(index)}
            className="w-8 h-8 flex items-center justify-center focus:outline-none"
            aria-label={`Scroll to ${sec.name}`}
          >
            <div className={`
              rounded-full transition-all duration-300
              ${activeSection === index 
                ? "w-3 h-3 bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                : "w-2 h-2 bg-white/40 group-hover:bg-white/70"}
            `} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default DotNavigation;

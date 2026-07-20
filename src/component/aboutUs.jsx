import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase, Laptop, Code, Monitor, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { year: "2021", title: "Informatics Fundamentals", desc: "Programming logic, algorithms, and system thinking", icon: Code },
  { year: "2024", title: "Mobile Developer Internship", desc: "PT Charoen Pokphand Indonesia · 6 Months", icon: Briefcase },
  { year: "2025", title: "Bachelor of Computer Science", desc: "BINUS University · Completed Sep 2025", icon: GraduationCap },
  { year: "2025", title: "Freelance Software Developer", desc: "Mobile & Backend Projects · 4 Months", icon: Laptop },
  { year: "2026", title: "Freelance Software Developer", desc: "Dealer Monitoring System (Web & Windows App) · 3 Months", icon: Monitor },
  { year: "Present", title: "Magister Teknik Informatika", desc: "BINUS University · Sep 2025 – Present", icon: GraduationCap },
];

function AboutUs() {
  const sectionRef = useRef(null);
  const mainLineRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const handleScroll = () => {
    if (scrollWrapperRef.current) {
      const { scrollTop } = scrollWrapperRef.current;
      // Sembunyikan panah jika user sudah melakukan scroll lebih dari 20px
      if (scrollTop > 20) {
        setShowScrollHint(false);
      } else {
        setShowScrollHint(true);
      }
    }
  };

  useLayoutEffect(() => {
    const scroller = document.querySelector("#scroll-root");
    if (!sectionRef.current || !mainLineRef.current || !scroller) return;

    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop } = context.conditions;
      const itemsEl = sectionRef.current.querySelectorAll(".timeline-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        }
      });

      // Animasi Garis Utama: Width untuk Desktop, Height untuk Mobile
      tl.to(mainLineRef.current, {
        width: isDesktop ? "100%" : "2px",
        height: isDesktop ? "2px" : "100%",
        duration: items.length * 0.4,
        ease: "none",
      });

      itemsEl.forEach((item, index) => {
        const dot = item.querySelector(".timeline-dot");
        const box = item.querySelector(".timeline-box");
        const connector = item.querySelector(".timeline-connector");
        const t = index * 0.4;

        tl.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: "back.out(1.7)",
        }, t);

        // Connector hanya tampil di desktop
        if (isDesktop && connector) {
          tl.fromTo(connector,
            { scaleY: 0 },
            { scaleY: 1, duration: 0.2, transformOrigin: index % 2 === 0 ? "bottom center" : "top center" },
            t + 0.1
          );
        }

        tl.to(box, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }, t + 0.2);
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center py-20 md:py-28 overflow-hidden snap-start snap-none relative mb-36"
    >
      <div className="max-w-2xl text-center mb-16 md:mb-26 px-4 text-white">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Professional Journey</h2>
        <p className="text-sm md:text-base opacity-80">A structured journey combining academic foundations, industry experience, and continuous professional growth.</p>
      </div>

      <div className="w-full flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 relative">
        {/* Scroll Wrapper: Vertikal Scroll di Mobile, Normal di Desktop */}
        <div
          ref={scrollWrapperRef}
          onScroll={handleScroll}
          className="w-full h-[75vh] md:h-auto overflow-y-auto md:overflow-visible overflow-x-hidden pb-12 pt-8 px-6 md:px-0 scrollbar-hide"
        >

          {/* Container Timeline: Vertikal di Mobile, Horizontal di Desktop */}
          <div className="relative w-full mx-auto max-w-7xl xl:max-w-[90rem] md:h-[300px] flex flex-col md:flex-row items-start md:items-center">

            {/* Garis Dasar (Background) */}
            <div className="absolute left-4 md:left-0 md:top-1/2 w-[2px] md:w-full h-full md:h-[2px] bg-white/10 md:-translate-y-1/2" />

            {/* Garis Animasi GSAP */}
            <div
              ref={mainLineRef}
              className="absolute left-4 md:left-0 md:top-1/2 w-[2px] md:w-0 h-0 md:h-[2px] bg-gradient-to-b md:bg-gradient-to-r from-blue-400 to-purple-500 shadow-[0_0_15px_rgba(96,165,250,0.7)] md:-translate-y-1/2 z-10"
            />

            <ul className="w-full flex flex-col md:grid md:grid-cols-6 h-full relative z-20 gap-12 md:gap-0">
              {items.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <li
                    key={index}
                    className="timeline-item relative flex flex-row md:flex-col items-center md:justify-center pl-10 md:pl-0"
                  >
                    {/* DOT - Kiri di mobile, tengah di desktop */}
                    <div className="absolute left-[-2px] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20">
                      <div className="timeline-dot flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 border-2 border-blue-400 opacity-0 scale-0 shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                        <item.icon className="w-5 h-5 text-blue-200" />
                      </div>
                    </div>

                    {/* CONNECTOR LINE (Desktop only) */}
                    <div
                      className={`
                        hidden md:block timeline-connector absolute w-[2px] bg-blue-400/70
                        ${isEven ? "bottom-1/2 h-10 -translate-y-2" : "top-1/2 h-10 translate-y-2"}
                      `}
                    />

                    {/* BOX */}
                    <div
                      className={`
                        timeline-box flex flex-col text-left md:text-center 
                        bg-white/10 backdrop-blur-lg border border-white/20 text-white opacity-0
                        w-full md:w-56 p-4 rounded-xl shadow-xl transition-all
                        md:absolute
                        ${isEven
                          ? "md:bottom-[60%] md:translate-y-6"
                          : "md:top-[60%] md:-translate-y-6"
                        }
                        translate-x-4 md:translate-x-0
                      `}
                    >
                      <h3 className="font-bold text-sm md:text-base mb-2 leading-snug text-blue-300 md:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* PROMINENT YEAR WATERMARK (Desktop only) */}
                    <div
                      className={`
                        hidden md:block absolute font-bold text-4xl text-white/10 select-none pointer-events-none
                        ${isEven
                          ? "top-[60%] translate-y-4"
                          : "bottom-[60%] -translate-y-4"
                        }
                      `}
                    >
                      {item.year}
                    </div>
                  </li>
                );
              })}
            </ul>

          </div>
        </div>

        {/* Scroll Indicator Hint dengan Gradient Mask (Hanya muncul di Mobile & belum di-scroll) */}
        <div
          className={`md:hidden absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a1219] via-[#0a1219]/80 to-transparent z-30 pointer-events-none flex flex-col items-center justify-end pb-4 transition-opacity duration-500 ${showScrollHint ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-[10px] font-bold tracking-widest text-blue-400 mb-1 drop-shadow-md">SCROLL MORE</span>
            <ChevronDown className="w-5 h-5 text-blue-400 drop-shadow-md" />
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutUs;
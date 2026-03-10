import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { title: "Informatics Fundamentals", desc: "Programming logic, algorithms, and system thinking" },
  { title: "Mobile Developer Internship", desc: "PT Charoen Pokphand Indonesia · 6 Months" },
  { title: "Bachelor of Computer Science", desc: "BINUS University · Completed Sep 2025" },
  { title: "Freelance Software Developer", desc: "Mobile & Backend Projects · Sep – Dec 2025" },
  { title: "Magister Teknik Informatika", desc: "BINUS University · Sep 2025 – Present" },
];

function AboutUs() {
  const sectionRef = useRef(null);
  const mainLineRef = useRef(null);

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
        duration: items.length * 0.6,
        ease: "none",
      });

      itemsEl.forEach((item, index) => {
        const dot = item.querySelector(".timeline-dot");
        const box = item.querySelector(".timeline-box");
        const connector = item.querySelector(".timeline-connector");
        const t = index * 0.6;

        tl.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: "back.out(1.7)",
        }, t);

        // Connector hanya tampil di desktop (untuk mobile kita buat box mepet garis)
        if (isDesktop && connector) {
          tl.fromTo(connector, 
            { scaleY: 0 },
            { scaleY: 1, duration: 0.25, transformOrigin: index % 2 === 0 ? "bottom center" : "top center" },
            t + 0.15
          );
        }

        tl.to(box, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        }, t + 0.3);
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

      <div className="w-full flex justify-center px-6">
        {/* Container Timeline: Horizontal di Desktop, Vertikal di Mobile */}
        <div className="relative w-full max-w-5xl min-h-[600px] md:min-h-0 md:h-[300px] flex flex-col md:flex-row items-start md:items-center">

          {/* Garis Dasar (Background) */}
          <div className="absolute left-4 md:left-0 md:top-1/2 w-[2px] md:w-full h-full md:h-[2px] bg-white/10 md:-translate-y-1/2" />

          {/* Garis Animasi GSAP */}
          <div
            ref={mainLineRef}
            className="absolute left-4 md:left-0 md:top-1/2 w-[2px] md:w-0 h-0 md:h-[2px] bg-gradient-to-b md:bg-gradient-to-r from-blue-400 to-purple-500 md:-translate-y-1/2 z-10"
          />

          <ul className="w-full flex flex-col md:grid md:grid-cols-5 h-full relative z-20 gap-12 md:gap-0">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <li
                  key={index}
                  className="timeline-item relative flex flex-row md:flex-col items-center md:justify-center pl-10 md:pl-0"
                >
                  {/* DOT - Pindah ke kiri di mobile, tengah di desktop */}
                  <div className="absolute left-[-2px] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20">
                    <div className="timeline-dot w-5 h-5 md:w-4 md:h-4 rounded-full bg-white opacity-0 scale-0 border-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                  </div>

                  {/* CONNECTOR LINE - Hanya muncul di desktop */}
                  <div
                    className={`
                      hidden md:block timeline-connector absolute w-[2px] bg-blue-400/70
                      ${isEven ? "bottom-1/2 h-10 -translate-y-2" : "top-1/2 h-10 translate-y-2"}
                    `}
                  />

                  {/* BOX - Responsive positioning */}
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
                </li>
              );
            })}
          </ul>

        </div>
      </div>
    </section>
  );
}

export default AboutUs;
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

    const ctx = gsap.context(() => {

      const itemsEl = sectionRef.current.querySelectorAll(".timeline-item");
      if (!itemsEl.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller, // ✅ PAKAI ELEMENT, BUKAN STRING
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        }
      });

      tl.to(mainLineRef.current, {
        width: "100%",
        duration: items.length * 0.6,
        ease: "none",
      });

      itemsEl.forEach((item, index) => {
        const dot = item.querySelector(".timeline-dot");
        const box = item.querySelector(".timeline-box");
        const connector = item.querySelector(".timeline-connector");
        if (!dot || !box || !connector) return;

        const t = index * 0.6;

        // DOT muncul dulu
        tl.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: "back.out(1.7)",
        }, t);

        // CONNECTOR tumbuh dari DOT ke BOX
        tl.fromTo(
          connector,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.25,
            ease: "power2.out",
            transformOrigin: index % 2 === 0 ? "bottom center" : "top center",
          },
          t + 0.15
        );

        // BOX muncul terakhir
        tl.to(box, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        }, t + 0.3);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center py-28 overflow-hidden min-h-[100vh] relative"
    >
      <div className="max-w-2xl text-center mb-26 px-4 text-white">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Professional Journey</h2>
        <p className="text-sm opacity-80">A structured journey combining academic foundations, industry experience, and continuous professional growth.</p>
      </div>

      <div className="w-full flex justify-center px-6">
        <div className="relative w-full max-w-5xl h-[300px] flex items-center">

          {/* Garis Dasar Tetap */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2" />

          {/* Garis Animasi GSAP */}
          <div
            ref={mainLineRef}
            className="absolute top-1/2 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 -translate-y-1/2 z-10"
          />

          <ul className="w-full grid grid-cols-5 h-full relative z-20">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <li
                  key={index}
                  className="timeline-item relative flex flex-col items-center justify-center"
                >

                  {/* DOT */}
                  <div className="absolute top-1/2 -translate-y-1/2 z-20">
                    <div className="timeline-dot w-4 h-4 rounded-full bg-white opacity-0 scale-0 border-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                  </div>

                  {/* CONNECTOR LINE */}
                  <div
                    className={`
            timeline-connector absolute w-[2px] bg-blue-400/70
            ${isEven
                        ? "bottom-1/2 h-10 -translate-y-2"
                        : "top-1/2 h-10 translate-y-2"
                      }
          `}
                  />

                  {/* BOX */}
                  <div
                    className={`
            timeline-box absolute flex flex-col items-center text-center 
            bg-white/10 backdrop-blur-lg border border-white/20 text-white opacity-0
            w-56 p-4 rounded-xl shadow-xl
            ${isEven
                        ? "bottom-[60%] translate-y-6"
                        : "top-[60%] -translate-y-6"}
          `}
                  >
                    <h3 className="font-bold text-sm mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed">
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
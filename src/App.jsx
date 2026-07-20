import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import './App.css'
import Dock from './component/dock.jsx'
import LandingPage from './component/landingPage.jsx'
import Skill from './component/skill.jsx'
import AboutUs from './component/aboutUs.jsx'
import Proyect from './component/proyect.jsx'
import Preloader from './component/Preloader.jsx'
import DotNavigation from './component/DotNavigation.jsx'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const appRef = useRef(null);
  const isNavigating = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Hilangkan preloader setelah 1.5 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    // Gunakan gsap.context untuk clean up yang aman di React
    let ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      const scroller = document.querySelector("#scroll-root");
      const content = document.querySelector("#scroll-content");

      // Gunakan ResizeObserver agar ScrollTrigger SELALU update
      // ketika gambar selesai loading atau layout berubah
      const ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      ro.observe(content);

      ScrollTrigger.create({
        scroller: scroller,
        trigger: content,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const sections = gsap.utils.toArray(".gsap-snap");
          const maxScroll = content.offsetHeight - scroller.offsetHeight;
          if (maxScroll <= 0) return;

          const contentRect = content.getBoundingClientRect();
          let currentIdx = 0;
          let minDiff = Infinity;

          sections.forEach((sec, idx) => {
            const secOffset = sec.getBoundingClientRect().top - contentRect.top;
            const p = secOffset / maxScroll;
            // Jika progress user mendekati titik p, berarti dia ada di section tersebut
            const diff = Math.abs(self.progress - p);
            if (diff < minDiff) {
              minDiff = diff;
              currentIdx = idx;
            }
          });
          
          setActiveSection(currentIdx);
        },
        snap: {
          snapTo: (progress, self) => {
            if (isNavigating.current) {
              return progress;
            }

            const sections = gsap.utils.toArray(".gsap-snap");
            const maxScroll = content.offsetHeight - scroller.offsetHeight;

            if (maxScroll <= 0) return progress;

            const viewportHeight = scroller.offsetHeight;
            const currentScrollPx = progress * maxScroll;

            // Kumpulkan titik snap menggunakan offsetTop (sangat presisi dan kebal dari bug scroll)
            const snapPoints = sections.map(sec => sec.offsetTop);

            // Deteksi jika user sedang scroll di dalam section yang tinggi (seperti Project)
            let insideFreeScroll = false;
            for (let i = 0; i < sections.length; i++) {
              const sec = sections[i];
              const secStart = sec.offsetTop;
              const secHeight = sec.offsetHeight;

              if (secHeight > viewportHeight) {
                // Beri buffer 15px dari atas dan bawah
                const freeStart = secStart + 15;
                const freeEnd = secStart + secHeight - viewportHeight - 15;
                
                // Jika user berada di tengah-tengah section panjang ini
                if (currentScrollPx > freeStart && currentScrollPx < freeEnd) {
                  insideFreeScroll = true;
                  break;
                }
              }
            }

            if (insideFreeScroll) {
              return progress; // Biarkan user bebas scroll di dalam section ini
            }

            // Cek apakah posisi scroll saat ini sudah tepat pada atau sangat dekat dengan titik snap 
            // (misal setelah klik navigasi, atau berhenti tepat di snap point)
            const closestPoint = snapPoints.find(p => Math.abs(p - currentScrollPx) <= 15);
            if (closestPoint !== undefined) {
              return closestPoint / maxScroll;
            }

            // Jika di luar free scroll zone, jalankan auto-scroll (snap)
            if (self.direction === 1) { // Scroll ke bawah
              const nextPoint = snapPoints.find(p => p > currentScrollPx + 15);
              return nextPoint !== undefined ? (nextPoint / maxScroll) : progress;
            } else if (self.direction === -1) { // Scroll ke atas
              const prevPoint = [...snapPoints].reverse().find(p => p < currentScrollPx - 15);
              return prevPoint !== undefined ? (prevPoint / maxScroll) : progress;
            }

            return progress;
          },
          duration: { min: 0.2, max: 0.5 },
          delay: 0,
          ease: "power2.out",
        }
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  const handleDotClick = (index) => {
    const sections = gsap.utils.toArray(".gsap-snap");
    if (sections[index]) {
      isNavigating.current = true;
      gsap.to("#scroll-root", {
        scrollTo: sections[index],
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Beri sedikit delay sebelum mengaktifkan kembali snapping
          // untuk mencegah snap yang tidak disengaja setelah scroll terprogram selesai.
          setTimeout(() => {
            isNavigating.current = false;
          }, 50);
        }
      });
    }
  };

  return (
    <div ref={appRef}>
      <Preloader isLoading={isLoading} />
      <DotNavigation activeSection={activeSection} onDotClick={handleDotClick} />
      
      {/* FIXED BACKGROUND (ONCE) */}
      <div
        className="
          fixed inset-0 -z-10
          bg-portfolio-main
        "
      />
      {/* 1. LIQUID BACKGROUND ELEMENTS (FIXED) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Blob 1: Top Left - Menggunakan warna ketiga (biru keabuan) */}
        <div className="liquid-blob bg-ketiga/20 w-[500px] h-[500px] -top-20 -left-20"></div>

        {/* Blob 2: Middle Right - Menggunakan warna kelima (biru sangat gelap) */}
        <div className="liquid-blob bg-kelima/40 w-[600px] h-[600px] top-1/2 -right-40 -translate-y-1/2"></div>

        {/* Blob 3: Bottom Left - Menggunakan warna keempat (biru gelap) */}
        <div className="liquid-blob bg-keempat/30 w-[400px] h-[400px] bottom-0 left-1/4"></div>
      </div>
      {/* SCROLL CONTAINER */}
      <div
        id="scroll-root"
        className="
          h-dvh
          overflow-y-scroll
          scroll-smooth
          flex flex-col
        "
      >
        <div id="scroll-content" className="flex flex-col w-full">
          {/* <Dock /> */}

          {/* LANDING */}
          <section className="gsap-snap min-h-dvh flex flex-col justify-center">
            <LandingPage />
          </section>

          {/* ABOUT / JOURNEY */}
          <section className="gsap-snap min-h-dvh">
            <AboutUs />
          </section>

          {/* SKILLS */}
          <section className="gsap-snap min-h-dvh flex flex-col justify-center">
            <Skill />
          </section>

          {/* PROYECTS */}
          <section className="gsap-snap min-h-dvh w-full py-20">
            <Proyect />
          </section>
        </div>
      </div>
    </div>
  )
}

export default App

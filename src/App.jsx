import './App.css'
import Dock from './component/dock.jsx'
import LandingPage from './component/landingPage.jsx'
import Skill from './component/skill.jsx'
import AboutUs from './component/aboutUs.jsx'
import Proyect from './component/proyect.jsx'

function App() {
  return (
    <>
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
        className="
          h-screen
          overflow-y-scroll
          scroll-smooth
          snap-y
          snap-mandatory
          flex flex-col
        "
      >
        <Dock />

        {/* LANDING */}
        <section className="snap-start h-screen">
          <LandingPage />
        </section>

        {/* ABOUT / JOURNEY */}
        <section className="snap-start min-h-screen">
          <AboutUs />
        </section>

        {/* SKILLS */}
        <section className="snap-start min-h-screen mb-20">
          <Skill />
        </section>

        {/* PROYECTS */}
        <section className="snap-start min-h-screen w-full py-20">
          <Proyect />
        </section>
      </div>
    </>
  )
}

export default App

import { useEffect, useState, useRef } from "react"
// import { useEffect, , useState } from "react"

// import { useEffect, useState } from "react"

const items = [
  {
    title: "Informatics Fundamentals",
    desc: "Programming logic, algorithms, and system thinking",
    position: "start",
    isFirst: true,
  },
  {
    title: "Mobile Developer Internship",
    desc: "PT Charoen Pokphand Indonesia · 6 Months",
    position: "end",
  },
  {
    title: "Bachelor of Computer Science",
    desc: "BINUS University · Completed Sep 2025",
    position: "start",
  },
  {
    title: "Freelance Software Developer",
    desc: "Mobile & Backend Projects · Sep – Dec 2025",
    position: "end",
  },
  {
    title: "Magister Teknik Informatika",
    desc: "BINUS University · Sep 2025 – Present",
    position: "start",
    isLast: true,
  },
]


function TimelineItem({
  title,
  desc,
  position,
  startAt,
  isFirst,
  isLast,
}) {
  const [showLineLeft, setShowLineLeft] = useState(false)
  const [showDot, setShowDot] = useState(false)
  const [showBox, setShowBox] = useState(false)
  const [showLineRight, setShowLineRight] = useState(false)

  useEffect(() => {
    const timers = []

    let t = startAt

    // 1. Garis kiri (kecuali item pertama)
    if (!isFirst) {
      timers.push(setTimeout(() => setShowLineLeft(true), t))
      t += 400
    }

    // 2. Dot
    timers.push(setTimeout(() => setShowDot(true), t + 120))
    t += 240

    // 3. Box
    timers.push(setTimeout(() => setShowBox(true), t + 150))
    t += 250

    // 4. Garis kanan (kecuali item terakhir)
    if (!isLast) {
      timers.push(setTimeout(() => setShowLineRight(true), t))
    }

    return () => timers.forEach(clearTimeout)
  }, [startAt, isFirst, isLast])

  return (
    <li>
      {/* GARIS KIRI */}
      {!isFirst && (
        <hr
          className={`bg-white/30 origin-left transition-transform duration-400 ${showLineLeft ? "scale-x-100" : "scale-x-0"
            }`}
        />
      )}

      {/* BOX KANAN */}
      {position === "end" && (
        <div
          className={`timeline-end timeline-box h-36 flex items-center justify-center text-center
            bg-white/10 backdrop-blur-md border border-white/20 text-white
            transition-all duration-300 ${showBox ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-xs text-white/80">{desc}</p>
          </div>
        </div>
      )}

      {/* DOT */}
      <div className="timeline-middle">
        <div
          className={`w-4 h-4 rounded-full bg-gradient-to-b from-kedua to-ketiga
            transition-all duration-300 ${showDot ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
        />
      </div>

      {/* BOX KIRI */}
      {position === "start" && (
        <div
          className={`timeline-start timeline-box h-36 flex items-center justify-center text-center
            bg-white/10 backdrop-blur-md border border-white/20 text-white
            transition-all duration-300 ${showBox ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
        >
          <div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-xs text-white/80">{desc}</p>
          </div>
        </div>
      )}

      {/* GARIS KANAN */}
      {!isLast && (
        <hr
          className={`bg-white/30 origin-left transition-transform duration-400 ${showLineRight ? "scale-x-100" : "scale-x-0"
            }`}
        />
      )}
    </li>
  )
}





function AboutUs() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // === GLOBAL TIMELINE CLOCK (AKUMULATIF) ===
  const LINE = 400
  const DOT = 240
  const BOX = 250

  let currentTime = 0

  const timelineWithTime = items.map((item, index) => {
    const isFirst = item.isFirst || index === 0
    const isLast = item.isLast || index === items.length - 1

    const startAt = currentTime

    let duration = 0
    if (!isFirst) duration += LINE
    duration += DOT
    duration += BOX
    if (!isLast) duration += LINE

    currentTime += duration

    return {
      ...item,
      isFirst,
      isLast,
      startAt,
    }
  })


  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center py-28"
    >
      <div className="max-w-2xl text-center mb-20 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
          Professional Journey
        </h2>
        <p className="text-sm md:text-base text-white/80 leading-relaxed">
          A structured journey combining academic foundations, industry
          experience, and continuous professional growth.
        </p>
      </div>

      {visible && (
        <div className="w-full flex justify-center px-6">
          <div className="relative w-full max-w-6xl ">
            <ul
              className="
          timeline timeline-horizontal
          relative left-1/2 -translate-x-1/2
          w-max
        "
            >
              {timelineWithTime.map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  desc={item.desc}
                  position={item.position}
                  startAt={item.startAt}
                  isFirst={item.isFirst}
                  isLast={item.isLast}
                />
              ))}
            </ul>
          </div>
        </div>
      )}

    </section>
  )
}

// export default AboutUs

export default AboutUs

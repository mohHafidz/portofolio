import img1 from '../assets/output_no_bg(1).png'
import img2 from '../assets/output_no_bg(2).png'
import img4 from '../assets/output_no_bg(4).png'
import img5 from '../assets/output_no_bg(5).png'
import img6 from '../assets/output_no_bg(6).png'
import img7 from '../assets/output_no_bg(7).png'
import img8 from '../assets/output_no_bg(8).png'
import img9 from '../assets/output_no_bg(9).png'
import img11 from '../assets/output_no_bg(11).png'

// Kemudian Anda bisa memasukkannya kembali ke dalam array untuk digunakan
const items = [img1, img2, img4, img5, img6, img7, img8, img9, img11];

function Skill() {

    const skills = [
        "Flutter",
        "Dart",
        "State Management (GetX, Provider)",
        "MVVM Architecture",
        "REST API Integration",
        "Firebase (Authentication & Firestore)",
        "UI Implementation (Figma to Flutter)",
        "Git & Version Control",
        "Android Development Fundamentals",
        // "React",
        // "Tailwind CSS"
    ]


    return (
        <section className="w-full flex flex-col items-center py-28 snap-start snap-none ">

            {/* SECTION HEADER */}
            <div className="max-w-2xl text-center mb-10 px-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                    Skills & Expertise
                </h2>

                <p className="text-sm md:text-base font-light text-white/80 leading-relaxed">
                    A combination of technical competencies and practical experience
                    in building scalable, maintainable, and user-focused digital solutions.
                </p>
            </div>

            {/* SKILLS GRID */}
            <div className="max-w-5xl w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10 px-6">
                {skills.map((skill, i) => (
                    <div
                        key={i}
                        className="
              flex items-center justify-center py-4 rounded-xl
              bg-white/10 backdrop-blur-md border border-white/20
              text-sm font-medium text-white
              transition-all duration-300
              hover:bg-white/20 hover:-translate-y-1
            "
                    >
                        {skill}
                    </div>
                ))}
            </div>

            {/* EXPERTISE */}
            <div className="w-170 max-w-6xl px-6 overflow-hidden relative ">

                <h3 className="text-lg font-semibold text-white mb-10 text-center">
                    Areas of Expertise
                </h3>

                {/* Keyframes */}
                <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-loop {
            display: flex;
            width: max-content;
            animation: scroll 40s linear infinite;
          }

        //   .animate-loop:hover {
        //     animation-play-state: paused;
        //   }
        `}</style>

                {/* Marquee */}
                <div className="animate-loop gap-6 mb-80">

                    {[...Array(2)].map((_, idx) => (
                        <div key={idx} className="flex gap-6">
                            {items.map((item, i) => (
                                <div
                                    key={i}
                                    className="
                    w-20 h-20 flex items-center justify-center
                    rounded-xl bg-white/10 backdrop-blur-md
                    border border-white/20
                  "
                                >
                                    <img
                                        src={item}
                                        alt=""
                                        className="w-10 h-10 object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
            </div>

        </section>
    )
}

export default Skill

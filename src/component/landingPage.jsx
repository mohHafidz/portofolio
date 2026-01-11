import {
    Dot,
    Github,
    Linkedin,
    Instagram,
    ChevronDown,
    Smartphone,
    PenTool,
    MapPin
} from 'lucide-react';


function LandingPage() {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center text-white gap-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-2 flex flex-row items-end gap-1 leading-none">
                <span>FITS</span>

                {/* SVG Gradient Definition */}
                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="dotGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#9BA8AB" />
                            <stop offset="100%" stopColor="#4A5C6A" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Dot */}
                <Dot
                    className="w-10 h-10"
                    stroke="url(#dotGradient)"
                    strokeWidth={2.5}
                />

                {/* DEV */}
                <span className="bg-gradient-to-b from-ketiga to-kelima bg-clip-text text-transparent">
                    DEV
                </span>
            </h1>

            <div className="glass inline-flex flex-row items-center gap-8 p-8 shadow-2xl border border-white/20 rounded-4xl">

                {/* SOCIAL MEDIA (VERTICAL) */}
                <div className="flex flex-col gap-4">
                    <SocialButton href="https://github.com/username">
                        <Github className="w-5 h-5" />
                    </SocialButton>

                    <SocialButton href="https://linkedin.com/in/username">
                        <Linkedin className="w-5 h-5" />
                    </SocialButton>

                    <SocialButton href="https://instagram.com/username">
                        <Instagram className="w-5 h-5" />
                    </SocialButton>
                </div>

                {/* PROFILE IMAGE */}
                <img
                    src="./src/assets/poto2.png"
                    alt="Profile"
                    className="w-36 h-36 object-cover mask mask-squircle shadow-xl bg-kedua"
                />

                {/* DESCRIPTION */}
                <div className="flex flex-col gap-2">

                    {/* NAME */}
                    <h2 className="text-2xl font-bold text-left">
                        Muhammad Hafidz
                    </h2>

                    {/* DESCRIPTION */}
                    <div className="max-w-sm text-left">
                        <p className="text-sm font-light leading-relaxed">
                            Mobile Developer with a Computer Science background from BINUS University and currently pursuing a Master’s degree in Informatics Engineering (MTI). Experienced in developing mobile applications with a strong focus on performance, usability, and system integration aligned with business needs. Accustomed to working in structured and collaborative environments, with a solution-oriented mindset dedicated to delivering practical and impactful digital products.

                        </p>
                    </div>

                    {/* EXPERTISE */}
                    <div className="flex flex-row gap-3 mt-2">

                        {/* Mobile Dev */}
                        <div className="glass flex items-center gap-2 px-3 py-2 rounded-xl border border-white/20">
                            <Smartphone className="w-4 h-4 text-keenam" />
                            <span className="text-xs font-medium">
                                Mobile Development (Flutter)
                            </span>
                        </div>

                        {/* UI / UX */}
                        <div className="glass flex items-center gap-2 px-3 py-2 rounded-xl border border-white/20">
                            <PenTool className="w-4 h-4 text-keenam" />
                            <span className="text-xs font-medium">
                                UI / UX Design (Figma)
                            </span>
                        </div>


                    </div>

                    {/* LOCATION */}
                    <div className="glass flex items-center gap-2 px-3 py-2 mt-2 w-fit rounded-xl border border-white/20">
                        <MapPin className="w-4 h-4 text-keenam" />
                        <span className="text-xs font-medium">
                            Jakarta, Indonesia
                        </span>
                    </div>


                </div>


            </div>
            <div className="flex flex-col items-center gap-2 mt-6">

                <span className="text-sm tracking-widest opacity-80">
                    Scroll
                </span>

                <ChevronDown className="w-6 h-6 opacity-70 animate-bounce" />

            </div>

        </div>
    )
}

const SocialButton = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="
            btn btn-circle btn-outline
            bg-transparent
            hover:bg-transparent
            focus:bg-transparent
            active:bg-transparent

            border-white/40
            hover:border-white/60

            relative overflow-hidden
            transition-all duration-300
            hover:scale-110

            before:absolute
            before:inset-0
            before:bg-white/10
            before:backdrop-blur-sm
            before:translate-x-[-120%]
            before:transition-transform
            before:duration-500
            hover:before:translate-x-0
        "
    >
        {children}
    </a>
);


export default LandingPage

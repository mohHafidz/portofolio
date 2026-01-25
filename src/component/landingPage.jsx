import {
    Dot,
    Github,
    Linkedin,
    Mail,
    ChevronDown,
    Smartphone,
    PenTool,
    MapPin
} from 'lucide-react';

import profileImage from '../assets/poto2.png';

function LandingPage() {
    return (
        <div className="min-h-screen w-screen flex flex-col justify-center items-center text-white px-4 gap-10">

            {/* TITLE */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold flex flex-row items-end gap-1 leading-none">

                <span>FITS</span>

                {/* SVG Gradient */}
                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="dotGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#9BA8AB" />
                            <stop offset="100%" stopColor="#4A5C6A" />
                        </linearGradient>
                    </defs>
                </svg>

                <Dot
                    className="w-8 h-8 md:w-10 md:h-10"
                    stroke="url(#dotGradient)"
                    strokeWidth={2.5}
                />

                <span className="bg-gradient-to-b from-ketiga to-kelima bg-clip-text text-transparent">
                    DEV
                </span>
            </h1>

            {/* MAIN CARD */}
            <div
                className="
                    glass
                    flex flex-col md:flex-row
                    items-center md:items-start
                    gap-6 md:gap-8
                    p-6 md:p-8
                    shadow-2xl
                    border border-white/20
                    rounded-4xl
                    max-w-3xl
                    w-full
                "
            >

                {/* SOCIAL MEDIA */}
                <div className="flex flex-row md:flex-col gap-4">
                    <SocialButton href="https://github.com/username">
                        <Github className="w-5 h-5" />
                    </SocialButton>

                    <SocialButton href="https://linkedin.com/in/username">
                        <Linkedin className="w-5 h-5" />
                    </SocialButton>

                    <SocialButton href="mailto:email@example.com">
                        <Mail className="w-5 h-5" />
                    </SocialButton>
                </div>

                {/* PROFILE IMAGE */}
                <img
                    src={profileImage}
                    alt="Profile"
                    className="
                        w-28 h-28
                        sm:w-32 sm:h-32
                        md:w-36 md:h-36
                        object-cover
                        mask mask-squircle
                        shadow-xl
                        bg-kedua
                    "
                />

                {/* DESCRIPTION */}
                <div className="flex flex-col gap-3 text-center md:text-left">

                    <h2 className="text-xl md:text-2xl font-bold">
                        Muhammad Hafidz
                    </h2>

                    <p className="text-sm font-light leading-relaxed max-w-md">
                        Mobile Developer with a Computer Science background from BINUS University and currently pursuing a Master’s degree in Informatics Engineering (MTI). Experienced in developing mobile applications with a strong focus on performance, usability, and system integration aligned with business needs.
                    </p>

                    {/* EXPERTISE */}
                    <div
                        className="
                            flex flex-col sm:flex-row
                            gap-2 sm:gap-3
                            justify-center md:justify-start
                        "
                    >
                        <div className="glass flex items-center gap-2 px-3 py-2 rounded-xl border border-white/20">
                            <Smartphone className="w-4 h-4 text-keenam" />
                            <span className="text-xs font-medium">
                                Mobile Development (Flutter)
                            </span>
                        </div>

                        <div className="glass flex items-center gap-2 px-3 py-2 rounded-xl border border-white/20">
                            <PenTool className="w-4 h-4 text-keenam" />
                            <span className="text-xs font-medium">
                                UI / UX Design (Figma)
                            </span>
                        </div>
                    </div>

                    {/* LOCATION */}
                    <div
                        className="
                            glass flex items-center gap-2 px-3 py-2
                            w-fit mx-auto md:mx-0
                            rounded-xl border border-white/20
                        "
                    >
                        <MapPin className="w-4 h-4 text-keenam" />
                        <span className="text-xs font-medium">
                            Jakarta, Indonesia
                        </span>
                    </div>

                </div>
            </div>

            {/* SCROLL INDICATOR */}
            <div className="flex flex-col items-center gap-2 mt-4">
                <span className="text-sm tracking-widest opacity-80">
                    Scroll
                </span>
                <ChevronDown className="w-6 h-6 opacity-70 animate-bounce" />
            </div>

        </div>
    );
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

export default LandingPage;

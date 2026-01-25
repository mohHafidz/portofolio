function Dock() {
    return (
        <div
            className="
                dock
                dock-lg
                rounded-4xl
                backdrop-blur-xl
                border border-white/20
                shadow-2xl
                text-white
                w-full sm:w-80 md:w-96
                fixed bottom-4 sm:bottom-6
                left-1/2 transform -translate-x-1/2
                flex justify-between items-center
                px-4 sm:px-6
                py-2 sm:py-3
                glass
            "
            style={{ filter: 'url(#liquid-filter)' }}
        >
            {/* Introduce */}
            <button className="flex-1 text-center py-2 sm:py-3">
                <span className="dock-label text-xs sm:text-sm text-kedua">
                    Introduce
                </span>
            </button>

            {/* About */}
            <button className="flex-1 text-center py-2 sm:py-3">
                <span className="dock-label text-xs sm:text-sm text-kedua">
                    About
                </span>
            </button>

            {/* Contact Me */}
            <button className="flex-1 text-center btn rounded-2xl bg-ketiga py-2 sm:py-3">
                <span className="dock-label text-xs sm:text-sm">
                    Contact Me
                </span>
            </button>
        </div>
    );
}

export default Dock;

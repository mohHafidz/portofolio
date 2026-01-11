function Dock() {
    return(
        <div className="dock dock-lg rounded-4xl backdrop-blur-xl border border-white/20 shadow-2xl text-white  w-96 fixed bottom-6 left-1/2 transform -translate-x-1/2 glass" style={{ filter: 'url(#liquid-filter)' }}>
            <button>
                <span className="dock-label text-kedua">Introduce</span>
            </button>
            <button>
                <span className="dock-label text-kedua">About</span>
            </button>
            <button className="btn rounded-2xl bg-ketiga">
                <span className="dock-label">Contact Me</span>
            </button>
        </div>
    )
}

export default Dock;
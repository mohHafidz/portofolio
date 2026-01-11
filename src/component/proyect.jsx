import { useState, useEffect } from "react"
import { ExternalLink, User, Calendar, ArrowLeft } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../lib/firebase"


const filters = [
    "All Projects",
    // "Web Apps",
    // "Mobile UI",
    // "Brand Identity",
    // "Open Source",
]


// import React from 'react';
// import {  } from 'lucide-react';

function ProjectCard({ id, image, title, description, tech, link, challenge, start, end, client, industry, platform, gallery }) {
    // Gunakan ID unik untuk setiap modal berdasarkan prop 'id' atau 'title'
    const modalId = `modal_${id || title.replace(/\s+/g, '_')}`;

    return (
        <>
            {/* CARD */}
            <div
                className="relative rounded-2xl p-5 bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                onClick={() => document.getElementById(modalId).showModal()}
            >
                {/* AREA IMAGE */}
                <div className="relative rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-4 flex justify-center items-center h-[250px]">
                    <div className="mockup-phone border-slate-900 scale-[0.4] origin-center">
                        <div className="mockup-phone-camera"></div>
                        <div className="mockup-phone-display">
                            <div className="bg-neutral-900 ">
                                <img
                                    src={image}
                                    referrerPolicy="no-referrer"
                                    alt={title}
                                    className="w-full h-full object-cover object-top block"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* TITLE + LINK */}
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    {/* Tambahkan stopPropagation agar klik link tidak membuka modal */}
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ExternalLink size={18} className="text-white/70 hover:text-white transition-colors" />
                    </a>
                </div>

                <p className="text-sm text-left text-white/70 leading-relaxed mb-4 line-clamp-2">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {tech.map((item, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-[10px] rounded-full bg-white/10 border border-white/20 text-white/80"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* MODAL (Dipindah ke luar agar tidak terkena efek hover/transform kartu) */}
            <dialog id={modalId} className="modal bg-black/60 backdrop-blur-sm">
                <div className="modal-box glass bg-[#0a1219]/90 border border-white/10 max-w-5xl w-11/12 p-8 md:p-12 text-slate-200 scrollbar-hide">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-2">
                        <div>
                            {/* <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/60">
                                Featured Case Study
                            </span> */}
                            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight text-left">
                                {title}
                            </h1>
                            <div className="flex flex-wrap gap-6 text-sm text-white/50">
                                <div className="flex items-center gap-2">
                                    <User size={16} /> <span>Lead Product Designer</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} /> <span>{start} - {end}</span>
                                </div>
                            </div>
                        </div>

                        <form method="dialog">
                            <button className="btn btn-outline border-white/10 text-white hover:bg-white/5 gap-2 normal-case font-medium">
                                <ArrowLeft size={18} /> Back to Projects
                            </button>
                        </form>
                    </div>

                    <div className="divider"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-10">
                            <div>
                                <h3 className="text-[10px] text-left uppercase tracking-widest text-white/40 font-bold mb-6 ">
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {tech.map((t) => (
                                        <span key={t} className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-medium">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white mb-6">Project Summary</h3>
                                <div className="space-y-4 text-xs text-white/60">
                                    <div className="flex justify-between border-b border-white/5 pb-3">
                                        <span>Client</span> <span className="text-white">{client}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-3">
                                        <span>Industry</span> <span className="text-white">{industry}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Platform</span> <span className="text-white">{platform}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white mb-6">Project Details</h3>
                                <div className="space-y-4 text-xs text-white/60">
                                    <p className="text-white/60 leading-relaxed text-justify">
                                    {description}
                                </p>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-16">
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6">The Challenge</h2>
                                <p className="text-white/60 leading-relaxed text-justify">
                                    {challenge}
                                </p>
                            </section>

                            {/* Section Gallery */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6">Project Gallery</h2>
                                {/* Kita bungkus dalam grid agar rapi */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                    {gallery && gallery.length > 0 ? (
                                        gallery.map((imgUrl, idx) => (
                                            <div key={idx} className="flex flex-col items-center">
                                                {/* Container Mockup untuk setiap gambar di Gallery */}
                                                <div className="h-[280px] flex items-start justify-center w-full overflow-hidden">
                                                    <div className="mockup-phone scale-[0.4] origin-top border-slate-900 shadow-2xl">
                                                        <div className="mockup-phone-camera"></div>
                                                        <div className="mockup-phone-display">
                                                            <div className="bg-neutral-900">
                                                                <img
                                                                    src={imgUrl}
                                                                    referrerPolicy="no-referrer"
                                                                    alt={`${title} screenshot ${idx + 1}`}
                                                                    className="w-full h-full object-cover object-top block"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-white/40 italic">No additional images available.</p>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}


function Proyect() {
    const [projects, setProjects] = useState([])
    const [active, setActive] = useState("All Projects")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProjects = async () => {
            const snapshot = await getDocs(collection(db, "Portofolio"))

            const data = snapshot.docs.map((doc) => {
                const d = doc.data()

                console.log("ini adalah " + d["Thumbnail"])

                return {
                    id: doc.id,
                    name: d.Name ?? "",
                    description: d["Short Description"] ?? "",
                    thumbnail: d.Thumbnail ?? "",
                    techStack: Array.isArray(d["Tech Stack"]) ? d["Tech Stack"] : [],
                    platform: d.Platform ?? "",
                    challenge: d.Challenge ?? "",
                    gallery: Array.isArray(d.Galery) ? d.Galery : [],
                    start: d.Start ?? "",
                    end: d.End ?? "",
                    challenge: d.Challenge ?? "",
                    client: d.Client ?? "",
                    industry: d.Industry ?? "",
                    gallery: Array.isArray(d.Galery) ? d.Galery : [],
                }
            })

            setProjects(data)
            setLoading(false)
        }

        fetchProjects()
    }, [])


    const filteredProjects =
        active === "All Projects"
            ? projects
            : projects.filter((p) => p.Platform === active)

    return (
        <section className="w-full flex flex-col items-center snap-start snap-none">
            <div className="max-w-2xl text-center mb-8 px-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                    Featured Projects
                </h2>

                <p className="text-sm md:text-base font-light text-white/80 leading-relaxed">
                    Exploring the intersection of mobile development and user experience by building cross-platform applications with Flutter, focusing on responsive interfaces, smooth performance, and seamless system integration to deliver impactful digital solutions.
                </p>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
                {filters.map((item) => (
                    <button
                        key={item}
                        onClick={() => setActive(item)}
                        className={`
            px-4 py-2 text-sm font-medium rounded-full
            border transition-all duration-300
            ${active === item
                                ? "bg-white/20 text-white border-white/30 shadow-md"
                                : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                            }
          `}
                    >
                        {item}
                    </button>
                ))}
            </div>
            {/* GRID */}
            {loading ? (
                <p className="text-white/60">Loading projects...</p>
            ) : (
                <div className="w-full max-w-6xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-70">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            link={index}
                            key={project.id}
                            title={project.name}
                            description={project.description}
                            image={project.thumbnail}
                            tech={project.techStack}
                            challenge={project.challenge}
                            start={project.start}
                            end={project.end}
                            client={project.client}
                            industry={project.industry}
                            platform={project.platform}
                            gallery={project.gallery}
                        />

                    ))}
                </div>
            )}
        </section>
    )
}

export default Proyect;

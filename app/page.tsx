"use client";

import { useEffect, useState } from "react";

import { projects } from "@/lib/projects";

export default function Portolio() {
  const [activeSection, setActiveSection] = useState(0);  // secret sauce for the change of sections from hero to projects to contacts
  const [isScrolling, setIsScrolling] = useState(false);  // to prevent multiple scroll events from firing while already scrolling
  const totalSections = projects.length + 2;  // total number of sections (hero + projects + contacts)
  
useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();  // prevent default scroll behavior to take full control of scrolling
      if (isScrolling) return;  // if already scrolling, ignore new scroll events
      if (Math.abs(e.deltaY) < 30) return;  // ignore small scrolls to prevent accidental section changes
      const direction = e.deltaY > 0 ? 1 : -1;  // determine scroll direction
      // deltaY > 0 means scrolling down, so direction is 1; otherwise, it's -1 for scrolling up
      const next = Math.max(0, Math.min(totalSections - 1, activeSection + direction));  
      // keeps the value between 0 and totalSections - 1 to prevent scrolling beyond the first and last sections
      // math.min ensures we don't go above the last section, and math.max ensures we don't go below the first section (0)
      if (next !== activeSection) {
        setIsScrolling(true);  // set scrolling state to true to prevent new scrolls
        setActiveSection(next);  // update active section
        setTimeout(() => setIsScrolling(false), 1000);  // reset scrolling state after animation duration
      }
    };

    // for keyboard navigation
    const handleKey = (e: KeyboardEvent) => {
      if (isScrolling) return;  // if already scrolling, ignore new key events
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault(); // prevent default scroll behavior
        const next = Math.min(totalSections - 1, activeSection + 1);
        setIsScrolling(true);
        setActiveSection(next);
        setTimeout(() => setIsScrolling(false), 1000);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault(); // prevent default scroll behavior
        const next = Math.max(0, activeSection - 1);
        setIsScrolling(true);
        setActiveSection(next);
        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    // for mobile swipe navigation
    let touchStartY = 0;  // to track the starting Y position of a touch event
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;  // record the initial touch position
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;  // if already scrolling, ignore new touch events
      const diff = touchStartY - e.changedTouches[0].clientY;  // calculate the difference in Y position to determine swipe direction
      if (Math.abs(diff) < 50) return;  // ignore small swipes that might be accidental
      const direction = diff > 0 ? 1 : -1;  // determine swipe direction
      const next = Math.max(0, Math.min(totalSections - 1, activeSection + direction));
      if (next !== activeSection) {
        setIsScrolling(true);
        setActiveSection(next);
        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });  // listen for wheel events for desktop scrolling
    window.addEventListener("keydown", handleKey);  // listen for keydown events for keyboard navigation
    window.addEventListener("touchstart", handleTouchStart, { passive: true });  // listen for touch start events for mobile swipe navigation
    window.addEventListener("touchend", handleTouchEnd, { passive: true });  // listen for touch end events for mobile swipe navigation
    
    return () => {
      window.removeEventListener("wheel", handleWheel);  // clean up wheel event listener
      window.removeEventListener("keydown", handleKey);  // clean up keydown event listener
      window.removeEventListener("touchstart", handleTouchStart);  // clean up touch start event listener
      window.removeEventListener("touchend", handleTouchEnd);  // clean up touch end event listener
    };
  }, [activeSection, isScrolling, totalSections]);

  return (
    
    <main>
      <div className="grid-bg"/> {/* grid background for the entire app (defined from globals.css) */}
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-100 flex flex-col gap-2.5 ">
        {Array.from({ length: totalSections }).map((_, i) => ( // render navigation dots based on total sections
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ease-in-out 
              ${i === activeSection ? "bg-white scale-150" : "bg-white/20"}`} // add active class to the dot corresponding to the active section
            onClick={() => setActiveSection(i)} // allow clicking on dots to navigate to the corresponding section
          />
        ))}
      </div>
      
      
      <div className="w-screen h-screen relative overflow-hidden">
        
        {/* Hero Section */}
        <section className={`w-screen h-screen absolute top-0 left-0 flex items-center justify-center transition-all duration-850 ease-[cubic-bezier(0.77,0,0.18,1)]
          ${activeSection === 0 ? "opacity-100 translate-y-0 pointer-events-auto" : activeSection > 0 ? "opacity-0 -translate-y-15 pointer-events-none" : "opacity-0 translate-y-15 pointer-events-none"}`}>
          <div className="relative z-10 max-w-225 px-12">
            <div className="font-mono text-xs tracking-[0.2em] text-blue-500 uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500 block"/> Available for work 
            </div>
              <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.03em] mb-6">
                <span className="block bg-linear-to-br from-white to-white/50 bg-clip-text text-transparent">Sunam </span>
                <span className="block bg-linear-to-br from-white to-white/50 bg-clip-text text-transparent">Niroula</span>
              </h1>
              <p className="font-mono text-[clamp(0.9rem,1.5vw,1.1rem)] font-light text-white/50 mb-10 tracking-[0.05em]">
                <strong className="text-white/85 font-normal">Full-Stack Developer</strong>| Next.js | TypeScript | Prisma<br />
                Building real products | Open to work & collaboration
              </p>
              <div className="flex gap-4 flex-wrap">
                <button className="px-8 py-[0.85rem] bg-blue-600 text-white font-syne text-[0.9rem] font-semibold tracking-[0.05em] border-none cursor-pointer no-underline inline-flex items-center gap-2 transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5" onClick={() => setActiveSection(1)}>
                  View Work ↓
                </button>
                <button className="px-8 py-[0.85rem] bg-transparent text-white/70 font-syne text-[0.9rem] font-semibold tracking-[0.05em] border border-white/15 cursor-pointer no-underline inline-flex items-center gap-2 transition-all duration-200 hover:border-white/40 hover:text-white hover:-translate-y-0.5" onClick={() => setActiveSection(totalSections - 1)}>
                  Get in Touch
                </button>
                <a 
                  href="/SunamNiroula_Resume.pdf" 
                  className="px-8 py-[0.85rem] bg-transparent text-white/70 font-syne text-[0.9rem] font-semibold tracking-[0.05em] border border-white/15 cursor-pointer no-underline inline-flex items-center gap-2 transition-all duration-200 hover:border-white/40 hover:text-white hover:-translate-y-0.5"
                  download
                >
                  Resume ↓
                </a>
              </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] tracking-[0.15em] text-white/25 flex flex-col items-center gap-2 animate-pulse-hint"> {/* animate pulse from globals.css for custom animation */}
            <span>↓</span>
            <span>scroll</span>
          </div>
        </section>

        {/* Projects Sections */}
        {projects.map((project, index) => {
          const sectionIndex = index + 1; // calculate the section index for each project (starting from 1 since 0 is the hero section)
          const state = activeSection === sectionIndex ? "active" : activeSection > sectionIndex ? "above" : "below"; // determine the state of the section based on the active section
          return (
            <div key={project.id} className={`w-screen h-screen absolute top-0 left-0 flex items-center justify-center transition-all duration-850 ease-[cubic-bezier(0.77,0,0.18,1)]
              ${state === "active" ? "opacity-100 translate-y-0 pointer-events-auto" : ""}
              ${state === "above" ? "opacity-0 -translate-y-15 pointer-events-none" : ""}
              ${state === "below" ? "opacity-0 translate-y-15 pointer-events-none" : ""}`}>
              <div
                className="w-full h-full grid grid-cols-2 relative z-10"
                style={{ background: `radial-gradient(ellipse at 30% 50%, ${project.accentDim} 0%, transparent 60%)` }}
              >
                {/* LEFT */}
                <div className="flex flex-col justify-center py-20 pr-12 pl-20 relative">
                  <div className="font-mono text-[0.7rem] tracking-[0.2em] text-white/20 mb-4">
                    {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </div>
                  <div
                    className="font-mono text-[0.65rem] tracking-[0.2em] px-3 py-[0.3rem] border inline-block mb-6 w-fit"
                    style={{ color: project.accent, borderColor: project.accent }}
                  >
                    {project.tag}
                  </div>
                  <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-none tracking-[-0.03em] mb-3" style={{ color: project.accent }}>
                    {project.title}
                  </h2>
                  <div className="font-mono text-[0.85rem] text-white/40 mb-6 font-light">{project.subtitle}</div>
                  <p className="text-[0.95rem] leading-[1.7] text-white/60 mb-8 max-w-105">{project.description}</p>
                  <div className="flex gap-4">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-[0.65rem] px-6 font-syne text-[0.8rem] font-semibold tracking-[0.08em] no-underline border transition-all duration-200 inline-flex items-center gap-[0.4rem] hover:-translate-y-0.5 text-white/50 border-white/15 hover:text-white/85"
                        style={{ borderColor: project.accent, color: project.accent }}
                      >
                        ↗ Live App
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-[0.65rem] px-6 font-syne text-[0.8rem] font-semibold tracking-[0.08em] no-underline border transition-all duration-200 inline-flex items-center gap-[0.4rem] hover:-translate-y-0.5 text-white/50 border-white/15 hover:text-white/85"
                    >
                      ⌥ GitHub
                    </a>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-center py-20 pr-20 pl-12 border-l border-white/6">
                  {project.type === "data" ? (
                    <div className="bg-white/2 border border-white/6 p-8 font-mono text-[0.78rem] leading-[1.8] text-white/30 mb-8 relative overflow-hidden" 
                      style={{ "--accent": project.accent } as React.CSSProperties}>
                      <div style={{ "--a": project.accent, position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: project.accent } as React.CSSProperties} />
                      <div style={{ color: "rgba(255,255,255,0.15)", marginBottom: "1rem", fontSize: "0.65rem", letterSpacing: "0.2em" }}>project stats</div>
                      {project.bullets.map((b, bi) => (
                        <div key={bi} style={{ marginBottom: "0.4rem" }}>
                          <span style={{ color: "rgba(255,255,255,0.2)" }}>{">"} </span>
                          <span style={{ color: project.accent, opacity: 0.7 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="list-none mb-8">
                      {project.bullets.map((b, bi) => (
                        <li key={bi} className="text-[0.875rem] text-white/55 py-[0.6rem] border-b border-white/5 flex items-start gap-3 leading-normal">
                          <span className="w-1.25 h-1.25 rounded-full mt-[0.45rem] shrink-0" style={{ background: project.accent }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span key={s} className="font-mono text-[0.7rem] tracking-[0.08em] px-[0.7rem] py-[0.3rem] bg-white/5 border border-white/8 text-white/40">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}


        {/* Contact Section */}
        <div className={`w-screen h-screen absolute top-0 left-0 flex items-center justify-center transition-all duration-850 ease-[cubic-bezier(0.77,0,0.18,1)]
  ${activeSection === totalSections - 1 ? "opacity-100 translate-y-0 pointer-events-auto" : ""}
  ${activeSection < totalSections - 1 ? "opacity-0 translate-y-15 pointer-events-none" : ""}
  ${activeSection > totalSections - 1 ? "opacity-0 -translate-y-15 pointer-events-none" : ""}`}>
          <div className="relative z-10 max-w-175 px-12 text-center">
            <div className="font-mono text-xs tracking-[0.2em] text-white/30 mb-6 uppercase">Let&apos;s work together</div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-[-0.03em] leading-none mb-6">
              Hire Me.<br />
              <span style={{ color: "rgba(255,255,255,0.2)" }}>Seriously.</span>
            </h2>
            <p className="text-base text-white/40 mb-12 font-mono font-light">
              Junior full-stack developer · Remote / India / UAE<br />
              Available now · Fast learner · Ships real things
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-12">
              <a href="https://linkedin.com/in/sunamniroula" target="_blank" rel="noopener noreferrer" className="py-[0.85rem] px-7 font-syne text-[0.85rem] font-semibold tracking-[0.05em] no-underline border border-white/12 text-white/60 transition-all duration-200 inline-flex items-center gap-2 hover:text-white hover:border-white/40 hover:-translate-y-0.5">
                ↗ LinkedIn
              </a>
              <a href="https://github.com/NiroulaSunam" target="_blank" rel="noopener noreferrer" className="py-[0.85rem] px-7 font-syne text-[0.85rem] font-semibold tracking-[0.05em] no-underline border border-white/12 text-white/60 transition-all duration-200 inline-flex items-center gap-2 hover:text-white hover:border-white/40 hover:-translate-y-0.5">
                ⌥ GitHub
              </a>
              <a href="/SunamNiroula_Resume.pdf" download className="py-[0.85rem] px-7 font-syne text-[0.85rem] font-semibold tracking-[0.05em] no-underline border border-white/12 text-white/60 transition-all duration-200 inline-flex items-center gap-2 hover:text-white hover:border-white/40 hover:-translate-y-0.5">
                ↓ Resume
              </a>
            </div>
            <div className="font-mono text-base text-white/25 tracking-[0.05em]">
              <a className="text-inherit no-underline transition-colors duration-200 hover:text-white/70" href="mailto:sunamniroula1@gmail.com">sunamniroula1@gmail.com</a>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.65rem] text-white/15 tracking-widest whitespace-nowrap">sunamniroula.com · 2025</div>
        </div>

      </div>
    
    </main>  
  );
};

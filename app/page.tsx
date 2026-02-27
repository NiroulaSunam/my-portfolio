"use client";

import { useEffect, useInsertionEffect, useRef, useState } from "react";

import { projects } from "@/lib/projects";

export default function Portolio() {
  const [activeSection, setActiveSection] = useState(0);  // secret sauce for the change of sections from hero to projects to contacts
  const [isScrolling, setIsScrolling] = useState(false);  // to prevent multiple scroll events from firing while already scrolling
  const totalSections = projects.length + 2;  // total number of sections (hero + projects + contacts)
  
useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();  // prevent default scroll behavior to take full control of scrolling
      if (isScrolling) return;  // if already scrolling, ignore new scroll events
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
      <div className="grid-bg"/> {/* grid background for the entire app */}
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
        <section className={`w-screen h-screen absolute top-0 left-0 flex items-center justify-center transition-all duration-850ms ease-[cubic-bezier(0.77,0,0.18,1)]
          ${activeSection === 0 ? "opacity-100 translate-y-0 pointer-events-auto" : activeSection > 0 ? "opacity-0 -translate-y-15 pointer-events-none" : "opacity-0 translate-y-15 pointer-events-none"}`}>
          <div className="relative z-10 max-w-225 px-12">
            <div className="font-mono text-xs tracking-[0.2em] text-blue-600 uppercase mb-6 flex items-center gap-3"><span className="w-8 h-px bg-blue-600 block"/> Available for work </div>
              <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.03em] mb-6">
                <span className="block bg-linear-to-br from-white to-white/50 bg-clip-text text-transparent">Sunam </span>
                <span className="block bg-linear-to-br from-white to-white/50 bg-clip-text text-transparent">Niroula</span>
              </h1>
              <p className="font-mono text-[clamp(0.9rem,1.5vw,1.1rem)] font-light text-white/50 mb-10 tracking-[0.05em]">
                <strong className="text-white/85 font-normal">Full-Stack Developer</strong>| Next.js | TypeScript | Prisma<br />
                Passionate about building impactful web applications and data-driven solutions.
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
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] tracking-[0.15em] text-white/25 flex flex-col items-center gap-2 animate-pulse">
            <span>↓</span>
            <span>scroll</span>
          </div>
        </section>

      </div>
    
    </main>  
  );
};

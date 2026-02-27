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
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className={`h-screen w-full flex items-center justify-center transition-transform duration-1000 ${activeSection === 0 ? "translate-y-0" : activeSection > 0 ? "-translate-y-full" : "translate-y-full"}`}>
        <h1 className="text-5xl font-bold">Welcome to My Portfolio</h1>
      </section>

    </div>

  );
};

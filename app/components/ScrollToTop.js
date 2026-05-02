"use client";
import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    // on mount, scroll to top and set manual restoration to prevent jumps
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

      setScrollPercent(Math.round(percent));
      setVisible(scrollY > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circle progress
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollPercent / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-[9999]
        w-14 h-14
        flex items-center justify-center
        rounded-full
        bg-white
        shadow-[0_8px_32px_rgba(0,136,255,0.15)]
        border-2 border-[#f0f7ff]
        transition-all duration-500 ease-out
        hover:scale-110 hover:shadow-[0_12px_40px_rgba(0,136,255,0.25)]
        hover:border-[#0088ff]
        active:scale-95
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}
      `}
    >
      {/* Circular progress ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 56 56"
      >
        {/* Track */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#f0f7ff"
          strokeWidth="2.5"
        />
        {/* Progress */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#0088ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.2s ease" }}
        />
      </svg>

      {/* Arrow icon */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <svg
          className="w-5 h-5 text-[#0088ff]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </div>
    </button>
  );
}

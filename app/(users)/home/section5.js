"use client";
import React, { useState, useEffect, useRef } from "react";
import { getAdminDetailsAction } from "@/app/actions/admin";
import { CONTACT_CONFIG } from "@/app/config";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const sidePanelRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      tl.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(sidePanelRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const fetchAdmin = async () => {
      const result = await getAdminDetailsAction();
      if (result.success) {
        setAdminDetails(result.admin);
      }
    };
    fetchAdmin();
  }, []);

  const handleWhatsAppRedirect = (e) => {
    if (e) e.preventDefault();
    const number = adminDetails?.numbers?.[0] || CONTACT_CONFIG.whatsapp;

    const cleanNumber = number.replace(/\D/g, "");
    const message =
      "Hello, I'm interested in getting an estimate for your waterproofing services. Please assist me.";
    window.open(
      `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <>
      <style>
        {`
          .font-syne { font-family: 'Syne', sans-serif; }
          .font-dm { font-family: 'DM Sans', sans-serif; }
          .badge-dot {
            animation: pulse-dot 2s ease-in-out infinite;
          }
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.7); }
          }
          .writing-vertical {
            writing-mode: vertical-rl;
            text-orientation: mixed;
            transform: rotate(180deg);
          }
        `}
      </style>
      <div
        ref={containerRef}
        className="relative w-full min-h-[400px] overflow-hidden bg-[#0d1117] flex items-stretch"
        style={{
          backgroundImage: "url('/home/worker-holding-trowel.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,12,20,0.96) 38%, rgba(10,12,20,0.55) 65%, transparent 85%)",
          }}
        ></div>

        <div className="relative z-20 flex flex-col justify-center gap-6 px-6 pr-20 md:pr-6 py-10 max-w-[1400px] mx-auto w-full">
          <div ref={contentRef} className="flex flex-col gap-6">
            <div className="flex items-center gap-2 w-fit px-4 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase text-[#3fa9f5] bg-[rgba(63,169,245,0.12)] border border-[rgba(63,169,245,0.35)]">
              <span className="badge-dot w-1.5 h-1.5 rounded-full bg-[#3fa9f5]"></span>
              Limited Period Offer
            </div>

            <h1 className="font-syne font-extrabold text-white leading-tight text-4xl lg:text-[60px] uppercase">
              Get expert fixes for
              <br />
              leaky walls with
              <br />
              <span className="text-[#3fa9f5]"> RAS Care</span>
            </h1>

            <p className="text-md text-white/50 leading-relaxed max-w-sm">
              Specialized seepage control for terraces, bathrooms, and external
              walls. 24/7 emergency leak detection and same-day structural
              repairs.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={handleWhatsAppRedirect}
                className="flex items-center gap-2.5 bg-white text-[#0d1117] text-[13px] font-medium tracking-wide uppercase rounded-full px-7 py-3.5 hover:bg-blue-50 transition-all hover:-translate-y-0.5 no-underline"
              >
                <span className="w-[30px] h-[30px] rounded-full bg-[#3fa9f5] flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Get Estimate
              </button>

              <Link
                href="/work"
                className="flex items-center gap-2 text-white/70 text-[13px] hover:text-white transition-colors no-underline"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle
                    cx="7"
                    cy="7"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M5 7l2 2 2-2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                See our work
              </Link>
            </div>

            <div className="flex items-center gap-7">
              <div className="flex flex-col gap-0.5">
                <span className="font-syne font-bold text-white text-xl">
                  4.9★
                </span>
                <span className="text-[11px] text-white/40 tracking-wide">
                  Avg rating
                </span>
              </div>
              <div className="w-px h-9 bg-white/15"></div>
              <div className="flex flex-col gap-0.5">
                <span className="font-syne font-bold text-white text-xl">
                  2,400+
                </span>
                <span className="text-[11px] text-white/40 tracking-wide">
                  Jobs done
                </span>
              </div>
              <div className="w-px h-9 bg-white/15"></div>
              <div className="flex flex-col gap-0.5">
                <span className="font-syne font-bold text-white text-xl">
                  60 min
                </span>
                <span className="text-[11px] text-white/40 tracking-wide">
                  Avg response
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={sidePanelRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/95 rounded-l-2xl px-3.5 py-5 flex flex-col items-center gap-2.5 shadow-[-4px_0_20px_rgba(0,0,0,0.2)]"
        >
          <a
            href={`tel:${adminDetails?.numbers?.[0] || CONTACT_CONFIG.whatsapp}`}
            className="w-7 h-7 rounded-full bg-[#3fa9f5] flex items-center justify-center no-underline"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2.5C2 2.5 3 4.5 4.5 6S7.5 8.5 9 9.5l2-2 1.5 1.5s-.5 2-2.5 2.5C7 12 3 10 2 8.5 1 7 1 3.5 2 2.5z"
                fill="#fff"
              />
            </svg>
          </a>
          <span className="writing-vertical text-[12px] font-medium text-[#1a1a2e] tracking-wide">
            {adminDetails?.numbers?.[0]?.trim() || CONTACT_CONFIG.phone}
          </span>
        </div>
      </div>
    </>
  );
};

export default Section5;

"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getAdminDetailsAction } from "@/app/actions/admin";
import { CONTACT_CONFIG } from "@/app/config";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const sectionRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const checklistRef = useRef(null);
  const mainImageRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tl.from(leftTextRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          rightTextRef.current,
          {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".checklist-item",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .from(
          mainImageRef.current,
          {
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6",
        );
    },
    { scope: sectionRef },
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
      "Hello, I saw the summer offer and I'm interested in booking a service. Please provide more details.";
    window.open(
      `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const checklistItems = [
    { text: "Certified Waterproofing Expert", iconColor: "bg-blue-600" },
    { text: "15+ Years Industry Experience", iconColor: "bg-blue-600" },
    { text: "Trusted By 5000+ Clients", iconColor: "bg-blue-600" },
    { text: "Advanced Thermal Imaging Use", iconColor: "bg-blue-600" },
  ];

  return (
    <section
      ref={sectionRef}
      className="max-w-[1400px] py-15 mx-auto px-6 overflow-hidden bg-white"
    >
      {/* Top Content: Header & Description */}
      <div className="flex flex-col lg:flex-row justify-between gap-12 mb-10">
        <div ref={leftTextRef} className="lg:w-1/2">
          <div className="mb-6">
            <span className="px-5 py-2 rounded-full border border-[#041f38] text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#041f38] ">
              Our Experience
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A1A2F] leading-[1.1] tracking-tight">
            Complete Waterproofing <br className="hidden md:block" /> Solutions
            for Every Surface
          </h2>
        </div>

        <div ref={rightTextRef} className="">
          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl">
            We provide specialized waterproofing and seepage control for homes
            across Delhi, Noida, Ghaziabad, and nearby areas, delivering expert
            solutions with efficiency and reliability. Our services cover a wide
            range of solutions focused on maintaining structural integrity and
            preventing dampness, making us a dependable choice for residential
            and commercial waterproofing needs in the region.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
            {checklistItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 group checklist-item"
              >
                <div className="w-6 h-6 bg-[#008cf0] rounded-md flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-blue-600/20">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-base text-gray-500 tracking-tight">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Visuals & Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Showcase */}
        <div
          ref={mainImageRef}
          className="lg:col-span-9 relative group rounded-[48px] overflow-hidden shadow-2xl shadow-blue-900/10 h-[450px]"
        >
          <video
            ref={videoRef}
            src="/home/section2-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[450px] object-cover transition-all duration-1000 group-hover:scale-110"
          />
          {/* Watch Video Floating Button */}
          <div className="absolute bottom-10 left-10">
            <button
              onClick={() => {
                if (videoRef.current) {
                  if (isPlaying) {
                    videoRef.current.pause();
                  } else {
                    videoRef.current.play();
                  }
                  setIsPlaying(!isPlaying);
                }
              }}
              className="flex items-center gap-5 bg-white hover:bg-gray-50 py-4 px-8 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-2 active:scale-95 group/btn"
            >
              <div className="w-12 h-12 bg-[#0A1A2F] rounded-full flex items-center justify-center text-white shadow-xl transition-transform group-hover/btn:rotate-12">
                {isPlaying ? (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 ml-1 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 6v12l10-6z" />
                  </svg>
                )}
              </div>
              <span className="font-extrabold text-[#0A1A2F] text-sm uppercase tracking-widest">
                {isPlaying ? "Pause Work" : "Watch Work"}
              </span>
            </button>
          </div>
        </div>

        {/* Right Stack: Cards */}
        <div className="lg:col-span-3 flex flex-col gap-8 h-full">
          {/* Google Review Card */}
          <div className="bg-[#e9eef2] p-10 rounded-[48px] relative overflow-hidden border border-gray-100 side-card">
            <div className="relative flex justify-between items-center z-10">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="font-black text-[#0A1A2F] text-xl">
                    Google
                  </span>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-[#FFB400] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-500 text-sm font-bold">
                  Based on 645+ customers all over NCR region
                </p>
              </div>
            </div>
          </div>

          {/* Offer Card */}
          <div
            onClick={handleWhatsAppRedirect}
            className="bg-[#0089FF] p-10 rounded-[40px] flex flex-col justify-between h-[320px] relative overflow-hidden group/offer transition-all hover:bg-[#0076FF] cursor-pointer"
          >
            {/* Background Decorative Badge */}
            <div className="absolute -top-10 -right-10 opacity-10 group-hover/offer:scale-125 group-hover/offer:-rotate-12 transition-transform duration-700">
              <svg
                className="w-64 h-64 text-white fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l2.35 3.33L18.3 4l.32 4.07 3.93 1.05-2.01 3.55 2.01 3.55-3.93 1.05-.32 4.07-3.95-1.33L12 22l-2.35-3.33-3.95 1.33-.32-4.07-3.93-1.05 2.01-3.55-2.01-3.55 3.93-1.05.32-4.07 3.95 1.33L12 2z" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Top Left Badge Icon */}
              <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center mb-10 shadow-lg rotate-[-5deg]">
                <svg
                  className="w-12 h-12 text-[#0089FF]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l2.35 3.33L18.3 4l.32 4.07 3.93 1.05-2.01 3.55 2.01 3.55-3.93 1.05-.32 4.07-3.95-1.33L12 22l-2.35-3.33-3.95 1.33-.32-4.07-3.93-1.05 2.01-3.55-2.01-3.55 3.93-1.05.32-4.07 3.95 1.33L12 2z" />
                  <text
                    x="50%"
                    y="62%"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#0089FF"
                    fontWeight="bold"
                    className="font-sans"
                  >
                    %
                  </text>
                </svg>
              </div>
              <h3 className="text-xl text-white leading-tight font-bold pr-10">
                Monsoon Readiness offer{" "}
                <span className="font-normal opacity-90">
                  New clients save ₹5000 on all
                  <br /> services.
                </span>
              </h3>
            </div>

            <svg
              className="absolute bottom-0 right-[95px] w-[20px] h-[20px] z-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fills the bottom-left corner with white, carving out a quarter-circle cutout */}
              <path d="M0 20 H20 V0 C20 11.046 11.046 20 0 20 Z" />
            </svg>
            <svg
              className="absolute bottom-[95px] right-0 w-[20px] h-[20px] z-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fills the bottom-left corner with white, carving out a quarter-circle cutout */}
              <path d="M0 20 H20 V0 C20 11.046 11.046 20 0 20 Z" />
            </svg>

            {/* Bottom Right Notch & Circle Button */}
            <div className="absolute bottom-0 right-0 translate-x-[1px] translate-y-[1px]">
              {/* The "Notch" background - white circle that cuts out the blue */}
              <div className="w-24 h-24 bg-white rounded-tl-[50px] flex items-center justify-center">
                {/* The WhatsApp Circle Button */}
                <button
                  onClick={handleWhatsAppRedirect}
                  className="bg-[#25D366] hover:bg-[#1ebe57] w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 mt-4 ml-4"
                >
                  <svg
                    className="w-8 h-8 text-white fill-current"
                    viewBox="0 0 32 32"
                  >
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.474 2.027 7.774L0 32l8.454-2.01A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.771-1.854l-.485-.288-5.018 1.194 1.216-4.9-.317-.503A13.272 13.272 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.355-1.162-2.72-1.295-.366-.133-.632-.199-.898.2-.266.398-1.031 1.295-1.264 1.561-.232.266-.465.299-.863.1-.398-.2-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.361-2.214-2.759-.232-.398-.025-.613.175-.811.18-.178.398-.465.598-.698.2-.232.266-.398.398-.664.133-.266.067-.499-.033-.698-.1-.2-.898-2.163-1.23-2.962-.324-.778-.653-.673-.898-.685l-.765-.013c-.266 0-.698.1-1.064.499-.366.398-1.396 1.364-1.396 3.327 0 1.963 1.43 3.86 1.629 4.126.2.266 2.815 4.298 6.82 6.028.954.412 1.698.658 2.278.843.957.305 1.828.262 2.517.159.767-.115 2.355-.962 2.688-1.891.332-.93.332-1.727.232-1.892-.1-.165-.365-.265-.763-.464z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;

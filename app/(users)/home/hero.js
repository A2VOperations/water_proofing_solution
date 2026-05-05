"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CONTACT_CONFIG } from "@/app/config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  "Terrace Waterproofing",
  "External Wall Sealing",
  "Bathroom Sealing",
  "Basement Waterproofing",
  "Water Tank Sealing",
  "Seepage Detection",
];

const SERVICE_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
      </svg>
    ),
    title: "Advanced Terrace Sealing",
    desc: "Our specialized liquid membranes ensure your terrace remains leak-proof through the heaviest monsoons.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.08 2.34 5.64c1.56 1.56 3.64 2.34 5.66 2.34s4.08-.78 5.66-2.34c1.56-1.56 2.34-3.64 2.34-5.64s-.78-4.08-2.34-5.64zM12 19c-3.11 0-5.66-2.55-5.66-5.66 0-1.51.62-2.92 1.71-4.02l3.95-3.95 3.95 3.95c1.09 1.1 1.71 2.51 1.71 4.02 0 3.11-2.55 5.66-5.66 5.66z" />
      </svg>
    ),
    title: "Instant Seepage Fixes",
    desc: "Stop wall dampness and paint peeling instantly with our engineering-grade injection grouting systems.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
      </svg>
    ),
    title: "Complete Home Protection",
    desc: "From basements to balconies, we provide end-to-end sealing solutions that add lasting value to your home.",
  },
];

export default function Hero() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zip: "",
    service: "",
  });

  // Refs for animations
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroSubtextRef = useRef(null);
  const heroTitleRef = useRef(null);
  const formCardRef = useRef(null);
  const servicesHeadlineRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    // Entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.from(heroSubtextRef.current, {
      y: 30,
      opacity: 0,
      delay: 0.2
    })
    .from(heroTitleRef.current, {
      y: 50,
      opacity: 0,
    }, "-=0.7")
    .from(heroTextRef.current, {
      y: 30,
      opacity: 0,
    }, "-=0.7")
    .from(formCardRef.current, {
      y: 100,
      opacity: 0,
    }, "-=0.5");

    // Scroll triggered animations for Services Section
    gsap.from(servicesHeadlineRef.current, {
      scrollTrigger: {
        trigger: servicesHeadlineRef.current,
        start: "top 90%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.fromTo(".service-card-hero", 
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: servicesHeadlineRef.current,
          start: "top 70%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        immediateRender: false
      }
    );

  }, { scope: containerRef });

  const [adminDetails, setAdminDetails] = useState(null);
  const [dynamicServices, setDynamicServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { getAdminDetailsAction, getAllServicesAction } = await import("@/app/actions/admin");
      const [adminResult, servicesResult] = await Promise.all([
        getAdminDetailsAction(),
        getAllServicesAction()
      ]);

      if (adminResult.success) {
        setAdminDetails(adminResult.admin);
      }
      if (servicesResult.success) {
        setDynamicServices(servicesResult.services.map(s => s.title));
      }
    };
    fetchData();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const number = adminDetails?.numbers?.[0] || CONTACT_CONFIG.whatsapp; // Fallback

    const cleanNumber = number.replace(/\D/g, "");
    const message = `*New Quote Request*\n\n*Name:* ${form.firstName} ${form.lastName}\n*Email:* ${form.email}\n*Phone:* ${form.phone}\n*Zip Code:* ${form.zip}\n*Service:* ${form.service}`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <div ref={containerRef} className="min-h-screen font-sans bg-white text-white">

      {/* â”€â”€ HERO â”€â”€ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-28 md:pt-16">

        {/* Background image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1800&q=80"
            alt="Aerial view of rooftops"
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full px-10 lg:px-20 xl:px-28 pt-40 pb-80 md:pb-40">
          <p ref={heroSubtextRef} className="text-sm font-semibold tracking-[0.3em] uppercase text-white/80 mb-4">
            Premium Waterproofing &amp; Seepage Solutions
          </p>
          <h1 ref={heroTitleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  uppercase leading-none tracking-tight max-w-5xl font-semibold">
            Shield Your Home
            <br />
            From Monsoon Damage
          </h1>
          <p ref={heroTextRef} className="mt-6 text-lg text-white/75 max-w-2xl leading-relaxed">
            From terrace seepage to basement leaks, RWPC RAS CARE provides expert
            waterproofing for every Indian home.
          </p>
        </div>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0088ff] z-0" />

        {/* â”€â”€ FORM CARD â”€â”€ overlapping hero + accent bar */}
        <div ref={formCardRef} className="relative z-10 max-w-7xl mx-auto px-6 w-full -mb-8">
          <div className="bg-[#1a1a1a] rounded-xl p-8 md:p-10">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 items-start">

              {/* Left text */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight text-white">
                  Let Our Team Earn
                  <br />
                  Your Trust &amp;
                  <br />
                  Loyalty
                </h2>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-[#0088ff]" />
                  <svg
                    width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="#0088ff" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="mt-8">
                  <p className="text-xs font-bold tracking-widest text-white/60 uppercase mb-1">
                    We Offer
                  </p>
                  <p className="text-sm font-black tracking-widest text-[#0088ff] uppercase">
                    24 HR Emergency Services
                  </p>
                </div>
              </div>

              {/* Right form */}
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <input
                  type="text" name="firstName" placeholder="First name*"
                  value={form.firstName} onChange={handleChange} required
                  className="bg-[#2a2a2a] rounded-lg border border-white/10 text-white text-sm px-4 py-3 placeholder:text-white/40 outline-none focus:border-[#0088ff] transition-colors"
                />
                <input
                  type="text" name="lastName" placeholder="Last name*"
                  value={form.lastName} onChange={handleChange} required
                  className="bg-[#2a2a2a] rounded-lg border border-white/10 text-white text-sm px-4 py-3 placeholder:text-white/40 outline-none focus:border-[#0088ff] transition-colors"
                />
                <input
                  type="email" name="email" placeholder="Email address*"
                  value={form.email} onChange={handleChange} required
                  className="bg-[#2a2a2a] rounded-lg border border-white/10 text-white text-sm px-4 py-3 placeholder:text-white/40 outline-none focus:border-[#0088ff] transition-colors"
                />
                <input
                  type="tel" name="phone" placeholder="Phone number*"
                  value={form.phone} onChange={handleChange} required
                  className="bg-[#2a2a2a] rounded-lg border border-white/10 text-white text-sm px-4 py-3 placeholder:text-white/40 outline-none focus:border-[#0088ff] transition-colors"
                />
                <input
                  type="text" name="zip" placeholder="Zip code"
                  value={form.zip} onChange={handleChange}
                  className="bg-[#2a2a2a] rounded-lg border border-white/10 text-white text-sm px-4 py-3 placeholder:text-white/40 outline-none focus:border-[#0088ff] transition-colors"
                />
                <div className="relative">
                  <select
                    name="service" value={form.service}
                    onChange={handleChange} required
                    className="w-full appearance-none rounded-lg bg-[#2a2a2a] border border-white/10 text-sm px-4 py-3 outline-none focus:border-[#0088ff] transition-colors text-white/40"
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="" disabled className="text-white/40">
                      Choose a Service*
                    </option>
                    {(dynamicServices.length > 0 ? dynamicServices : SERVICES).map((s) => (
                      <option key={s} value={s} className="text-white bg-[#2a2a2a]">
                        {s}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40"
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="flex items-center gap-3 rounded-lg bg-[#0088ff] hover:bg-[#006fd6] transition-colors text-white text-xs font-black tracking-widest px-8 py-4 uppercase"
                  >
                    Get A Free Quote
                    <svg
                      width="18" height="18" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ SERVICES SECTION â”€â”€ */}
      <section className="relative bg-[#0088ff] px-6 pt-24 pb-20 overflow-hidden">

        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Top row: headline left, tagline right */}
          <div
            ref={servicesHeadlineRef}
            className="flex justify-center mb-14 w-full"
          >
            <h2 className="font-black uppercase leading-tight text-white text-4xl md:text-5xl text-center py-10 max-w-3xl mx-auto">
              Protect your home with industry-leading quality{" "}
              <span className="text-white/50">
                backed by a superior warranty.
              </span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-4 services-cards-grid">
            {SERVICE_CARDS.map((item, i) => (
              <div
                key={i}
                className="group relative bg-white/10 rounded-xl overflow-hidden border border-white/15 p-8 hover:bg-white/[0.17] hover:border-white/30 transition-all duration-300 service-card-hero"
              >
                {/* Top accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

                <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-black uppercase tracking-wide text-white text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
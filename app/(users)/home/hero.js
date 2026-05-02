"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SERVICES = [
  "Roof Repair",
  "Roof Replacement",
  "Leak Detection",
  "Emergency Services",
  "Gutter Installation",
  "Inspection",
];

const SERVICE_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 2C8.13 2 5 5.13 5 9v1H3v2h18v-2h-2V9c0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5v1H7V9c0-2.76 2.24-5 5-5zM5 14v2c0 1.1.9 2 2 2h1v1a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-1h1c1.1 0 2-.9 2-2v-2H5z" />
      </svg>
    ),
    title: "Premium Roof Installation",
    desc: "Our expert team ensures seamless roof installation using top-tier materials built to last for decades.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M15.5 2.1L11 6.6 13.4 9 18 4.5c.7 1.7.3 3.8-1.1 5.2-1.3 1.3-3.1 1.8-4.8 1.4L5.3 18c-.8.8-.8 2 0 2.8s2 .8 2.8 0l6.9-6.8c-.4-1.7.1-3.5 1.4-4.8 1.4-1.4 3.5-1.8 5.2-1.1L17 12.6l2.4 2.4 4.5-4.5C23.2 7.4 21.1 1.4 15.5 2.1zM6.7 19.3c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4s1-.4 1.4 0c.4.4.4 1 0 1.4z" />
      </svg>
    ),
    title: "Fast and Reliable Repairs",
    desc: "Make sure that any leaks or damage won't compromise your safety. We respond fast, fix it right.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
    title: "Stress-Free Roof Replacement",
    desc: "Transform your living space with a stylish new roof that stands out and adds lasting value to your home.",
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

  // Refs for scroll animation
  const topRowRef = useRef(null);
  const cardsRef = useRef([]);
  const [topRowVisible, setTopRowVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);

  useEffect(() => {
    const observers = [];

    // Observe top row
    if (topRowRef.current) {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setTopRowVisible(true); },
        { threshold: 0.1 }
      );
      obs.observe(topRowRef.current);
      observers.push(obs);
    }

    // Observe each card
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setCardsVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 120);
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(card);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Quote request submitted!");
  }

  return (
    <div className="min-h-screen font-sans bg-white text-white">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-16">

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
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-80 md:pb-60">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/80 mb-4">
            Roofing Repair &amp; Replacement Services
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tight max-w-3xl">
            Keep Your Home
            <br />
            Dry And Beautiful
          </h1>
          <p className="mt-6 text-sm text-white/75 max-w-sm leading-relaxed">
            Whether you&apos;re in need of an entirely new roof or just have a
            leak, Roofer has you covered.
          </p>
        </div>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0088ff] z-0" />

        {/* ── FORM CARD ── overlapping hero + accent bar */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full -mb-8">
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
                    {SERVICES.map((s) => (
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

      {/* ── SERVICES SECTION ── */}
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
            ref={topRowRef}
            className="flex justify-center mb-14 transition-all duration-700 ease-out w-full"
            style={{
              opacity: topRowVisible ? 1 : 0,
              transform: topRowVisible ? "translateY(0)" : "translateY(28px)",
            }}
          >
            <h2 className="font-black uppercase leading-tight text-white text-4xl md:text-5xl text-center py-10 max-w-3xl mx-auto">
              Protect your home with industry-leading quality{" "}
              <span className="text-white/50">
                backed by a superior warranty.
              </span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {SERVICE_CARDS.map((item, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="group relative bg-white/10 rounded-xl overflow-hidden border border-white/15 p-8 hover:bg-white/[0.17] hover:border-white/30 transition-all duration-300"
                style={{
                  opacity: cardsVisible[i] ? 1 : 0,
                  transform: cardsVisible[i] ? "translateY(0)" : "translateY(36px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease, background 0.25s, border-color 0.25s",
                }}
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
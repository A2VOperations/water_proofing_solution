"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAllServicesAction, getAdminDetailsAction } from "@/app/actions/admin";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services", hasMega: true },
  { label: "WORK", href: "/work" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

const MEGA_MENU = [
  {
    category: "RESIDENTIAL SOLUTIONS",
    description: "Complete waterproofing for every home surface",
    accent: "#0088ff",
    items: [
      { label: "Bathroom Waterproofing", href: "/services/bathroom", desc: "Wet area protection" },
      { label: "Building Waterproofing", href: "/services/building", desc: "Full envelope sealing" },
      { label: "Basement Waterproofing", href: "/services/basement", desc: "Below-grade defense" },
      { label: "HDPE Membrane", href: "/services/hdpe", desc: "High-density lining" },
      { label: "Balcony Waterproofing", href: "/services/balcony", desc: "Outdoor deck sealing" },
      { label: "Commercial Solutions", href: "/services/commercial", desc: "Large-scale projects" },
      { label: "Concrete Waterproofing", href: "/services/concrete", desc: "Slab penetration guard" },
    ],
  },
  {
    category: "SPECIALIZED SYSTEMS",
    description: "Advanced protection for unique structures",
    accent: "#f97316",
    items: [
      { label: "Deadwall Waterproofing", href: "/services/deadwall", desc: "Retaining wall systems" },
      { label: "Jacuzzi Waterproofing", href: "/services/jacuzzi", desc: "Spa & hot tub sealing" },
      { label: "Podium Waterproofing", href: "/services/podium", desc: "Elevated deck systems" },
      { label: "Swimming Pool", href: "/services/pool", desc: "Pool basin protection" },
      { label: "Terrace Waterproofing", href: "/services/terrace", desc: "Roof terrace systems" },
      { label: "Metro Sheet", href: "/services/metro", desc: "Underground transit" },
      { label: "Expansion Joints", href: "/services/expansion", desc: "Movement joint sealing" },
    ],
  },
  {
    category: "TECHNICAL SOLUTIONS",
    description: "Engineering-grade diagnostics & repairs",
    accent: "#3b82f6",
    items: [
      { label: "PU Grouting", href: "/services/pu-grouting", desc: "Void-filling injection" },
      { label: "Thermal Leak Detection", href: "/services/thermal", desc: "Infrared scanning" },
      { label: "Interior Design", href: "/services/interior", desc: "Post-repair aesthetics" },
      { label: "Structure Repair", href: "/services/structure", desc: "Concrete restoration" },
      { label: "Wall Crack Repair", href: "/services/wall-crack", desc: "Crack injection" },
      { label: "Water Tank Sealing", href: "/services/water-tank", desc: "Tank interior coating" },
    ],
  },
  {
    category: "PREMIUM FINISHES",
    description: "High-performance decorative coatings",
    accent: "#8b5cf6",
    items: [
      { label: "Epoxy Flooring", href: "/services/epoxy", desc: "Industrial floor coating" },
    ],
    featured: {
      title: "Not sure what you need?",
      body: "Our experts will assess your property and recommend the right system — free of charge.",
      cta: "Book Free Assessment",
      href: "/contact",
    },
  },
];

// Icon SVGs mapped by [colIdx][itemIdx]
const ICONS = [
  [
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 2L2 8v10h5v-5h6v5h5V8L10 2z"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="16" height="11" rx="1.5"/><path d="M7 7V5a3 3 0 0 1 6 0v2"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 18h16M4 18V9l6-5 6 5v9"/><path d="M8 18v-4h4v4"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M3 8h14M8 8v9"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 18h16M4 18V9l6-5 6 5v9"/><path d="M4 14h12"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="16" height="12" rx="1.5"/><path d="M6 6V4a4 4 0 0 1 8 0v2"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="16" height="16" rx="2"/><path d="M2 8h16"/><path d="M8 14h4"/></svg>,
  ],
  [
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 17L10 3l7 14H3z"/><path d="M10 9v4"/><circle cx="10" cy="15" r=".5" fill="currentColor"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="7"/><path d="M3 10h14"/><path d="M10 3c-2.5 2.5-2.5 11.5 0 14"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="16" height="13" rx="1.5"/><path d="M7 19h6M10 16v3"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="10" cy="14" rx="8" ry="3"/><path d="M2 14V8M18 14V8"/><ellipse cx="10" cy="8" rx="8" ry="3"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 18h16M4 18V7l6-5 6 5v11"/><path d="M4 12h12"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="10" width="14" height="8" rx="1.5"/><path d="M7 10V7a3 3 0 0 1 6 0v3"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h12M4 10h12M4 14h8"/></svg>,
  ],
  [
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="3"/><path d="M10 1v3M10 16v3M1 10h3M16 10h3M3.5 3.5l2 2M14.5 14.5l2 2M3.5 16.5l2-2M14.5 5.5l2-2"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="12" height="16" rx="1.5"/><path d="M7 7h6M7 10h6M7 13h4"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 18h16M4 18V9l6-5 6 5v9M8 18v-5h4v5"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 4.5a4.5 4.5 0 1 1-5.47 5.47L2 14.5 5.5 18l4.53-4.53A4.5 4.5 0 1 1 12 4.5z"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h12v12H4zM4 4l12 12M20 4L4 20" clipPath="inset(0 0 0 0)"/><path d="M4 4l12 12M4 16l12-12" strokeWidth="1.5"/></svg>,
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 8h12v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8z"/><path d="M2 8h16M8 4h4"/></svg>,
  ],
  [
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="16" height="16" rx="2"/><path d="M2 8h16M8 14h4"/></svg>,
  ],
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false);
  const [activeCol, setActiveCol] = useState(0);
  const [dynamicMegaMenu, setDynamicMegaMenu] = useState([]);
  const [adminDetails, setAdminDetails] = useState(null);
  const [totalServices, setTotalServices] = useState(0);
  const megaRef = useRef(null);

  const CATEGORIES = [
    { name: "Residential solutions", desc: "Complete waterproofing for every home surface", accent: "#0088ff" },
    { name: "Specialized solutions", desc: "Advanced protection for unique structures", accent: "#f97316" },
    { name: "Technical solutions", desc: "Engineering-grade diagnostics & repairs", accent: "#3b82f6" },
    { name: "Premium finishes", desc: "High-performance decorative coatings", accent: "#8b5cf6" }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      const result = await getAllServicesAction();
      if (result.success) {
        setTotalServices(result.services.length);
        const grouped = CATEGORIES.map(cat => ({
          category: cat.name.toUpperCase(),
          description: cat.desc,
          accent: cat.accent,
          items: result.services
            .filter(s => s.category === cat.name)
            .map(s => ({
              label: s.title,
              href: `/services/${s.slug}`,
              desc: s.description.substring(0, 30) + "..."
            }))
        }));
        setDynamicMegaMenu(grouped);
      }
    };

    const fetchAdmin = async () => {
      const result = await getAdminDetailsAction();
      if (result.success) {
        setAdminDetails(result.admin);
      }
    };

    fetchServices();
    fetchAdmin();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => pathname === href;
  const isServicesActive = pathname.startsWith("/services");
  const currentAccent = dynamicMegaMenu[activeCol]?.accent || "#0088ff";

  return (
    <>
      {/* Mega menu overlay backdrop */}
      {megaOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
          style={{ top: "76px" }}
          onClick={() => setMegaOpen(false)}
        />
      )}

      <header
        ref={megaRef}
        className="fixed top-3 left-4 right-4 z-50 mx-auto max-w-8xl"
        onMouseLeave={() => setMegaOpen(false)}
      >
        {/* Main bar */}
        <div className="bg-white/95 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.10)] rounded-xl border border-gray-100/80">
          <div className="px-2 flex items-center justify-between h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span
                className="text-2xl pl-5 font-black tracking-tighter"
                style={{ color: "#0088ff", fontFamily: "Georgia, serif", letterSpacing: "-0.03em" }}
              >
                Rooflêt
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.hasMega ? (
                  <button
                    key={link.label}
                    onClick={() => setMegaOpen((prev) => !prev)}
                    className={`flex items-center gap-1.5 font-bold tracking-[0.12em] px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer`}
                    style={{
                      fontSize: "12px",
                      backgroundColor: isServicesActive || megaOpen ? "#e8f4ff" : "transparent",
                      color: isServicesActive || megaOpen ? "#0088ff" : "#4b5563",
                    }}
                    onMouseEnter={(e) => {
                      setMegaOpen(true);
                      if (!(isServicesActive || true)) {
                        e.currentTarget.style.backgroundColor = "#f9fafb";
                        e.currentTarget.style.color = "#111827";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!(isServicesActive || megaOpen)) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#4b5563";
                      }
                    }}
                  >
                    {link.label}
                    <svg
                      width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      className={`transition-transform duration-300 ${megaOpen ? "-rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-bold tracking-[0.12em] px-4 py-2 rounded-lg transition-all duration-150"
                    style={{
                      fontSize: "12px",
                      backgroundColor: isActive(link.href) ? "#e8f4ff" : "transparent",
                      color: isActive(link.href) ? "#0088ff" : "#4b5563",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(link.href)) {
                        e.currentTarget.style.backgroundColor = "#f9fafb";
                        e.currentTarget.style.color = "#111827";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(link.href)) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#4b5563";
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* CTA */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 transition-all text-white font-bold tracking-[0.1em] px-5 py-5 uppercase rounded-lg"
              style={{
                fontSize: "14px",
                backgroundColor: "#0088ff",
                boxShadow: "0 2px 8px rgba(0,136,255,0.25)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#006fd6")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0088ff")}
            >
              Get A Free Quote
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 ml-auto"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* ── DESKTOP MEGA MENU ── */}
        <div
          className={`absolute left-0 right-0 top-full hidden md:block transition-all duration-300 ease-out ${
            megaOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="mt-2 bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden">
            {/* Top accent bar */}
            <div
              className="h-1 w-full transition-all duration-300"
              style={{ background: `linear-gradient(90deg, ${currentAccent}, ${currentAccent}88)` }}
            />

            <div className="flex" style={{ height: "75vh" }}>
              {/* Left column — category tabs */}
              <div className="w-64 border-r border-gray-100 bg-gray-50/70 py-6 px-4 flex flex-col gap-1 shrink-0">
                <p className="text-[11px] font-black tracking-[0.2em] text-gray-400 px-3 pb-3 uppercase">Categories</p>
                {dynamicMegaMenu.map((col, i) => (
                  <button
                    key={col.category}
                    onMouseEnter={() => setActiveCol(i)}
                    onClick={() => setActiveCol(i)}
                    className="text-left w-full px-4 py-3.5 rounded-xl transition-all duration-150 group"
                    style={{
                      backgroundColor: activeCol === i ? "white" : "transparent",
                      boxShadow: activeCol === i ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                      cursor: "default",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-150"
                        style={{
                          backgroundColor: activeCol === i ? col.accent : "#d1d5db",
                          transform: activeCol === i ? "scale(1.2)" : "scale(1)",
                        }}
                      />
                      <span
                        className="block font-bold leading-tight transition-colors duration-150"
                        style={{
                          fontSize: "13px",
                          color: activeCol === i ? "#111827" : "#6b7280",
                        }}
                      >
                        {col.category}
                      </span>
                    </div>
                    <p className="text-[12px] text-gray-400 mt-1 pl-5 leading-snug">{col.description}</p>
                    <p className="text-[11px] font-semibold mt-1 pl-5" style={{ color: activeCol === i ? col.accent : "#9ca3af" }}>
                      {col.items.length} services
                    </p>
                  </button>
                ))}

                {/* Bottom decorative card in sidebar */}
                <div
                  className=" mx-1 rounded-xl p-4"
                  style={{ background: "linear-gradient(135deg, #e8f4ff, #f0f8ff)", border: "1px solid #bfe0ff" }}
                >
                  
                  <a
                    href={`tel:${adminDetails?.numbers?.[0] || "+1800000000"}`}
                    className=" flex items-center gap-1.5 font-bold"
                    style={{ fontSize: "12px", color: "#0088ff" }}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 3a1 1 0 0 1 1-1h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a1 1 0 0 1-1 1C8 18 2 12 2 3z"/>
                    </svg>
                    {adminDetails?.numbers?.[0] || "+1 800 000 0000"}
                  </a>
                </div>
              </div>

              {/* Right pane — service items grid */}
              <div className="flex-1 p-8 overflow-y-auto">
                {dynamicMegaMenu.map((col, colIdx) => (
                  <div
                    key={col.category}
                    className={`transition-all duration-200 ${
                      activeCol === colIdx ? "opacity-100 block" : "opacity-0 hidden"
                    }`}
                  >
                    {/* Pane header */}
                    <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="inline-block px-2 py-0.5 rounded-md text-white font-bold"
                            style={{ fontSize: "11px", backgroundColor: col.accent }}
                          >
                            {col.items.length} SERVICES
                          </span>
                        </div>
                        <h3 className="font-black text-gray-900 tracking-tight" style={{ fontSize: "18px" }}>{col.category}</h3>
                        <p className="text-gray-400 mt-0.5" style={{ fontSize: "14px" }}>{col.description}</p>
                      </div>
                      <Link
                        href="/services"
                        className="flex items-center gap-1.5 font-bold tracking-wide transition-colors shrink-0 mt-1"
                        style={{ fontSize: "13px", color: col.accent }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        VIEW ALL SERVICES
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    </div>

                    {/* Items grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {col.items.length > 0 ? (
                        col.items.map((item, itemIdx) => {
                          const active = isActive(item.href);
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="flex items-start gap-3.5 px-4 py-4 rounded-xl transition-all duration-150 group border"
                              style={{
                                borderColor: active ? "transparent" : "transparent",
                                backgroundColor: active ? "#e8f4ff" : "transparent",
                              }}
                            >
                              <span
                                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150"
                                style={{
                                  backgroundColor: active ? col.accent : "#f1f5f9",
                                  color: active ? "white" : "#64748b",
                                }}
                              >
                                <span className="w-5 h-5">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                </span>
                              </span>
                              <div className="min-w-0 pt-0.5">
                                <span
                                  className="block font-semibold leading-tight truncate transition-colors duration-150"
                                  style={{
                                    fontSize: "14px",
                                    color: active ? "#0088ff" : "#1e293b",
                                  }}
                                >
                                  {item.label}
                                </span>
                                <span className="block text-gray-400 mt-1" style={{ fontSize: "12px" }}>{item.desc}</span>
                              </div>
                            </Link>
                          );
                        })
                      ) : (
                        <div className="col-span-3 py-20 text-center">
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">No services in this category yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-100 px-8 py-4 flex items-center justify-between bg-gray-50/60">
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#22c55e" }}
                />
                <p className="text-gray-500" style={{ fontSize: "13px" }}>
                  <span className="font-semibold text-gray-700">{totalServices} services</span> across {dynamicMegaMenu.length} categories · Available 24/7
                </p>
              </div>
              <div className="flex items-center gap-6">
                <Link
                  href="/work"
                  className="font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                  style={{ fontSize: "13px" }}
                >
                  See Our Work →
                </Link>
                <Link
                  href="/contact"
                  className="font-semibold transition-colors"
                  style={{ fontSize: "13px", color: "#0088ff" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#006fd6")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#0088ff")}
                >
                  Free Assessment →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          className={`md:hidden overflow-y-auto transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) =>
              link.hasMega ? (
                <div key={link.label}>
                  <button
                    onClick={() => setMobileMegaOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-bold tracking-[0.12em] transition-colors duration-200"
                    style={{
                      fontSize: "11px",
                      backgroundColor: isServicesActive || mobileMegaOpen ? "#e8f4ff" : "transparent",
                      color: isServicesActive || mobileMegaOpen ? "#0088ff" : "#374151",
                    }}
                  >
                    {link.label}
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      className={`transition-transform duration-300 ${mobileMegaOpen ? "-rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      mobileMegaOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-1 pt-1 pb-2 flex flex-col gap-3">
                      {dynamicMegaMenu.map((col, colIdx) => (
                        <div key={col.category}>
                          <div className="flex items-center gap-2 px-3 py-1.5">
                            <span
                              className="block w-2 h-2 rounded-full"
                              style={{ background: col.accent }}
                            />
                            <p className="font-black tracking-[0.2em] text-gray-400 uppercase" style={{ fontSize: "9px" }}>
                              {col.category}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-0.5">
                            {col.items.length > 0 ? (
                                col.items.map((item, itemIdx) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-150"
                                    style={{
                                    fontSize: "11px",
                                    backgroundColor: isActive(item.href) ? "#e8f4ff" : "transparent",
                                    color: isActive(item.href) ? "#0088ff" : "#4b5563",
                                    }}
                                >
                                    <span
                                    className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-white"
                                    style={{ background: col.accent }}
                                    >
                                    <span className="w-3.5 h-3.5">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                    </span>
                                    </span>
                                    <span className="truncate">{item.label}</span>
                                </Link>
                                ))
                            ) : (
                                <p className="col-span-2 px-3 py-2 text-[10px] text-gray-400 italic">No services</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2.5 rounded-lg font-bold tracking-[0.12em] transition-colors duration-200"
                  style={{
                    fontSize: "11px",
                    backgroundColor: isActive(link.href) ? "#e8f4ff" : "transparent",
                    color: isActive(link.href) ? "#0088ff" : "#374151",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}

            <Link
              href="/contact"
              className="mt-2 flex items-center justify-center gap-2 transition-colors text-white font-bold tracking-[0.1em] px-6 py-3 text-center uppercase rounded-xl"
              style={{ fontSize: "11px", backgroundColor: "#0088ff" }}
              onClick={() => setMenuOpen(false)}
            >
              Get A Free Quote
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
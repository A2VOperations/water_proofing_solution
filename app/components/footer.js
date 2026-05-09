"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAdminDetailsAction } from "@/app/actions/admin";
import { CONTACT_CONFIG } from "@/app/config";

const USEFUL_LINKS_COL1 = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
];

const USEFUL_LINKS_COL2 = [
  {
    label: "Guniting Waterproofing",
    href: "/services/guniting-waterproofing-service",
  },
  {
    label: "Terrace Waterproofing",
    href: "/services/terrace-waterproofing-service",
  },
  {
    label: "Flooring Waterproofing",
    href: "/services/flooring-waterproofing-service",
  },
  {
    label: "Basement Waterproofing",
    href: "/services/basement-waterproofing-service",
  },
  {
    label: "Exterior Wall Waterproofing",
    href: "/services/exterior-wall-waterproofing-services",
  },
];

const USEFUL_LINKS_COL3 = [
  {
    label: "Chemical Waterproofing",
    href: "/services/chemical-waterproofing-service",
  },
  {
    label: "Bathroom Sealing",
    href: "/services/bathroom-waterproofing-services",
  },
  {
    label: "Polymer Waterproofing",
    href: "/services/polymer-waterproofing-services",
  },
  {
    label: "Cementitious Waterproofing",
    href: "/services/cementitious-waterproofing-services",
  },
];

export default function Footer() {
  const [name, setName] = useState("");
  const [adminDetails, setAdminDetails] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const result = await getAdminDetailsAction();
      if (result.success) {
        setAdminDetails(result.admin);
      }
    };
    fetchAdmin();
  }, []);

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (name.trim()) {
      const number = adminDetails?.numbers?.[0] || CONTACT_CONFIG.whatsapp;
      const cleanNumber = number.replace(/\D/g, "");
      const message = encodeURIComponent(
        `Hello! My name is ${name}. I'm interested in your waterproofing services.`,
      );
      window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
      setName("");
    }
  };

  return (
    <footer className="bg-[#031b33] relative pt-20 flex flex-col font-sans overflow-hidden">
      {/* Wave SVG background - bottom left */}
      <div className="absolute bottom-0 left-0 w-full md:w-2/3 h-full overflow-hidden pointer-events-none opacity-20 z-0">
        <svg
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMax slice"
          className="absolute bottom-[-10%] left-[-10%] w-full h-[120%]"
        >
          <path
            d="M0,400 C150,300 300,550 450,400 C600,250 700,450 800,350 L800,600 L0,600 Z"
            fill="none"
            stroke="#fff"
            strokeWidth="1"
          />
          <path
            d="M0,430 C180,330 350,580 500,430 C650,280 730,480 800,380 L800,600 L0,600 Z"
            fill="none"
            stroke="#fff"
            strokeWidth="0.8"
          />
          <path
            d="M0,460 C210,360 400,610 550,460 C700,310 760,510 800,410 L800,600 L0,600 Z"
            fill="none"
            stroke="#fff"
            strokeWidth="0.6"
          />
          <path
            d="M0,490 C240,390 450,640 600,490 C750,340 790,540 800,440 L800,600 L0,600 Z"
            fill="none"
            stroke="#fff"
            strokeWidth="0.4"
          />
          <path
            d="M0,520 C270,420 500,670 650,520 C800,370 820,570 800,470 L800,600 L0,600 Z"
            fill="none"
            stroke="#fff"
            strokeWidth="0.2"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:w-[25%] flex flex-col justify-between h-full min-h-[250px] items-center lg:items-start text-center lg:text-left">
            <div className="mb-12 lg:mb-0 pt-2">
              <Link
                href="/"
                className="flex items-center gap-3 decoration-transparent"
              >
                <img 
                  src="/logo2.png" 
                  alt="RAS CARE Logo" 
                  className="w-auto h-[120px] md:h-[150px] object-contain"
                />
              </Link>
            </div>

            <div className="flex gap-4 mt-8 lg:mt-auto">
              {[
                {
                  label: "Facebook",
                  href: adminDetails?.facebook || CONTACT_CONFIG.facebook,
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  href: `https://wa.me/${(adminDetails?.numbers?.[0] || CONTACT_CONFIG.whatsapp).replace(/\D/g, "")}`,
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: adminDetails?.instagram || CONTACT_CONFIG.instagram,
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="0.01"
                        fill="currentColor"
                        strokeWidth="3"
                      />
                    </svg>
                  ),
                },
                {
                  label: "YouTube",
                  href: adminDetails?.youtube || CONTACT_CONFIG.youtube,
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#0088ff] hover:border-[#0088ff] hover:scale-110 transition-all duration-300 group"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:w-[75%] flex flex-col text-center lg:text-left items-center lg:items-start">
            {/* Newsletter Row */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10 w-full">
              <h2 className="text-white text-[28px] md:text-[36px] font-bold w-full lg:w-[45%] leading-tight">
                Protect Your Home <br /> from Leaks
              </h2>

              <div className="w-full lg:w-[55%]">
                <form
                  onSubmit={handleWhatsApp}
                  className="relative flex items-center w-full"
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-full py-[16px] pl-6 pr-[50px] sm:pr-[170px] text-white placeholder-gray-500 focus:outline-none focus:border-[#0088ff]/50 focus:bg-white/10 transition-all duration-300 text-sm backdrop-blur-sm"
                  />

                  <button
                    type="submit"
                    className="absolute right-[4px] top-[4px] bottom-[4px] bg-[#25D366] text-white rounded-full px-4 sm:px-6 font-bold flex items-center gap-2 hover:bg-[#1ebd5b] transition-colors whitespace-nowrap text-xs sm:text-sm shadow-lg"
                  >
                    <span className="hidden sm:inline">WhatsApp Me</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-12 lg:gap-16 pt-12 w-full">
              {/* Useful Link */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-12 gap-x-12 w-full">
                  <div className="flex flex-col items-center sm:items-start gap-4">
                    <h4 className="text-white text-[14px] font-bold tracking-[0.1em] uppercase mb-2 flex items-center justify-center sm:justify-start gap-2">
                      Navigation
                    </h4>
                    <div className="flex flex-col items-center sm:items-start gap-4">
                      {USEFUL_LINKS_COL1.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-all duration-300 text-[14px] font-medium flex items-center group whitespace-nowrap"
                        >
                          <span className="w-0 group-hover:w-3 h-[1.5px] bg-[#0088ff] mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center sm:items-start gap-4">
                    <h4 className="text-white text-[14px] font-bold tracking-[0.1em] uppercase mb-2 flex items-center justify-center sm:justify-start gap-2">
                      Our Services
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 lg:gap-x-12 w-full">
                      <div className="flex flex-col items-center sm:items-start gap-4">
                        {USEFUL_LINKS_COL2.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="text-gray-400 hover:text-white transition-all duration-300 text-[14px] font-medium flex items-center group whitespace-nowrap"
                          >
                            <span className="w-0 group-hover:w-3 h-[1.5px] bg-[#0088ff] mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                            {link.label}
                          </Link>
                        ))}
                      </div>
                      <div className="flex flex-col items-center sm:items-start gap-4">
                        {USEFUL_LINKS_COL3.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="text-gray-400 hover:text-white transition-all duration-300 text-[14px] font-medium flex items-center group whitespace-nowrap"
                          >
                            <span className="w-0 group-hover:w-3 h-[1.5px] bg-[#0088ff] mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Say Hello */}
              <div className="flex flex-col items-center lg:items-start">
                <h4 className="text-white text-[18px] font-bold mb-8 relative inline-block">
                  Say Hello
                  <span className="absolute -bottom-2 left-0 w-8 h-[2.5px] bg-[#0088ff]"></span>
                </h4>
                <div className="flex flex-col gap-6 items-center lg:items-start w-full">
                  <div className="flex flex-col items-center lg:items-start gap-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
                      Email Us
                    </span>
                    <a
                      href={`mailto:${adminDetails?.email || CONTACT_CONFIG.email}`}
                      className="text-gray-300 hover:text-[#0088ff] transition-all duration-300 text-[15px] font-medium border-b border-white/10 hover:border-[#0088ff]/50 pb-1"
                    >
                      {adminDetails?.email || CONTACT_CONFIG.email}
                    </a>
                  </div>

                  <div className="flex flex-col items-center lg:items-start gap-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
                      Call Us
                    </span>
                    <a
                      href={`tel:${adminDetails?.numbers?.[0] || CONTACT_CONFIG.whatsapp}`}
                      className="text-white text-[24px] font-bold tracking-tight hover:text-[#0088ff] transition-all duration-300"
                    >
                      {adminDetails?.numbers?.[0] || CONTACT_CONFIG.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="w-full px-4 sm:px-8 relative z-10 pb-0">
        <div className="max-w-7xl mx-auto bg-white rounded-t-[24px] px-8 py-5 flex flex-col sm:flex-row justify-between items-center text-[13px] text-gray-500 shadow-lg">
          <Link
            href="/terms"
            className="hover:text-gray-900 transition-colors mb-2 sm:mb-0"
          >
            Terms and conditions
          </Link>
          <p className="m-0 mb-2 sm:mb-0">
            © 2026 {adminDetails?.companyTitle || CONTACT_CONFIG.companyTitle}
          </p>
          <Link
            href="/privacy"
            className="hover:text-gray-900 transition-colors"
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

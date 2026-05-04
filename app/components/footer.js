"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAdminDetailsAction } from "@/app/actions/admin";
import { CONTACT_CONFIG } from "@/app/config";


const USEFUL_LINKS_COL1 = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

const USEFUL_LINKS_COL2 = [
  { label: "Contact", href: "/contact" },
  { label: "Licenses", href: "/licenses" },
  { label: "Style Guide", href: "/style-guide" },
  { label: "Change Log", href: "/change-log" },
];

const WORKING_HOURS = [
  { day: "Mon – Fri:", time: "9:00 AM – 5:00 PM" },
  { day: "Saturday:", time: "10:00 AM – 6:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
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
          <path d="M0,400 C150,300 300,550 450,400 C600,250 700,450 800,350 L800,600 L0,600 Z" fill="none" stroke="#fff" strokeWidth="1" />
          <path d="M0,430 C180,330 350,580 500,430 C650,280 730,480 800,380 L800,600 L0,600 Z" fill="none" stroke="#fff" strokeWidth="0.8" />
          <path d="M0,460 C210,360 400,610 550,460 C700,310 760,510 800,410 L800,600 L0,600 Z" fill="none" stroke="#fff" strokeWidth="0.6" />
          <path d="M0,490 C240,390 450,640 600,490 C750,340 790,540 800,440 L800,600 L0,600 Z" fill="none" stroke="#fff" strokeWidth="0.4" />
          <path d="M0,520 C270,420 500,670 650,520 C800,370 820,570 800,470 L800,600 L0,600 Z" fill="none" stroke="#fff" strokeWidth="0.2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:w-[25%] flex flex-col justify-between h-full min-h-[250px] items-center lg:items-start text-center lg:text-left">
            <div className="mb-12 lg:mb-0 pt-2">
              <Link href="/" className="flex items-center gap-3 decoration-transparent">
                <div className="relative flex items-center justify-center text-[#1d70b8]">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L2 12H5V20H19V12H22L12 3Z" />
                  </svg>
                  <svg className="absolute text-white w-6 h-6 mt-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <span className="text-white text-[28px] font-bold tracking-wide">
                  Feexaro
                </span>
              </Link>
            </div>

            <div className="flex gap-5 mt-8 lg:mt-auto">
              {[
                { label: "Facebook", href: "#", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { label: "Twitter", href: "#", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.58 1.64.9a4.52 4.52 0 0 0 1.4 6.04 4.48 4.48 0 0 1-2.05-.56v.06a4.52 4.52 0 0 0 3.62 4.43 4.52 4.52 0 0 1-2.04.08 4.52 4.52 0 0 0 4.22 3.14A9.06 9.06 0 0 1 0 19.54a12.77 12.77 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0 0 23 3z"/></svg> },
                { label: "Instagram", href: "#", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="3"/></svg> },
                { label: "YouTube", href: "#", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg> },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} aria-label={label} className="text-white hover:text-[#0088ff] transition-colors">{icon}</a>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:w-[75%] flex flex-col text-center lg:text-left items-center lg:items-start">
            
            {/* Newsletter Row */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10 w-full">
              <h2 className="text-white text-[28px] md:text-[36px] font-bold w-full lg:w-[45%] leading-tight">
                Protect Your Home <br/> from Leaks
              </h2>
              
              <div className="w-full lg:w-[55%]">
                <form onSubmit={handleSubscribe} className="relative flex items-center w-full">
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email Address" required
                    className="w-full bg-transparent border border-white/30 rounded-full py-[14px] pl-6 pr-[50px] sm:pr-[170px] text-white placeholder-gray-400 focus:outline-none focus:border-white/60 transition-colors text-sm"
                  />
                  <button type="submit" className="absolute right-[4px] top-[4px] bottom-[4px] bg-white text-[#031b33] rounded-full px-4 sm:px-6 font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors whitespace-nowrap text-xs sm:text-sm">
                    <span className="hidden sm:inline">{subscribed ? "Subscribed ✓" : "Subscribe Now"}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 pt-10 w-full">
              {/* Useful Link */}
              <div className="flex flex-col items-center lg:items-start">
                <h3 className="text-white text-[16px] font-semibold mb-6">Useful Link</h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                  <div className="flex flex-col gap-3">
                    {USEFUL_LINKS_COL1.map((link) => (
                      <Link key={link.label} href={link.href} className="text-gray-300 hover:text-white transition-colors text-[14px]">{link.label}</Link>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    {USEFUL_LINKS_COL2.map((link) => (
                      <Link key={link.label} href={link.href} className="text-gray-300 hover:text-white transition-colors text-[14px]">{link.label}</Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Working Time */}
              <div className="flex flex-col items-center lg:items-start">
                <h3 className="text-white text-[16px] font-semibold mb-6">Working Time</h3>
                <div className="flex flex-col gap-3">
                  {WORKING_HOURS.map(({ day, time }) => (
                    <p key={day} className="text-gray-300 text-[14px] m-0">{day} {time}</p>
                  ))}
                </div>
              </div>

              {/* Say Hello */}
              <div className="flex flex-col items-center lg:items-start">
                <h3 className="text-white text-[16px] font-semibold mb-6">Say Hello</h3>
                <div className="flex flex-col gap-4 items-center lg:items-start">
                  <a href={`mailto:${adminDetails?.email || CONTACT_CONFIG.email}`} className="text-gray-300 hover:text-white transition-colors text-[14px] underline underline-offset-4 decoration-gray-500 hover:decoration-white">
                    {adminDetails?.email || CONTACT_CONFIG.email}
                  </a>
                  <a href={`tel:${adminDetails?.numbers?.[0] || CONTACT_CONFIG.whatsapp}`} className="text-white text-[20px] font-semibold tracking-wide hover:text-[#0088ff] transition-colors mt-1">
                    {adminDetails?.numbers?.[0] || CONTACT_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="w-full px-4 sm:px-8 relative z-10 pb-0">
        <div className="max-w-7xl mx-auto bg-white rounded-t-[24px] px-8 py-5 flex flex-col sm:flex-row justify-between items-center text-[13px] text-gray-500 shadow-lg">
          <Link href="/terms" className="hover:text-gray-900 transition-colors mb-2 sm:mb-0">
            Terms and conditions
          </Link>
          <p className="m-0 mb-2 sm:mb-0">
            © 2024 {adminDetails?.companyTitle || CONTACT_CONFIG.companyTitle}
          </p>
          <Link href="/privacy" className="hover:text-gray-900 transition-colors">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
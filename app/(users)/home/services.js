"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllServicesAction } from "@/app/actions/admin";

const CATEGORY_ICONS = {
  "Residential Solutions": (
    <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  "Specialized Solutions": (
    <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "Technical Solutions": (
    <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "Premium Finishes": (
    <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const result = await getAllServicesAction();
      if (result.success) {
        setServices(result.services.slice(0, 6));
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  if (loading) return null;

  return (
    <section className="bg-[#f0f4f8] py-24 w-full">
      <div className="max-w-[90%] mx-auto px-6 md:px-12">
      <div className="text-center mb-20">
        <div className="inline-block mb-6">
          <span className="px-6 py-2.5 rounded-full border border-[#041f38] text-[12px] font-black uppercase tracking-[0.3em] text-[#041f38] bg-white/50 backdrop-blur-sm">
            Our Services
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#0A1A2F] tracking-tight">
          Whatever you need done
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div
            key={service._id || index}
            className="bg-white p-10 rounded-[48px] relative overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 border border-gray-50"
          >
            {/* Logo SVG & Title */}
            <div className="flex items-start gap-5 mb-8">
              <div className="shrink-0 w-20 h-20 bg-[#f0f7ff] rounded-[24px] flex items-center justify-center transition-all duration-700 group-hover:scale-105 shadow-sm group-hover:shadow-blue-200">
                <div className="transition-colors duration-500 group-hover:text-[#0089FF]">
                  {CATEGORY_ICONS[service.category] || (
                    <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0A1A2F] leading-tight tracking-tight group-hover:text-[#0089FF] transition-colors duration-300 break-words break-all pt-2">
                {service.title}
              </h3>
            </div>

            {/* Description - Limited to 3 lines */}
            <p className="text-gray-500 text-base leading-relaxed mb-16 max-w-[85%] font-medium line-clamp-3 break-words break-all">
              {service.description}
            </p>

            {/* Button Pocket positioned at bottom right */}
            <div className="absolute bottom-0 right-0 w-[90px] h-[90px] bg-[#f0f4f8] z-10 flex items-center justify-center rounded-tl-[40px]">
              
              {/* Top Inverted Curve */}
              <div className="absolute -top-[24px] right-0 w-[24px] h-[24px] bg-transparent rounded-br-[24px] shadow-[10px_10px_0_10px_#f0f4f8] pointer-events-none"></div>
              
              {/* Left Inverted Curve */}
              <div className="absolute bottom-0 -left-[24px] w-[24px] h-[24px] bg-transparent rounded-br-[24px] shadow-[10px_10px_0_10px_#f0f4f8] pointer-events-none"></div>

              <Link 
                href={`/services/${service.slug}`}
                className="bg-[#041F38] hover:bg-[#0089FF] w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 hover:scale-110 group/btn mt-2 ml-2"
              >
                <svg
                  className="w-6 h-6 text-white transition-transform duration-500 group-hover/btn:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </Link>
            </div>

            {/* Subtle background glow on hover */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* View More Button below the section */}
      <div className="mt-20 text-center">
        <Link 
          href="/services" 
          className="inline-flex items-center gap-3 bg-[#041F38] hover:bg-[#0089FF] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-500 hover:-translate-y-1 shadow-2xl"
        >
          View More Services
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
      </div>
    </section>
  );
};

export default Services;

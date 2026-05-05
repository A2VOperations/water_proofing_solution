"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllServicesAction } from "@/app/actions/admin";

const ServiceCard = ({ service }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (service.photos && service.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % service.photos.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [service.photos]);

  return (
    <div className="bg-white rounded-[30px] relative overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 border border-gray-50 flex flex-col h-full">
      {/* Image Slider at Top */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-inner bg-gray-50">
        {service.photos && service.photos.length > 0 ? (
          service.photos.map((photo, idx) => (
            <Image
              key={idx}
              src={photo}
              alt={`${service.title} ${idx}`}
              fill
              className={`object-cover transition-opacity duration-1000 ${idx === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
            />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        )}
      </div>

      {/* Title & Icon Area */}
      <div className="px-6">
        <div className="flex items-start gap-5 mb-8 mt-6">
          <div className="w-16 h-16 bg-[#f0f7ff] rounded-[20px] flex items-center justify-center shrink-0 transition-all duration-700 group-hover:scale-105 shadow-sm group-hover:shadow-blue-200">
            <svg
              className="w-8 h-8 text-[#0089FF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#0A1A2F] leading-tight tracking-tight group-hover:text-[#0089FF] transition-colors duration-300 break-words break-all pt-1">
            {service.title}
          </h3>
        </div>

      <p className="text-gray-500 text-sm leading-relaxed mb-10 pr-20 font-medium break-words break-all line-clamp-3">
        {service.description.substring(0, 80)}...
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
      </div>
    </div>
  );
};

export default function ServicesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const CATEGORY_LIST = [
    "Residential Solutions",
    "Specialized Solutions",
    "Technical Solutions",
    "Premium Finishes",
  ];

  useEffect(() => {
    const fetchServices = async () => {
      const result = await getAllServicesAction();
      if (result.success) {
        const grouped = CATEGORY_LIST.map((cat) => ({
          name: cat,
          services: result.services.filter((s) => s.category === cat),
        }));
        setCategories(grouped);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#0089FF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <main className="bg-white min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="text-center mb-24 max-w-4xl mx-auto">
          <span className="inline-block px-6 py-2.5 rounded-full bg-[#f0f7ff] text-[#0089FF] text-[12px] font-black uppercase tracking-[0.3em] mb-8">
            Complete Solutions
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-[#0A1A2F] tracking-tighter leading-[0.9] mb-8 uppercase">
            Every Waterproofing <br /> Service You Need
          </h1>
          <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            From specialized injection grouting to premium aesthetic coatings,
            we provide engineering-grade protection for every corner of your
            property across India.
          </p>
        </header>

        <div className="space-y-32">
          {categories.map((cat, idx) => (
            <section key={idx} className="relative">
              <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
                <div>
                  <span className="text-[#0089FF] text-xs font-black tracking-[0.4em] uppercase block mb-3">
                    Category 0{idx + 1}
                  </span>
                  <h2 className="text-4xl font-black text-[#0A1A2F] uppercase tracking-tight">
                    {cat.name}
                  </h2>
                </div>
                <div className="text-right hidden md:block">
                  <span className="text-5xl font-black text-gray-50 block leading-none -mb-2">
                    {cat.services.length.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    Available Services
                  </span>
                </div>
              </div>

              {cat.services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                  {cat.services.map((service, sIdx) => (
                    <ServiceCard key={service._id || sIdx} service={service} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-[48px] py-20 text-center border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                    No services listed in this category yet.
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <section className="mt-32 container mx-auto px-6">
        <div className="bg-[#0A1A2F] rounded-[64px] p-16 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0089FF]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-8 relative z-10">
            Can&apos;t find what <br /> you&apos;re looking for?
          </h3>
          <p className="text-gray-400 text-lg font-medium mb-12 max-w-xl mx-auto relative z-10">
            Our experts can design custom waterproofing solutions for unique
            architectural challenges.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#0089FF] text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[#0A1A2F] transition-all relative z-10 shadow-2xl"
          >
            Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}

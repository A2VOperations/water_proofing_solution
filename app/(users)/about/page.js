"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONTACT_CONFIG } from "@/app/config";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const MILESTONES = [
  {
    year: "2002",
    title: "Founding in Mumbai",
    description:
      "RWPC RAS CARE was established as a specialized terrace leakage consultancy in Mumbai, providing expert guidance on monsoon protection for high-rise residential buildings.",
  },
  {
    year: "2005",
    title: "Pan-India Expansion",
    description:
      "Expanded operations to major Indian metros, specializing in structural waterproofing for large-scale commercial complexes and hospitality projects.",
  },
  {
    year: "2013",
    title: "Nano-Tech Innovation",
    description:
      "Pioneered the use of nano-technology based water repellent coatings, offering superior protection for luxury villas and heritage structures across the country.",
  },
  {
    year: "2018",
    title: "Infrastructure Partnerships",
    description:
      "Collaborated with major infrastructure firms for advanced basement and podium sealing in metro stations and underground transit systems.",
  },
  {
    year: "2022",
    title: "Eco-Friendly Solutions",
    description:
      "Adopted sustainable, heat-reflective waterproofing membranes specifically designed for the tropical Indian climate, reducing energy costs for our clients.",
  },
];

const WORK_STEPS = [
  {
    step: "1",
    title: "Highly skilled team",
    description:
      "Our specialized engineers bring over 20 years of expertise in handling Delhi's extreme weather challenges and structural seepage.",
    image: "/about/icon-01.svg",
  },
  {
    step: "2",
    title: "Positive reputation",
    description:
      "Trusted by thousands of homeowners across Noida and Ghaziabad for delivering long-lasting, leak-free results with a 100% success rate.",
    image: "/about/icon-02.svg",
  },
  {
    step: "3",
    title: "Fast and reliable",
    description:
      "Quick response time and efficient execution. We ensure minimal disruption to your daily life while fixing even the most complex leakages.",
    image: "/about/icon-06.svg",
  },
  {
    step: "4",
    title: "24/7 availability",
    description:
      "Emergency leak detection and structural repair services available across the NCR region, ensuring your home stays protected day and night.",
    image: "/about/icon-03.svg",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "RWPC RAS CARE's terrace waterproofing saved our home from the heavy Mumbai rains. Their team was professional and the results are flawless!",
    name: "Rajesh Kumar",
    title: "HOMEOWNER, MUMBAI",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "We had persistent seepage issues in our office basement for years. RWPC RAS CARE's PU grouting solution fixed it in just two days.",
    name: "Sneha Sharma",
    title: "FACILITY MANAGER, DELHI",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Highly recommend their water tank sealing service. Very clean work and the team followed all safety protocols strictly.",
    name: "Arjun Reddy",
    title: "SOCIETY PRESIDENT, BANGALORE",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
];

export default function About() {
  const formRef = useRef(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [dynamicServices, setDynamicServices] = useState([]);
  const [adminDetails, setAdminDetails] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { getAdminDetailsAction, getAllServicesAction } =
        await import("@/app/actions/admin");
      const [adminResult, servicesResult] = await Promise.all([
        getAdminDetailsAction(),
        getAllServicesAction(),
      ]);

      if (adminResult.success) {
        setAdminDetails(adminResult.admin);
      }
      if (servicesResult.success) {
        setDynamicServices(servicesResult.services.map((s) => s.title));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isQuoteOpen && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [isQuoteOpen]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const number = adminDetails?.numbers?.[0] || CONTACT_CONFIG.whatsapp;

    const cleanNumber = number.replace(/\D/g, "");
    const whatsappMessage = `Hello, I would like to request a quote.\n\nName: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\nMessage: ${form.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(
      `https://wa.me/${cleanNumber}?text=${encodedMessage}`,
      "_blank",
    );
    setIsQuoteOpen(false);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* ── HERO SECTION ── */}
      <section className="relative bg-[#1a1a1a] text-white py-32 px-6 flex flex-col items-center text-center pt-48 pb-32 overflow-hidden">
        <Image
          src="/about/about.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover opacity-40 z-0"
        />
        <div className="relative z-10 flex flex-col items-center w-full">
          <p className="text-[#0088ff] text-[13px] font-bold tracking-[0.1em] uppercase mb-6">
            WATERPROOFING JOURNEY
          </p>
          <h1 className="text-[32px] sm:text-5xl md:text-6xl lg:text-[76px] font-bold uppercase tracking-tight max-w-5xl leading-[1.1] mb-8">
            SHIELDING INDIAN
            <br />
            HOMES FROM SEEPAGE
            <br />
            SINCE 2002
          </h1>
          <p className="text-gray-300 max-w-2xl text-[17px] font-medium leading-relaxed mb-12">
            Expert structural protection and advanced leak detection
            <br className="hidden md:block" /> through an engineering-centered
            approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsQuoteOpen(!isQuoteOpen)}
              className="bg-[#0088ff] hover:bg-[#006fd6] transition-colors text-white text-[13px] font-bold tracking-widest px-8 py-3.5 sm:py-4 uppercase rounded-md"
            >
              GET A FREE QUOTE
            </button>
            <Link
              href="/contact"
              className="bg-white hover:bg-gray-100 transition-colors text-[#1a1a1a] text-[13px] font-bold tracking-widest px-8 py-3.5 sm:py-4 uppercase rounded-md"
            >
              CONTACT US
            </Link>
          </div>

          {/* ── EXPANDABLE QUOTE FORM ── */}
          <div
            ref={formRef}
            className={`w-full max-w-3xl transition-all duration-700 ease-in-out overflow-hidden ${
              isQuoteOpen
                ? "max-h-[1200px] opacity-100 mt-16"
                : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="bg-[#141414] rounded-xl shadow-2xl p-8 md:p-12 border border-white/10 text-left">
              <div className="text-center mb-10">
                <p className="text-[#0088ff] text-sm font-bold tracking-[0.1em] uppercase mb-2">
                  GET A FREE QUOTE
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">
                  GET YOUR WATERPROOFING
                  <br />
                  QUOTE IN NO TIME.
                </h2>
              </div>

              <form
                onSubmit={handleQuoteSubmit}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name*"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    className="bg-[#1a1a1a] rounded-md border border-transparent text-white text-sm px-4 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] focus:bg-[#222] transition-all"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name*"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    className="bg-[#1a1a1a] rounded-md border border-transparent text-white text-sm px-4 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] focus:bg-[#222] transition-all"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email address*"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] rounded-md border border-transparent text-white text-sm px-4 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] focus:bg-[#222] transition-all w-full"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number*"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="bg-[#1a1a1a] rounded-md border border-transparent text-white text-sm px-4 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] focus:bg-[#222] transition-all w-full"
                />

                <div className="relative">
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className={`w-full appearance-none bg-[#1a1a1a] rounded-md border border-transparent text-sm px-4 py-4 outline-none focus:border-[#0088ff] focus:bg-[#222] transition-all cursor-pointer ${form.service ? "text-white" : "text-white/40"}`}
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="" disabled className="text-white/40">
                      Choose a Service*
                    </option>
                    {(dynamicServices.length > 0
                      ? dynamicServices
                      : [
                          "Roof Repair",
                          "Roof Replacement",
                          "Inspection",
                          "Emergency Services",
                        ]
                    ).map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="text-white bg-[#1a1a1a]"
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                <textarea
                  name="message"
                  placeholder="Write a message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-[#1a1a1a] rounded-md border border-transparent text-white text-sm px-4 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] focus:bg-[#222] transition-all resize-none w-full mb-2"
                />

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-[#0088ff] hover:bg-[#0088ffb6] transition-colors text-white text-[13px] font-bold tracking-[0.1em] px-8 py-5 uppercase rounded-md"
                >
                  GET A FREE QUOTE
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── MILESTONES SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-40">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
          {/* Left Sticky Column */}
          <div className="lg:w-1/2 lg:sticky lg:top-32">
            <h2 className="text-[40px] md:text-[46px] lg:text-[52px] mb-10 font-bold uppercase leading-[1.05] tracking-tight text-[#111]">
              SIGNIFICANT
              <br />
              MILESTONES IN OUR
              <br />
              JOURNEY
            </h2>
            <div className="rounded-3xl  w-xs md:w-xl overflow-hidden shadow-2xl relative">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                className="w-full h-[300px] md:h-[500px] aspect-[16/9] lg:aspect-[4/5]"
              >
                {[
                  "/about/office1.webp",
                  "/about/office2.webp",
        
                ].map((src, idx) => (
                  <SwiperSlide key={idx}>
                    <Image
                      src={src}
                      alt={`Milestone phase ${idx + 1}`}
                      width={1920}
                      height={1080}
                      className="w-full h-[300px] md:h-[500px] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Decorative overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Right Scrolling Column */}
          <div className="lg:w-1/2 flex flex-col gap-16 mt-4 lg:mt-0">
            <p className="text-gray-500 text-md md:text-lg font-medium leading-relaxed mb-2">
              Waterproofing technology has evolved rapidly. At RWPC RAS CARE, we lead
              that evolution—adapting, improving, and delivering structural
              protection that matches our clients&apos; needs.
            </p>

            <div className="flex flex-col gap-14">
              {MILESTONES.map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[#0088ff] text-lg md:text-xl font-bold mb-1 sticky top-24 bg-white/80 backdrop-blur-sm z-10 py-1 lg:static lg:bg-transparent lg:py-0">
                    {item.year}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#111] mb-4 tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-md md:text-lg leading-[1.6] font-medium">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left image area */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[540px] aspect-[1/1.1]">
              {/* Main Image Container with Custom Shape */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {/* Left Inverted Curve */}
                <svg
                  className="absolute bottom-[167px] left-0 w-[20px] h-[20px] z-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Fills the bottom-right corner with white, carving out a quarter-circle cutout */}
                  <path d="M20 20 H0 V0 C0 11.046 8.954 20 20 20 Z" />
                </svg>
                <svg
                  className="absolute bottom-0 left-49 w-[20px] h-[20px] z-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Fills the bottom-right corner with white, carving out a quarter-circle cutout */}
                  <path d="M20 20 H0 V0 C0 11.046 8.954 20 20 20 Z" />
                </svg>

                <svg
                  className="absolute top-50 right-0 w-[20px] h-[20px] z-50 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0 Q20 0 20 20 V0 Z" />
                </svg>
                <svg
                  className="absolute top-0 right-15 w-[20px] h-[20px] z-50 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0 Q20 0 20 20 V0 Z" />
                </svg>
                <Image
                  src="/about/About-Img.jpg"
                  alt="Professional worker"
                  fill
                  className="object-cover"
                />
              </div>

              {/* The "Notch" or cutout effect on the right - approximated with a white overlay if needed, 
                  but looking at the image it's more like a staggered layout. 
                  Actually, let's use a simpler but visually identical approach. */}
              <div className="absolute top-0 right-0 w-15 h-50 bg-white rounded-bl-[10px] z-10"></div>

              {/* 25+ years badge */}
              <div className="bg-white absolute bottom-0 left-0 p-3 sm:p-4 rounded-tr-[10px]">
                <div className="bg-[#0088ff] text-white p-4 sm:p-6 rounded-[20px] z-10">
                  <h3 className="text-3xl sm:text-5xl font-black mb-1 flex items-center leading-none">
                    25
                    <span className="text-2xl sm:text-3xl ml-1 text-black">
                      +
                    </span>
                  </h3>
                  <p className="text-[11px] sm:text-[14px] font-bold leading-tight opacity-90">
                    Years as a <br /> Trusted Provider
                  </p>
                </div>
              </div>

              {/* Decorative element to match the "step" on the right if it's a background shape */}
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-48 bg-gray-50 -z-10 rounded-3xl hidden lg:block"></div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="border border-gray-500 rounded-full px-5 py-1.5 w-fit text-[11px] font-extrabold tracking-[0.2em] text-[#031b33] mb-8 uppercase">
              OUR EXPERIENCE
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#031b33] mb-8 leading-[1.1] tracking-tight max-w-xl lg:max-w-none">
              We take care of your structural integrity
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed text-sm font-medium max-w-lg lg:max-w-none">
              We handle leakage protection & maintenance for all your properties
              with expert efficiency. Trust us to ensure your structure stays
              dry & reliably protected. Our services encompass a wide range of
              tasks related to dampness prevention and structural sealing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 md:gap-x-12 mb-12 w-full max-w-lg lg:max-w-none">
              {[
                "Certified Experts",
                "Advanced Technology",
                "Cost-Effective",
                "Warranty Backed",
                "On-Time Completion",
                "Eco-Friendly Materials",
              ].map((text, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center lg:justify-start gap-4"
                >
                  <div className="flex-shrink-0 bg-[#0088ff] text-white rounded-[4px] w-6 h-6 flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="font-bold text-sm text-gray-600">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center lg:justify-start w-full">
              <Link
                href="/work"
                className="relative group flex items-center bg-[#031b33] rounded-full py-4.5 pl-8 pr-16 transition-all duration-300 hover:bg-[#0088ff] shadow-lg hover:shadow-[#0088ff]/30"
              >
                <span className="text-white text-[13px] font-black tracking-widest uppercase">
                  KNOW MORE
                </span>
                <div className="absolute right-1.5 bg-[#0088ff] text-white w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#031b33]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:rotate-45"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORK PROCESS SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col">
            <div className="border border-gray-300 rounded-full px-4 py-1.5 w-fit text-xs font-bold tracking-widest text-[#031b33] mb-6 uppercase">
              WORK PROCESS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#031b33] mb-12 leading-tight">
              We take care of your building&apos;s health
            </h2>
            <div className="relative w-full rounded-3xl overflow-hidden bg-gray-50">
              <Image
                src="/about/building.png"
                width={1920}
                height={1080}
                className="object-cover"
                alt="Work process"
              />
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 self-center">
            {WORK_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="border border-gray-100 shadow-sm rounded-[32px] pt-8 px-8 pb-5 md:pt-10 md:px-10 md:pb-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-transparent bg-white cursor-pointer"
              >
                <div className="flex justify-between items-center mb-10">
                  <div className="bg-[#e8f4ff] p-3 rounded-2xl text-[#0088ff]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex items-start font-black text-[#031b33]">
                    <span className="text-[10px] uppercase tracking-widest mr-1 mt-3">
                      STEP
                    </span>
                    <span className="text-6xl">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#031b33] mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPOINTMENT CTA SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-[#0088ff] rounded-3xl py-8 px-6 md:px-10 md:py-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            {/* Background gear icon */}
            <Image
              src="/about/bg-pattern-01.png"
              alt="Work process"
              width={180}
              height={180}
              className="object-contain absolute -bottom-13 -left-13 z-0"
            />
            <Image
              src="/about/bg-pattern-02.png"
              alt="Work process"
              width={110}
              height={110}
              className="object-contain absolute top-5 right-10 z-0"
            />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-lg mb-6 md:mb-0 relative z-10 leading-[1.2]">
              Looking for a reliable waterproofing service?
            </h2>
            <div className="relative z-10">
              <Link
                href="/contact"
                className="relative group flex items-center bg-white rounded-full py-4 pl-8 pr-16 transition-all duration-300 hover:bg-[#031b33] shadow-lg hover:shadow-black/10"
              >
                <span className="text-black group-hover:text-white text-[13px] font-black tracking-widest uppercase transition-colors duration-300">
                  APPOINTMENT
                </span>
                <div className="absolute right-1.5 bg-[#0088ff] text-white w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#0088ff]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:rotate-45"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          <div className="lg:w-[420px] bg-[#031b33] rounded-3xl p-8 md:p-10 flex flex-col justify-center">
            <div className="flex -space-x-4 mb-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-full border-[3px] border-[#031b33] overflow-hidden relative shadow-md"
                >
                  <Image
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i + 30}.jpg`}
                    fill
                    className="object-cover"
                    alt="Customer"
                  />
                </div>
              ))}
            </div>
            <p className="text-white text-lg font-medium leading-relaxed pr-8">
              Trusted by more than 2,000 satisfied{" "}
              <Link
                href="/work"
                className="text-[#0088ff] hover:underline underline-offset-4 decoration-2"
              >
                customers
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="relative h-[400px] lg:h-auto rounded-[32px] overflow-hidden group">
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="w-full h-full"
            >
              {[
                "/TESTIMONIALS1.jpg",
                "/TESTIMONIALS2.jpg",
              ].map((src, idx) => (
                <SwiperSlide key={idx} className="relative w-full h-full">
                  <Image
                    src={src}
                    fill
                    className="object-cover transition-transform duration-[4000ms] group-hover:scale-110"
                    alt={`Project Gallery ${idx + 1}`}
                  />
                  {/* Subtle overlay for better consistency with the dark theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031b33]/40 to-transparent"></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="bg-[#031b33] rounded-[32px] p-10 md:p-16 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            {/* Background quote mark */}
            <div className="absolute top-10 right-10 text-white/5 font-serif text-[400px] leading-none pointer-events-none select-none">
              &quot;
            </div>

            <div className="relative z-10">
              <div className="border border-white/20 rounded-full px-4 py-1.5 w-fit text-[11px] font-bold tracking-widest text-white mb-8 uppercase">
                TESTIMONIALS
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 leading-tight">
                What our clients
                <br />
                have to say
              </h2>

              <div className="flex gap-1.5 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={
                      star <= TESTIMONIALS[currentTestimonial].rating
                        ? "#f59e0b"
                        : "#4b5563"
                    }
                    className="text-transparent"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>

              <p className="text-white text-lg md:text-xl font-medium leading-[1.8] max-w-lg mb-12 min-h-[140px]">
                &quot;{TESTIMONIALS[currentTestimonial].quote}&quot;
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between mt-auto gap-8 sm:gap-0">
              <div className="flex items-center gap-5 self-start sm:self-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden relative shadow-lg">
                  <Image
                    src={TESTIMONIALS[currentTestimonial].image}
                    fill
                    className="object-cover"
                    alt="Avatar"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[#0088ff] font-bold text-[16px] sm:text-[17px]">
                    {TESTIMONIALS[currentTestimonial].name}
                  </h4>
                  <p className="text-white/70 text-[10px] sm:text-[11px] tracking-widest font-bold uppercase">
                    {TESTIMONIALS[currentTestimonial].title}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-full flex overflow-hidden shadow-lg self-end sm:self-auto">
                <button
                  onClick={prevTestimonial}
                  className="px-4 py-3 sm:px-5 sm:py-4 hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#031b33]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <div className="w-[1px] bg-gray-200"></div>
                <button
                  onClick={nextTestimonial}
                  className="px-5 py-4 hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#031b33]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getAllWorksAction, getAdminDetailsAction } from "@/app/actions/admin";
import Link from "next/link";
import { CONTACT_CONFIG } from "@/app/config.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   PROJECT CARD  – consistent on every breakpoint
   ───────────────────────────────────────────── */
const ProjectCard = ({ work, index, contactNumber }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Auto-cycle images if multiple exist
  useEffect(() => {
    if (work.images && work.images.length > 1) {
      const interval = setInterval(
        () => {
          setCurrentImageIndex((prev) => (prev + 1) % work.images.length);
        },
        3000 + index * 300,
      );
      return () => clearInterval(interval);
    }
  }, [work.images, index]);

  // Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group bg-white rounded-[20px] overflow-hidden border border-gray-100
        shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.13)]
        transition-all duration-500 flex flex-col
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      {/* ── IMAGE ── */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-[20px] shrink-0 bg-gray-100">
        {work.images.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={work.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}

        {/* Date badge – bottom-right, exactly like the screenshot */}
        <div
          className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm
          px-2.5 py-1 rounded-lg shadow-sm border border-gray-100 font-display"
        >
          <span className="text-[10px] font-bold text-[#0088ff] uppercase tracking-wide">
            Project #{index + 1}
          </span>
        </div>

        {/* Image dots – only if multiple */}
        {work.images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {work.images.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === currentImageIndex
                    ? "w-4 h-1.5 bg-[#0088ff]"
                    : "w-1.5 h-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="text-[18px] font-black text-[#111] leading-tight mb-2 line-clamp-2 pt-5 
          group-hover:text-[#0088ff] transition-colors duration-300 font-display"
        >
          {work.title}
        </h3>

        <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed line-clamp-3 flex-1 mb-4 font-sans">
          {work.description}
        </p>

        {/* ── ACTIONS ── */}
        <div className="flex flex-col gap-2.5 mt-auto font-display">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${contactNumber}?text=I'm interested in the project: ${encodeURIComponent(work.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full
              bg-[#25D366] hover:bg-[#20bb5a] active:bg-[#128C7E]
              text-white py-3 rounded-xl text-[14px] font-bold
              transition-all duration-200 shadow-sm shadow-[#25D366]/20"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};


/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */
export default function Work() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactNumber, setContactNumber] = useState(CONTACT_CONFIG.whatsapp);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const workResult = await getAllWorksAction();
      if (workResult.success) setWorks(workResult.works);

      const adminResult = await getAdminDetailsAction();
      if (adminResult.success && adminResult.admin?.numbers?.length > 0) {
        const rawNum = adminResult.admin.numbers[0].replace(/\D/g, "");
        setContactNumber(rawNum);
      }
      setLoading(false);
    }
    fetchData();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (row1Ref.current && row2Ref.current && row3Ref.current) {
        const offset1 = window.innerWidth < 768 ? 50 : 100;
        const offset2 = window.innerWidth < 768 ? 800 : 1500;
        const offset3 = window.innerWidth < 768 ? 150 : 300;
        row1Ref.current.style.transform = `translateX(calc(-${offset1}px - ${scrollY * 0.45}px))`;
        row2Ref.current.style.transform = `translateX(calc(-${offset2}px + ${scrollY * 0.45}px))`;
        row3Ref.current.style.transform = `translateX(calc(-${offset3}px - ${scrollY * 0.45}px))`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allProjectImages = works.flatMap((w) => w.images);
  const row1Images = allProjectImages.filter((_, i) => i % 3 === 0);
  const row2Images = allProjectImages.filter((_, i) => i % 3 === 1);
  const row3Images = allProjectImages.filter((_, i) => i % 3 === 2);


  return (
    <main className="bg-white font-sans text-gray-900 pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-x-hidden">
      {/* ── HEADER ── */}
      <section className="max-w-5xl mx-auto px-6 text-center  mt-4 sm:mt-10 font-display">
        <div className="inline-block border border-gray-200 rounded-full px-4 py-1.5 text-[9px] sm:text-[10px] font-black tracking-[0.2em] text-[#0088ff] mb-4 sm:mb-6 uppercase bg-gray-50/50">
          Portfolio
        </div>
        <h1 className="text-[32px] sm:text-[54px] md:text-[72px] font-black uppercase tracking-tight leading-none mb-6 sm:mb-8 text-[#111]">
          DISCOVER OUR
          <br />
          <span className="text-[#0088ff]">RECENT PROJECTS.</span>
        </h1>
        <p className="text-gray-500 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed font-sans">
          Excellence in every detail. Explore our latest waterproofing solutions
          and specialized repairs across the region.
        </p>
      </section>

      {/* ── TRIPLE SCROLL CAROUSEL ── */}
      {works.length > 0 && (
        <section className="relative w-full pt-16 sm:py-20 flex flex-col gap-6 sm:gap-8 bg-[#f9f9f9] border-y border-gray-100 overflow-hidden ">
          <div className="w-full">
            <div
              ref={row1Ref}
              className="flex gap-4 sm:gap-6 w-max will-change-transform"
            >
              {[...row1Images, ...row1Images, ...row1Images].map((src, i) => (
                <div
                  key={i}
                  className="relative w-[240px] sm:w-[320px] md:w-[420px] aspect-4/3 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-200 bg-white"
                >
                  <Image
                    src={src}
                    alt={`Project ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="bg-[#0088ff] text-white w-[90px] h-[90px] sm:w-[160px] sm:h-[160px] rounded-full flex flex-col items-center justify-center text-center p-3 sm:p-4 shadow-2xl border-[3px] sm:border-4 border-white">
              <span className="font-bold text-[8px] sm:text-[14px] leading-tight tracking-wide uppercase">
                Expertise
                <br />
                Gallery
              </span>
            </div>
          </div>
          <div className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="bg-[#111] text-white w-[90px] h-[90px] sm:w-[160px] sm:h-[160px] rounded-full flex flex-col items-center justify-center text-center p-3 sm:p-4 shadow-2xl border-[3px] sm:border-4 border-white">
              <span className="font-bold text-[8px] sm:text-[14px] leading-tight tracking-wide uppercase">
                Premium
                <br />
                Works
              </span>
            </div>
          </div>
          <div className="w-full">
            <div
              ref={row2Ref}
              className="flex gap-4 sm:gap-6 w-max will-change-transform"
            >
              {[...row2Images, ...row2Images, ...row2Images].map((src, i) => (
                <div
                  key={i}
                  className="relative w-[240px] sm:w-[320px] md:w-[420px] aspect-4/3 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-200 bg-white"
                >
                  <Image
                    src={src}
                    alt={`Project ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <div
              ref={row3Ref}
              className="flex gap-4 sm:gap-6 w-max will-change-transform"
            >
              {[...row3Images, ...row3Images, ...row3Images].map((src, i) => (
                <div
                  key={i}
                  className="relative w-[240px] sm:w-[320px] md:w-[420px] aspect-4/3 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-200 bg-white"
                >
                  <Image
                    src={src}
                    alt={`Project ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STICKY CARD STASH ── */}
      <div className="relative w-full">
        <section className="relative w-full py-16 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* ── HEADER: ARTISTIC STYLE ── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 sm:mb-24 font-display">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-[#0088ff]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0088ff]">
                    WHY CHOOSE US
                  </span>
                </div>
                <h2 className="text-[28px] sm:text-6xl font-black uppercase text-[#111] leading-none tracking-tighter mb-8">
                  Waterproofing <span className="font-serif italic font-normal text-[#0088ff] normal-case tracking-normal">Experts</span>
                </h2>
                <p className="text-gray-500 text-lg sm:text-xl font-medium leading-relaxed max-w-xl font-sans">
                  Our commitment to quality extends beyond the visible surfaces.
                  We pride ourselves on using industry-leading materials and techniques.
                </p>
              </div>

              {/* Stats Block */}
              <div className="flex gap-12 border-t border-gray-100 pt-8 md:border-none md:pt-0">
                <div className="flex flex-col">
                  <h3 className="text-4xl sm:text-5xl font-black text-[#111]">72+</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mt-1">
                    Inspections
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-4xl sm:text-5xl font-black text-[#111]">100%</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mt-1">
                    Satisfaction
                  </p>
                </div>
              </div>
            </div>

            {/* ── BENTO MASONRY GRID ── */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              {/* Col 1 */}
              <div className="flex flex-col gap-3 sm:gap-6">
                <BentoItem 
                  work={works[0]} 
                  className="aspect-square" 
                  placeholder="/home/hero-image.png"
                />
                <BentoItem 
                  work={works[1]} 
                  className="aspect-3/4" 
                  placeholder="/home/hero-image2.png"
                />
              </div>

              {/* Col 2 - The Center Anchor */}
              <div className="flex flex-col gap-3 sm:gap-6">
                <BentoItem 
                  work={works[2]} 
                  className="aspect-3/5 md:aspect-3/6 flex-1" 
                  placeholder="/home/hero-image3.png"
                  featured={true}
                />
                <BentoItem 
                  work={works[5]} 
                  className="aspect-square" 
                  placeholder="/home/hero-image.png"
                />
              </div>

              {/* Col 3 */}
              <div className="col-span-2 md:col-span-1 grid grid-cols-2 md:grid-cols-1">
                <div className="flex flex-col gap-3 sm:gap-6">
                  <BentoItem 
                    work={works[3]} 
                    className="aspect-4/3" 
                    placeholder="/home/hero-image2.png"
                  />
                  <BentoItem 
                    work={works[4]} 
                    className="aspect-square" 
                    placeholder="/home/hero-image3.png"
                  />
                </div>
                <BentoItem 
                  work={works[6]} 
                  className="aspect-square" 
                  placeholder="/home/hero-image.png"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── FEATURED PORTFOLIO GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[#0088ff]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0088ff] font-display">
                Featured Portfolio
              </span>
            </div>
            <h2 className="text-[24px] sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#111] font-display">
              OUR LEGACY <br />
              <span className="text-gray-300">IN MOTION.</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <button className="swiper-prev w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#111] hover:bg-[#0088ff] hover:text-white hover:border-[#0088ff] transition-all cursor-pointer shadow-sm group">
              <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="swiper-next w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#111] hover:bg-[#0088ff] hover:text-white hover:border-[#0088ff] transition-all cursor-pointer shadow-sm group">
              <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {loading ? (
          /* Skeleton */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="rounded-[20px] bg-gray-100 animate-pulse h-[420px]"
              />
            ))}
          </div>
        ) : works.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
            <p className="text-gray-400 font-black uppercase tracking-widest text-sm font-display">
              No projects added yet.
            </p>
          </div>
        ) : (
          <div className="featured-swiper relative">

            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: ".swiper-prev",
                nextEl: ".swiper-next",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              className="pb-16"
            >
              {works.map((work, i) => (
                <SwiperSlide key={work._id}>
                  <ProjectCard
                    work={work}
                    index={i}
                    contactNumber={contactNumber}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <style jsx global>{`
              .featured-swiper .swiper-pagination-bullet-active {
                background: #0088ff;
              }
              @media (max-width: 768px) {
                .swiper-prev, .swiper-next {
                  display: none;
                }
              }
            `}</style>
          </div>
        )}
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 font-display">
        <div className="bg-[#111] rounded-[28px] sm:rounded-[48px] p-10 sm:p-16 md:p-20 text-center relative overflow-hidden">
          <h2 className="text-[26px] sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 relative z-10 leading-[1.1]">
            Have a similar project
            <br />
            in mind?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
            <Link
              href="/contact"
              className="bg-[#0088ff] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#0070d6] hover:-translate-y-1 transition-all shadow-xl shadow-[#0088ff]/20"
            >
              Get A Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────
   BENTO ITEM COMPONENT
   ───────────────────────────────────────────── */
function BentoItem({ work, className, placeholder, featured = false }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const images = work?.images?.length > 0 ? work.images : [placeholder];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setImgIndex((prev) => (prev + 1) % images.length);
      }, 4000 + Math.random() * 2000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  // Entry animation
  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-[24px] bg-gray-100 transition-all duration-700 cursor-pointer group shadow-sm hover:shadow-2xl hover:-translate-y-1 ${className}`}
    >
      {/* Images */}
      {images.map((src, i) => (
        <div 
          key={src + i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === imgIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={src}
            alt={work?.title || "Project"}
            fill
            className={`object-cover transition-all duration-1000 ${isHovered ? 'grayscale-0 scale-105' : 'grayscale'}`}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ))}
      
      {/* Overlay */}
      <div className={`absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8 transition-all duration-500 bg-linear-to-t from-black/90 via-black/20 to-transparent ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-[9px] sm:text-[10px] font-black text-[#D4AF37] tracking-[0.3em] uppercase mb-2 font-display">
          {work?.category || "WATERPROOFING"}
        </p>
        <h4 className="text-xs sm:text-2xl font-serif text-white italic leading-tight font-display">
          {work?.title || "Excellence in Craft"}
        </h4>
        {isHovered && (
          <p className="text-[10px] sm:text-[11px] text-white/70 font-medium mt-3 leading-relaxed line-clamp-2 transition-all duration-700 delay-100 font-sans">
            {work?.description || "Technical precision and durable protection for your structures."}
          </p>
        )}
      </div>
    </div>
  );
}

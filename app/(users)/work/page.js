"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getAllWorksAction, getAdminDetailsAction } from "@/app/actions/admin";
import Link from "next/link";
import { CONTACT_CONFIG } from "@/app/config.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % work.images.length);
      }, 3000 + index * 300);
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
      { threshold: 0.08 }
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
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm
          px-2.5 py-1 rounded-lg shadow-sm border border-gray-100">
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
        <h3 className="text-[18px] font-black text-[#111] leading-tight mb-2 line-clamp-2
          group-hover:text-[#0088ff] transition-colors duration-300">
          {work.title}
        </h3>

        <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed line-clamp-3 flex-1 mb-4">
          {work.description}
        </p>

        {/* ── ACTIONS ── */}
        <div className="flex flex-col gap-2.5 mt-auto">
          {/* Read More */}
          <Link
            href="/contact"
            className="flex items-center justify-between text-[12px] font-black
              uppercase tracking-tight text-[#111] hover:text-[#0088ff]
              transition-colors group/link border-b border-gray-100 pb-2.5"
          >
            Read More
            <svg
              className="transform transition-transform group-hover/link:translate-x-1 shrink-0"
              width="14" height="14" fill="none" stroke="currentColor"
              strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

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
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
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
   MOBILE SWIPE CAROUSEL WRAPPER
   Shows 1 card at a time with touch swipe + dots
   ───────────────────────────────────────────── */
const MobileCarousel = ({ works, contactNumber }) => {
  const [current, setCurrent] = useState(0);
  const startX = useRef(null);

  const prev = () => setCurrent((c) => (c - 1 + works.length) % works.length);
  const next = () => setCurrent((c) => (c + 1) % works.length);

  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    startX.current = null;
  };

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [works.length]);

  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {works.map((work, i) => (
            <div key={work._id} className="min-w-full px-1">
              <ProjectCard work={work} index={i} contactNumber={contactNumber} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-5">
        {works.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === current ? "w-8 bg-[#0088ff]" : "w-2 bg-gray-200"
            }`}
          />
        ))}
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
  const stackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
      if (stackRef.current && window.innerWidth >= 768) {
        const rect = stackRef.current.getBoundingClientRect();
        const scrollableDistance = rect.height - window.innerHeight;
        if (scrollableDistance > 0) {
          const scrolled = -rect.top;
          if (scrolled >= 0 && scrolled <= scrollableDistance) {
            const progress = scrolled / scrollableDistance;
            setActiveIndex(Math.min(3, Math.floor(progress * 4)));
          }
        }
      } else if (stackRef.current && window.innerWidth < 768) {
        const rect = stackRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const progress = 1 - rect.bottom / (rect.height + window.innerHeight);
          setActiveIndex(Math.min(3, Math.floor(progress * 4)));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allProjectImages = works.flatMap((w) => w.images);
  const row1Images = allProjectImages.filter((_, i) => i % 3 === 0);
  const row2Images = allProjectImages.filter((_, i) => i % 3 === 1);
  const row3Images = allProjectImages.filter((_, i) => i % 3 === 2);

  useGSAP(() => {
    if (loading || !stackRef.current || window.innerWidth < 768) return;
    const totalImages = Math.min(4, allProjectImages.length);
    if (totalImages === 0) return;
    gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: "top top",
        end: `+=${totalImages * 100}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          setActiveIndex(Math.min(totalImages - 1, Math.floor(self.progress * totalImages)));
        },
      },
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, { scope: stackRef, dependencies: [loading, allProjectImages.length] });

  return (
    <main className="bg-white font-sans text-gray-900 pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-x-hidden">

      {/* ── HEADER ── */}
      <section className="max-w-5xl mx-auto px-6 text-center mb-16 sm:mb-24 mt-4 sm:mt-10">
        <div className="inline-block border border-gray-200 rounded-full px-4 py-1.5 text-[9px] sm:text-[10px] font-black tracking-[0.2em] text-[#0088ff] mb-4 sm:mb-6 uppercase bg-gray-50/50">
          Portfolio
        </div>
        <h1 className="text-[32px] sm:text-[54px] md:text-[72px] font-black uppercase tracking-tight leading-[1.0] mb-6 sm:mb-8 text-[#111]">
          DISCOVER OUR<br />
          <span className="text-[#0088ff]">RECENT PROJECTS.</span>
        </h1>
        <p className="text-gray-500 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          Excellence in every detail. Explore our latest waterproofing solutions and specialized repairs across the region.
        </p>
      </section>

      {/* ── TRIPLE SCROLL CAROUSEL ── */}
      {works.length > 0 && (
        <section className="relative w-full py-16 sm:py-20 flex flex-col gap-6 sm:gap-8 bg-[#f9f9f9] border-y border-gray-100 overflow-hidden sm:mb-10">
          <div className="w-full">
            <div ref={row1Ref} className="flex gap-4 sm:gap-6 w-max will-change-transform">
              {[...row1Images, ...row1Images, ...row1Images].map((src, i) => (
                <div key={i} className="relative w-[240px] sm:w-[320px] md:w-[420px] aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-200 bg-white">
                  <Image src={src} alt={`Project ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="bg-[#0088ff] text-white w-[90px] h-[90px] sm:w-[160px] sm:h-[160px] rounded-full flex flex-col items-center justify-center text-center p-3 sm:p-4 shadow-2xl border-[3px] sm:border-[4px] border-white">
              <span className="font-bold text-[8px] sm:text-[14px] leading-tight tracking-wide uppercase">Expertise<br />Gallery</span>
            </div>
          </div>
          <div className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="bg-[#111] text-white w-[90px] h-[90px] sm:w-[160px] sm:h-[160px] rounded-full flex flex-col items-center justify-center text-center p-3 sm:p-4 shadow-2xl border-[3px] sm:border-[4px] border-white">
              <span className="font-bold text-[8px] sm:text-[14px] leading-tight tracking-wide uppercase">Premium<br />Works</span>
            </div>
          </div>
          <div className="w-full">
            <div ref={row2Ref} className="flex gap-4 sm:gap-6 w-max will-change-transform">
              {[...row2Images, ...row2Images, ...row2Images].map((src, i) => (
                <div key={i} className="relative w-[240px] sm:w-[320px] md:w-[420px] aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-200 bg-white">
                  <Image src={src} alt={`Project ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <div ref={row3Ref} className="flex gap-4 sm:gap-6 w-max will-change-transform">
              {[...row3Images, ...row3Images, ...row3Images].map((src, i) => (
                <div key={i} className="relative w-[240px] sm:w-[320px] md:w-[420px] aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-200 bg-white">
                  <Image src={src} alt={`Project ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STICKY CARD STASH ── */}
      <div className="relative w-full">
        <section ref={stackRef} className="relative w-full h-auto md:h-screen mb-10 sm:mb-20">
          <div className="w-full h-full flex items-center bg-white overflow-hidden pt-10 sm:pt-0">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 sm:gap-16 py-10 items-center w-full">
              <div className="flex flex-col gap-4 sm:gap-6 relative z-10 text-center md:text-left items-center md:items-start">
                <div className="border border-gray-300 rounded-full px-4 py-1.5 w-fit text-[10px] sm:text-xs font-bold tracking-widest text-[#0088ff] mb-2 uppercase">
                  WHY CHOOSE US
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#111] leading-tight">
                  EXCELLENCE IN EVERY DETAIL
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
                  Our commitment to quality extends beyond the visible surfaces. We pride ourselves on using industry-leading materials and techniques.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 border-l-4 border-[#0088ff] pl-4">
                    <h3 className="text-3xl font-black text-[#111]">{works.length * 12}+</h3>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Successful Inspections</p>
                  </div>
                  <div className="flex flex-col gap-2 border-l-4 border-[#0088ff] pl-4">
                    <h3 className="text-3xl font-black text-[#111]">100%</h3>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Satisfaction</p>
                  </div>
                </div>
              </div>
              <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-video rounded-[24px] sm:rounded-[40px] overflow-hidden shadow-2xl bg-gray-100 border border-gray-200">
                {allProjectImages.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 transition-all duration-700 ease-out origin-bottom"
                    style={{
                      transform: activeIndex >= i ? "translateY(0) scale(1)" : "translateY(100%) scale(0.95)",
                      opacity: activeIndex >= i ? 1 : 0,
                      zIndex: i,
                    }}
                  >
                    <Image src={img} alt={`Excellence ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── FEATURED PORTFOLIO GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        {/* Section header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-[#0088ff]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0088ff]">
              Featured Portfolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#111]">
            OUR LEGACY <br />
            <span className="text-gray-300">IN MOTION.</span>
          </h2>
        </div>

        {loading ? (
          /* Skeleton */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-[20px] bg-gray-100 animate-pulse h-[420px]" />
            ))}
          </div>
        ) : works.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
            <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No projects added yet.</p>
          </div>
        ) : (
          <>
            {/* ── MOBILE: swipe carousel (1 card) ── */}
            <div className="block md:hidden">
              <MobileCarousel works={works} contactNumber={contactNumber} />
            </div>

            {/* ── TABLET: 2-column grid ── */}
            {/* ── DESKTOP: 3-column grid ── */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {works.map((work, i) => (
                <ProjectCard key={work._id} work={work} index={i} contactNumber={contactNumber} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="bg-[#111] rounded-[28px] sm:rounded-[48px] p-10 sm:p-16 md:p-20 text-center relative overflow-hidden">
          <h2 className="text-[26px] sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 relative z-10 leading-[1.1]">
            Have a similar project<br />in mind?
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
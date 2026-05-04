"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getAllWorksAction } from "@/app/actions/admin";
import Link from "next/link";

const WorkCard = ({ work, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (work.images && work.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % work.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [work.images]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => setShowInfo(!showInfo)}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
      className={`group relative aspect-[4/5] rounded-[32px] overflow-hidden bg-gray-100 shadow-sm transition-all duration-700 transform cursor-pointer select-none ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {work.images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
      <div className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col justify-end p-10 text-white transition-all duration-500 ${
        showInfo ? "opacity-100" : "opacity-0"
      }`}>
        <div className={`transform transition-transform duration-500 delay-100 ${
          showInfo ? "translate-y-0" : "translate-y-10"
        }`}>
          <div className="w-12 h-1 bg-[#0088ff] mb-6 rounded-full"></div>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3 break-words break-all overflow-hidden">
            {work.title}
          </h3>
          <p className={`text-sm sm:text-base text-gray-200 font-medium leading-relaxed transition-opacity duration-500 delay-200 break-words break-all line-clamp-3 ${
            showInfo ? "opacity-100" : "opacity-0"
          }`}>
            {work.description}
          </p>
        </div>
      </div>
      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest opacity-90 z-20">
        Project #{index + 1}
      </div>
    </div>
  );
};

export default function Work() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const stackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchWorks() {
      const result = await getAllWorksAction();
      if (result.success) {
        setWorks(result.works);
      }
      setLoading(false);
    }
    fetchWorks();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (row1Ref.current && row2Ref.current) {
        const offset1 = window.innerWidth < 768 ? 50 : 100;
        const offset2 = window.innerWidth < 768 ? 800 : 1500;
        row1Ref.current.style.transform = `translateX(calc(-${offset1}px - ${scrollY * 0.45}px))`;
        row2Ref.current.style.transform = `translateX(calc(-${offset2}px + ${scrollY * 0.45}px))`;
      }
      if (stackRef.current && window.innerWidth >= 768) {
        const rect = stackRef.current.getBoundingClientRect();
        const scrollableDistance = rect.height - window.innerHeight;
        if (scrollableDistance > 0) {
          const scrolled = -rect.top;
          if (scrolled >= 0 && scrolled <= scrollableDistance) {
            const progress = scrolled / scrollableDistance;
            const index = Math.min(3, Math.floor(progress * 4));
            setActiveIndex(index);
          }
        }
      } else if (stackRef.current && window.innerWidth < 768) {
        // Simple scroll-into-view logic for mobile if needed, 
        // but for now we just show the first few images or cycle them
        const rect = stackRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const progress = 1 - (rect.bottom / (rect.height + window.innerHeight));
          const index = Math.min(3, Math.floor(progress * 4));
          setActiveIndex(index);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Collect all project images for the carousel
  const allProjectImages = works.flatMap(w => w.images);
  const row1Images = allProjectImages.filter((_, i) => i % 2 === 0);
  const row2Images = allProjectImages.filter((_, i) => i % 2 !== 0);

  return (
    <main className=" bg-white font-sans text-gray-900 pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-x-hidden">
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

      {/* ── PROJECTS GRID ── */}
      <section className="max-w-7xl mx-auto px-6 mb-15">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-[32px] bg-gray-50 animate-pulse"></div>
            ))}
          </div>
        ) : works.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
            <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No projects added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {works.map((work, i) => (
              <WorkCard key={work._id} work={work} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ── RESTORED DUAL CAROUSEL SECTION ── */}
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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="bg-[#0088ff] text-white w-[110px] h-[110px] sm:w-[200px] sm:h-[200px] rounded-full flex flex-col items-center justify-center text-center p-3 sm:p-4 shadow-2xl border-[4px] sm:border-[6px] border-white">
              <span className="font-bold text-[9px] sm:text-[17px] leading-tight tracking-wide uppercase">
                Showcasing our<br/>Gallery
              </span>
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
        </section>
      )}

      {/* ── RESTORED STICKY CARD STASH SECTION ── */}
      <section ref={stackRef} className="relative w-full mb-10 sm:mb-20">
        <div className="md:sticky top-0 w-full flex items-center bg-white overflow-hidden pt-10 sm:pt-0">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 sm:gap-16 py-10 items-center w-full">
            <div className="flex flex-col gap-4 sm:gap-6 relative z-10 text-center md:text-left items-center md:items-start">
              <div className="border border-gray-300 rounded-full px-4 py-1.5 w-fit text-[10px] sm:text-xs font-bold tracking-widest text-[#0088ff] mb-2 uppercase">
                WHY CHOOSE US
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#111] leading-tight">
                EXCELLENCE IN EVERY DETAIL
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
                Our commitment to quality extends beyond the visible surfaces. We pride ourselves on using industry-leading materials and techniques to ensure your projects stand the test of time.
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
                    transform: activeIndex >= i ? 'translateY(0) scale(1)' : 'translateY(100%) scale(0.95)',
                    opacity: activeIndex >= i ? 1 : 0,
                    zIndex: i
                  }}
                >
                  <Image src={img} alt={`Excellence ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <div className="bg-[#111] rounded-[32px] sm:rounded-[48px] p-10 sm:p-16 md:p-20 text-center relative overflow-hidden group">
          <h2 className="text-[26px] sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 relative z-10 leading-[1.1]">
            Have a similar project<br />in mind?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
            <Link href="/contact" className="bg-[#0088ff] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#0070d6] hover:-translate-y-1 transition-all shadow-xl shadow-[#0088ff]/20">
              Get A Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
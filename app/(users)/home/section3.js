"use client";

import { useState } from "react";
import Image from "next/image";

const section3 = () => {
  const TESTIMONIALS = [
    {
      quote:
        "I would recommend practitioners at this center to everyone! They are great to work with and are excellent trainers. Thank you all!",
      name: "Arnold Wilson",
      title: "CLIENT, USA",
      rating: 3,
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      mainImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80"
    },
    {
      quote:
        "The service provided was absolutely phenomenal. I have never seen such dedication and attention to detail. Highly recommended!",
      name: "Sarah Jenkins",
      title: "HOMEOWNER, UK",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      mainImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
    },
    {
      quote:
        "Fast, reliable, and reasonably priced. The team was very professional and cleaned up after themselves. Five stars!",
      name: "David Chen",
      title: "BUSINESS OWNER, CA",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      mainImage: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80"
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1,
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1,
    );
  };
  return (
    <div>
      {" "}
      {/* ── TESTIMONIALS SECTION ── */}
      <section className="max-w-[1800px] mx-auto px-6 pb-20 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          <div className="relative h-[400px] lg:h-auto rounded-[32px] overflow-hidden order-2 lg:order-1 shadow-2xl">
            <Image
              src={TESTIMONIALS[currentTestimonial].mainImage}
              fill
              className="object-cover transition-all duration-700"
              alt="Testimonial Focus"
              key={currentTestimonial}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          <div className="bg-[#031b33] rounded-[32px] p-6 sm:p-12 md:p-16 relative overflow-hidden flex flex-col justify-between min-h-[500px] lg:min-h-[550px] order-1 lg:order-2 text-center lg:text-left items-center lg:items-start">
            {/* Background quote mark */}
            <div className="absolute top-10 right-10 text-white/5 font-serif text-[300px] sm:text-[400px] leading-none pointer-events-none select-none">
              &quot;
            </div>

            <div className="relative z-10 w-full flex flex-col items-center lg:items-start">
              <div className="border border-white/20 rounded-full px-4 py-1.5 w-fit text-[10px] sm:text-[11px] font-bold tracking-widest text-white mb-6 sm:mb-8 uppercase">
                TESTIMONIALS
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-10 leading-tight">
                What our client&apos;s
                <br />
                have to say
              </h2>

              <div className="flex gap-1.5 mb-6 sm:mb-8 justify-center lg:justify-start">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={star <= TESTIMONIALS[currentTestimonial].rating ? "#f59e0b" : "#4b5563"}
                    className="text-transparent"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>

              <p className="text-white text-base sm:text-lg md:text-xl font-medium leading-[1.6] sm:leading-[1.8] max-w-lg mb-8 sm:mb-12 min-h-[120px] sm:min-h-[140px]">
                &quot;{TESTIMONIALS[currentTestimonial].quote}&quot;
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between mt-auto w-full gap-8">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden relative shadow-lg ring-4 ring-white/10">
                  <Image
                    src={TESTIMONIALS[currentTestimonial].image}
                    fill
                    className="object-cover"
                    alt="Avatar"
                  />
                </div>
                <div className="flex flex-col gap-0.5 sm:gap-1 text-left">
                  <h4 className="text-[#0088ff] font-bold text-[16px] sm:text-[17px]">
                    {TESTIMONIALS[currentTestimonial].name}
                  </h4>
                  <p className="text-white/70 text-[10px] sm:text-[11px] tracking-widest font-bold uppercase">
                    {TESTIMONIALS[currentTestimonial].title}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#031b33] transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full bg-[#0088ff] flex items-center justify-center text-white hover:bg-[#0070d6] transition-all duration-300 shadow-lg shadow-[#0088ff]/20"
                  aria-label="Next testimonial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default section3;

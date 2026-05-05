"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_CONFIG } from "@/app/config";
import { getAllServicesAction, getAdminDetailsAction } from "@/app/actions/admin";

/**
 * IsHeroProduct Component
 *
 * Specifically filters and displays services marked as 'isHeroProduct' (where isHeroProduct === "yes").
 */
const IsHeroProduct = ({
  title = "Our Hero Products",
  subtitle = "The most advanced and trusted waterproofing systems in our portfolio.",
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState(CONTACT_CONFIG.whatsapp);

  useEffect(() => {
    const fetchAdmin = async () => {
      const result = await getAdminDetailsAction();
      if (result.success && result.admin?.numbers?.length > 0) {
        setWhatsappNumber(result.admin.numbers[0].replace(/\D/g, ""));
      }
    };
    fetchAdmin();

    const fetchHeroServices = async () => {
      setLoading(true);
      try {
        const result = await getAllServicesAction();
        if (result.success) {
          // Filter by isHeroProduct === "yes"
          const filtered = result.services
            .filter((s) => s.isHeroProduct === "yes")
            .map((s) => ({
              title: s.title,
              description: s.description,
              image: s.photos && s.photos.length > 0 ? s.photos[0] : null,
              link: `/services/${s.slug}`,
              date: new Date(s.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
              category: s.category,
            }));
          setItems(filtered);
        }
      } catch (error) {
        console.error("Error fetching hero services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroServices();
  }, []);

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20">
      <div className="flex flex-col items-center mb-16 text-center">
        <p className="text-blue-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">
          FEATURED SELECTION
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">
          {title}
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          {subtitle}
        </p>
        <Link
          href={"/services"}
          className="group relative inline-flex h-12 w-fit overflow-hidden rounded-full bg-blue-500 px-6 py-3 mt-5 font-bold text-white shadow-[0_0_20px_rgba(148,163,184,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-400/50"
        >
          {/* Illuminate Glow */}
          <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></span>

          {/* Button Text */}
          <span className="relative flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
            View More
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items && items.length > 0 ? (
            items.map((item, index) => {
              const whatsappMessage = encodeURIComponent(
                `Hello! I'm interested in your hero product "${item.title}". Could you please provide more details?`,
              );
              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

              return (
                <div
                  key={index}
                  className="flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] group"
                >
                  {/* Image Section */}
                  <div className="relative h-54 rounded-xl overflow-hidden">
                    <Image
                      src={item.image || "/api/placeholder/400/320"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      width={400}
                      height={320}
                    />

                    {/* Corner Inverted Curves for Date Badge */}
                    <svg
                      className="absolute bottom-0 right-[40.7%] w-[20px] h-[20px] text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 20 H20 V0 C20 11.046 11.046 20 0 20 Z" />
                    </svg>
                    <svg
                      className="absolute bottom-0 right-2 w-[20px] h-[20px] text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 20 H0 V0 C0 11.046 8.954 20 20 20 Z" />
                    </svg>

                    {/* Date Badge */}
                    <div className="absolute bottom-0 right-7 bg-white px-4 py-2 rounded-t-2xl shadow-lg">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 pt-4 flex flex-col grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-auto flex flex-col gap-3">
                      <Link
                        href={item.link || "#"}
                        className="flex items-center justify-between group/btn text-sm font-bold text-gray-900 py-2 border-b border-gray-100 hover:text-blue-600 hover:border-blue-200 transition-all"
                      >
                        Read More
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-300 group-hover/btn:translate-x-1"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 px-4 rounded-2xl font-bold text-xs hover:bg-[#1ebe57] transition-all shadow-md hover:shadow-lg"
                      >
                        <svg
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 32 32"
                        >
                          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.474 2.027 7.774L0 32l8.454-2.01A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.771-1.854l-.485-.288-5.018 1.194 1.216-4.9-.317-.503A13.272 13.272 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.355-1.162-2.72-1.295-.366-.133-.632-.199-.898.2-.266.398-1.031 1.295-1.264 1.561-.232.266-.465.299-.863.1-.398-.2-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.361-2.214-2.759-.232-.398-.025-.613.175-.811.18-.178.398-.465.598-.698.2-.232.266-.398.398-.664.133-.266.067-.499-.033-.698-.1-.2-.898-2.163-1.23-2.962-.324-.778-.653-.673-.898-.685l-.765-.013c-.266 0-.698.1-1.064.499-.366.398-1.396 1.364-1.396 3.327 0 1.963 1.43 3.86 1.629 4.126.2.266 2.815 4.298 6.82 6.028.954.412 1.698.658 2.278.843.957.305 1.828.262 2.517.159.767-.115 2.355-.962 2.688-1.891.332-.93.332-1.727.232-1.892-.1-.165-.365-.265-.763-.464z" />
                        </svg>
                        Enquire on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                No hero products found.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default IsHeroProduct;

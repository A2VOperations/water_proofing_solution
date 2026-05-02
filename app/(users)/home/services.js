import React from "react";
import Image from "next/image";

const Services = () => {
  const services = [
    {
      title: "Remodeling Service",
      description:
        "General plumbing includes piping, toilet installation & washers.",
      Image: "/home/services-1.png",
    },
    {
      title: "Basement Plumbing",
      description:
        "General plumbing includes piping, toilet installation & washers.",
      Image: "/home/services-2.png",
    },
    {
      title: "Installation & Replace",
      description:
        "General plumbing includes piping, toilet installation & washers.",
      Image: "/home/services-3.png",
    },
    {
      title: "Water Line Repair",
      description:
        "General plumbing includes piping, toilet installation & washers.",
      Image: "/home/services-4.png",
    },
    {
      title: "Gas Line Services",
      description:
        "General plumbing includes piping, toilet installation & washers.",
      Image: "/home/services-5.png",
    },
    {
      title: "Kitchen Plumbing",
      description:
        "General plumbing includes piping, toilet installation & washers.",
      Image: "/home/services-6.png",
    },
  ];

  return (
    <section className="bg-[#f0f4f8] py-24 px-6 md:px-12  max-w-[90%] mx-auto">
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
            key={index}
            className="bg-white p-10 rounded-[48px] relative overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 border border-gray-50"
          >
            {/* Image & Title */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 bg-[#f0f7ff] rounded-[24px] flex items-center justify-center transition-all duration-700 group-hover:scale-105 shadow-sm group-hover:shadow-blue-200">
                <div className="transition-colors duration-500 group-hover:text-white">
                  <Image
                    src={service.Image}
                    alt={service.title}
                    width={100}
                    height={100}
                    className={`w-11 h-11 transition-colors duration-500`}
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0A1A2F] leading-tight tracking-tight group-hover:text-[#0089FF] transition-colors duration-300">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-base leading-relaxed mb-16 max-w-[90%] font-medium">
              {service.description}
            </p>

            {/* Left Inverted Curve */}
            <svg
              className="absolute bottom-0 right-9 w-[25px] h-[25px] text-[#e9ecf0] z-99999"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fills the bottom-right corner with white, carving out a quarter-circle cutout */}
              <path d="M20 20 H0 V0 C0 11.046 8.954 20 20 20 Z" />
            </svg>
            <svg
              className="absolute bottom-0 right-35 - w-[25px] h-[25px] text-[#e9ecf0]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fills the bottom-left corner with white, carving out a quarter-circle cutout */}
              <path d="M0 20 H20 V0 C20 11.046 11.046 20 0 20 Z" />
            </svg>

            {/* Button Pocket */}
            <div className="absolute bottom-0 right-[60px] w-20 h-20 bg-[#eef1f5] z-10 flex items-center justify-center rounded-t-full">
              <button className="bg-[#041F38] hover:bg-[#0089FF] w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 hover:scale-110 group/btn">
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
              </button>
            </div>

            {/* Subtle background glow on hover */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

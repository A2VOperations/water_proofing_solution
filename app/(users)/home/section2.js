import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getAdminDetailsAction } from "@/app/actions/admin";

const Section2 = () => {
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

  const handleWhatsAppRedirect = (e) => {
    if (e) e.preventDefault();
    const number = adminDetails?.numbers?.[0] || "911234567890";
    const cleanNumber = number.replace(/\D/g, "");
    const message = "Hello, I saw the summer offer and I'm interested in booking a service. Please provide more details.";
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const checklistItems = [
    { text: "Certified Expert Handyman", iconColor: "bg-blue-600" },
    { text: "55+ Expert Handyman", iconColor: "bg-blue-600" },
    { text: "Trusted By thousands Clients", iconColor: "bg-blue-600" },
    { text: "Modern Equipment Use", iconColor: "bg-blue-600" },
  ];

  return (
    <section className="max-w-[1400px] py-15 mx-auto px-6 overflow-hidden bg-white">
      {/* Top Content: Header & Description */}
      <div className="flex flex-col lg:flex-row justify-between gap-12 mb-10">
        <div className="lg:w-1/2">
          <div className="mb-6">
            <span className="px-5 py-2 rounded-full border border-[#041f38] text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#041f38] ">
              Our Experience
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A1A2F] leading-[1.1] tracking-tight">
            We take care of your every <br className="hidden md:block" />{" "}
            appliances
          </h2>
        </div>

        <div className="">
          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl">
            We handle repairs & maintenance for all your appliances with expert
            efficiency. Trust us to ensure your appliances function perfectly &
            reliably. Our plumbing service encompass a wide range of tasks
            related to the installation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
            {checklistItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div className="w-6 h-6 bg-[#008cf0] rounded-md flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-blue-600/20">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-base text-gray-500 tracking-tight">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Visuals & Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Handyman Showcase */}
        <div className="lg:col-span-9 relative group rounded-[48px] overflow-hidden shadow-2xl shadow-blue-900/10 h-[450px]">
          <Image
            src="/handyman_working_under_sink.png"
            alt="Professional Handyman at Work"
            width={1300}
            height={900}
            className="object-cover transition-all duration-1000 group-hover:scale-110 h-[450px]"
            priority
          />
          {/* Watch Video Floating Button */}
          <div className="absolute bottom-10 left-10">
            <button className="flex items-center gap-5 bg-white hover:bg-gray-50 py-4 px-8 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-2 active:scale-95 group/btn">
              <div className="w-12 h-12 bg-[#0A1A2F] rounded-full flex items-center justify-center text-white shadow-xl transition-transform group-hover/btn:rotate-12">
                <svg className="w-5 h-5 ml-1 fill-current" viewBox="0 0 24 24">
                  <path d="M7 6v12l10-6z" />
                </svg>
              </div>
              <span className="font-extrabold text-[#0A1A2F] text-sm uppercase tracking-widest">
                Watch Video
              </span>
            </button>
          </div>
        </div>

        {/* Right Stack: Cards */}
        <div className="lg:col-span-3 flex flex-col gap-8 h-full">
          {/* Trustpilot Card */}
          <div className="bg-[#e9eef2] p-10 rounded-[48px] relative overflow-hidden border border-gray-100">
            <div className="relative flex justify-between items-center z-10">
              <div className="flex flex-col justify-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-[#FFB400] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400 text-sm font-semibold">
                  Based on{" "}
                  <span className="text-[#0A1A2F] font-black">
                    645 <br /> reviews
                  </span>
                </p>
              </div>

              <Image
                src="/home/6700d08182b529a2e070bf18_icon-six-img.png"
                alt="Trustpilot"
                width={150}
                height={150}
              />
            </div>
          </div>

          {/* Offer Card */}
          <div className="bg-[#0089FF] p-10 rounded-[40px] flex flex-col justify-between h-[320px] relative overflow-hidden group/offer transition-all hover:bg-[#0076FF]">
            {/* Background Decorative Badge */}
            <div className="absolute -top-10 -right-10 opacity-10 group-hover/offer:scale-125 group-hover/offer:-rotate-12 transition-transform duration-700">
              <svg
                className="w-64 h-64 text-white fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l2.35 3.33L18.3 4l.32 4.07 3.93 1.05-2.01 3.55 2.01 3.55-3.93 1.05-.32 4.07-3.95-1.33L12 22l-2.35-3.33-3.95 1.33-.32-4.07-3.93-1.05 2.01-3.55-2.01-3.55 3.93-1.05.32-4.07 3.95 1.33L12 2z" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Top Left Badge Icon */}
              <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center mb-10 shadow-lg rotate-[-5deg]">
                <svg
                  className="w-12 h-12 text-[#0089FF]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l2.35 3.33L18.3 4l.32 4.07 3.93 1.05-2.01 3.55 2.01 3.55-3.93 1.05-.32 4.07-3.95-1.33L12 22l-2.35-3.33-3.95 1.33-.32-4.07-3.93-1.05 2.01-3.55-2.01-3.55 3.93-1.05.32-4.07 3.95 1.33L12 2z" />
                  <text
                    x="50%"
                    y="62%"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#0089FF"
                    fontWeight="bold"
                    className="font-sans"
                  >
                    %
                  </text>
                </svg>
              </div>
              <h3 className="text-xl text-white leading-tight font-bold pr-10">
                Summer offer{" "}
                <span className="font-normal opacity-90">
                  – New clients save $100 on all hourly services.
                </span>
              </h3>
            </div>

            <div
              className="
  absolute 
  -right-[1px] 
  bottom-[29.6%] 
  w-[50px] 
  h-[50px] 
  rounded-br-[50px] 
  bg-transparent
  [box-shadow:8px_8px_0_8px_white]
"
            />
            <div
              className="
  absolute 
  bottom-0 
  right-[29%] 
  w-[50px] 
  h-[50px] 
  rounded-br-[50px] 
  bg-transparent
  [box-shadow:8px_8px_0_8px_white]
"
            />

            {/* Bottom Right Notch & Circle Button */}
            <div className="absolute bottom-0 right-0 translate-x-[1px] translate-y-[1px]">
              {/* The "Notch" background - white circle that cuts out the blue */}
              <div className="w-24 h-24 bg-white rounded-tl-[50px] flex items-center justify-center">
                {/* The Dark Circle Button */}
                <button 
                  onClick={handleWhatsAppRedirect}
                  className="bg-[#041F38] hover:bg-black w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 group/arrow mt-4 ml-4"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;

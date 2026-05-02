"use client";

import React from 'react';

const PricingSection = () => {
  const plans = [
    {
      name: "BASIC PLAN",
      price: "399",
      features: [
        "Custom schedules everyday.",
        "Desks workstations cleaning.",
        "Washrooms cleaning.",
        "Floor cleaning.",
        "Waiting area cleaning."
      ],
      active: false
    },
    {
      name: "STANDARD PLAN",
      price: "450",
      features: [
        "Custom schedules everyday.",
        "Desks workstations cleaning.",
        "Washrooms cleaning.",
        "Floor cleaning.",
        "Waiting area cleaning."
      ],
      active: true
    },
    {
      name: "EXCLUSIVE PLAN",
      price: "600",
      features: [
        "Custom schedules everyday.",
        "Desks workstations cleaning.",
        "Washrooms cleaning.",
        "Floor cleaning.",
        "Waiting area cleaning."
      ],
      active: false
    }
  ];

  return (
    <section className="py-20 px-5 bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-1.5 border border-[#0B2238] rounded-full text-xs font-semibold tracking-wider text-[#0B2238] mb-5">
            PRICING OPTIONS
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B2238] leading-tight max-w-lg mx-auto">
            Best Pricing For Cost Saving
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`group relative pr-4 transition-transform duration-300 hover:-translate-y-2.5 ${plan.active ? 'z-10' : 'z-0'}`}
            >
              {/* Dark shape behind card */}
              <div className="absolute inset-0 left-8 bg-[#0B2238] rounded-[20px] z-0"></div>
              
              {/* White card content */}
              <div className="relative bg-white rounded-[20px] rounded-br-none p-10 shadow-lg z-20 h-full flex flex-col mr-4">
                <div className="mb-8">
                  <span className="block text-[#0088FF] font-bold text-sm tracking-wide mb-5">
                    {plan.name}
                  </span>
                  <div className="flex items-baseline text-[#0B2238]">
                    <span className="text-2xl font-bold self-start mt-1.5 mr-0.5">$</span>
                    <span className="text-6xl font-extrabold leading-none">{plan.price}</span>
                    <span className="text-sm text-gray-500 ml-2">/ per month</span>
                  </div>
                </div>

                <div className="h-px bg-gray-200 w-4/5 mb-8"></div>

                <ul className="space-y-5 mb-10 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start text-[#0B2238] text-[15px] leading-relaxed">
                      <span className="mr-3 mt-1 flex-shrink-0 text-[#0B2238]">
                        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5.5L4.66667 9.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <button className="flex items-center bg-[#0B2238] text-white font-bold text-xs py-1.5 pl-6 pr-1.5 rounded-full transition-all duration-300 hover:bg-[#162E44] hover:scale-105">
                    <span className="mr-4 tracking-wide uppercase">PURCHASE</span>
                    <span className="w-10 h-10 bg-[#0088FF] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 15L15 1M15 1H4M15 1V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {/* Blue accent strip on the right */}
              <div className="absolute top-0 right-0 bottom-0 w-10 bg-[#0088FF] rounded-r-[20px] z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

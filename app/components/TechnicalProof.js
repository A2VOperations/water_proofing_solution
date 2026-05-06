"use client";

const TOOLS = [
  {
    title: "Thermal Imaging",
    desc: "Infrared diagnostics to locate hidden leaks without breaking walls.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20M12 2v20M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    )
  },
  {
    title: "Moisture Meters",
    desc: "Precision sensors to measure substrate humidity levels accurately.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2" ry="2" />
        <path d="M12 18h.01M9 6h6" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    title: "Digital Inclinometers",
    desc: "Ensuring proper slope and drainage on terrace surfaces.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M12 12l7-7M5 19l7-7" />
      </svg>
    )
  }
];

export default function TechnicalProof() {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-10">
          <div>
            <p className="text-[#0088ff] text-sm font-bold tracking-[0.3em] uppercase mb-4">THE SCIENCE OF SEALING</p>
            <h2 className="text-[40px] md:text-[56px] font-black text-[#111] uppercase leading-tight tracking-tight mb-8">
              LAYERS OF<br/>PROTECTION
            </h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              We don&apos;t just paint surfaces; we engineer multi-layer protection systems. Each layer serves a specific structural purpose to ensure a 100% watertight result.
            </p>
            
            <div className="space-y-6">
              {[
                { step: "01", title: "Substrate Preparation", desc: "Mechanical grinding and cleaning for maximum bond." },
                { step: "02", title: "Primer Application", desc: "Deep penetrating sealer to stabilize the surface." },
                { step: "03", title: "Liquid Membrane", desc: "Highly elastic, seamless waterproofing barrier." },
                { step: "04", title: "UV Topcoat", desc: "Weather-resistant finish for long-term durability." }
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <span className="text-[#0088ff] font-black text-2xl opacity-20">{item.step}</span>
                  <div>
                    <h4 className="font-bold text-[#111] uppercase tracking-tight">{item.title}</h4>
                    <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100">
              <img 
                src="/assets/industry/layers_diagram.png" 
                alt="Waterproofing Layers Diagram"
                className="w-full h-auto rounded-2xl"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#0088ff]/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TOOLS.map((tool) => (
            <div key={tool.title} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#e8f4ff] rounded-2xl flex items-center justify-center text-[#0088ff] mb-8 group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-[#111] uppercase tracking-tight mb-3">{tool.title}</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Action Shots */}
        <div className="mt-15 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group overflow-hidden rounded-[32px] h-[400px]">
            <img src="/home/card1.webp" alt="Moisture Audit" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-10">
              <div>
                <span className="bg-[#0088ff] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">ON-SITE AUDIT</span>
                <h4 className="text-white text-2xl font-bold uppercase">Precision Moisture Testing</h4>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-[32px] h-[400px]">
            <img src="/home/cards3.webp" alt="Membrane Application" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-10">
              <div>
                <span className="bg-[#0088ff] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">APPLICATION</span>
                <h4 className="text-white text-2xl font-bold uppercase">Liquid Membrane Installation</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

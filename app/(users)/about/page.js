"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MILESTONES = [
  {
    year: "2002",
    title: "Company Founded",
    description: "Rooflet was established as a small roofing consultancy, supporting property owners and contractors with expert guidance on roofing materials and project planning."
  },
  {
    year: "2005",
    title: "First Major Expansion",
    description: "Rooflet expanded into full-service commercial roofing, taking on large-scale installations and specialized projects involving complex structures and heavy roofing materials."
  },
  {
    year: "2013",
    title: "Milestone in Growth",
    description: "Rooflet was established as a small roofing consultancy, supporting property owners and contractors with expert guidance on roofing materials and project planning."
  },
  {
    year: "2018",
    title: "Optimizing Materials & Installation",
    description: "Rooflet was established as a small roofing consultancy, supporting property owners and contractors with expert guidance on roofing materials and project planning."
  },
  {
    year: "2022",
    title: "Advancing Roofing for Industry Leaders",
    description: "Rooflet was established as a small roofing consultancy, supporting property owners and contractors with expert guidance on roofing materials and project planning."
  }
];

const WORK_STEPS = [
  {
    step: "1",
    title: "Highly skilled team",
    description: "Proin et convallis tincidunt tincidunt Viverra ut ullamcorp faucibus dictum Integer in egestas volutpat."
  },
  {
    step: "2",
    title: "Positive reputation",
    description: "Proin et convallis tincidunt tincidunt Viverra ut ullamcorp faucibus dictum Integer in egestas volutpat."
  },
  {
    step: "3",
    title: "Fast and reliable",
    description: "Proin et convallis tincidunt tincidunt Viverra ut ullamcorp faucibus dictum Integer in egestas volutpat."
  },
  {
    step: "4",
    title: "24/7 availability",
    description: "Proin et convallis tincidunt tincidunt Viverra ut ullamcorp faucibus dictum Integer in egestas volutpat."
  }
];

const TESTIMONIALS = [
  {
    quote: "I would recommend practitioners at this center to everyone! They are great to work with and are excellent trainers. Thank you all!",
    name: "Arnold Wilson",
    title: "CLIENT, USA",
    rating: 3,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "The service provided was absolutely phenomenal. I have never seen such dedication and attention to detail. Highly recommended!",
    name: "Sarah Jenkins",
    title: "HOMEOWNER, UK",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Fast, reliable, and reasonably priced. The team was very professional and cleaned up after themselves. Five stars!",
    name: "David Chen",
    title: "BUSINESS OWNER, CA",
    rating: 4,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  }
];

export default function About() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "12003456789";
    const whatsappMessage = `Hello, I would like to request a quote.\n\nName: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\nMessage: ${form.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodedMessage}`, '_blank');
    setIsQuoteOpen(false);
    setForm({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* ── HERO SECTION ── */}
      <section className="bg-[#1a1a1a] text-white py-32 px-6 flex flex-col items-center text-center pt-48 pb-32">
        <p className="text-[#0088ff] text-[13px] font-bold tracking-[0.1em] uppercase mb-6">
          ROOFING HISTORY
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-bold uppercase tracking-[-0.02em] max-w-5xl leading-[1.05] mb-8">
          RAISING ROOFING<br />SERVICE STANDARDS<br />SINCE 2002
        </h1>
        <p className="text-gray-300 max-w-2xl text-[17px] font-medium leading-relaxed mb-12">
          Streamlining the roofing process and delivering exceptional results<br className="hidden md:block" /> through a client-centered approach.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => setIsQuoteOpen(!isQuoteOpen)}
            className="bg-[#0088ff] hover:bg-[#006fd6] transition-colors text-white text-[13px] font-bold tracking-widest px-8 py-4 uppercase rounded-md"
          >
            GET A FREE QUOTE
          </button>
          <Link 
            href="/contact" 
            className="bg-white hover:bg-gray-100 transition-colors text-[#1a1a1a] text-[13px] font-bold tracking-widest px-8 py-4 uppercase rounded-md"
          >
            CONTACT US
          </Link>
        </div>

        {/* ── EXPANDABLE QUOTE FORM ── */}
        <div 
          className={`w-full max-w-3xl transition-all duration-700 ease-in-out overflow-hidden ${
            isQuoteOpen ? "max-h-[1200px] opacity-100 mt-16" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="bg-[#141414] rounded-xl shadow-2xl p-8 md:p-12 border border-white/10 text-left">
            <div className="text-center mb-10">
              <p className="text-[#0088ff] text-sm font-bold tracking-[0.1em] uppercase mb-2">GET A FREE QUOTE</p>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">
                GET YOUR ROOFING QUOTE<br/>IN NO TIME.
              </h2>
            </div>

            <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text" name="firstName" placeholder="First name*" required
                  value={form.firstName} onChange={handleChange}
                  className="bg-[#1a1a1a] rounded-md border border-transparent text-white text-sm px-4 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] focus:bg-[#222] transition-all"
                />
                <input
                  type="text" name="lastName" placeholder="Last name*" required
                  value={form.lastName} onChange={handleChange}
                  className="bg-[#1a1a1a] rounded-md border border-transparent text-white text-sm px-4 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] focus:bg-[#222] transition-all"
                />
              </div>
              
              <input
                type="email" name="email" placeholder="Email address*" required
                value={form.email} onChange={handleChange}
                className="bg-[#1a1a1a] rounded-md border border-transparent text-white text-sm px-4 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] focus:bg-[#222] transition-all w-full"
              />
              
              <input
                type="tel" name="phone" placeholder="Phone number*" required
                value={form.phone} onChange={handleChange}
                className="bg-[#1a1a1a] rounded-md border border-transparent text-white text-sm px-4 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] focus:bg-[#222] transition-all w-full"
              />

              <div className="relative">
                <select
                  name="service" required
                  value={form.service} onChange={handleChange}
                  className={`w-full appearance-none bg-[#1a1a1a] rounded-md border border-transparent text-sm px-4 py-4 outline-none focus:border-[#0088ff] focus:bg-[#222] transition-all cursor-pointer ${form.service ? 'text-white' : 'text-white/40'}`}
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" disabled className="text-white/40">Choose a Service*</option>
                  <option value="Roof Repair" className="text-white bg-[#1a1a1a]">Roof Repair</option>
                  <option value="Roof Replacement" className="text-white bg-[#1a1a1a]">Roof Replacement</option>
                  <option value="Inspection" className="text-white bg-[#1a1a1a]">Inspection</option>
                  <option value="Emergency Services" className="text-white bg-[#1a1a1a]">Emergency Services</option>
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              <textarea
                name="message" placeholder="Write a message"
                value={form.message} onChange={handleChange}
                rows={4}
                className="bg-[#1a1a1a] rounded-md border border-transparent text-white text-sm px-4 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] focus:bg-[#222] transition-all resize-none w-full mb-2"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-[#0088ff] hover:bg-[#0088ffb6] transition-colors text-white text-[13px] font-bold tracking-[0.1em] px-8 py-5 uppercase rounded-md"
              >
                GET A FREE QUOTE
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── MILESTONES SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-40">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
          {/* Left Sticky Column */}
          <div className="lg:w-1/2 lg:sticky lg:top-32">
            <h2 className="text-[40px] md:text-[56px] lg:text-[72px] font-bold uppercase leading-[1.05] tracking-tight text-[#111]">
              SIGNIFICANT<br />MILESTONES IN OUR<br />JOURNEY
            </h2>
          </div>

          {/* Right Scrolling Column */}
          <div className="lg:w-1/2 flex flex-col gap-16 mt-4 lg:mt-0">
            <p className="text-gray-800 text-[18px] md:text-[20px] font-medium leading-relaxed mb-2">
              Roofing has always evolved through innovation. At Rooflet, we continue that tradition—adapting, improving, and delivering solutions that match our clients' needs.
            </p>

            <div className="flex flex-col gap-14">
              {MILESTONES.map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[#0088ff] text-[20px] font-bold mb-1">
                    {item.year}
                  </span>
                  <h3 className="text-[26px] md:text-[32px] font-bold text-[#111] mb-4 tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-[16px] md:text-[18px] leading-[1.6] font-medium">
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
              <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: "40px 140px 40px 40px" }}>
                <Image
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80"
                  alt="Professional worker"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* The "Notch" or cutout effect on the right - approximated with a white overlay if needed, 
                  but looking at the image it's more like a staggered layout. 
                  Actually, let's use a simpler but visually identical approach. */}
              
              {/* 25+ years badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#0088ff] text-white p-10 rounded-[32px] z-10 border-[12px] border-white shadow-xl">
                <h3 className="text-6xl font-black mb-1 flex items-center leading-none">25<span className="text-3xl ml-1">+</span></h3>
                <p className="text-[15px] font-bold w-32 leading-tight opacity-90">Years as a Trusted Provider</p>
              </div>

              {/* Decorative element to match the "step" on the right if it's a background shape */}
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-48 bg-gray-50 -z-10 rounded-3xl hidden lg:block"></div>
            </div>
          </div>
          
          {/* Right Content */}
          <div className="flex flex-col">
            <div className="border border-gray-200 rounded-full px-5 py-1.5 w-fit text-[11px] font-extrabold tracking-[0.2em] text-[#031b33] mb-8 uppercase">
              OUR EXPERIENCE
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#031b33] mb-8 leading-[1.1] tracking-tight">
              We take care of your every appliances
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed text-md font-medium">
              We handle repairs & maintenance for all your appliances with experti efficiency Trust us ensure your appliances function perfectly & reliably Plumbing service encompass a wide range of tasks related to the installation.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-y-5 gap-x-12 mb-12">
              {[
                'Highly-trained', 'Highly-trained',
                'No extra charges', 'No extra charges',
                'Same-day services', 'Same-day services'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-[#0088ff] text-white rounded-[4px] w-6 h-6 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="font-bold text-sm text-gray-600">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <button className="group flex items-center bg-[#031b33] rounded-full pl-8 pr-2 py-2 transition-all duration-300 hover:bg-[#0088ff]">
                <span className="text-white text-[13px] font-black tracking-widest uppercase mr-6">
                  KNOW MORE
                </span>
                <div className="bg-[#0088ff] text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#031b33]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-45">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORK PROCESS SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col">
            <div className="border border-gray-300 rounded-full px-4 py-1.5 w-fit text-xs font-bold tracking-widest text-[#031b33] mb-6 uppercase">
              WORK PROCESS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#031b33] mb-12 leading-tight">
              We take care of your every appliances
            </h2>
            <div className="relative h-[600px] w-full rounded-3xl overflow-hidden bg-gray-50">
              <Image src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80" fill className="object-cover" alt="Work process" />
            </div>
          </div>
          
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 items-start">
            {WORK_STEPS.map((step, idx) => (
              <div key={idx} className="border border-gray-100 shadow-sm rounded-[32px] p-8 md:p-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-transparent bg-white cursor-pointer h-full">
                <div className="flex justify-between items-start mb-10">
                  <div className="bg-[#e8f4ff] p-5 rounded-2xl text-[#0088ff]">
                    {/* Placeholder icon */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                  </div>
                  <div className="flex items-start font-black text-[#031b33]">
                    <span className="text-[10px] uppercase tracking-widest mr-1 mt-3">STEP</span>
                    <span className="text-6xl">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#031b33] mb-4">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPOINTMENT CTA SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-[#0088ff] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            {/* Background gear icon */}
            <svg className="absolute text-white/10 w-80 h-80 -left-20 -bottom-20 pointer-events-none" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
            <h2 className="text-3xl md:text-[40px] font-bold text-white max-w-lg mb-8 md:mb-0 relative z-10 leading-[1.2]">
              Looking for a reliable plumbing service?
            </h2>
            <button className="group flex items-center rounded-full overflow-hidden w-fit shadow-xl relative z-10">
              <span className="bg-white text-[#031b33] px-8 py-4.5 text-[13px] font-bold tracking-wider transition-colors duration-300 group-hover:bg-[#031b33] group-hover:text-white">
                APPOINTMENT
              </span>
              <span className="bg-[#031b33] text-white p-4 transition-colors duration-300 group-hover:bg-white group-hover:text-[#031b33]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-45">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </button>
          </div>
          
          <div className="lg:w-[420px] bg-[#031b33] rounded-3xl p-10 md:p-12 flex flex-col justify-center">
            <div className="flex -space-x-4 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-[72px] h-[72px] rounded-full border-[3px] border-[#031b33] overflow-hidden relative shadow-md">
                  <Image src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 30}.jpg`} fill className="object-cover" alt="Customer" />
                </div>
              ))}
            </div>
            <p className="text-white text-lg font-medium leading-relaxed pr-8">
              Trusted by more than 2,000 satisfied <a href="#" className="text-[#0088ff] hover:underline underline-offset-4 decoration-2">customers</a>
            </p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="relative h-[400px] lg:h-auto rounded-[32px] overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80" fill className="object-cover" alt="Discussion" />
          </div>
          
          <div className="bg-[#031b33] rounded-[32px] p-10 md:p-16 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            {/* Background quote mark */}
            <div className="absolute top-10 right-10 text-white/5 font-serif text-[400px] leading-none pointer-events-none select-none">
              "
            </div>
            
            <div className="relative z-10">
              <div className="border border-white/20 rounded-full px-4 py-1.5 w-fit text-[11px] font-bold tracking-widest text-white mb-8 uppercase">
                TESTIMONIALS
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 leading-tight">
                What our client&apos;s<br/>have to say
              </h2>
              
              <div className="flex gap-1.5 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill={star <= TESTIMONIALS[currentTestimonial].rating ? "#f59e0b" : "#4b5563"} className="text-transparent">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              
              <p className="text-white text-lg md:text-xl font-medium leading-[1.8] max-w-lg mb-12 min-h-[140px]">
                "{TESTIMONIALS[currentTestimonial].quote}"
              </p>
            </div>
            
            <div className="relative z-10 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden relative shadow-lg">
                  <Image src={TESTIMONIALS[currentTestimonial].image} fill className="object-cover" alt="Avatar" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[#0088ff] font-bold text-[17px]">{TESTIMONIALS[currentTestimonial].name}</h4>
                  <p className="text-white/70 text-[11px] tracking-widest font-bold uppercase">{TESTIMONIALS[currentTestimonial].title}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-full flex overflow-hidden shadow-lg">
                <button onClick={prevTestimonial} className="px-5 py-4 hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#031b33]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <div className="w-[1px] bg-gray-200"></div>
                <button onClick={nextTestimonial} className="px-5 py-4 hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#031b33]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
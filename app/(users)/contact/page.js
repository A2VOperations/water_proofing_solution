"use client";

import { useState, useEffect } from "react";
import { getAdminDetailsAction } from "@/app/actions/admin";
import { CONTACT_CONFIG } from "@/app/config";


const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || CONTACT_CONFIG.whatsapp;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || CONTACT_CONFIG.email;
const CONTACT_ADDRESS = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || CONTACT_CONFIG.address;
const MAP_QUERY = process.env.NEXT_PUBLIC_MAP_QUERY || CONTACT_CONFIG.mapQuery;

const FAQS = [
  {
    question: "How often should I check for wall seepage?",
    answer: "We recommend a professional dampness audit every 2-3 years, especially before the monsoon season, to identify early signs of structural moisture."
  },
  {
    question: "Do you offer emergency leak detection?",
    answer: "Yes, we provide 24/7 emergency leak detection services across major cities using thermal imaging and moisture meters."
  },
  {
    question: "What is the standard warranty on waterproofing?",
    answer: "Our services come with a performance warranty ranging from 5 to 10 years, depending on the system and material used."
  },
  {
    question: "How can I request an on-site inspection?",
    answer: "You can book a free on-site assessment through our WhatsApp hotline or by filling out the contact form on this page."
  },
  {
    question: "Do you provide terrace waterproofing installation?",
    answer: "Yes, we provide full-service waterproofing for all types of structures using modern membrane and engineering-grade liquid systems."
  }
];

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "", // Where is the leak?
    severity: "", // Severity level
    message: ""
  });
  
  const [popup, setPopup] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.message) {
      setPopup({ type: 'error', text: 'Please fill out all the fields.' });
      setTimeout(() => setPopup(null), 3500);
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setPopup({ type: 'error', text: 'Please enter a valid email address.' });
      setTimeout(() => setPopup(null), 3500);
      return;
    }

    // Format message for WhatsApp
    const whatsappMessage = `Hello, I would like to request a leak report/quote.\n\nName: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\nLocation of Leak: ${form.location}\nSeverity: ${form.severity}\nMessage: ${form.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Show success popup
    setPopup({ type: 'success', text: 'Redirecting to WhatsApp...' });
    
    const whatsappNumber = adminDetails?.numbers?.[0] || WHATSAPP_NUMBER;
    // Redirect to WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`, '_blank');
      setPopup(null);
      setForm({ firstName: "", lastName: "", email: "", phone: "", location: "", severity: "", message: "" });
    }, 1500);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <main className="min-h-screen bg-white font-sans pt-12 pb-24 text-gray-900 relative">
      
      {/* ── EMERGENCY HOTLINE BANNER ── */}
      <div className="bg-red-600 text-white py-3 px-6 fixed top-24 left-0 right-0 z-40 flex items-center justify-center gap-4 animate-pulse">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <p className="text-sm font-black tracking-widest uppercase">
          24/7 EMERGENCY LEAK HOTLINE: <span className="underline ml-1">+{adminDetails?.numbers?.[0] || CONTACT_CONFIG.phone}</span>
        </p>
      </div>

      <div className="pt-16"></div>
      
      {/* ── POPUP ALERT ── */}
      {popup && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-xl shadow-2xl text-white font-bold transition-all duration-300 transform translate-y-0 opacity-100 flex items-center gap-3 ${popup.type === 'error' ? 'bg-red-500' : 'bg-[#0088ff]'}`}>
          {popup.type === 'error' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          )}
          {popup.text}
        </div>
      )}

      {/* ── HEADER ── */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-20 mt-10">
        <p className="text-[#0088ff] text-sm font-bold tracking-widest uppercase mb-4">
          CONTACT US
        </p>
        <h1 className="text-[40px] md:text-[64px] font-black uppercase tracking-tight leading-[1.05] mb-6 text-[#111]">
          ENGINEERING SOLUTIONS FOR<br/>EVERY LEAK.
        </h1>
        <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Don&apos;t wait for the damage to spread. Get a technical leak report and professional dampness audit today.
        </p>
      </section>

      {/* ── CONTACT FORM & INFO ── */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: Form Card */}
          <div className="bg-[#1a1a1a] rounded-3xl p-6 md:p-12 shadow-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text" name="firstName" placeholder="First name*"
                  value={form.firstName} onChange={handleChange}
                  className="bg-[#2a2a2a] rounded-lg border border-white/10 text-white text-sm px-5 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] transition-colors"
                />
                <input
                  type="text" name="lastName" placeholder="Last name*"
                  value={form.lastName} onChange={handleChange}
                  className="bg-[#2a2a2a] rounded-lg border border-white/10 text-white text-sm px-5 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="email" name="email" placeholder="Email address*"
                  value={form.email} onChange={handleChange}
                  className="bg-[#2a2a2a] rounded-lg border border-white/10 text-white text-sm px-5 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] transition-colors"
                />
                <input
                  type="tel" name="phone" placeholder="Phone number*"
                  value={form.phone} onChange={handleChange}
                  className="bg-[#2a2a2a] rounded-lg border border-white/10 text-white text-sm px-5 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <select 
                  name="location" 
                  value={form.location} 
                  onChange={handleChange}
                  className="bg-[#2a2a2a] rounded-lg border border-white/10 text-white text-sm px-5 py-4 outline-none focus:border-[#0088ff] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>Where is the leak?*</option>
                  <option value="Terrace">Terrace</option>
                  <option value="Bathroom">Bathroom / Toilet</option>
                  <option value="Basement">Basement</option>
                  <option value="External Walls">External Walls</option>
                  <option value="Swimming Pool">Swimming Pool</option>
                  <option value="Water Tank">Water Tank</option>
                </select>
                <select 
                  name="severity" 
                  value={form.severity} 
                  onChange={handleChange}
                  className="bg-[#2a2a2a] rounded-lg border border-white/10 text-white text-sm px-5 py-4 outline-none focus:border-[#0088ff] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>Severity Level*</option>
                  <option value="Dampness">Dampness / Seepage</option>
                  <option value="Active Dripping">Active Dripping</option>
                  <option value="Mold Growth">Mold & Fungus Growth</option>
                  <option value="Structural Damage">Structural Cracks / Damage</option>
                </select>
              </div>
              <textarea
                name="message" placeholder="Write a message"
                value={form.message} onChange={handleChange}
                rows={6}
                className="bg-[#2a2a2a] rounded-lg border border-white/10 text-white text-sm px-5 py-4 placeholder:text-white/40 outline-none focus:border-[#0088ff] transition-colors resize-none mb-2 flex-1"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-3 bg-[#0088ff] hover:bg-[#006fd6] transition-colors text-white text-xs md:text-sm font-black tracking-widest px-6 md:px-8 py-4 md:py-5 uppercase rounded-lg mt-auto"
              >
                GET A FREE QUOTE
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>

          {/* Right: Contact Info Card */}
          <div className="bg-[#f9f9f9] rounded-3xl p-8 md:p-12 flex flex-col justify-center border border-gray-100 shadow-sm h-full">
            <h3 className="text-2xl font-bold text-[#111] uppercase tracking-tight mb-10">
              CONTACT INFORMATION
            </h3>
            
            <div className="flex flex-col gap-10">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0088ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-900 mb-1">Phone:</h4>
                  <p className="text-gray-600 text-[15px]">Customer Support: <span className="text-[#0088ff]">({adminDetails?.numbers?.[0] || CONTACT_CONFIG.phone})</span></p>
                  {adminDetails?.numbers?.[1] && (
                    <p className="text-gray-600 text-[15px]">Sales Inquiries: <span className="text-[#0088ff]">({adminDetails.numbers[1]})</span></p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0088ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-900 mb-1">Email:</h4>
                  <p className="text-gray-600 text-[15px]">General Inquiries: <span className="text-[#0088ff]">{adminDetails?.email || CONTACT_EMAIL}</span></p>
                  <p className="text-gray-600 text-[15px]">Support: <span className="text-[#0088ff]">{adminDetails?.email || "armannijum@gmail.com"}</span></p>
                </div>
              </div>

              {/* Warranty Seal */}
              <div className="pt-6 border-t border-gray-100 flex items-center gap-6">
                <img src="/assets/industry/warranty_seal.png" alt="10 Year Warranty" className="w-24 h-24 object-contain" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1 uppercase tracking-tight">10-YEAR WARRANTY</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Scientific waterproofing backed by our comprehensive performance guarantee.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP SECTION (FULL WIDTH) ── */}
      <section className="w-full mb-24 overflow-hidden h-[500px] border-y border-gray-100 bg-gray-100 relative">
        <iframe 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy" 
          allowFullScreen 
          src={`https://maps.google.com/maps?q=${encodeURIComponent(adminDetails?.address || MAP_QUERY)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
        >
        </iframe>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <div className="text-center mb-14">
          <h2 className="text-5xl md:text-[64px] font-black uppercase text-[#111] mb-2 tracking-tight">FAQ&apos;S</h2>
          <p className="text-gray-600 font-medium text-lg">Waterproofing solutions questions and answers</p>
        </div>

        <div className="flex flex-col border-t border-gray-200">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-gray-200 py-6"
              onMouseEnter={() => setOpenFaq(index)}
            >
              <div 
                className="w-full flex items-center justify-between text-left group cursor-pointer"
              >
                <h3 className={`text-xl md:text-[22px] font-bold pr-8 transition-colors ${openFaq === index ? 'text-[#0088ff]' : 'text-[#111] group-hover:text-[#0088ff]'}`}>
                  {faq.question}
                </h3>
                <div className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100 mt-5' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 text-[17px] leading-relaxed pr-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </main>
  );
}
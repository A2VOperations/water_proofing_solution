"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getServiceBySlugAction, getAdminDetailsAction } from "@/app/actions/admin";
import Link from "next/link";
import Image from "next/image";
import { CONTACT_CONFIG } from "@/app/config";


export default function ServiceDetail() {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [adminDetails, setAdminDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const [serviceResult, adminResult] = await Promise.all([
                getServiceBySlugAction(slug),
                getAdminDetailsAction()
            ]);

            if (serviceResult.success) {
                setService(serviceResult.service);
            } else {
                setError(serviceResult.error);
            }

            if (adminResult.success) {
                setAdminDetails(adminResult.admin);
            }

            setLoading(false);
        };
        fetchData();
    }, [slug]);

    const handleWhatsAppRedirect = (e) => {
        if (e) e.preventDefault();
        const number = adminDetails?.numbers?.[0] || CONTACT_CONFIG.whatsapp; // Fallback

        const cleanNumber = number.replace(/\D/g, "");
        const message = `Hello, I'm interested in the "${service?.title}" service. Please provide more details.`;
        window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, "_blank");
    };

    // Helper to turn plain text into beautiful formatted HTML (same as blog)
    const formatContent = (text) => {
        if (!text) return "";
        return text
            .split(/\n\s*\n/)
            .map((para, i) => {
                const trimmed = para.trim();
                if (!trimmed) return "";
                if (i === 0) {
                    return `<p class="first-letter:text-7xl first-letter:font-black first-letter:text-[#0088ff] first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] mb-8 text-xl leading-relaxed text-gray-800 font-medium">${trimmed}</p>`;
                }
                if (trimmed.length < 60 && trimmed === trimmed.toUpperCase()) {
                    return `<h2 class="text-3xl font-black text-[#111] mt-12 mb-6 uppercase tracking-tight">${trimmed}</h2>`;
                }
                return `<p class="mb-6 text-lg leading-[1.8] text-gray-700 font-normal">${trimmed}</p>`;
            })
            .join("");
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Loading Experience...</p>
            </div>
        </div>
    );

    if (error || !service) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
            <h1 className="text-6xl font-black text-gray-100 mb-4">404</h1>
            <p className="text-xl font-bold text-gray-800 mb-8 font-sans">Service not found or has been moved.</p>
            <Link href="/services" className="bg-[#0088ff] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#0088ff]/20">
                View All Services
            </Link>
        </div>
    );

    return (
        <main className="bg-white min-h-screen pb-32">
            {/* Cinematic Hero Section */}
            <header className="relative w-full h-[60vh] md:h-[80vh] bg-gray-900 overflow-hidden">
                <Image 
                    src={service.photos?.[0] || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop"} 
                    alt={service.title} 
                    fill 
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end items-center px-6 pb-20 text-center">
                    <div className="max-w-4xl">
                        <div className="inline-block bg-[#0088ff] text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-6 shadow-lg shadow-[#0088ff]/20">
                            {service.category}
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8 uppercase drop-shadow-2xl">
                            {service.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-white/70 font-bold text-xs uppercase tracking-widest mb-10">
                            <span>Residential</span>
                            <span>•</span>
                            <span>Commercial</span>
                            <span>•</span>
                            <span>Industrial</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button 
                                onClick={handleWhatsAppRedirect}
                                className="bg-[#0088ff] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#0070d6] hover:-translate-y-1 transition-all shadow-xl shadow-[#0088ff]/20"
                            >
                                Inquiry on WhatsApp
                            </button>
                            <Link href="/contact" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                                Get Free Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <article className="max-w-3xl mx-auto px-6 mt-20">
                <div className="mb-12 flex justify-center">
                    <div className="inline-block border border-gray-200 rounded-full px-5 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#0088ff] uppercase bg-gray-50/50">
                        Complete Solutions
                    </div>
                </div>

                {/* Formatted Text Content */}
                <div 
                    className="service-content select-text"
                    dangerouslySetInnerHTML={{ __html: formatContent(service.description) }}
                />

                {/* Service Gallery */}
                {service.photos?.length > 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-20">
                        {service.photos.slice(1, 5).map((photo, i) => (
                            <div key={i} className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl shadow-black/5 group">
                                <Image src={photo} alt={`${service.title} ${i}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        ))}
                    </div>
                )}

                {/* FAQ Section Integrated into Flow */}
                {service.faq?.length > 0 && (
                    <div className="mt-32">
                        <h3 className="text-3xl font-black text-[#111] mb-12 uppercase tracking-tight border-b-4 border-[#0088ff] w-fit pb-2">
                            Expert Insights & FAQs
                        </h3>
                        <div className="space-y-6">
                            {service.faq.map((item, i) => (
                                <div key={i} className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-200/50">
                                    <h4 className="text-lg font-black text-[#111] mb-4 uppercase tracking-tight flex gap-4">
                                        <span className="text-[#0088ff]">Q.</span> {item.question}
                                    </h4>
                                    <p className="text-gray-600 font-medium leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA Final */}
                <div className="mt-32">
                    <div className="bg-[#111] rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0088ff]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 relative z-10">
                            Ready to secure<br />your property?
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
                            <button 
                                onClick={handleWhatsAppRedirect}
                                className="bg-[#0088ff] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#0070d6] hover:-translate-y-1 transition-all shadow-xl shadow-[#0088ff]/20"
                            >
                                Chat on WhatsApp
                            </button>
                            <Link href="/contact" className="bg-white text-[#111] px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all">
                                Request Assessment
                            </Link>
                        </div>
                    </div>
                </div>
            </article>

            {/* Styled inline-style for formatting fixes */}
            <style jsx global>{`
                .service-content p {
                    margin-bottom: 2rem;
                }
                .service-content h2 {
                    position: relative;
                    padding-bottom: 0.5rem;
                }
                .service-content h2::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 50px;
                    height: 4px;
                    background: #0088ff;
                    border-radius: 2px;
                }
            `}</style>
        </main>
    );
}

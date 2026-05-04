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
    const [selectedImage, setSelectedImage] = useState(null);

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

    // Helper to turn plain text into structured service content
    const formatContent = (text) => {
        if (!text) return "";
        return text
            .split(/\n\s*\n/)
            .map((para, i) => {
                const trimmed = para.trim();
                if (!trimmed) return "";
                
                // If it looks like a header (short and uppercase)
                if (trimmed.length < 60 && (trimmed === trimmed.toUpperCase() || trimmed.endsWith(':'))) {
                    return `<h3 class="text-2xl font-black text-[#111] mt-10 mb-6 uppercase tracking-tight flex items-center gap-3">
                        <span class="w-8 h-1 bg-[#0088ff] rounded-full"></span>
                        ${trimmed}
                    </h3>`;
                }
                
                // Check if it's a list (starts with - or *)
                if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                    const items = trimmed.split('\n').map(item => item.replace(/^[-•]\s*/, '').trim());
                    return `<ul class="space-y-4 mb-8">
                        ${items.map(item => `<li class="flex items-start gap-3 text-gray-700 font-medium">
                            <svg class="w-5 h-5 text-[#0088ff] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                            ${item}
                        </li>`).join('')}
                    </ul>`;
                }

                return `<p class="mb-6 text-lg leading-relaxed text-gray-600 font-medium">${trimmed}</p>`;
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
        <main className="bg-[#fcfcfc] min-h-screen pb-32">
            {/* Minimalist Header with Overlay Title */}
            <header className="relative w-full h-[50vh] md:h-[65vh] bg-gray-900 overflow-hidden">
                <Image 
                    src={service.photos?.[0] || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop"} 
                    alt={service.title} 
                    fill 
                    className="object-cover opacity-40 scale-110 blur-2xl"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#fcfcfc]" />
                
                <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center">
                    <div className="max-w-5xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-8">
                            <span className="w-2 h-2 bg-[#0088ff] rounded-full animate-pulse"></span>
                            {service.category}
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6 uppercase drop-shadow-2xl break-words break-all">
                            {service.title}
                        </h1>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Service Details */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[48px] p-8 md:p-16 shadow-xl shadow-black/5 border border-gray-100">
                            
                            {/* Service Overview */}
                            <section className="mb-20">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-[#0088ff]/10 flex items-center justify-center text-[#0088ff]">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Service Overview</h2>
                                </div>
                                <div 
                                    className="service-content select-text"
                                    dangerouslySetInnerHTML={{ __html: formatContent(service.description) }}
                                />
                            </section>

                            {/* Features Grid */}
                            <section className="mb-20">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                    </div>
                                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Core Advantages</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { t: "Expert Inspection", d: "Thorough analysis of your property using advanced detection tools." },
                                        { t: "Premium Materials", d: "We use industrial-grade chemicals and membranes for lasting results." },
                                        { t: "5-Year Warranty", d: "All our specialized waterproofing solutions come with a written guarantee." },
                                        { t: "Certified Team", d: "Handled by professionals with over 10+ years of technical experience." }
                                    ].map((f, i) => (
                                        <div key={i} className="p-8 rounded-[32px] bg-[#fcfcfc] border border-gray-100 hover:border-[#0088ff]/30 transition-all group">
                                            <h4 className="text-lg font-black text-[#111] mb-2 uppercase tracking-tight group-hover:text-[#0088ff] transition-colors">{f.t}</h4>
                                            <p className="text-gray-500 font-medium leading-relaxed text-sm">{f.d}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Service Gallery - Show All Images */}
                            {service.photos?.length > 0 && (
                                <section>
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Project Gallery</h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {service.photos.map((photo, i) => (
                                            <div 
                                                key={i} 
                                                onClick={() => setSelectedImage(photo)}
                                                className="relative aspect-[4/3] rounded-[32px] overflow-hidden group shadow-lg cursor-zoom-in"
                                            >
                                                <Image src={photo} alt={`${service.title} ${i}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-50 group-hover:scale-100 transition-all duration-500">
                                                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* FAQ Section Integrated below the main card */}
                        {service.faq?.length > 0 && (
                            <section className="mt-12 bg-white rounded-[48px] p-8 md:p-16 shadow-xl shadow-black/5 border border-gray-100">
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-12 h-12 rounded-2xl bg-[#0088ff]/10 flex items-center justify-center text-[#0088ff]">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <h2 className="text-3xl font-black text-[#111] uppercase tracking-tight">Service FAQs</h2>
                                </div>
                                <div className="space-y-4">
                                    {service.faq.map((item, i) => (
                                        <div key={i} className="bg-[#fcfcfc] rounded-3xl p-8 border border-gray-100 transition-all hover:bg-white hover:shadow-lg hover:border-[#0088ff]/20 group">
                                            <h4 className="text-lg font-black text-[#111] mb-4 uppercase tracking-tight flex gap-4">
                                                <span className="text-[#0088ff]">Q.</span> {item.question}
                                            </h4>
                                            <p className="text-gray-500 font-medium leading-relaxed pl-8 border-l-2 border-gray-100 group-hover:border-[#0088ff]/30 transition-all">
                                                {item.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="lg:col-span-4">
                        <aside className="sticky top-32 space-y-8">
                            
                            {/* Inquiry Card */}
                            <div className="bg-[#111] rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl shadow-black/20">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0088ff]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 relative z-10">Get Expert Assessment</h3>
                                <p className="text-white/60 font-medium mb-10 relative z-10 text-sm leading-relaxed">Book a free site visit today. Our engineers will provide a detailed solution after inspection.</p>
                                
                                <div className="space-y-4 relative z-10">
                                    <button 
                                        onClick={handleWhatsAppRedirect}
                                        className="w-full bg-[#0088ff] hover:bg-[#0070d6] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-[#0088ff]/20 flex items-center justify-center gap-3"
                                    >
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                        WhatsApp Chat
                                    </button>
                                    <Link 
                                        href="/contact" 
                                        className="w-full bg-white/10 hover:bg-white/20 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border border-white/20 flex items-center justify-center"
                                    >
                                        Contact Office
                                    </Link>
                                </div>
                            </div>

                            {/* Trust Points */}
                            <div className="p-8 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">ISO Certified Solutions</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">Quick Turnaround Time</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">Cost Effective Methods</span>
                                </div>
                            </div>

                        </aside>
                    </div>

                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <div className="relative w-full h-full max-w-6xl max-h-[85vh]">
                        <Image 
                            src={selectedImage} 
                            alt="Expanded project view" 
                            fill 
                            className="object-contain"
                        />
                    </div>
                </div>
            )}

            {/* Custom Global Styles for the parsed content */}
            <style jsx global>{`
                .service-content h3 {
                    line-height: 1.2;
                }
                .service-content p {
                    margin-bottom: 1.5rem;
                }
                .service-content ul li {
                    line-height: 1.6;
                }
            `}</style>
        </main>
    );
}

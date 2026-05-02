"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getServiceBySlugAction } from "@/app/actions/admin";
import Link from "next/link";

export default function ServiceDetail() {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeFaq, setActiveFaq] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            const result = await getServiceBySlugAction(slug);
            if (result.success) {
                setService(result.service);
            } else {
                setError(result.error);
            }
            setLoading(false);
        };
        fetchService();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Loading Experience...</p>
            </div>
        </div>
    );

    if (error || !service) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
            <h1 className="text-6xl font-black text-gray-100 mb-4">404</h1>
            <p className="text-xl font-bold text-gray-800 mb-8">Service not found or has been moved.</p>
            <Link href="/services" className="bg-[#0088ff] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#0070d6] transition-all">
                View All Services
            </Link>
        </div>
    );

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={service.photos?.[0] || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop"} 
                        alt={service.title} 
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-white">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#0088ff] text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-fade-in-up">
                            {service.category}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8 animate-fade-in-up delay-100">
                            {service.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed mb-10 max-w-xl animate-fade-in-up delay-200">
                            {service.description.substring(0, 160)}...
                        </p>
                        <div className="flex gap-4 animate-fade-in-up delay-300">
                            <Link href="/contact" className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all">
                                Get Free Quote
                            </Link>
                            <a href="#details" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details Section */}
            <section id="details" className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-[#0088ff] text-xs font-black tracking-[0.3em] uppercase mb-4">The Solution</h2>
                            <h3 className="text-4xl font-black text-gray-900 leading-tight">Advanced Engineering For {service.title}</h3>
                            <p className="text-gray-500 mt-8 text-lg leading-relaxed font-medium">
                                {service.description}
                            </p>
                        </div>

                        {/* Features/Stats */}
                        <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-12">
                            <div>
                                <span className="block text-3xl font-black text-gray-900 mb-1">100%</span>
                                <span className="text-[10px] font-black text-[#0088ff] uppercase tracking-widest">Waterproof Guarantee</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-black text-gray-900 mb-1">10+</span>
                                <span className="text-[10px] font-black text-[#0088ff] uppercase tracking-widest">Years Warranty</span>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {service.photos?.slice(0, 4).map((photo, i) => (
                            <div key={i} className={`rounded-[32px] overflow-hidden bg-gray-100 shadow-2xl shadow-black/5 ${i % 3 === 0 ? 'h-80' : 'h-64'}`}>
                                <img src={photo} alt={`${service.title} ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            {service.faq?.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <h2 className="text-[#0088ff] text-xs font-black tracking-[0.3em] uppercase mb-4 text-center">Expert Insights</h2>
                        <h3 className="text-4xl font-black text-gray-900 mb-16 text-center">Frequently Asked Questions</h3>
                        
                        <div className="text-left space-y-4">
                            {service.faq.map((item, i) => (
                                <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all">
                                    <button 
                                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between p-8 text-left"
                                    >
                                        <span className="text-lg font-black text-gray-900 uppercase tracking-tight">{item.question}</span>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeFaq === i ? 'bg-[#0088ff] text-white rotate-45' : 'bg-gray-100 text-gray-500'}`}>
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
                                        </div>
                                    </button>
                                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeFaq === i ? 'max-h-[500px]' : 'max-h-0'}`}>
                                        <div className="p-8 pt-0 text-gray-500 font-medium text-lg border-t border-gray-50">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Final */}
            <section className="py-24 container mx-auto px-6 text-center">
                <div className="bg-[#0088ff] rounded-[64px] p-16 md:p-24 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-8">Ready to secure your property?</h3>
                        <p className="text-white/80 font-medium text-lg mb-12">Don't wait for the leak to become a flood. Our team of specialized engineers is ready to assess your structure today.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="bg-white text-[#0088ff] px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all shadow-2xl">
                                Request Assessment
                            </Link>
                            <a href="tel:+1800000000" className="bg-transparent border border-white/30 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                                Call Experts Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

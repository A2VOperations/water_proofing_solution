"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllServicesAction, deleteServiceAction } from "@/app/actions/admin";

export default function ViewServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const result = await getAllServicesAction();
    if (result.success) {
      setServices(result.services);
    }
    setLoading(false);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this service?")) return;

    const result = await deleteServiceAction(id);
    if (result.success) {
      setServices(services.filter(s => s._id !== id));
    } else {
      alert(result.error || "Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight text-[#111]">All Services</h1>
          <p className="text-gray-500 font-medium mt-2">Manage and edit your existing service offerings.</p>
        </div>
        <Link href="/admin/addServices" className="bg-[#0088ff] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-[#0070d6] transition-all">
          Add New Service
        </Link>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 bg-white rounded-[32px] border border-gray-100 animate-pulse"></div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-[32px] border border-gray-100 p-20 text-center">
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em]">No services found</p>
          <Link href="/admin/addServices" className="text-[#0088ff] mt-4 inline-block font-black uppercase text-xs">Create your first service</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
                href={`/admin/services/${service._id}`} 
                key={service._id} 
                className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-[#0088ff]/30 transition-all hover:-translate-y-2 relative"
            >
              <div className="h-48 bg-gray-100 overflow-hidden relative">
                {service.photos && service.photos[0] ? (
                  <img src={service.photos[0]} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={(e) => handleDelete(e, service._id)}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-red-500 flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0088ff] bg-[#0088ff]/10 px-2 py-1 rounded">Service</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{service.faq?.length || 0} FAQs</span>
                </div>
                <h3 className="text-xl font-black text-[#111] mb-3 group-hover:text-[#0088ff] transition-colors">{service.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-black text-[#0088ff] uppercase tracking-widest group-hover:gap-4 transition-all">
                  Edit Service Details
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

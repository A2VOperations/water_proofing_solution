"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllServicesAction, deleteServiceAction } from "@/app/actions/admin";

export default function ViewServices() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchServices(debouncedSearch);
  }, [debouncedSearch]);

  const fetchServices = async (query = "") => {
    setLoading(true);
    const result = await getAllServicesAction(query);
    if (result.success) {
      setServices(result.services);
    }
    setLoading(false);
  };

  const handleDeleteClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteServiceAction(deleteId);
    if (result.success) {
      setServices(services.filter(s => s._id !== deleteId));
      setDeleteId(null);
    } else {
      alert(result.error || "Delete failed");
    }
    setIsDeleting(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#111]">All Services</h1>
          <p className="text-gray-500 font-medium mt-2">Manage and edit your existing service offerings.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 flex-1 max-w-3xl xl:justify-end">
            <div className="relative flex-1">
                <input 
                    type="text" 
                    placeholder="Search services by title..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-12 py-4 outline-none focus:border-[#0088ff] focus:ring-4 focus:ring-[#0088ff]/5 transition-all font-medium text-sm"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                )}
            </div>
            <Link 
              href="/admin/addServices" 
              className="bg-[#0088ff] text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#0070d6] transition-all shadow-lg shadow-[#0088ff]/20 text-center whitespace-nowrap"
            >
              Add New Service
            </Link>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 bg-white rounded-[32px] animate-pulse border border-gray-100"></div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
            {debouncedSearch ? `No services matching "${debouncedSearch}"` : "No services found in database."}
          </p>
          {debouncedSearch && (
            <button onClick={() => setSearchTerm("")} className="mt-4 text-[#0088ff] font-bold text-xs uppercase tracking-widest">Clear Search</button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
                onClick={() => router.push(`/admin/services/${service._id}`)}
                key={service._id} 
                className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-[#0088ff]/30 transition-all hover:-translate-y-2 relative cursor-pointer"
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
                  <Link 
                    href={`/admin/services/${service._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-[#0088ff] flex items-center justify-center shadow-lg hover:bg-[#0088ff] hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </Link>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(e, service._id); }}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-red-500 flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0088ff] bg-[#0088ff]/10 px-2 py-1 rounded">Service</span>
                  {service.isHeroProduct === "yes" && (
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white bg-[#0088ff] px-2 py-1 rounded flex items-center gap-1">
                      <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      Hero
                    </span>
                  )}
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
            </div>
          ))}
        </div>
      )}

      {/* Custom Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-center text-[#111] mb-2 tracking-tight">Delete Service?</h3>
            <p className="text-gray-500 text-sm text-center mb-8 font-medium leading-relaxed">
              This action cannot be undone. The service and its associated images will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-3.5 rounded-xl font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50 text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-3.5 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50 text-sm flex items-center justify-center shadow-lg shadow-red-500/30"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllServicesAction, deleteServiceAction } from "@/app/actions/admin";

export default function AdminHome() {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoadingServices(true);
    const result = await getAllServicesAction();
    if (result.success) {
      setServices(result.services);
    }
    setLoadingServices(false);
  };

  const handleDeleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this service? This will also remove its images from Cloudinary.")) return;
    
    const result = await deleteServiceAction(id);
    if (result.success) {
      setServices(services.filter(s => s._id !== id));
    } else {
      alert(result.error || "Failed to delete service");
    }
  };

  const stats = [
    { name: "Total Works", value: "12", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", link: "/admin/addWork" },
    { name: "Active Services", value: services.length.toString(), icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", link: "/admin/addServices" },
    { name: "Blog Posts", value: "24", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z", link: "/admin/addBlogs" },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-12">
      <header>
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#111]">Dashboard Overview</h1>
        <p className="text-gray-500 font-medium mt-2">Welcome back to your admin portal.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-[#0088ff] transition-all hover:shadow-lg">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.name}</p>
              <h3 className="text-5xl font-black text-[#111]">{stat.value}</h3>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#0088ff]/5 flex items-center justify-center text-[#0088ff] group-hover:bg-[#0088ff] group-hover:text-white transition-all transform group-hover:-translate-y-1">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d={stat.icon}></path>
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-black uppercase tracking-tight text-[#111]">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <Link key={stat.link} href={stat.link} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl hover:bg-[#0088ff] hover:text-white transition-all group text-gray-900 border border-gray-100 hover:shadow-[0_10px_30px_rgba(0,136,255,0.2)]">
                <svg className="mb-3 text-[#0088ff] group-hover:text-white transition-colors" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
                <span className="font-bold text-[10px] uppercase tracking-widest">Add {stat.name.split(" ")[1]}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Services List System */}
        <div className="lg:col-span-2 bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-tight text-[#111]">Recent Services</h2>
            <Link href="/admin/services" className="text-[#0088ff] text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-2">
               View All
               <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg>
            </Link>
          </div>
          <div className="p-4">
            {loadingServices ? (
              <div className="flex flex-col gap-4">
                {[1, 2].map(i => <div key={i} className="h-20 w-full bg-gray-50 animate-pulse rounded-2xl"></div>)}
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-bold uppercase tracking-widest text-xs">No services added yet</div>
            ) : (
              <div className="flex flex-col gap-2">
                {services.slice(0, 2).map((service) => (
                  <div key={service._id} className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                        {service.photos && service.photos[0] ? (
                          <img src={service.photos[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                             <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#111]">{service.title}</h4>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">{service.faq?.length || 0} FAQs Linked</p>
                      </div>
                    </div>
                    <Link 
                      href={`/admin/services/${service._id}`}
                      className="p-3 rounded-xl bg-white text-gray-400 hover:text-[#0088ff] hover:shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

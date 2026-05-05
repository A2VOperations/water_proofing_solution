"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  getAllServicesAction, 
  getAllBlogsAction, 
  getAllWorksAction 
} from "@/app/actions/admin";

export default function AdminHome() {
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [resServices, resBlogs, resWorks] = await Promise.all([
      getAllServicesAction(),
      getAllBlogsAction(),
      getAllWorksAction()
    ]);

    if (resServices.success) setServices(resServices.services);
    if (resBlogs.success) setBlogs(resBlogs.blogs);
    if (resWorks.success) setWorks(resWorks.works);
    
    setLoading(false);
  };

  const stats = [
    { name: "Portfolio Works", value: works.length.toString(), icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", link: "/admin/works" },
    { name: "Active Services", value: services.length.toString(), icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", link: "/admin/services" },
    { name: "Blog Posts", value: blogs.length.toString(), icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z", link: "/admin/blogs" },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-12 pb-20">
      <header>
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#111]">Dashboard Overview</h1>
        <p className="text-gray-500 font-medium mt-2">Managing your business from a birds-eye view.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link href={stat.link} key={stat.name} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-[#0088ff] transition-all hover:shadow-lg">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.name}</p>
              <h3 className="text-5xl font-black text-[#111]">{loading ? "..." : stat.value}</h3>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#0088ff]/5 flex items-center justify-center text-[#0088ff] group-hover:bg-[#0088ff] group-hover:text-white transition-all transform group-hover:-translate-y-1">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d={stat.icon}></path>
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Services */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-tight text-[#111]">Services</h2>
            <Link href="/admin/services" className="text-[#0088ff] text-xs font-black uppercase tracking-widest hover:underline">Manage</Link>
          </div>
          <div className="p-4 space-y-2">
            {loading ? (
              <div className="h-16 w-full bg-gray-50 animate-pulse rounded-2xl"></div>
            ) : services.length === 0 ? (
              <p className="text-center py-8 text-gray-400 text-xs font-bold uppercase">No data</p>
            ) : (
              services.slice(0, 3).map((s) => (
                <div key={s._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 overflow-hidden shrink-0">
                    {s.photos?.[0] && <img src={s.photos[0]} className="w-full h-full object-cover" />}
                  </div>
                  <span className="font-bold text-sm truncate">{s.title}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-tight text-[#111]">Blogs</h2>
            <Link href="/admin/blogs" className="text-[#0088ff] text-xs font-black uppercase tracking-widest hover:underline">Manage</Link>
          </div>
          <div className="p-4 space-y-2">
            {loading ? (
              <div className="h-16 w-full bg-gray-50 animate-pulse rounded-2xl"></div>
            ) : blogs.length === 0 ? (
              <p className="text-center py-8 text-gray-400 text-xs font-bold uppercase">No data</p>
            ) : (
              blogs.slice(0, 3).map((b) => (
                <div key={b._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 overflow-hidden shrink-0">
                    {b.image && <img src={b.image} className="w-full h-full object-cover" />}
                  </div>
                  <span className="font-bold text-sm truncate">{b.title}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#111] p-8 rounded-[32px] text-white flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight mb-2">Fast Access</h2>
            <p className="text-gray-500 text-sm font-medium mb-8">Quickly add new content to your site.</p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <Link href="/admin/addServices" className="bg-[#0088ff] p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#0070d6] transition-all">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
              Add Service
            </Link>
            <Link href="/admin/addBlogs" className="bg-white/10 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
              Add Blog
            </Link>
            <Link href="/admin/addWork" className="bg-white/10 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
              Add Project
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Products Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black uppercase tracking-tight text-[#111]">Hero Products</h2>
            <span className="bg-[#0088ff] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Featured</span>
          </div>
          <Link href="/admin/services" className="text-[#0088ff] text-xs font-black uppercase tracking-widest hover:underline">Manage All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            [1, 2, 3, 4].map(i => <div key={i} className="h-48 bg-gray-100 rounded-[32px] animate-pulse"></div>)
          ) : services.filter(s => s.isHeroProduct === "yes").length === 0 ? (
            <div className="col-span-full py-12 bg-white rounded-[32px] border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No hero products selected.</p>
              <p className="text-gray-400 text-[10px] font-medium">Mark a service as "Hero Product" to see it here.</p>
            </div>
          ) : (
            services.filter(s => s.isHeroProduct === "yes").map((s) => (
              <div key={s._id} className="bg-white p-2 rounded-[32px] shadow-sm border border-gray-100 group hover:border-[#0088ff] transition-all">
                <div className="relative aspect-square rounded-[26px] overflow-hidden bg-gray-50 mb-4">
                  {s.photos?.[0] && (
                    <img 
                      src={s.photos[0]} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={s.title}
                    />
                  )}
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-sm text-[#0088ff]">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-[10px] font-bold text-[#0088ff] uppercase tracking-widest mb-1">{s.category}</p>
                  <h3 className="font-black text-sm text-[#111] truncate">{s.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Recent Works with Images Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#111]">Recent Projects Portfolio</h2>
          <Link href="/admin/works" className="text-[#0088ff] text-xs font-black uppercase tracking-widest hover:underline">View All Projects</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            [1, 2, 3, 4].map(i => <div key={i} className="aspect-video bg-gray-100 rounded-[24px] animate-pulse"></div>)
          ) : works.length === 0 ? (
            <div className="col-span-full py-12 bg-white rounded-[32px] border border-dashed border-gray-200 text-center">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No projects added yet.</p>
            </div>
          ) : (
            works.slice(0, 4).map((w) => (
              <div key={w._id} className="relative aspect-video rounded-[24px] overflow-hidden group shadow-sm border border-gray-100">
                {w.images?.[0] && <img src={w.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-xs truncate">{w.title}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

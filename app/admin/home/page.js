"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllServicesAction, deleteServiceAction, getAllBlogsAction, deleteBlogAction } from "@/app/actions/admin";

export default function AdminHome() {
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    fetchServices();
    fetchBlogs();
  }, []);

  const fetchServices = async () => {
    setLoadingServices(true);
    const result = await getAllServicesAction();
    if (result.success) {
      setServices(result.services);
    }
    setLoadingServices(false);
  };

  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    const result = await getAllBlogsAction();
    if (result.success) {
      setBlogs(result.blogs);
    }
    setLoadingBlogs(false);
  };

  const handleDeleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const result = await deleteServiceAction(id);
    if (result.success) {
      setServices(services.filter(s => s._id !== id));
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    const result = await deleteBlogAction(id);
    if (result.success) {
      setBlogs(blogs.filter(b => b._id !== id));
    }
  };

  const stats = [
    { name: "Total Works", value: "12", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", link: "/admin/addWork" },
    { name: "Active Services", value: services.length.toString(), icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", link: "/admin/addServices" },
    { name: "Blog Posts", value: blogs.length.toString(), icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z", link: "/admin/addBlogs" },
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
        <div className="space-y-6">
          <h2 className="text-xl font-black uppercase tracking-tight text-[#111]">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            {stats.map((stat) => (
              <Link key={stat.link} href={stat.link} className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:bg-[#0088ff] hover:text-white transition-all group text-gray-900 border border-gray-100 hover:shadow-[0_10px_30px_rgba(0,136,255,0.2)]">
                <div className="w-10 h-10 rounded-xl bg-[#0088ff]/5 flex items-center justify-center text-[#0088ff] group-hover:bg-white/20 group-hover:text-white transition-all">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
                </div>
                <span className="font-bold text-[11px] uppercase tracking-widest">Add {stat.name.split(" ")[1]}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Services List System */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-tight text-[#111]">Services</h2>
            <Link href="/admin/services" className="text-[#0088ff] text-xs font-black uppercase tracking-widest hover:underline">
               Manage
            </Link>
          </div>
          <div className="p-4">
            {loadingServices ? (
              <div className="flex flex-col gap-4">
                {[1, 2].map(i => <div key={i} className="h-16 w-full bg-gray-50 animate-pulse rounded-2xl"></div>)}
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-bold uppercase tracking-widest text-xs">No services</div>
            ) : (
              <div className="flex flex-col gap-2">
                {services.slice(0, 4).map((service) => (
                  <div key={service._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-transparent transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                        {service.photos && service.photos[0] && <img src={service.photos[0]} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-[#111] text-sm truncate">{service.title}</h4>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black">{service.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Blogs List System */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-tight text-[#111]">Blogs</h2>
            <Link href="/admin/blogs" className="text-[#0088ff] text-xs font-black uppercase tracking-widest hover:underline">
               Manage
            </Link>
          </div>
          <div className="p-4">
            {loadingBlogs ? (
              <div className="flex flex-col gap-4">
                {[1, 2].map(i => <div key={i} className="h-16 w-full bg-gray-50 animate-pulse rounded-2xl"></div>)}
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-bold uppercase tracking-widest text-xs">No blogs</div>
            ) : (
              <div className="flex flex-col gap-2">
                {blogs.slice(0, 4).map((blog) => (
                  <div key={blog._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-transparent transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                        {blog.image && <img src={blog.image} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-[#111] text-sm truncate">{blog.title}</h4>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black">{blog.category}</p>
                      </div>
                    </div>
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

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { getAllBlogsAction } from "@/app/actions/admin";
import Link from "next/link";

const BlogCard = ({ post, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <Link 
      href={`/blog/${post.slug}`}
      ref={ref}
      className={`bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden group flex flex-col h-full transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-4/3 rounded-[24px] overflow-hidden bg-gray-100">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill 
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Date Badge with Inverted Curves (Replaced buggy SVGs with clean CSS shadow trick) */}
        <div className="absolute bottom-0 right-10 bg-white px-6 py-3 rounded-t-[20px] z-10 flex items-center justify-center">
          
          {/* Left Inverted Curve */}
          <div className="absolute bottom-0 left-[-20px] w-[20px] h-[20px] bg-transparent rounded-br-[20px] shadow-[10px_10px_0_10px_white] pointer-events-none"></div>

          {/* Right Inverted Curve */}
          <div className="absolute bottom-0 right-[-20px] w-[20px] h-[20px] bg-transparent rounded-bl-[20px] shadow-[-10px_10px_0_10px_white] pointer-events-none"></div>

          <span className="text-[#0088ff] text-[11px] font-bold tracking-widest uppercase">
            {new Date(post.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })}
          </span>
        </div>
      </div>

      {/* Text Content */}
      <div className="p-8 flex flex-col grow">
        <h3 className="text-[#111] text-[22px] font-bold leading-[1.3] mb-6 group-hover:text-[#0088ff] transition-colors duration-300 line-clamp-3">
          {post.title}
        </h3>
        
        <div className="mt-auto flex items-center gap-2 text-[11px] font-bold text-gray-400 tracking-widest uppercase">
          <span>{post.category}</span>
          <span>/</span>
          <span>{post.author}</span>
        </div>
      </div>
    </Link>
  );
};

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await getAllBlogsAction();
      if (result.success) {
        setBlogs(result.blogs);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 font-sans pt-32 pb-24">
      
      {/* ── HEADER ── */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-16 mt-10">
        <p className="text-[#0088ff] text-sm font-bold tracking-widest uppercase mb-4">
          STAY UPDATED
        </p>
        <h1 className="text-[40px] md:text-[64px] font-black uppercase tracking-tight leading-[1.05] mb-8 text-[#111]">
          INSIGHTS &<br/>ARTICLES.
        </h1>
        
        <div className="max-w-xl mx-auto relative mt-12 mb-6">
            <input 
                type="text"
                placeholder="Search articles, topics, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-full px-10 py-6 outline-none focus:ring-4 focus:ring-[#0088ff]/5 focus:border-[#0088ff] transition-all font-bold text-[#111] shadow-sm"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
            </div>
        </div>

        {!searchTerm && (
            <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                Read the latest news, tips, and professional advice from our experts to keep your home in perfect condition.
            </p>
        )}
      </section>

      {/* ── BLOG GRID ── */}
      <section className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0088ff]"></div>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {filteredBlogs.map((post, i) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[48px] border border-dashed border-gray-100">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No articles matched your search.</p>
            <button onClick={() => setSearchTerm("")} className="text-[#0088ff] font-black uppercase text-xs tracking-widest mt-4 hover:underline">Clear Search</button>
          </div>
        )}
      </section>

    </main>
  );
}
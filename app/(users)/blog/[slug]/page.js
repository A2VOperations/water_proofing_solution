"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getBlogBySlugAction } from "@/app/actions/admin";

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      const result = await getBlogBySlugAction(slug);
      if (result.success) {
        setBlog(result.blog);
      }
      setLoading(false);
    };
    fetchBlog();

    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((currentScroll / scrollHeight) * 100);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, [slug]);

  // Helper to turn plain text into beautiful formatted HTML
  const formatContent = (text) => {
    if (!text) return "";
    return text
      .split(/\n\s*\n/) // Split by double newlines
      .map((para, i) => {
        const trimmed = para.trim();
        if (!trimmed) return "";
        
        // Add drop cap to first paragraph
        if (i === 0) {
          return `<p class="first-letter:text-7xl first-letter:font-black first-letter:text-[#0088ff] first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] mb-8 text-xl leading-relaxed text-gray-800 font-medium">${trimmed}</p>`;
        }
        
        // Style headings if they are short and capitalized
        if (trimmed.length < 60 && trimmed === trimmed.toUpperCase()) {
          return `<h2 class="text-3xl font-black text-[#111] mt-12 mb-6 uppercase tracking-tight">${trimmed}</h2>`;
        }

        return `<p class="mb-6 text-lg leading-[1.8] text-gray-700 font-normal">${trimmed}</p>`;
      })
      .join("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-4xl font-black mb-4 uppercase tracking-tight text-[#111]">Article Not Found</h1>
        <p className="text-gray-500 mb-8 font-medium">The content you're looking for has moved or been removed.</p>
        <Link href="/blog" className="bg-[#0088ff] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#0088ff]/20">Back to Blog</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-32">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-[100]">
        <div 
          className="h-full bg-[#0088ff] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <header className="relative w-full h-[60vh] md:h-[80vh] bg-gray-900 overflow-hidden">
        <Image 
          src={blog.image} 
          alt={blog.title} 
          fill 
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end items-center px-6 pb-20 text-center">
          <div className="max-w-4xl">
            <Link href="/blog" className="inline-block bg-[#0088ff] text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-6 shadow-lg shadow-[#0088ff]/20">
              {blog.category}
            </Link>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8 uppercase drop-shadow-2xl">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-white/70 font-bold text-xs uppercase tracking-widest">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-[#0088ff] flex items-center justify-center text-white text-[10px] shadow-lg">
                   {blog.author.charAt(0)}
                 </div>
                 <span className="text-white">{blog.author}</span>
               </div>
               <span>•</span>
               <span>{new Date(blog.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kolkata' })}</span>
               <span>•</span>
               <span>{blog.readTime || '5 MIN READ'}</span>
            </div>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 mt-20">
        {/* Content with rich formatting */}
        <div 
          className="blog-content select-text"
          dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
        />

        {/* Share Section */}
        <div className="mt-24 pt-12 border-t border-gray-100">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Enjoyed this article?</p>
                <div className="flex items-center gap-3">
                   {['facebook', 'twitter', 'linkedin'].map(platform => (
                     <button key={platform} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#0088ff] hover:text-white transition-all uppercase font-black text-[10px]">
                       {platform.charAt(0)}
                     </button>
                   ))}
                </div>
              </div>
              <Link href="/blog" className="flex items-center gap-3 bg-[#111] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0088ff] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back to Articles
              </Link>
           </div>
        </div>
      </article>

      {/* Styled inline-style for formatting fixes */}
      <style jsx global>{`
        .blog-content p {
          margin-bottom: 2rem;
        }
        .blog-content h2 {
          position: relative;
          padding-bottom: 0.5rem;
        }
        .blog-content h2::after {
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

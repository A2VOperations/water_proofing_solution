                "use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getBlogBySlugAction, getAdminDetailsAction } from "@/app/actions/admin";
import { CONTACT_CONFIG } from "@/app/config";

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [adminDetails, setAdminDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      const result = await getBlogBySlugAction(slug);
      if (result.success) {
        setBlog(result.blog);
      }
      const adminResult = await getAdminDetailsAction();
      if (adminResult.success) {
        setAdminDetails(adminResult.admin);
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

  const shareUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const shareTitle = blog?.title ? encodeURIComponent(blog.title) : '';

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
        <p className="text-gray-500 mb-8 font-medium">The content you&apos;re looking for has moved or been removed.</p>
        <Link href="/blog" className="bg-[#0088ff] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#0088ff]/20">Back to Blog</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-32">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-100">
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
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center px-8 pt-28 md:pt-48 text-center">
          <div className="max-w-6xl">
            <Link href="/blog" className="inline-block bg-[#0088ff] text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-6 shadow-lg shadow-[#0088ff]/20">
              {blog.category}
            </Link>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-10 md:mb-16 uppercase drop-shadow-2xl break-words break-all">
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
               <span>{(() => {
                          const date = new Date(blog.date);
                          const now = new Date();
                          const diffInSecs = Math.floor((now - date) / 1000);
                          if (diffInSecs < 60) return 'JUST NOW';
                          if (diffInSecs < 3600) return `${Math.floor(diffInSecs / 60)} MIN AGO`;
                          if (diffInSecs < 86400) return `${Math.floor(diffInSecs / 3600)} HOURS AGO`;
                          if (diffInSecs < 604800) return `${Math.floor(diffInSecs / 86400)} DAYS AGO`;
                          return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
                        })()}</span>
            </div>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-10 sm:px-6 mt-20">
        {/* Content with rich formatting */}
        <div 
          className="blog-content select-text"
          dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
        />

        {/* Share Section */}
        <div className="mt-24 pt-12 border-t border-gray-100">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-[13px] font-black text-gray-400 uppercase tracking-widest mb-4">Enjoyed this article?</p>
                <div className="flex items-center gap-3">
                   {[
                     { name: 'Facebook', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, href: adminDetails?.facebook || CONTACT_CONFIG.facebook },
                     { name: 'Instagram', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="3"/></svg>, href: adminDetails?.instagram || CONTACT_CONFIG.instagram },
                     { name: 'Whatsapp', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>, href: `https://wa.me/${(adminDetails?.numbers?.[0] || CONTACT_CONFIG.whatsapp).replace(/\D/g, "")}` },
                     { name: 'YouTube', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>, href: adminDetails?.youtube || CONTACT_CONFIG.youtube },
                   ].map(platform => (
                     <Link 
                       key={platform.name} 
                       href={platform.href}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#0088ff] hover:text-white transition-all"
                       title={`Share on ${platform.name}`}
                     >
                       {platform.icon}
                     </Link>
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

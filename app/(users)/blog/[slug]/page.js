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

  useEffect(() => {
    const fetchBlog = async () => {
      const result = await getBlogBySlugAction(slug);
      if (result.success) {
        setBlog(result.blog);
      }
      setLoading(false);
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0088ff]"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link href="/blog" className="bg-[#0088ff] text-white px-8 py-3 rounded-lg font-bold">Back to Blog</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 font-medium">
          <Link href="/blog" className="hover:text-[#0088ff] transition-colors">Blog</Link>
          <span>/</span>
          <span className="truncate">{blog.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-[36px] md:text-[56px] font-black text-[#111] leading-[1.1] tracking-tight mb-10">
          {blog.title}
        </h1>

        {/* Author & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-gray-100 pb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#f43f5e] flex items-center justify-center text-white font-black text-xl overflow-hidden">
                {blog.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-[#111]">{blog.author}</p>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {blog.readTime || '5 min read'}
              </p>
            </div>
          </div>
          
          {/* Social Share Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              ), label: "Copy link" },
              { icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              ), label: "LinkedIn" },
              { icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              ), label: "X (Twitter)" },
              { icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              ), label: "Facebook" }
            ].map((social, i) => (
              <button key={i} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#0088ff] hover:text-white hover:border-[#0088ff] transition-all" aria-label={social.label}>
                {social.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full aspect-[16/9] rounded-[32px] overflow-hidden mb-16 shadow-2xl">
          <Image 
            src={blog.image} 
            alt={blog.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-[#111] prose-headings:font-black prose-p:text-gray-600 prose-p:leading-[1.8] prose-li:text-gray-600"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer info */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <span className="text-gray-400 font-bold tracking-widest text-[11px] uppercase">Category:</span>
             <span className="bg-[#f0f7ff] text-[#0088ff] px-4 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider">{blog.category}</span>
          </div>
          <Link href="/blog" className="text-[#0088ff] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
            Back to Articles
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </article>
    </main>
  );
}

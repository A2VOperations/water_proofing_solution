"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getAllBlogsAction } from "@/app/actions/admin";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const result = await getAllBlogsAction();
      if (result.success) {
        // Show only latest 4 blogs on home page
        setBlogs(result.blogs.slice(0, 4));
      }
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "DATE";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const BlogCard = ({ post, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 },
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <Link href={`/blog/${post.slug}`} className="h-full">
        <div
          ref={ref}
          className={`bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden group flex flex-col h-full transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {/* Image Container */}
          <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-gray-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Date Badge with Inverted Curves */}
            <div className="absolute bottom-0 right-12 bg-white px-5 py-2.5 rounded-t-[20px] z-10 flex items-center justify-center">
              {/* Left Inverted Curve */}
              <svg
                className="absolute bottom-0 -right-[20px] w-[20px] h-[20px] text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 20 H0 V0 C0 11.046 8.954 20 20 20 Z" />
              </svg>

              {/* Right Inverted Curve */}
              <svg
                className="absolute bottom-0 -left-[20px] - w-[20px] h-[20px] text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 20 H20 V0 C20 11.046 11.046 20 0 20 Z" />
              </svg>

              <span className="text-[#0088ff] text-[11px] font-bold tracking-widest uppercase">
                {formatDate(post.date)}
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-[#111] text-[22px] font-bold leading-[1.3] mb-6 group-hover:text-[#0088ff] transition-colors duration-300">
              {post.title}
            </h3>

            <div className="mt-auto flex items-center gap-2 text-[11px] font-bold text-gray-400 tracking-widest uppercase">
              <span>{post.category}</span>
              <span>/</span>
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans pt-32 pb-24">
      {/* ── HEADER ── */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-20 mt-10">
        <p className="text-[#0088ff] text-sm font-bold tracking-widest uppercase mb-4">
          STAY UPDATED
        </p>
        <h1 className="text-[40px] md:text-[64px] font-black uppercase tracking-tight leading-[1.05] mb-6 text-[#111]">
          INSIGHTS &<br />
          ARTICLES.
        </h1>
        <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Read the latest news, tips, and professional advice from our experts
          to keep your home in perfect condition.
        </p>
        <div className="w-full flex justify-center">
          <Link href={"/blog"}>
            <button className="mt-8 bg-[#0088ff] hover:bg-[#0073e6] text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 flex  gap-2">
              View More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </Link>
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <section className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {loading ? (
             [1, 2, 3, 4].map((i) => (
               <div key={i} className="h-[450px] bg-gray-100 animate-pulse rounded-[24px]"></div>
             ))
          ) : blogs.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-400 font-bold uppercase tracking-widest">
              No blog posts available yet.
            </div>
          ) : (
            blogs.map((post, i) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

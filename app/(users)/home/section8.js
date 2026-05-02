"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const BLOG_POSTS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    date: "16 OCT 2024",
    title: "Achieving calm minds from plumbing issues",
    category: "PLUMBER",
    author: "ANAIS EMMERICH",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    date: "16 OCT 2024",
    title: "Rapid solutions for your plumbing issues",
    category: "SPECIAL REPAIRS",
    author: "ANAIS EMMERICH",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1541888087854-4712850a9dcc?auto=format&fit=crop&w=800&q=80",
    date: "16 OCT 2024",
    title: "Frequent maintenance, such as inspection",
    category: "HANDYMAN",
    author: "MARC RATKE",
  },
];

export default function BlogSection() {
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
          {/* Date Badge with Inverted Curves */}
          <div className="absolute bottom-0 right-12 bg-white px-5 py-2.5 rounded-t-[20px] z-10 flex items-center justify-center">
            {/* Left Inverted Curve */}
            <svg
              className="absolute bottom-0 -right-[20px] w-[20px] h-[20px] text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fills the bottom-right corner with white, carving out a quarter-circle cutout */}
              <path d="M20 20 H0 V0 C0 11.046 8.954 20 20 20 Z" />
            </svg>

            {/* Right Inverted Curve */}
            <svg
              className="absolute bottom-0 -left-[20px] - w-[20px] h-[20px] text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fills the bottom-left corner with white, carving out a quarter-circle cutout */}
              <path d="M0 20 H20 V0 C20 11.046 11.046 20 0 20 Z" />
            </svg>

            <span className="text-[#0088ff] text-[11px] font-bold tracking-widest uppercase">
              {post.date}
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
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {BLOG_POSTS.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

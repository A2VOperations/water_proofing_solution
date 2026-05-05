"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getAllBlogsAction } from "@/app/actions/admin";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(
    () => {
      if (loading) return;

      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".blog-card", {
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef, dependencies: [loading] },
  );

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
    const day = date.toLocaleString("en-IN", {
      day: "numeric",
      timeZone: "Asia/Kolkata",
    });
    const month = date
      .toLocaleString("en-IN", { month: "short", timeZone: "Asia/Kolkata" })
      .toUpperCase();
    const year = date.toLocaleString("en-IN", {
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
    return `${day} ${month} ${year}`;
  };

  const BlogCard = ({ post }) => {
    return (
      <Link href={`/blog/${post.slug}`} className="h-full blog-card">
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden group flex flex-col h-full transform">
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
            <div className="absolute bottom-0 right-10 bg-white px-6 py-3 rounded-t-[20px] z-10 flex items-center justify-center">
              {/* Left Inverted Curve */}
              <div className="absolute bottom-0 -left-[20px] w-[20px] h-[20px] bg-transparent rounded-br-[20px] shadow-[10px_10px_0_10px_white] pointer-events-none"></div>

              {/* Right Inverted Curve */}
              <div className="absolute bottom-0 -right-[20px] w-[20px] h-[20px] bg-transparent rounded-bl-[20px] shadow-[-10px_10px_0_10px_white] pointer-events-none"></div>

              <span className="text-[#0088ff] text-[11px] font-bold tracking-widest uppercase">
                {formatDate(post.date)}
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-[#111] text-[22px] font-bold leading-[1.3] mb-6 group-hover:text-[#0088ff] transition-colors duration-300 break-words break-all line-clamp-3">
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
    <main
      ref={containerRef}
      className="min-h-screen bg-gray-50 font-sans pt-15 pb-15"
    >
      {/* ── HEADER ── */}
      <section
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 text-center mb-20 mt-10"
      >
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 blog-grid">
          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[450px] bg-gray-100 animate-pulse rounded-[24px]"
              ></div>
            ))
          ) : blogs.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-400 font-bold uppercase tracking-widest">
              No blog posts available yet.
            </div>
          ) : (
            blogs.map((post) => <BlogCard key={post._id} post={post} />)
          )}
        </div>
      </section>
    </main>
  );
}

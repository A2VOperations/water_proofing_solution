"use client";

import React, { useState, useEffect } from "react";
import { Star, CheckCircle2, ChevronDown } from "lucide-react";

// Helper for random relative time
const getRandomTime = () => {
  const options = [
    { unit: "hour", max: 23 },
    { unit: "day", max: 6 },
    { unit: "week", max: 3 },
    { unit: "month", max: 11 },
  ];
  const choice = options[Math.floor(Math.random() * options.length)];
  const value = Math.floor(Math.random() * choice.max) + 1;
  return `${value} ${choice.unit}${value > 1 ? "s" : ""} ago`;
};

const GoogleReviewsFallback = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "richa agarwal",
      avatar: "R",
      avatarBg: "bg-sky-400",
      rating: 5,
      time: "some time ago",
      text: "Great architect",
      hasCheck: true,
    },
    {
      id: 2,
      name: "Rishan Koner",
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocL...", // Mock
      rating: 5,
      time: "some time ago",
      text: "Left a 5-star rating. Excellent!",
      hasCheck: true,
      image: "https://lh3.googleusercontent.com/p/AF1Qip...", // Mock
    },
    {
      id: 3,
      name: "Sonum Chauhan",
      avatar: "S",
      avatarBg: "bg-teal-500",
      rating: 5,
      time: "some time ago",
      text: "Good job",
      hasCheck: true,
    },
    {
      id: 4,
      name: "BIRENDRA PRASAD",
      avatar: "B",
      avatarBg: "bg-green-600",
      rating: 5,
      time: "some time ago",
      text: "Good architect",
      hasCheck: true,
    },
    {
      id: 5,
      name: "arun ghai",
      avatar: "A",
      avatarBg: "bg-orange-500",
      rating: 5,
      time: "some time ago",
      text: "very good service",
      hasCheck: true,
    },
    {
      id: 6,
      name: "Vikash kumar",
      avatar: "V",
      avatarBg: "bg-emerald-700",
      rating: 5,
      time: "some time ago",
      text: "Vikas kumar",
      hasCheck: true,
      image: "https://lh3.googleusercontent.com/p/AF1Qip...", // Mock
    },
    {
      id: 7,
      name: "Dhruv goel",
      avatar: "D",
      avatarBg: "bg-cyan-600",
      rating: 5,
      time: "some time ago",
      text: "Nice",
      hasCheck: true,
    },
    {
      id: 8,
      name: "Sanjeev Kumar Agarwal",
      avatar: "S",
      avatarBg: "bg-purple-500",
      rating: 5,
      time: "some time ago",
      text: "Very professional organization",
      hasCheck: true,
    },
    {
      id: 9,
      name: "uttam choudhary",
      avatar: "U",
      avatarBg: "bg-indigo-400",
      rating: 5,
      time: "some time ago",
      text: "Osm",
      hasCheck: true,
    },
    {
      id: 10,
      name: "AjeetVt Singh",
      avatar: "A",
      avatarBg: "bg-emerald-900",
      rating: 5,
      time: "some time ago",
      text: "Good",
      hasCheck: true,
    },
    {
      id: 11,
      name: "suresh vishwakarma",
      avatar: "S",
      avatarBg: "bg-amber-600",
      rating: 5,
      time: "some time ago",
      text: "Awesome unique architecture office",
      hasCheck: true,
    },
    {
      id: 12,
      name: "Guurav Singh",
      avatar: "G",
      avatarBg: "bg-slate-500",
      rating: 5,
      time: "some time ago",
      text: "Nice and clean",
      hasCheck: true,
    },
  ]);

  useEffect(() => {
    setReviews(prev => prev.map(r => ({ ...r, time: getRandomTime() })));
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans bg-gray-50/30 rounded-3xl">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
        <div className="flex items-center gap-5">
          <span className="text-6xl font-extrabold text-gray-900 tracking-tight">4.5</span>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-800">Google Reviews</span>
            <div className="flex items-center gap-1 text-[#fbbc05]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill={i < 4.5 ? "currentColor" : "none"} strokeWidth={0} />
              ))}
              <span className="text-sm text-gray-400 ml-2">(155)</span>
            </div>
          </div>
        </div>
        <button className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-8 py-3 rounded-full font-bold transition-all shadow-md hover:shadow-xl active:scale-95 flex items-center gap-2">
          Review us on Google
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="break-inside-avoid bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-inner ${review.avatarBg || 'bg-gray-200'}`}>
                  {review.avatar.length <= 1 ? review.avatar : (
                    <img src={review.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-900 truncate text-[15px]">{review.name}</span>
                    {review.hasCheck && (
                      <div className="bg-blue-500 rounded-full p-0.5">
                        <CheckCircle2 size={10} className="text-white fill-white stroke-[3px]" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-4 h-4 shrink-0">
                      <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-tight">{review.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-0.5 text-[#fbbc05] mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
              ))}
            </div>

            <p className="text-[14px] text-gray-600 leading-snug mb-4 font-medium">
              {review.text}
            </p>

            {review.image && (
              <div className="rounded-xl overflow-hidden border border-gray-100 mb-2 shadow-sm group-hover:shadow-md transition-shadow">
                <img src="https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=800&auto=format&fit=crop" alt="Review photo" className="w-full object-cover aspect-video" />
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default GoogleReviewsFallback;

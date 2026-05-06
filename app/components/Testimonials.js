"use client";
import { useEffect, useState } from "react";

export default function Reviews() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!mounted) return <div className="min-h-[400px] flex items-center justify-center bg-gray-50 rounded-3xl animate-pulse text-gray-400 font-bold uppercase tracking-widest text-sm">Loading Reviews...</div>;

  return (
    <div className="elfsight-app-76cced13-196a-4907-9605-5a5159551101" />
  );
}
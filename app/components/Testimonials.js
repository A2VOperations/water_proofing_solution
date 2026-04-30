"use client";
import { useEffect } from "react";

export default function Reviews() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="elfsight-app-76cced13-196a-4907-9605-5a5159551101" />
  );
}
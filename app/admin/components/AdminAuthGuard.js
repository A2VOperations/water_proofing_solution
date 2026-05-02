"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminAuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Basic auth check using localStorage
    const authStatus = localStorage.getItem("adminAuth") === "true";
    
    if (!authStatus && pathname !== "/admin") {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, [pathname, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== "/admin") {
    return null;
  }

  return <>{children}</>;
}

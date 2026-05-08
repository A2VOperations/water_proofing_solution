"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminLoginAction } from "@/app/actions/admin";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await adminLoginAction(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result.success) {
      localStorage.setItem("adminAuth", "true");
      localStorage.setItem("adminUser", JSON.stringify(result.user));
      router.push("/admin/home");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100">
        <div className="bg-[#111] p-10 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0088ff] rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#0088ff] rounded-full opacity-20 blur-2xl"></div>

          <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2 relative z-10">
            {" "}
            Ras Care
          </h1>
          <p className="text-[#0088ff] font-bold tracking-[0.2em] uppercase text-xs relative z-10">
            Admin Portal
          </p>
        </div>

        <div className="p-10">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold text-center border border-red-100">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                placeholder="admin@waterproofing.com"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-[#0088ff] hover:bg-[#0070d6] text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(0,136,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,136,255,0.23)] hover:-translate-y-0.5 uppercase tracking-widest text-sm disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              {isLoading ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { updateUserSettingsAction, adminLoginAction, getUserSettingsAction } from "@/app/actions/admin";
import { CONTACT_CONFIG } from "@/app/config";


export default function AdminSettings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyTitle: "",
    address: "",
    numbers: [""],
    password: "",
    id: "",
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  // Fetch initial data from database
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("adminUser");
      if (storedUser) {
          const user = JSON.parse(storedUser);
          
          // Try to get fresh data from database
          const result = await getUserSettingsAction(user.email);
          
          if (result.success && result.user) {
              const freshUser = result.user;
              setFormData({
                  name: freshUser.name || "",
                  email: freshUser.email || "",
                  companyTitle: freshUser.companyTitle || CONTACT_CONFIG.companyTitle,
                  address: freshUser.address || CONTACT_CONFIG.address,
                  numbers: freshUser.numbers && freshUser.numbers.length > 0 ? freshUser.numbers : [CONTACT_CONFIG.phone],

                  password: "",
                  id: freshUser._id || freshUser.id || user.id || "",
              });
              // Sync localStorage with fresh data
              localStorage.setItem("adminUser", JSON.stringify({
                  ...user,
                  ...freshUser,
                  id: freshUser._id || freshUser.id || user.id
              }));
          } else {
              // Fallback to localStorage if database fetch fails
              setFormData({
                  name: user.name || "",
                  email: user.email || "",
                  companyTitle: user.companyTitle || CONTACT_CONFIG.companyTitle,
                  address: user.address || CONTACT_CONFIG.address,
                  numbers: user.numbers && user.numbers.length > 0 ? user.numbers : [CONTACT_CONFIG.phone],

                  password: "",
                  id: user.id || "",
              });
          }
      }
      setIsFetching(false);
    };
    loadUser();
  }, []);

  const handleAddNumber = () => {
    setFormData({ ...formData, numbers: [...formData.numbers, ""] });
  };

  const handleNumberChange = (index, value) => {
    const newNumbers = [...formData.numbers];
    newNumbers[index] = value;
    setFormData({ ...formData, numbers: newNumbers });
  };

  const handleRemoveNumber = (index) => {
    const newNumbers = formData.numbers.filter((_, i) => i !== index);
    setFormData({ ...formData, numbers: newNumbers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await updateUserSettingsAction(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      setIsSaved(true);
      localStorage.setItem("adminUser", JSON.stringify(result.user));
      setTimeout(() => {
        setIsSaved(false);
        setIsLoading(false);
      }, 1500);
    }
  };

  if (isFetching) return (
    <div className="p-20 text-center">
      <div className="w-10 h-10 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Settings...</p>
    </div>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto relative">
      {/* Loading Overlay */}
      {isLoading && !isSaved && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm transition-all">
          <div className="w-16 h-16 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 font-black uppercase tracking-[0.2em] text-[#111] text-xs">Saving Settings...</p>
        </div>
      )}

      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#111]">System Settings</h1>
          <p className="text-gray-500 font-medium mt-2">Manage your personal and company information.</p>
        </div>
        {isSaved && (
          <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg font-bold text-sm border border-green-100 flex items-center gap-2 animate-pulse">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            Settings Saved
          </div>
        )}
      </header>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-10">
          
          <section>
            <h2 className="text-[#0088ff] text-xs font-black tracking-widest uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Update Password (Leave empty to keep current)</label>
                <input 
                  type="password" 
                  value={formData.password || ""}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[#0088ff] text-xs font-black tracking-widest uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              Company Information
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Company Title</label>
                <input 
                  type="text" 
                  value={formData.companyTitle}
                  onChange={(e) => setFormData({...formData, companyTitle: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Office Address</label>
                <textarea 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900 resize-none h-28"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[#0088ff] text-xs font-black tracking-widest uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              Contact Numbers
            </h2>
            <div className="flex flex-col gap-4">
              {formData.numbers.map((num, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 flex flex-col gap-2">
                    <input 
                      type="tel" 
                      value={num}
                      onChange={(e) => handleNumberChange(i, e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                      placeholder={`Phone Number ${i + 1}`}
                    />
                  </div>
                  {formData.numbers.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => handleRemoveNumber(i)}
                      className="w-[56px] h-[56px] flex items-center justify-center shrink-0 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors border border-red-100"
                    >
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M20 12H4"></path></svg>
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button"
                onClick={handleAddNumber}
                className="self-start flex items-center gap-2 text-sm font-bold text-[#0088ff] hover:bg-[#0088ff] hover:text-white transition-colors bg-[#0088ff]/5 px-6 py-3.5 rounded-xl border border-[#0088ff]/20 mt-2"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
                Add Another Number
              </button>
            </div>
          </section>

          <div className="pt-6 border-t border-gray-100">
            <button 
              type="submit"
              className="bg-[#0088ff] hover:bg-[#0070d6] text-white font-bold px-10 py-5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(0,136,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,136,255,0.23)] hover:-translate-y-0.5 uppercase tracking-widest text-sm w-full sm:w-auto"
            >
              Save Settings
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

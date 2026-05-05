"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getServiceByIdAction, updateServiceAction } from "@/app/actions/admin";
import ImageUpload from "@/app/admin/components/ImageUpload";

export default function EditService() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    const result = await getServiceByIdAction(id);
    if (result.success) {
      setFormData(result.service);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  const handlePhotoSuccess = (index, url) => {
    const newPhotos = [...formData.photos];
    newPhotos[index] = url;
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleAddPhotoSlot = () => {
    setFormData({ ...formData, photos: [...formData.photos, ""] });
  };

  const handleFaqChange = (index, field, value) => {
    const newFaq = [...formData.faq];
    newFaq[index][field] = value;
    setFormData({ ...formData, faq: newFaq });
  };

  const handleAddFaq = () => {
    setFormData({ ...formData, faq: [...formData.faq, { question: "", answer: "" }] });
  };

  const handleRemoveFaq = (index) => {
    const newFaq = formData.faq.filter((_, i) => i !== index);
    setFormData({ ...formData, faq: newFaq });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError("");

    // Filter out empty strings from photos array
    const validPhotos = formData.photos.filter(img => img && img.trim() !== "");

    if (validPhotos.length === 0) {
      setError("Please upload at least one photo before publishing.");
      setIsUpdating(false);
      return;
    }

    // Filter out empty FAQs or invalid ones
    const validFaq = formData.faq.filter(f => f.question.trim() !== "" || f.answer.trim() !== "");
    
    // Check if any partially filled FAQs exist
    const hasIncompleteFaq = validFaq.some(f => f.question.trim() === "" || f.answer.trim() === "");
    if (hasIncompleteFaq) {
      setError("Please complete both the question and answer for all FAQs you've added, or remove the empty ones.");
      setIsUpdating(false);
      return;
    }

    const submissionData = {
      ...formData,
      photos: validPhotos,
      faq: validFaq
    };

    const result = await updateServiceAction(id, submissionData);
    if (result.success) {
      setIsSaved(true);
      setTimeout(() => router.push('/admin/services'), 1000);
    } else {
      setError(result.error);
    }
    setIsUpdating(false);
  };

  if (isLoading) return <div className="p-20 text-center font-black uppercase text-xs tracking-widest text-[#0088ff] animate-pulse">Loading Service Data...</div>;
  if (error) return <div className="p-20 text-center text-red-500 font-bold">{error}</div>;
  if (!formData) return null;

  return (
    <div className="p-8 max-w-5xl mx-auto relative">
      {/* Loading Overlay */}
      {isUpdating && !isSaved && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm transition-all">
          <div className="w-16 h-16 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 font-black uppercase tracking-[0.2em] text-[#111] text-xs">Updating Database...</p>
        </div>
      )}

      <header className="mb-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg>
          </button>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#111]">Edit Service</h1>
            <p className="text-gray-500 font-medium">Modifying: <span className="text-[#0088ff]">{formData.title}</span></p>
          </div>
        </div>
        {isSaved && (
          <div className="bg-green-50 text-green-600 px-6 py-3 rounded-2xl font-bold text-sm border border-green-100 flex items-center gap-2 animate-bounce">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
            Changes Saved Successfully
          </div>
        )}
      </header>

      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-12 space-y-12">
          
          {/* Info Section */}
          <section className="space-y-6">
            <h2 className="text-[#0088ff] text-xs font-black tracking-widest uppercase pb-4 border-b border-gray-100 flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Basic Information
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Service Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 outline-none focus:border-[#0088ff] focus:bg-white transition-all font-bold text-[#111]"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Category <span className="text-red-500">*</span></label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 outline-none focus:border-[#0088ff] focus:bg-white transition-all font-bold text-[#111]"
                  required
                >
                  <option value="Residential Solutions">Residential Solutions</option>
                  <option value="Specialized Solutions">Specialized Solutions</option>
                  <option value="Technical Solutions">Technical Solutions</option>
                  <option value="Premium Finishes">Premium Finishes</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Description <span className="text-red-500">*</span></label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 outline-none focus:border-[#0088ff] focus:bg-white transition-all font-medium text-gray-600 h-40 resize-none leading-relaxed"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Hero Product <span className="text-red-500">*</span></label>
                <select 
                  value={formData.isHeroProduct || "no"}
                  onChange={(e) => setFormData({...formData, isHeroProduct: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 outline-none focus:border-[#0088ff] focus:bg-white transition-all font-bold text-[#111]"
                  required
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
                <p className="text-[10px] text-gray-400 font-medium pl-1 italic">Selecting "Yes" will feature this product on the dashboard.</p>
              </div>
            </div>
          </section>

          {/* Photos Section */}
          <section className="space-y-6">
              <h2 className="text-[#0088ff] text-xs font-black tracking-widest uppercase pb-4 border-b border-gray-100 flex items-center gap-2">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Service Gallery <span className="text-red-500 ml-1">*</span>
              </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {formData.photos.map((photo, i) => (
                <div key={i} className="relative group rounded-3xl overflow-hidden border border-gray-100 bg-gray-50 h-56">
                  {photo ? (
                    <>
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                         <ImageUpload folder="services" onUploadSuccess={(url) => handlePhotoSuccess(i, url)} />
                         <button type="button" onClick={() => handleRemovePhoto(i)} className="text-white text-[10px] font-black uppercase tracking-widest hover:text-red-400">Remove Photo</button>
                      </div>
                    </>
                  ) : (
                    <ImageUpload folder="services" onUploadSuccess={(url) => handlePhotoSuccess(i, url)} />
                  )}
                  {formData.photos.length > 1 && (
                    <button type="button" onClick={() => handleRemovePhoto(i)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                onClick={handleAddPhotoSlot}
                className="h-56 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:text-[#0088ff] hover:border-[#0088ff] transition-all"
              >
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
                <span className="text-xs font-bold mt-2 uppercase tracking-widest">Add New Image</span>
              </button>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h2 className="text-[#0088ff] text-xs font-black tracking-widest uppercase flex items-center gap-2">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    F.A.Q Section
                </h2>
                <button type="button" onClick={handleAddFaq} className="text-[#0088ff] text-[10px] font-black uppercase tracking-widest border border-[#0088ff]/30 px-4 py-2 rounded-lg hover:bg-[#0088ff] hover:text-white transition-all">Add FAQ</button>
            </div>
            <div className="space-y-4">
              {formData.faq.map((item, i) => (
                <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-4 relative group">
                  <button type="button" onClick={() => handleRemoveFaq(i)} className="absolute top-8 right-8 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button><div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Question {i+1}</label>
                        <input 
                            type="text" 
                            value={item.question}
                            onChange={(e) => handleFaqChange(i, 'question', e.target.value)}
                            className="bg-white border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] font-bold text-gray-800"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Answer</label>
                        <textarea 
                            value={item.answer}
                            onChange={(e) => handleFaqChange(i, 'answer', e.target.value)}
                            className="bg-white border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] font-medium text-gray-600 h-24 resize-none"
                        />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="pt-8 border-t border-gray-100 flex gap-4">
            <button 
              type="submit" 
              disabled={isUpdating}
              className="bg-[#0088ff] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#0088ff]/30 hover:bg-[#0070d6] hover:-translate-y-1 transition-all disabled:opacity-50 flex-1"
            >
              {isUpdating ? "Saving Changes..." : "Update Service Database"}
            </button>
            <button 
                type="button"
                onClick={() => router.push("/admin/services")}
                className="px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all"
            >
                Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createServiceAction } from "@/app/actions/admin";
import ImageUpload from "@/app/admin/components/ImageUpload";

export default function AddServices() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "Residential Solutions",
    description: "",
    isHeroProduct: "no",
    photos: [""],
    youtubeLinks: [""],
    faq: [{ question: "", answer: "" }],
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddPhoto = () => setFormData({ ...formData, photos: [...formData.photos, ""] });
  const handlePhotoSuccess = (index, url) => {
    const newPhotos = [...formData.photos];
    newPhotos[index] = url;
    setFormData({ ...formData, photos: newPhotos });
  };
  const handleRemovePhoto = (index) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleAddYoutubeLink = () => setFormData({ ...formData, youtubeLinks: [...formData.youtubeLinks, ""] });
  const handleYoutubeLinkChange = (index, value) => {
    const newLinks = [...formData.youtubeLinks];
    newLinks[index] = value;
    setFormData({ ...formData, youtubeLinks: newLinks });
  };
  const handleRemoveYoutubeLink = (index) => {
    const newLinks = formData.youtubeLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, youtubeLinks: newLinks });
  };

  const handleAddFaq = () => setFormData({ ...formData, faq: [...formData.faq, { question: "", answer: "" }] });
  const handleFaqChange = (index, field, value) => {
    const newFaq = [...formData.faq];
    newFaq[index][field] = value;
    setFormData({ ...formData, faq: newFaq });
  };
  const handleRemoveFaq = (index) => {
    const newFaq = formData.faq.filter((_, i) => i !== index);
    setFormData({ ...formData, faq: newFaq });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Filter out empty strings from photos array
    const validPhotos = formData.photos.filter(img => img && img.trim() !== "");

    if (validPhotos.length === 0) {
      setError("Please upload at least one photo before publishing.");
      setIsLoading(false);
      return;
    }

    // Filter out empty FAQs or invalid ones
    const validFaq = formData.faq.filter(f => f.question.trim() !== "" || f.answer.trim() !== "");
    
    // Check if any partially filled FAQs exist
    const hasIncompleteFaq = validFaq.some(f => f.question.trim() === "" || f.answer.trim() === "");
    if (hasIncompleteFaq) {
      setError("Please complete both the question and answer for all FAQs you've added, or remove the empty ones.");
      setIsLoading(false);
      return;
    }

    const validYoutubeLinks = formData.youtubeLinks.filter(link => link && link.trim() !== "");

    const submissionData = {
      ...formData,
      photos: validPhotos,
      youtubeLinks: validYoutubeLinks,
      faq: validFaq
    };

    const result = await createServiceAction(submissionData);

    if (result.error) {
      setError(result.error);
    } else {
      setIsSaved(true);
      setFormData({ title: "", category: "Residential Solutions", description: "", photos: [""], youtubeLinks: [""], faq: [{ question: "", answer: "" }] });
      setTimeout(() => router.push('/admin/services'), 1000);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto relative">
      {/* Loading Overlay */}
      {isLoading && !isSaved && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm transition-all">
          <div className="w-16 h-16 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 font-black uppercase tracking-[0.2em] text-[#111] text-xs">Publishing Service...</p>
        </div>
      )}

      <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#111]">Add Service</h1>
          <p className="text-gray-500 font-medium mt-2">Create a new service offering with FAQs.</p>
        </div>
        {isSaved && (
          <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg font-bold text-sm border border-green-100 flex items-center gap-2 animate-pulse">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            Service Published
          </div>
        )}
      </header>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 flex flex-col gap-10">
          
          <section>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Service Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                  placeholder="e.g. Concrete Crack Injection"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Category <span className="text-red-500">*</span></label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                  required
                >
                  <option value="Residential Solutions">Residential Solutions</option>
                  <option value="Specialized Solutions">Specialized Solutions</option>
                  <option value="Technical Solutions">Technical Solutions</option>
                  <option value="Premium Finishes">Premium Finishes</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Service Description <span className="text-red-500">*</span></label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900 resize-none h-32"
                  placeholder="Describe the service in detail..."
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Hero Product <span className="text-red-500">*</span></label>
                <select 
                  value={formData.isHeroProduct}
                  onChange={(e) => setFormData({...formData, isHeroProduct: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                  required
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
                <p className="text-[10px] text-gray-400 font-medium pl-1 italic">Selecting "Yes" will feature this product on the dashboard.</p>
              </div>
            </div>
          </section>

          <section>
              <h2 className="text-[#0088ff] text-xs font-black tracking-widest uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Service Photos <span className="text-red-500 ml-1">*</span>
              </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {formData.photos.map((img, i) => (
                <div key={i} className="relative group">
                  <ImageUpload 
                    folder="services"
                    onUploadSuccess={(url) => handlePhotoSuccess(i, url)}
                  />
                  {formData.photos.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => handleRemovePhoto(i)}
                      className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button"
                onClick={handleAddPhoto}
                className="h-40 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-[#0088ff] hover:border-[#0088ff] transition-all"
              >
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
                <span className="text-xs font-bold mt-2 uppercase tracking-widest">Add Another Slot</span>
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-[#0088ff] text-xs font-black tracking-widest uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              YouTube Video Links
            </h2>
            <div className="flex flex-col gap-4">
              {formData.youtubeLinks.map((link, i) => (
                <div key={i} className="flex items-center gap-4">
                  <input 
                    type="url" 
                    value={link}
                    onChange={(e) => handleYoutubeLinkChange(i, e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  {formData.youtubeLinks.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => handleRemoveYoutubeLink(i)}
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shrink-0"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button"
                onClick={handleAddYoutubeLink}
                className="self-start flex items-center gap-2 text-sm font-bold text-[#0088ff] hover:bg-[#0088ff] hover:text-white transition-colors bg-[#0088ff]/5 px-6 py-3.5 rounded-xl border border-[#0088ff]/20 mt-2"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
                Add Another Video
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-[#0088ff] text-xs font-black tracking-widest uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-6">
              {formData.faq.map((item, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 relative">
                  <button 
                    type="button" 
                    onClick={() => handleRemoveFaq(i)}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M20 12H4"></path></svg>
                  </button>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Question {i + 1}</label>
                    <input 
                      type="text" 
                      value={item.question}
                      onChange={(e) => handleFaqChange(i, 'question', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                      placeholder="What is included?"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Answer</label>
                    <textarea 
                      value={item.answer}
                      onChange={(e) => handleFaqChange(i, 'answer', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900 resize-none h-24"
                      placeholder="We include..."
                      required
                    />
                  </div>
                </div>
              ))}
              <button 
                type="button"
                onClick={handleAddFaq}
                className="self-start flex items-center gap-2 text-sm font-bold text-[#0088ff] hover:bg-[#0088ff] hover:text-white transition-colors bg-[#0088ff]/5 px-6 py-3.5 rounded-xl border border-[#0088ff]/20"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
                Add Another FAQ
              </button>
            </div>
          </section>

          {error && (
            <div className="bg-red-50 text-red-500 px-6 py-4 rounded-xl font-bold text-sm border border-red-100 flex items-center gap-3">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              {error}
            </div>
          )}

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4">
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-[#0088ff] hover:bg-[#0070d6] text-white font-bold px-10 py-5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(0,136,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,136,255,0.23)] hover:-translate-y-0.5 uppercase tracking-widest text-sm w-full sm:w-auto disabled:opacity-50"
            >
              {isLoading ? "Publishing..." : "Publish Service"}
            </button>
            {isLoading && <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest animate-pulse">Uploading Data...</p>}
          </div>

        </form>
      </div>
    </div>
  );
}

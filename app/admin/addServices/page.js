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
    photos: [""],
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

    const result = await createServiceAction(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setIsSaved(true);
      setFormData({ title: "", category: "Residential Solutions", description: "", photos: [""], faq: [{ question: "", answer: "" }] });
      setTimeout(() => router.push('/admin/services'), 1000);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto relative">
      {/* Loading Overlay */}
      {isLoading && !isSaved && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm transition-all">
          <div className="w-16 h-16 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 font-black uppercase tracking-[0.2em] text-[#111] text-xs">Publishing Service...</p>
        </div>
      )}

      <header className="mb-10 flex justify-between items-end">
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
        <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-10">
          
          <section>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Service Title</label>
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
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Category</label>
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
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Service Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900 resize-none h-32"
                  placeholder="Describe the service in detail..."
                  required
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[#0088ff] text-xs font-black tracking-widest uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Service Photos (Cloudinary Upload)
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
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-6">
              {formData.faq.map((item, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 relative">
                  {formData.faq.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => handleRemoveFaq(i)}
                      className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M20 12H4"></path></svg>
                    </button>
                  )}
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

          <div className="pt-6 border-t border-gray-100">
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-[#0088ff] hover:bg-[#0070d6] text-white font-bold px-10 py-5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(0,136,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,136,255,0.23)] hover:-translate-y-0.5 uppercase tracking-widest text-sm w-full sm:w-auto disabled:opacity-50"
            >
              {isLoading ? "Publishing..." : "Publish Service"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getWorkByIdAction, updateWorkAction } from "@/app/actions/admin";
import ImageUpload from "@/app/admin/components/ImageUpload";
import Link from "next/link";

export default function EditWork() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [""],
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWork = async () => {
      const result = await getWorkByIdAction(id);
      if (result.success) {
        setFormData({
          title: result.work.title,
          description: result.work.description,
          images: result.work.images && result.work.images.length > 0 ? result.work.images : [""],
        });
      } else {
        setError(result.error || "Failed to load project");
      }
      setIsFetching(false);
    };
    fetchWork();
  }, [id]);

  const handleAddImage = () => setFormData({ ...formData, images: [...formData.images, ""] });
  
  const handleImageSuccess = (index, url) => {
    const newImages = [...formData.images];
    newImages[index] = url;
    setFormData({ ...formData, images: newImages });
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Filter out empty strings from images array
    const validImages = formData.images.filter(img => img && img.trim() !== "");

    if (validImages.length === 0) {
      setError("Please upload at least one image before saving.");
      setIsLoading(false);
      return;
    }

    const submissionData = {
      ...formData,
      images: validImages
    };

    const result = await updateWorkAction(id, submissionData);

    if (result.error) {
      setError(result.error);
    } else {
      setIsSaved(true);
      setTimeout(() => router.push('/admin/works'), 1000);
    }
    setIsLoading(false);
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Project...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 font-black uppercase tracking-[0.2em] text-[#111] text-xs">Saving Changes...</p>
        </div>
      )}

      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#111]">Edit Project</h1>
          <p className="text-gray-500 font-medium mt-2">Update your portfolio project details.</p>
        </div>
        {isSaved && (
          <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg font-bold text-sm border border-green-100 flex items-center gap-2 animate-pulse">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            Project Updated
          </div>
        )}
      </header>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-10">
          
          <section>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Project Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                  placeholder="e.g. High-Rise Terrace Sealing Project"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Project Description <span className="text-red-500">*</span></label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900 resize-none h-32"
                  placeholder="Describe the challenges and solutions provided..."
                  required
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[#0088ff] text-xs font-black tracking-widest uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Project Images <span className="text-red-500 ml-1">*</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {formData.images.map((img, i) => (
                <div key={i} className="relative group">
                    {img && (
                        <div className="absolute top-4 left-4 z-10">
                            <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-[#0088ff] shadow-sm border border-[#0088ff]/10 uppercase">Current Image</span>
                        </div>
                    )}
                  <ImageUpload 
                    folder="works"
                    onUploadSuccess={(url) => handleImageSuccess(i, url)}
                  />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveImage(i)}
                    className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              ))}
              <button 
                type="button"
                onClick={handleAddImage}
                className="h-40 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-[#0088ff] hover:border-[#0088ff] transition-all"
              >
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
                <span className="text-xs font-bold mt-2 uppercase tracking-widest">Add Image Slot</span>
              </button>
            </div>
          </section>

          {error && (
            <div className="bg-red-50 text-red-500 px-6 py-4 rounded-xl font-bold text-sm border border-red-100 flex items-center gap-3">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              {error}
            </div>
          )}

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link href="/admin/works" className="text-gray-400 hover:text-[#111] font-bold text-xs uppercase tracking-widest transition-colors">Discard Changes</Link>
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-[#0088ff] hover:bg-[#0070d6] text-white font-bold px-10 py-5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(0,136,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,136,255,0.23)] hover:-translate-y-0.5 uppercase tracking-widest text-sm w-full sm:w-auto disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Update Project"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

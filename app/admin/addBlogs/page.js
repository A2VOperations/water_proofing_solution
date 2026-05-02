"use client";
import { useState } from "react";
import { createBlogAction } from "@/app/actions/admin";
import ImageUpload from "@/app/admin/components/ImageUpload";

export default function AddBlogs() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    image: "",
    content: "",
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadKey, setUploadKey] = useState(0);
  const [imageUploaded, setImageUploaded] = useState(false);

  // ✅ Use functional updater to avoid stale closure
  const handleImageSuccess = (url) => {
    setFormData(prev => ({ ...prev, image: url }));
    setImageUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      setError("Please upload a cover image first.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await createBlogAction(formData);

      if (result.error) {
        setError(result.error);
      } else {
        setIsSaved(true);
        setFormData({ title: "", category: "", author: "", image: "", content: "" });
        setUploadKey(prev => prev + 1);
        setImageUploaded(false);
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 font-black uppercase tracking-[0.2em] text-[#111] text-xs">Publishing Article...</p>
        </div>
      )}

      <header className="mb-10 flex justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#111]">Add Blog Post</h1>
          <p className="text-gray-500 font-medium mt-2">Publish a new article to your blog.</p>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          {isSaved && (
            <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg font-bold text-sm border border-green-100 flex items-center gap-2">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
              Post Published!
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg font-bold text-sm border border-red-100 flex items-center gap-2 max-w-xs text-right">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              {error}
            </div>
          )}
        </div>
      </header>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-8">
          
          {/* Cover Image */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
              Cover Image {imageUploaded && <span className="text-green-500 ml-2">✓ Uploaded</span>}
            </label>
            <ImageUpload key={uploadKey} folder="blogs" onUploadSuccess={handleImageSuccess} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Article Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                placeholder="e.g. Tips for Roof Maintenance"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                placeholder="e.g. Waterproofing Tips"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Author Name</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                placeholder="e.g. John Doe"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Article Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900 resize-none h-64"
              placeholder="Write the full article content here..."
              required
            />
          </div>

          {/* Debug info - shows current image status */}
          <div className="text-[10px] text-gray-300 font-mono">
            Image ready: {formData.image ? "✓ YES" : "✗ NOT YET"}
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={isLoading || !formData.image}
              className="bg-[#0088ff] hover:bg-[#0070d6] text-white font-bold px-10 py-5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(0,136,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,136,255,0.23)] hover:-translate-y-0.5 uppercase tracking-widest text-sm w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? "Publishing..." : !formData.image ? "Upload Image First" : "Publish Article"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

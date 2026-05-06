"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBlogByIdAction, updateBlogAction } from "@/app/actions/admin";
import ImageUpload from "@/app/admin/components/ImageUpload";
import Link from "next/link";

export default function EditBlog() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    image: "",
    content: "",
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const result = await getBlogByIdAction(id);
      if (result.success) {
        setFormData({
          title: result.blog.title,
          category: result.blog.category,
          author: result.blog.author,
          image: result.blog.image,
          content: result.blog.content,
        });
        if (result.blog.image) setImageUploaded(true);
      } else {
        setError(result.error || "Failed to load blog post");
      }
      setIsFetching(false);
    };
    fetchBlog();
  }, [id]);

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
      const result = await updateBlogAction(id, formData);

      if (result.error) {
        setError(result.error);
      } else {
        setIsSaved(true);
        setTimeout(() => router.push('/admin/blogs'), 1000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Article...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-[#0088ff] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 font-black uppercase tracking-[0.2em] text-[#111] text-xs">Saving Changes...</p>
        </div>
      )}

      <header className="mb-10 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#111]">Edit Blog Post</h1>
          <p className="text-gray-500 font-medium mt-2">Update your published article details.</p>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          {isSaved && (
            <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg font-bold text-sm border border-green-100 flex items-center gap-2">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
              Changes Saved!
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
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 flex flex-col gap-8">
          
          {/* Cover Image */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
              Cover Image <span className="text-red-500">*</span> {imageUploaded && <span className="text-green-500 ml-2">✓ Ready</span>}
            </label>
            <div className="relative group">
                <ImageUpload folder="blogs" onUploadSuccess={handleImageSuccess} initialImage={formData.image} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Article Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900"
                placeholder="e.g. Best Practices for Terrace Waterproofing"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Category <span className="text-red-500">*</span></label>
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
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Article Content <span className="text-red-500">*</span></label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#0088ff] focus:bg-white focus:ring-4 focus:ring-[#0088ff]/10 transition-all font-medium text-gray-900 resize-none h-64"
              placeholder="Write the full article content here..."
              required
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#0088ff] hover:bg-[#0070d6] text-white font-bold px-10 py-5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(0,136,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,136,255,0.23)] hover:-translate-y-0.5 uppercase tracking-widest text-sm w-full sm:w-auto disabled:opacity-50 order-1 sm:order-2"
            >
              {isLoading ? "Saving..." : "Update Post"}
            </button>
            <Link href="/admin/blogs" className="text-gray-400 hover:text-[#111] font-bold text-xs uppercase tracking-widest transition-colors order-2 sm:order-1">Discard Changes</Link>
          </div>

        </form>
      </div>
    </div>
  );
}

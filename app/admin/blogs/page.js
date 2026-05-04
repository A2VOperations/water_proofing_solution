"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllBlogsAction, deleteBlogAction } from "@/app/actions/admin";

export default function ViewBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const result = await getAllBlogsAction();
    if (result.success) {
      setBlogs(result.blogs);
    }
    setLoading(false);
  };

  const handleDeleteClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteBlogAction(deleteId);
    if (result.success) {
      setBlogs(blogs.filter(b => b._id !== deleteId));
      setDeleteId(null);
    } else {
      alert(result.error || "Delete failed");
    }
    setIsDeleting(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#111]">Manage Blogs</h1>
          <p className="text-gray-500 font-medium mt-2">Edit or remove your published articles.</p>
        </div>
        <Link 
          href="/admin/addBlogs" 
          className="bg-[#0088ff] text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#0070d6] transition-all shadow-lg shadow-[#0088ff]/20 text-center"
        >
          Add New Blog
        </Link>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 bg-white rounded-[32px] animate-pulse border border-gray-100"></div>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No blog posts found in database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div 
                key={blog._id} 
                className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-[#0088ff]/30 transition-all hover:-translate-y-2 relative"
            >
              <div className="h-48 bg-gray-100 overflow-hidden relative">
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={(e) => handleDeleteClick(e, blog._id)}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-red-500 flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#0088ff] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(blog.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0088ff] px-2 py-0.5 border border-[#0088ff]/20 rounded">By {blog.author}</span>
                </div>
                <h3 className="text-xl font-black text-[#111] mb-3 group-hover:text-[#0088ff] transition-colors line-clamp-2">{blog.title}</h3>
                
                <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-6">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        {blog.readTime || '5 MIN READ'}
                    </p>
                    <Link href={`/blog/${blog.slug}`} target="_blank" className="text-[#0088ff] text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        View Live
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg>
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-center text-[#111] mb-2 tracking-tight">Delete Blog Post?</h3>
            <p className="text-gray-500 text-sm text-center mb-8 font-medium leading-relaxed">
              This action cannot be undone. The post and its associated cover image will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-3.5 rounded-xl font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50 text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-3.5 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50 text-sm flex items-center justify-center shadow-lg shadow-red-500/30"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

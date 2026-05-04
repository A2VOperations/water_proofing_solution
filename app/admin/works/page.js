"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllWorksAction, deleteWorkAction } from "@/app/actions/admin";

export default function ManageWorks() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    setLoading(true);
    const result = await getAllWorksAction();
    if (result.success) {
      setWorks(result.works);
    }
    setLoading(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteWorkAction(deleteId);
    if (result.success) {
      setWorks(works.filter(w => w._id !== deleteId));
      setDeleteId(null);
    } else {
      alert(result.error);
    }
    setIsDeleting(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#111]">Manage Works</h1>
          <p className="text-gray-500 font-medium mt-2">View and manage your recent project portfolio.</p>
        </div>
        <Link 
          href="/admin/addWork"
          className="bg-[#0088ff] text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#0070d6] transition-all shadow-lg shadow-[#0088ff]/20 text-center"
        >
          Add New Project
        </Link>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-80 bg-white rounded-[32px] animate-pulse border border-gray-100"></div>
          ))}
        </div>
      ) : works.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No projects found in database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <div key={work._id} className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                {work.images && work.images[0] ? (
                  <img src={work.images[0]} alt={work.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0088ff]">
                  {work.images?.length || 0} Images
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-[#111] mb-2 truncate">{work.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                  {work.description}
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleDeleteClick(work._id)}
                    className="flex-1 px-4 py-3 rounded-xl border border-red-100 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                  <Link 
                    href="/work" 
                    target="_blank"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors text-center"
                  >
                    View Live
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
            <h3 className="text-xl font-black text-center text-[#111] mb-2 tracking-tight">Delete Project?</h3>
            <p className="text-gray-500 text-sm text-center mb-8 font-medium leading-relaxed">
              This action cannot be undone. The project and its associated Cloudinary images will be permanently removed.
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

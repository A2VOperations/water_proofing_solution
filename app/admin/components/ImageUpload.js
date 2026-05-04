"use client";
import { useState } from "react";
import { uploadImageAction } from "@/app/actions/admin";

export default function ImageUpload({ onUploadSuccess, folder = "waterproofing" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary via Server Action
    setUploading(true);
    try {
      const base64 = await convertToBase64(file);
      const formData = new FormData();
      formData.append('image', base64);
      formData.append('folder', folder);
      
      const result = await uploadImageAction(formData);
      
      if (result.success) {
        onUploadSuccess(result.url);
      } else {
        alert(result.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center overflow-hidden group hover:border-[#0088ff] transition-colors cursor-pointer">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center text-gray-400 group-hover:text-[#0088ff]">
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span className="text-xs font-bold mt-2 uppercase tracking-widest">Click to Upload Image</span>
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={uploading}
        />
        {uploading && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      {preview && !uploading && (
        <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest text-center">Image Uploaded Successfully</p>
      )}
    </div>
  );
}

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Uploads a file (Buffer or Base64) to Cloudinary
 */
export const uploadImage = async (fileStr, folder = 'waterproofing') => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: folder,
      format: "webp",
      transformation: [
        { width: 1200, crop: "limit" },
        { quality: "auto:good" }
      ]
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

/**
 * Deletes an image from Cloudinary using its secure_url or public_id
 */
export const deleteImage = async (imageUrl) => {
  try {
    // Extract public_id from URL (e.g. waterproofing/abc123)
    const publicId = imageUrl.split('/').pop().split('.')[0];
    const folder = imageUrl.split('/').slice(-2, -1)[0];
    const fullPublicId = `${folder}/${publicId}`;
    
    await cloudinary.uploader.destroy(fullPublicId);
    return { success: true };
  } catch (error) {
    console.error('Cloudinary Delete Error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

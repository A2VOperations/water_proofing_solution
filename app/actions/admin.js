"use server";

import dbConnect from "@/backend/dbConfig/db";
import User from "@/backend/models/User";
import Service from "@/backend/models/Service";
import Work from "@/backend/models/Work";
import Blog from "@/backend/models/Blog";
import bcrypt from "bcryptjs";

import { deleteImage, uploadImage } from "@/backend/cloudinaryConfig";

export async function uploadImageAction(base64Image, folder) {
    try {
        const url = await uploadImage(base64Image, folder);
        return { success: true, url };
    } catch (error) {
        console.error("Upload Action Error:", error);
        return { error: "Failed to upload image" };
    }
}

export async function adminLoginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    await dbConnect();
    
    const user = await User.findOne({ email });
    if (!user) {
      return { error: "Invalid email or password" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: "Invalid email or password" };
    }

    // Return success
    return { 
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name
      }
    };

  } catch (error) {
    console.error("Login Action Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function updateUserSettingsAction(userData) {
    try {
        await dbConnect();
        
        const updateData = { ...userData };
        const userId = updateData.id || updateData._id;

        if (!userId && !updateData.email) {
            return { error: "User ID or Email is required for update" };
        }
        
        // If a new password is provided, hash it
        if (updateData.password && updateData.password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        } else {
            delete updateData.password; // Don't overwrite with empty
        }

        // Use ID for update if available, otherwise fallback to email (less safe if email is being changed)
        const query = userId ? { _id: userId } : { email: userData.email };
        
        const updatedUser = await User.findOneAndUpdate(
            query,
            { $set: updateData },
            { returnDocument: 'after' }
        );
        
        if (!updatedUser) return { error: "User not found" };
        
        return { success: true, user: JSON.parse(JSON.stringify(updatedUser)) };
    } catch (error) {
        console.error("Update User Error:", error);
        return { error: "Failed to update settings" };
    }
}

export async function getUserSettingsAction(email) {
    try {
        await dbConnect();
        const user = await User.findOne({ email }).select("-password");
        if (!user) return { error: "User not found" };
        return { success: true, user: JSON.parse(JSON.stringify(user)) };
    } catch (error) {
        console.error("Get User Settings Error:", error);
        return { error: "Failed to fetch settings" };
    }
}

export async function createWorkAction(workData) {
    try {
        await dbConnect();
        const newWork = await Work.create(workData);
        return { success: true, work: JSON.parse(JSON.stringify(newWork)) };
    } catch (error) {
        console.error("Create Work Error:", error);
        return { error: "Failed to create work entry" };
    }
}

export async function createServiceAction(serviceData) {
    try {
        await dbConnect();
        
        // Generate slug from title
        if (serviceData.title) {
            serviceData.slug = serviceData.title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '') // Remove non-word chars
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/-+/g, '-') // Replace multiple hyphens with single
                .trim();
        }

        const newService = await Service.create(serviceData);
        return { success: true, service: JSON.parse(JSON.stringify(newService)) };
    } catch (error) {
        console.error("Create Service Error:", error);
        return { error: "Failed to create service" };
    }
}

export async function createBlogAction(blogData) {
    try {
        await dbConnect();
        const newBlog = await Blog.create(blogData);
        return { success: true, blog: JSON.parse(JSON.stringify(newBlog)) };
    } catch (error) {
        console.error("Create Blog Error:", error);
        return { error: "Failed to create blog post" };
    }
}

export async function getAllServicesAction() {
    try {
        await dbConnect();
        const services = await Service.find({}).sort({ createdAt: -1 });
        return { success: true, services: JSON.parse(JSON.stringify(services)) };
    } catch (error) {
        console.error("Get All Services Error:", error);
        return { error: "Failed to fetch services" };
    }
}

export async function deleteServiceAction(serviceId) {
    try {
        await dbConnect();
        const service = await Service.findById(serviceId);
        if (!service) return { error: "Service not found" };

        // Delete images from Cloudinary if they exist
        if (service.photos && service.photos.length > 0) {
            for (const photoUrl of service.photos) {
                if (photoUrl.includes('cloudinary')) {
                    try {
                        await deleteImage(photoUrl);
                    } catch (err) {
                        console.error("Failed to delete image from Cloudinary:", photoUrl);
                    }
                }
            }
        }

        await Service.findByIdAndDelete(serviceId);
        return { success: true };
    } catch (error) {
        console.error("Delete Service Error:", error);
        return { error: "Failed to delete service" };
    }
}

export async function getServiceByIdAction(serviceId) {
    try {
        await dbConnect();
        const service = await Service.findById(serviceId);
        if (!service) return { error: "Service not found" };
        return { success: true, service: JSON.parse(JSON.stringify(service)) };
    } catch (error) {
        console.error("Get Service Error:", error);
        return { error: "Failed to fetch service" };
    }
}

export async function updateServiceAction(serviceId, serviceData) {
    try {
        await dbConnect();

        // Update slug if title changed
        if (serviceData.title) {
            serviceData.slug = serviceData.title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
        }

        const updatedService = await Service.findByIdAndUpdate(
            serviceId,
            { $set: serviceData },
            { returnDocument: 'after' }
        );
        if (!updatedService) return { error: "Service not found" };
        return { success: true, service: JSON.parse(JSON.stringify(updatedService)) };
    } catch (error) {
        console.error("Update Service Error:", error);
        return { error: "Failed to update service" };
    }
}

export async function getServiceBySlugAction(slug) {
    try {
        await dbConnect();
        const service = await Service.findOne({ slug });
        if (!service) return { error: "Service not found" };
        return { success: true, service: JSON.parse(JSON.stringify(service)) };
    } catch (error) {
        console.error("Get Service By Slug Error:", error);
        return { error: "Failed to fetch service" };
    }
}
export async function getAdminDetailsAction() {
    try {
        await dbConnect();
        // Find user with name "Admin"
        const admin = await User.findOne({ name: "Admin" }).select("-password");
        if (!admin) return { error: "Admin details not found" };
        return { success: true, admin: JSON.parse(JSON.stringify(admin)) };
    } catch (error) {
        console.error("Get Admin Details Error:", error);
        return { error: "Failed to fetch admin details" };
    }
}

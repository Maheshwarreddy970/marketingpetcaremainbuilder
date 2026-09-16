"use server";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file provided" };

    console.log(`📥 Received: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Stream the raw buffer directly to Cloudinary and let Cloudinary 
    // handle the resizing, format conversion (to AVIF), and compression natively.
    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "nexpetcare_uploads",
          resource_type: "image",
          // 🔥 Cloudinary Transformation flags (Replaces Sharp entirely on the server)
          transformation: [
            { width: 1920, crop: "limit" }, // Caps max width at 1920px without enlarging smaller images
            { fetch_format: "avif", quality: "auto:good" } // Automatically optimizes and converts to AVIF
          ]
        },
        (error, result) => {
          if (error || !result) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    console.log(`✅ Uploaded & Optimized via Cloudinary: ${uploadResult.secure_url}`);
    return { success: true, url: uploadResult.secure_url };
    
  } catch (error: any) {
    console.error("Image upload failed:", error);
    return { success: false, error: error.message };
  }
}
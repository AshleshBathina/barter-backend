import cloudinary from "../configs/cloudinary.js"
import fs from "fs/promises"

export const uploadImages = async (files) => {
  const uploadedUrls = [];

  for(let file of files){
    try{
      const result = await cloudinary.uploader.upload(file.path);
    
      uploadedUrls.push({imageUrl: result.secure_url, publicId: result.public_id});
    } finally{
      await fs.unlink(file.path);
    }
  }

  return uploadedUrls;
}

export const deleteImage = async (image) => {
  await cloudinary.uploader.destroy(image.publicId);
}

export const deleteImages = async (images) => {
  for(const image of images){
    await deleteImage(image);
  }
}
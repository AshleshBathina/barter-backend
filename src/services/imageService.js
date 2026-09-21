import cloudinary from "../configs/cloudinary.js"
import fs from "fs/promises"

export const uploadImage = async (file) => {
  try{
    const result = await cloudinary.uploader.upload(file.path); 
    return {imageUrl: result.secure_url, publicId: result.public_id};
  } finally{
    await fs.unlink(file.path);
  }
}

export const uploadImages = async (files) => {
  const uploadResults = [];

  for(let file of files){
    const uploadResult = await uploadImage(file);
    uploadResults.push(uploadResult);
  }

  return uploadResults;
}

export const deleteImage = async (image) => {
  await cloudinary.uploader.destroy(image.publicId);
}

export const deleteImages = async (images) => {
  for(const image of images){
    await deleteImage(image);
  }
}
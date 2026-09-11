import Post from "../models/postModel"
import cloudinary from "../configs/cloudinary"
import fs from "fs/promises"

export const createPost = async (req, res) => {
  try{
    const { title, type, description, inExchangeFor, location } = req.body;
    const {_id} = req.user;

    if(!req.files.length){
      return res.status(400).json({
        success: false,
        message: "Images required."
      })
    }

    if(!title || !type){
      return res.status(400).json({
        success: false,
        message: "Provide both Title and Type."
      });
    };

    const uploadedUrls = [];
    for(let file of req.files){
      const result = await cloudinary.uploader.upload(file.path);
      await fs.unlink(file.path);
      uploadedUrls.push(result.secure_url);
    }

    await Post.create({
      title, type, description, inExchangeFor, location, images: uploadedUrls, author: _id
    })

    return res.status(201).json({
      success: true,
      message: "Post created successfully."
    })
  } catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: e.message
    })
  }
}

export const updatePost = async (req, res) => {}

export const deletePost = async (req, res) => {}

export const getPosts = async (req, res) => {}

export const getPostById = async (req, res) => {}


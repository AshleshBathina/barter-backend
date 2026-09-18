import Post from "../models/postModel.js"
import cloudinary from "../configs/cloudinary.js"
import fs from "fs/promises"

export const createPost = async (req, res) => {
  try{
    const { title, type, description, inExchangeFor, longitude, latitude} = req.body;
    const {_id} = req.user;

    if(!req?.files?.length){
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

    if(!["online", "offline"].includes(type)){
      return res.status(400).json({
        success: false,
        message: "Type is invalid."
      });
    }

    const hasLatitude = latitude !== undefined && latitude !== "";
    const hasLongitude = longitude !== undefined && longitude !== "";
    const hasLocation = hasLatitude && hasLongitude;

    const lon = Number(longitude);
    const lat = Number(latitude);



    if(type === "offline" && !hasLocation){
      return res.status(400).json({
        success: false,
        message: "Provide location for offline barters."
      })
    }

    if(
      hasLocation &&
      (!Number.isFinite(lon) ||
       !Number.isFinite(lat) || 
       lon < -180 || 
       lon > 180 || 
       lat < -90 || 
       lat > 90
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid location coordinates."
      })
    }

    const uploadedUrls = [];
    for(let file of req.files){
      try{
        const result = await cloudinary.uploader.upload(file.path);
      
        uploadedUrls.push(result.secure_url);
      } catch(err){
        console.log("Error in createPost: ", err)
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        })
      } finally{
        await fs.unlink(file.path);
      }
    }

    const postData = {
      title,
      type,
      description,
      inExchangeFor,
      images: uploadedUrls,
      author: _id
    }

    if(hasLocation){
      postData.location = {
        type: "Point",
        coordinates: [lon, lat]
      }
    }

    await Post.create(postData);

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


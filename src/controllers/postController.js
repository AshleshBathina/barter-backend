import Post from "../models/postModel.js"
import { uploadImages, deleteImages } from "../services/imageService.js"
import { validateCoordinates } from "../utils/validateCoordinates.js"

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

    if(hasLocation && !validateCoordinates(lat, lon)) {
      return res.status(400).json({
        success: false,
        message: "Invalid location coordinates."
      })
    }

    const uploadedUrls = await uploadImages(req.files);

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

export const updatePost = async (req, res) => {
  try{
    const { id } = req.params;
    const { title, type, description, inExchangeFor, longitude, latitude} = req.body;

    const keptImageIds = JSON.parse(req.body.keptImageIds || "[]");

    const post = await Post.findOne({
      _id: id,
      author: req.user._id
    });

    if(!post){
      return res.status(404).json({
        success: false,
        message: "Post not found."
      });
    }

    if((keptImageIds?.length || 0) + (req.files?.length || 0) > 5){
      return res.status(400).json({
        success: false,
        message: "Images limit per post is 5"
      });
    }

    if(title){
      post.title = title;
    }

    if(type){
      post.type = type;
    }

    if(description){
      post.description = description;
    }

    if(inExchangeFor){
      post.inExchangeFor = inExchangeFor;
    }

    if(longitude != undefined && latitude != undefined){
      if(validateCoordinates(Number(latitude), Number(longitude))){
        post.location = {
          type: "Point",
          coordinates: [Number(longitude), Number(latitude)]
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid location coordinates."
        });
      }
    }

    const imagesToDelete = post.images.filter(img => !keptImageIds.includes(img._id.toString()));
    await deleteImages(imagesToDelete);

    const existingImages = post.images.filter(img => keptImageIds.includes(img._id.toString()));

    const newFiles = req.files || [];

    const uploadedImages = newFiles.length > 0 
    ? await uploadImages(newFiles)
    : [];

    post.images = [...existingImages, ...uploadedImages];

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully."
    })
  } catch(err){
    console.error("Error in updatePost: ", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const deletePost = async (req, res) => {}

export const getPosts = async (req, res) => {}

export const getPostById = async (req, res) => {}


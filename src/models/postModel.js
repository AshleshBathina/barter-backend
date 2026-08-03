import mongoose, { Mongoose } from "mongoose";

const postschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  inExchangeFor: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  images: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const postModel = mongoose.model("Post", postschema);

export default postModel;
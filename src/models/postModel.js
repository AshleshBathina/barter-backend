import mongoose, { Mongoose } from "mongoose";

const postschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ["offline", "online"],
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  inExchangeFor: {
    type: String,
    trim: true
  },
  location: {
    type: "Point",
    coordinates: {
      type: [Number]
    }
  },
  images: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  views: {
    type: Number
  }
});

const postModel = mongoose.model("Post", postschema);

export default postModel;
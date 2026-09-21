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
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  images: {
    type: [
      {
        imageUrl: {
          type: String,
          required: true
        },
        publicId: {
          type: String,
          required: true,
          select: false
        }
      }
    ],
  required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  views: {
    type: Number
  }
},
{
  timestamps: true
}
);

postschema.index({ location: "2dsphere" });

const postModel = mongoose.model("Post", postschema);

export default postModel;
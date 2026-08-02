import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 50
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 50
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-zA-Z0-9]{3,20}$/,
    minLength: 3,
    maxLength: 20,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    unique: true,
    lowercase: true,
    sparse: true,
    trim: true,
    type: String,
    match: /^\S+@\S+\.\S+$/
  },
  profilePicture: {
    type: String,
    default: null,
    trim: true
  },

}, { timestamps: true })

const userModel = mongoose.model('User', userSchema);

export default userModel;
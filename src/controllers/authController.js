import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/userModel.js";
import "../configs/env.js";

export const register = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ $or: [{ username }, { email }] }).lean();

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email or Username is already registered"
      });
    }

    const saltRounds = Number(process.env.BCRYPT_SALT)

    if (Number.isNaN(saltRounds)) {
      throw new Error("Invalid Salt Rounds");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = { username, firstName, email, password: hashedPassword };
    if (lastName) {
      userData.lastName = lastName;
    }

    const user = await User.create(userData);

    const payload = {
      username: user.username,
      firstName: user.firstName,
      ...(user.lastName && { lastName: user.lastName }),
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      success: true,
      jwtToken: token,
      user: payload
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message
    });
  }
}

export const login = async (req, res) => {
  try {
    const { id, password } = req.body;

    const user = await User.findOne({ $or: [{ email: id }, { username: id }] }).lean();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Wrong Password"
      });
    }

    const payload = {
      username: user.username,
      firstName: user.firstName,
      ...(user.lastName && { lastName: user.lastName }),
      email: user.email,
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      jwtToken,
      user: payload
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
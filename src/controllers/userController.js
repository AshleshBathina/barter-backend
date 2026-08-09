import User from "../models/userModel.js";

export const isUsernameTaken = async (req, res) => {
  try {
    const username = req.query.username;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Provide Username."
      })
    }

    const user = await User.exists({ username });

    if (user) {
      return res.status(200).json({
        success: true,
        data: {
          available: false,
          username,
        },
        message: "Username already exists"
      })
    }

    return res.status(200).json({
      success: true,
      data: {
        available: true,
        username,
      },
      message: "Username available"
    })
  } catch (err) {
    console.error("Server error: ", err)
    return res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}
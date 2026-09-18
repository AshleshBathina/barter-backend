import multer from "multer";

export const errorMiddleware = (err, req, res, next) => {
  console.log(`[${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]: ${req.user.username} exceeded file limit.`)

  if(err instanceof multer.MulterError){
    if(err.code === "LIMIT_UNEXPECTED_FILE"){
      return res.status(400).json({
        success: false,
        message: "Maximum images limit exceeded."
      })
    }

    if(err instanceof multer.MulterError){
      if(err.code === "LIMIT_FILE_SIZE"){
        return res.status(400).json({
          success: false,
          message: "Each image must be smaller than 10 MB."
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
} 
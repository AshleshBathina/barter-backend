import express from "express";
import { createPost, updatePost } from "../controllers/postController.js";  
import { upload } from "../middleware/multerMiddleware.js"; 
import authenticate from "../middleware/authMiddleware.js";

const router = express()

router.post('/', authenticate, upload.array('images', 5), createPost);
router.put('/:id', authenticate, upload.array('images', 5), updatePost);

export default router;
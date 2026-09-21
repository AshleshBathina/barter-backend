import express from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/postController.js";  
import { upload } from "../middleware/multerMiddleware.js"; 
import authenticate from "../middleware/authMiddleware.js";

const router = express()
router.use(authenticate);

router.post('/', upload.array('images', 5), createPost);
router.put('/:id', upload.array('images', 5), updatePost);
router.delete('/:id', deletePost);
router.get('/', getPosts)
router.get('/:id', getPostById);

export default router;
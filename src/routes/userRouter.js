import express from "express";
import { isUsernameTaken } from "../controllers/userController.js";
import validateUsername from "../middleware/validateUsername.js"

const router = express();

router.get("/availability", validateUsername, isUsernameTaken);

export default router;
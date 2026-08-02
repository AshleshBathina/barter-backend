import express from "express";
import { isUsernameTaken } from "../controllers/userController.js";

const router = express();

router.get("/availability", isUsernameTaken);

export default router;
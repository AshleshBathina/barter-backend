import express from "express"
import { login, register } from "../controllers/authController.js"
import validateRegister from "../middleware/validateRegister.js";
import validateLogin from "../middleware/validateLogin.js";
const router = express();

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);

export default router
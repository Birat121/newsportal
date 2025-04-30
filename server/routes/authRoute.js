import { register, login, logout, getCurrentUser,adminLogin,adminLogout} from "../controllers/authController.js";
import { Router } from "express";
import validateRequest from "../middleware/validatorRequest.js";
import { registerValidation, loginValidation } from "../utils/authValidator.js";

const authRouter = Router();

authRouter.post("/register", registerValidation, validateRequest, register);
authRouter.post("/login", loginValidation, validateRequest, login);
authRouter.post("/logout", logout);
authRouter.get("/user", getCurrentUser);
authRouter.post("/admin",adminLogin);
authRouter.post("/admin/logout",adminLogout);






export default authRouter;
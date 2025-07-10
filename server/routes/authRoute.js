import { adminLogin, adminLogout } from "../controllers/authController.js";
import { Router } from "express";


const authRouter = Router();


authRouter.post("/login", adminLogin);
authRouter.post("/logout", adminLogout);


export default authRouter;
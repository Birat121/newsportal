import { Router } from "express";
import multer, { memoryStorage } from "multer";
import {
  createAd,
  getAds,
  getAdById,
  updateAd,
  deleteAd,
} from "../controllers/AdController.js";

const adRouter = Router();

const storage = memoryStorage();
const upload = multer({ storage });

// Match the field name in frontend: formData.append("adFile", file)
adRouter.post("/uploadAd", upload.single("adFile"), createAd);
adRouter.get("/getAd", getAds);
adRouter.get("/getAd/:id", getAdById);
adRouter.put("/updateAd/:id", upload.single("adFile"), updateAd);
adRouter.delete("/delete/:id", deleteAd);

export default adRouter;



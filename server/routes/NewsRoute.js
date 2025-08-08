import express from "express";
import multer from "multer";
import {
  createMultipleNews,
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
  getNewsByCategory,
  getNewsByCategoryGroup,
  getTrendingNews,
  getDashboardStats,
  getSharePreview
} from "../controllers/newsController.js";

const newsRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Multiple news upload with multiple images (field name 'images')
newsRouter.post("/multiple", upload.array("images"), createMultipleNews);

// Single news upload with single image (field name 'imageFile')
newsRouter.post("/single", upload.single("imageFile"), createNews);

newsRouter.get("/getNews", getNews);
newsRouter.get("/getNews/:id", getNewsById);
newsRouter.put("/updateNews/:id", upload.single("imageFile"), updateNews);
newsRouter.delete("/deleteNews/:id", deleteNews);
newsRouter.get("/category/:slug", getNewsByCategory);
newsRouter.get("/category-section", getNewsByCategoryGroup);
newsRouter.get("/trending", getTrendingNews);
newsRouter.get("/stats", getDashboardStats);
newsRouter.get("/share-preview/:id", getSharePreview);

export default newsRouter;

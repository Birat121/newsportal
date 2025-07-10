import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  category: {
    type: String,
    required: true,
    enum: ["Politics", "Sports", "Technology", "Business", "Entertainment"], // adjust based on your frontend
  },
  author: { type: String },
  tags: [String],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const News = mongoose.model("News", NewsSchema);
export default News;

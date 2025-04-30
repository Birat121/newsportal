import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  author: { type: String },
  tags: [String],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const News = mongoose.model("News", NewsSchema);
export default News;

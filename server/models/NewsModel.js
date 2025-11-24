import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },

  // User-selectable category (NO "समाचार" here)
  category: {
    type: String,
    required: true,
    enum: [
      "समाज",
      "राजनीति",
      "स्थानीय तह",
      "मनोरंजन",
      "साहित्य",
      "अन्तरबार्ता",
      "खेलकुद",
      "प्रदेश"
    ]
  },

  // Automatically added parent category
  parentCategory: { type: String, default: "समाचार" },

  trending: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("News", NewsSchema);


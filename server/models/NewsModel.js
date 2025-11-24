import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  category: {
    type: String,
    required: true,
    enum: [
      "समाचार",
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
  trending: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("News", NewsSchema);

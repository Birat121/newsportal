import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Ad = mongoose.model("Ad", adSchema);
export default Ad;

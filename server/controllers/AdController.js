import Ad from "../models/AdModel.js";
import imagekit from "../config/imagekit.js";

// Create Ad
export async function createAd(req, res) {
  try {
    const file = req.file;
    const { description } = req.body;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const uploadResponse = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    const ad = new Ad({
      imageUrl: uploadResponse.url,
      description,
    });

    await ad.save();
    res.status(201).json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get all Ads
export async function getAds(req, res) {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get Ad by ID
export async function getAdById(req, res) {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update Ad
export async function updateAd(req, res) {
  try {
    const { description } = req.body;
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });

    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
      });
      ad.imageUrl = uploadResponse.url;
    }

    ad.description = description || ad.description;
    await ad.save();
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete Ad
export async function deleteAd(req, res) {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.json({ message: "Ad deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const express = require("express");
const GalleryImage = require("../Models/Galleryimage.models");
const router = express.Router();

// Get all gallery images
router.get("/", async (req, res) => {
  try {
    const images = await GalleryImage.find().sort("-uploadedAt");
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get images by category
router.get("/:category", async (req, res) => {
  try {
    const images = await GalleryImage.find({
      category: req.params.category,
    }).sort("-uploadedAt");

    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

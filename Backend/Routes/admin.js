const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/auth");
const upload = require("../Middlewares/upload");
const GalleryImage = require("../Models/Galleryimage.models");

// Upload new gallery image
router.post("/gallery", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newImage = new GalleryImage({
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      category: req.body.category,
      uploadedBy: req.user.id,
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

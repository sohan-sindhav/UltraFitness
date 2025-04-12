import express from "express";
import multer from "multer";
import cloudinary from "../Utils/cloudinary.js";
import GalleryImage from "../models/GalleryImages.js"; // your mongoose model

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { title, tag } = req.body;
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const streamifier = await import("streamifier");

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "Ultra_fitness",
      },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Cloudinary upload failed" });
        }

        // Save image metadata to MongoDB
        const newImage = new GalleryImage({
          title,
          tag,
          imageUrl: result.secure_url,
        });

        await newImage.save();

        return res.status(200).json({
          message: "Image uploaded and saved",
          image: newImage,
        });
      }
    );

    streamifier.default.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/gallery", async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

export default router;

import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../Utils/cloudinary.js";
import GalleryImage from "../models/GalleryImages.js";

const router = express.Router();

// Configure multer with file size limits
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

router.post("/upload", upload.single("image"), async (req, res) => {
  console.log("\n===== NEW UPLOAD REQUEST RECEIVED =====");
  console.log("Headers:", req.headers);
  console.log("Request body keys:", Object.keys(req.body));

  try {
    // Validate input
    if (!req.file) {
      console.log("ERROR: No file received in upload");
      return res.status(400).json({ error: "No image file provided" });
    }

    console.log("File received:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: `${(req.file.size / 1024 / 1024).toFixed(2)}MB`,
      bufferLength: req.file.buffer.length,
    });

    if (!req.body.title || !req.body.tag) {
      console.log("ERROR: Missing title or tag", {
        title: req.body.title,
        tag: req.body.tag,
      });
      return res.status(400).json({ error: "Title and tag are required" });
    }

    console.log("Cloudinary config verification:", {
      cloud_name: !!cloudinary.config().cloud_name,
      api_key: !!cloudinary.config().api_key,
      api_secret: !!cloudinary.config().api_secret,
    });

    // Upload to Cloudinary
    console.log("Starting Cloudinary upload...");
    const uploadStartTime = Date.now();

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "Ultra_fitness",
          resource_type: "image",
        },
        (error, result) => {
          const uploadTime = Date.now() - uploadStartTime;
          if (error) {
            console.error(
              "Cloudinary upload failed after",
              uploadTime,
              "ms:",
              error
            );
            reject(error);
          } else {
            console.log("Cloudinary upload completed in", uploadTime, "ms");
            console.log("Cloudinary result:", {
              url: result.secure_url,
              bytes: result.bytes,
              format: result.format,
            });
            resolve(result);
          }
        }
      );

      console.log("Creating read stream from buffer");
      const readStream = streamifier.createReadStream(req.file.buffer);

      readStream.on("error", (err) => {
        console.error("Read stream error:", err);
        reject(err);
      });

      uploadStream.on("error", (err) => {
        console.error("Upload stream error:", err);
        reject(err);
      });

      console.log("Piping to Cloudinary...");
      readStream.pipe(uploadStream);
    });

    // Save to database
    console.log("Saving to database...");
    const newImage = new GalleryImage({
      title: req.body.title,
      tag: req.body.tag,
      imageUrl: uploadResult.secure_url,
    });

    await newImage.save();
    console.log("Database save complete");

    // Return success response
    console.log("Upload process completed successfully");
    res.status(200).json({
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    console.error("\n===== UPLOAD ERROR =====");
    console.error("Error occurred:", error);
    console.error("Error stack:", error.stack);
    console.error("Full error object:", JSON.stringify(error, null, 2));

    // Handle specific errors
    let statusCode = 500;
    let errorMessage = "Upload failed";

    if (error.message.includes("File too large")) {
      statusCode = 413;
      errorMessage = "File size exceeds 5MB limit";
    } else if (error.message.includes("image files")) {
      statusCode = 400;
      errorMessage = "Only image files are allowed";
    } else if (error.message.includes("Cloudinary")) {
      errorMessage = "Image upload service error";
    }

    res.status(statusCode).json({
      error: errorMessage,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});
router.get("/gallery", async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch images",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;

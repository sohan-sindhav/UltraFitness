import cloudinary from "cloudinary";

// Validate environment variables
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing Cloudinary configuration environment variables");
}

// Set up the Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Verify configuration
console.log("Cloudinary configured with:", {
  cloud: !!cloudinary.config().cloud_name,
  apiKey: !!cloudinary.config().api_key,
  apiSecret: !!cloudinary.config().api_secret ? "***" : "missing",
});

export default cloudinary;

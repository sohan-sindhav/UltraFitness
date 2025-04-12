import mongoose from "mongoose";

const GalleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tag: {
      type: String,
      enum: [
        "equipment",
        "yoga",
        "cardio",
        "training",
        "facilities",
        "classes",
        "others",
      ],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GalleryImage", GalleryImageSchema);

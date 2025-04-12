import { mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

function DBconnect() {
  try {
    mongoose.connect(MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting Database", error);
  }
}

export default DBconnect;

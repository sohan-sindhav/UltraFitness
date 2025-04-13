import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import DBconnect from "./DB/DBconnect.js";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

import uploadRoute from "./routes/upload.js";

//parsing cookies

import cookieParser from "cookie-parser";

import AuthRoutes from "./Routes/auth.js";
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://ultrafitness.onrender.com", "http://localhost:5173"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.use(express.json());
DBconnect();
// should NOT be undefined

// app.get("/", (req, res) => {
//   res.send("app is working");
// });

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "failed to fetch todos", error: err });
  }
});

app.post("/todos", async (req, res) => {
  const { text } = req.body;

  try {
    const newTodo = new Todo({
      text,
    });
    await newTodo.save();
    res.status(200).json({ message: "todo saved", newTodo });
  } catch (error) {
    res.status(500).json({ message: "failed to add todo", error: err });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo Deleted" });
  } catch (err) {
    res.status(500).json({ message: "failed to delete todo", error: err });
  }
});
app.use("/auth", AuthRoutes);
app.use("/api", uploadRoute);

//servering frontend

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your React build folder
const frontendDistPath = path.join(__dirname, "../Frontend/dist");

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(frontendDistPath));

// Fallback: Send index.html for all other routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

app.listen(PORT || 5000);

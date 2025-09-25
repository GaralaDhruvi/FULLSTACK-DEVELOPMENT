// app.js - Job Portal Resume Upload
const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 3000;

// Static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configure multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"));
    }
  }
});

// Routes
app.get("/", (req, res) => {
  res.render("index", { message: null, error: null });
});

app.post("/upload", upload.single("resume"), (req, res) => {
  res.render("index", { message: "Resume uploaded successfully ✅", error: null });
});

// Error handling
app.use((err, req, res, next) => {
  res.render("index", { message: null, error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load .env FIRST
dotenv.config();

console.log("Gemini Key:", process.env.GEMINI_API_KEY);

const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const progressRoutes = require("./routes/progressRoutes");
const aptitudeRoutes = require("./routes/aptitudeRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const companyPreparationRoutes = require("./routes/companyPreparationRoutes");
const path = require("path");
const leetcodeRoutes = require("./routes/leetcodeRoutes");
const resumeAIRoutes = require("./routes/resumeAI");
const profileRoutes = require("./routes/profileRoutes");
const questionRoutes = require("./routes/questionRoutes");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/aptitude", aptitudeRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/pdfs", express.static(path.join(__dirname, "public/pdfs")));
app.use("/api/company-preparation", companyPreparationRoutes);
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api/ai", resumeAIRoutes);
app.use("/api/profile", profileRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/questions", questionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
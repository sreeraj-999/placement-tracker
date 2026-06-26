const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const progressRoutes = require("./routes/progressRoutes");
const aptitudeRoutes = require("./routes/aptitudeRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const companyRoutes = require("./routes/companyRoutes");

dotenv.config();

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
app.use("/api/company", companyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
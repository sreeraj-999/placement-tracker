const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const authMiddleware = require("../middleware/authMiddleware");

// Add Resume Score
router.post(
  "/add",
  authMiddleware,
  async (req, res) => {
    try {
      const { score } = req.body;

      const resume = new Resume({
        userId: req.user.id,
        score,
      });

      await resume.save();

      res.status(201).json({
        message: "Resume Score Added Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Get User Resume Scores
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const resume = await Resume.find({
        userId: req.user.id,
      });

      res.status(200).json(resume);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
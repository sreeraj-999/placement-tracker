const express = require("express");
const router = express.Router();

const Progress = require("../models/Progress");
const authMiddleware = require("../middleware/authMiddleware");

// Add Progress
router.post(
  "/add",
  authMiddleware,
  async (req, res) => {
    try {
      const { topic, problemsSolved } = req.body;

      const progress = new Progress({
        userId: req.user.id,
        topic,
        problemsSolved,
      });

      await progress.save();

      res.status(201).json({
        message:
          "Progress Added Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Get User Progress
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const progress =
        await Progress.find({
          userId: req.user.id,
        });

      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
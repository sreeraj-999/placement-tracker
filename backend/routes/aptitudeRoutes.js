const express = require("express");
const router = express.Router();
const Aptitude = require("../models/Aptitude");
const authMiddleware = require("../middleware/authMiddleware");

// Add Aptitude Score
router.post(
  "/add",
  authMiddleware,
  async (req, res) => {
    try {
      const { quant, logical, verbal } = req.body;

      const aptitude = new Aptitude({
        userId: req.user.id,
        quant,
        logical,
        verbal,
      });

      await aptitude.save();

      res.status(201).json({
        message: "Aptitude Score Added Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Get User Aptitude Scores
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const aptitude = await Aptitude.find({
        userId: req.user.id,
      });

      res.status(200).json(aptitude);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const authMiddleware = require("../middleware/authMiddleware");

// Add Company Progress
router.post(
  "/add",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        companyName,
        aptitude,
        coding,
        interview,
      } = req.body;

      const company = new Company({
        userId: req.user.id,
        companyName,
        aptitude,
        coding,
        interview,
      });

      await company.save();

      res.status(201).json({
        message: "Company Added Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Get User Companies
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const companies = await Company.find({
        userId: req.user.id,
      });

      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Delete Company
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      await Company.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });

      res.status(200).json({
        message: "Company Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
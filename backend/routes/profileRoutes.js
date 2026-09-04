const express = require("express");
const router = express.Router();

const StudentProfile = require("../models/StudentProfile");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/profileUpload");
router.post(
  "/create",
  authMiddleware,
  upload.single("profilePhoto"),
  async (req, res) => {
    console.log("Profile Create API Called");

    try {

      const exists = await StudentProfile.findOne({
        userId: req.user.id,
      });

      if (exists) {
        return res.status(400).json({
          message: "Profile already exists",
        });
      }

      const profile = new StudentProfile({
        userId: req.user.id,

        profilePhoto: req.file
          ? req.file.filename
          : "",

        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,

        linkedin: req.body.linkedin,
        github: req.body.github,
        leetcode: req.body.leetcode,
        portfolio: req.body.portfolio,
      });

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);

router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      userId: req.user.id,
    });

    res.json(profile);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.put(
  "/update",
  authMiddleware,
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      const profile = await StudentProfile.findOne({
        userId: req.user.id,
      });

      if (!profile) {
        return res.status(404).json({
          message: "Profile not found",
        });
      }

      if (req.file) {
        profile.profilePhoto = req.file.filename;
      }

      profile.fullName = req.body.fullName;
      profile.email = req.body.email;
      profile.phone = req.body.phone;

      profile.linkedin = req.body.linkedin;
      profile.github = req.body.github;
      profile.leetcode = req.body.leetcode;
      profile.portfolio = req.body.portfolio;

      await profile.save();

      res.json(profile);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

module.exports = router;
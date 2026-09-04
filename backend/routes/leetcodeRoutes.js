const express = require("express");
const axios = require("axios");
const router = express.Router();

const Leetcode = require("../models/Leetcode");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/sync", authMiddleware, async (req, res) => {
  try {
    const { username } = req.body;

    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: {
          username,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
        },
      }
    );

    const user = response.data.data.matchedUser;

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const stats = user.submitStats.acSubmissionNum;

    let profile = await Leetcode.findOne({
      userId: req.user.id,
    });

    if (!profile) {
      profile = new Leetcode({
        userId: req.user.id,
      });
    }

    

    profile.username = username;
    profile.totalSolved = stats[0].count;
    profile.easySolved = stats[1].count;
    profile.mediumSolved = stats[2].count;
    profile.hardSolved = stats[3].count;
    profile.lastSync = new Date();

    await profile.save();

    res.json(profile);

  } catch (err) {
    console.log(err.response?.data || err.message);

    res.status(500).json({
      message: "Unable to fetch profile",
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await Leetcode.findOne({
      userId: req.user.id,
    });

    res.json(profile);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
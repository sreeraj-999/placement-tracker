const express = require("express");
const axios = require("axios");
const router = express.Router();

const Leetcode = require("../models/Leetcode");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/sync", authMiddleware, async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({
        message: "LeetCode username is required",
      });
    }

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
        variables: { username: username.trim() },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
        },
      }
    );

    const user = response.data?.data?.matchedUser;

    if (!user) {
      return res.status(404).json({
        message: "LeetCode user not found",
      });
    }

    const stats = user.submitStats.acSubmissionNum;
    const totalSolved = Number(stats[0]?.count || 0);
    const easySolved = Number(stats[1]?.count || 0);
    const mediumSolved = Number(stats[2]?.count || 0);
    const hardSolved = Number(stats[3]?.count || 0);

    let profile = await Leetcode.findOne({
      userId: req.user.id,
    });

    const now = new Date();

    if (!profile) {
      profile = new Leetcode({
        userId: req.user.id,
        username: user.username,
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        syncHistory: [
          {
            date: now,
            problemsSolved: 0,
            totalSolved,
          },
        ],
      });
    } else {
      const previousTotal = Number(profile.totalSolved || 0);
      const difference = Math.max(0, totalSolved - previousTotal);

      profile.username = user.username;
      profile.totalSolved = totalSolved;
      profile.easySolved = easySolved;
      profile.mediumSolved = mediumSolved;
      profile.hardSolved = hardSolved;

      profile.syncHistory.push({
        date: now,
        problemsSolved: difference,
        totalSolved,
      });
    }

    profile.lastSync = now;
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.response?.data || err.message);

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
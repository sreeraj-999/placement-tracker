const express = require("express");
const router = express.Router();

const Aptitude = require("../models/Aptitude");
const authMiddleware = require("../middleware/authMiddleware");


// SAVE APTITUDE TEST RESULT

router.post(
  "/add",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        category,
        score,
        totalQuestions,
        percentage
      } = req.body;


      const result = new Aptitude({

        userId: req.user.id,

        category,
        score,
        totalQuestions,
        percentage,

      });


      await result.save();


      res.status(201).json(result);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Unable to save aptitude result"
      });

    }

  }
);


// GET ALL APTITUDE RESULTS

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const results =
        await Aptitude.find({
          userId: req.user.id
        }).sort({
          createdAt: -1
        });


      res.json(results);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Unable to fetch aptitude results"
      });

    }

  }
);


module.exports = router;
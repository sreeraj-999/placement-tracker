const express = require("express");
const router = express.Router();

const Question = require("../models/Question");

// GET 10 RANDOM QUESTIONS BY CATEGORY

router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const questions = await Question.aggregate([
      {
        $match: {
          category: category,
        },
      },
      {
        $sample: {
          size: 10,
        },
      },
      {
        $project: {
          question: 1,
          options: 1,
          category: 1,
        },
      },
    ]);

    res.json(questions);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Unable to fetch questions",
    });
  }
});


// CHECK STUDENT ANSWERS

router.post("/submit/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const { answers } = req.body;

    let score = 0;

    for (const answer of answers) {
      const question = await Question.findOne({
        _id: answer.questionId,
        category: category,
      });

      if (
        question &&
        question.correctAnswer === answer.selectedAnswer
      ) {
        score++;
      }
    }

    const totalQuestions = answers.length;

    const percentage =
      totalQuestions > 0
        ? (score / totalQuestions) * 100
        : 0;

    res.json({
      score,
      totalQuestions,
      percentage,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Unable to calculate score",
    });
  }
});


module.exports = router;
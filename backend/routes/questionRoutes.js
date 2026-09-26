const express = require("express");
const router = express.Router();

const Question = require("../models/Question");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// =====================================================
// ADMIN
// GET ALL QUESTIONS
// =====================================================

router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const questions = await Question.find().sort({
        category: 1,
        createdAt: -1,
      });

      res.json(questions);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Unable to fetch questions",
      });
    }
  }
);


// =====================================================
// ADMIN
// ADD QUESTION
// =====================================================

router.post(
  "/admin/add",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const {
        category,
        question,
        options,
        correctAnswer,
      } = req.body;


      // CHECK CATEGORY

      if (
        ![
          "quantitative",
          "logical",
          "verbal",
        ].includes(category)
      ) {
        return res.status(400).json({
          message: "Invalid question category",
        });
      }


      // CHECK QUESTION

      if (
        !question ||
        question.trim() === ""
      ) {
        return res.status(400).json({
          message: "Question is required",
        });
      }


      // CHECK OPTIONS

      if (
        !Array.isArray(options) ||
        options.length !== 4
      ) {
        return res.status(400).json({
          message:
            "Exactly 4 options are required",
        });
      }


      // CHECK EMPTY OPTIONS

      if (
        options.some(
          (option) =>
            !option ||
            option.trim() === ""
        )
      ) {
        return res.status(400).json({
          message:
            "All four options are required",
        });
      }


      // CHECK CORRECT ANSWER

      if (
        !correctAnswer ||
        !options.includes(correctAnswer)
      ) {
        return res.status(400).json({
          message:
            "Correct answer must match one of the options",
        });
      }


      const newQuestion =
        new Question({
          category,
          question: question.trim(),
          options,
          correctAnswer,
        });


      await newQuestion.save();


      res.status(201).json({
        message:
          "Question added successfully",

        question: newQuestion,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Unable to add question",
      });
    }
  }
);


// =====================================================
// ADMIN
// EDIT QUESTION
// =====================================================

router.put(
  "/admin/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const {
        category,
        question,
        options,
        correctAnswer,
      } = req.body;


      // CHECK CATEGORY

      if (
        ![
          "quantitative",
          "logical",
          "verbal",
        ].includes(category)
      ) {
        return res.status(400).json({
          message: "Invalid question category",
        });
      }


      // CHECK QUESTION

      if (
        !question ||
        question.trim() === ""
      ) {
        return res.status(400).json({
          message: "Question is required",
        });
      }


      // CHECK OPTIONS

      if (
        !Array.isArray(options) ||
        options.length !== 4
      ) {
        return res.status(400).json({
          message:
            "Exactly 4 options are required",
        });
      }


      // CHECK EMPTY OPTIONS

      if (
        options.some(
          (option) =>
            !option ||
            option.trim() === ""
        )
      ) {
        return res.status(400).json({
          message:
            "All four options are required",
        });
      }


      // CHECK CORRECT ANSWER

      if (
        !correctAnswer ||
        !options.includes(correctAnswer)
      ) {
        return res.status(400).json({
          message:
            "Correct answer must match one of the options",
        });
      }


      const updatedQuestion =
        await Question.findByIdAndUpdate(
          req.params.id,

          {
            category,
            question: question.trim(),
            options,
            correctAnswer,
          },

          {
            new: true,
            runValidators: true,
          }
        );


      if (!updatedQuestion) {
        return res.status(404).json({
          message: "Question not found",
        });
      }


      res.json({
        message:
          "Question updated successfully",

        question: updatedQuestion,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Unable to update question",
      });
    }
  }
);


// =====================================================
// ADMIN
// DELETE QUESTION
// =====================================================

router.delete(
  "/admin/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const deletedQuestion =
        await Question.findByIdAndDelete(
          req.params.id
        );


      if (!deletedQuestion) {
        return res.status(404).json({
          message: "Question not found",
        });
      }


      res.json({
        message:
          "Question deleted successfully",
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Unable to delete question",
      });
    }
  }
);


// =====================================================
// STUDENT
// GET 10 RANDOM QUESTIONS BY CATEGORY
// =====================================================

router.get(
  "/:category",
  async (req, res) => {
    try {
      const category =
        req.params.category.toLowerCase();


      // VALIDATE CATEGORY

      if (
        ![
          "quantitative",
          "logical",
          "verbal",
        ].includes(category)
      ) {
        return res.status(400).json({
          message: "Invalid question category",
        });
      }


      const questions =
        await Question.aggregate([
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
        message:
          "Unable to fetch questions",
      });
    }
  }
);


// =====================================================
// STUDENT
// CHECK ANSWERS
// =====================================================

router.post(
  "/submit/:category",
  async (req, res) => {
    try {
      const category =
        req.params.category.toLowerCase();

      const { answers } = req.body;


      if (!Array.isArray(answers)) {
        return res.status(400).json({
          message:
            "Invalid answers format",
        });
      }


      let score = 0;


      for (const answer of answers) {

        const question =
          await Question.findOne({
            _id: answer.questionId,
            category: category,
          });


        if (
          question &&
          question.correctAnswer ===
            answer.selectedAnswer
        ) {
          score++;
        }
      }


      const totalQuestions =
        answers.length;


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
        message:
          "Unable to calculate score",
      });
    }
  }
);


module.exports = router;
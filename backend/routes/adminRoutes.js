const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Question = require("../models/Question");
const Aptitude = require("../models/Aptitude");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// ==========================================
// ADMIN DASHBOARD
// ==========================================

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {

      const totalStudents =
        await User.countDocuments({
          role: "student",
        });

      const totalQuestions =
        await Question.countDocuments();

      const totalTestAttempts =
        await Aptitude.countDocuments();

      const totalAdmins =
        await User.countDocuments({
          role: "admin",
        });


      res.json({
        totalStudents,
        totalQuestions,
        totalTestAttempts,
        totalAdmins,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Unable to load admin dashboard",
      });

    }
  }
);


// ==========================================
// GET ALL STUDENTS
// ==========================================

router.get(
  "/students",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {

      const students = await User.find(
        {
          role: "student",
        },
        {
          password: 0,
        }
      ).sort({
        createdAt: -1,
      });


      res.json(students);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Unable to fetch students",
      });

    }
  }
);


// ==========================================
// GET SINGLE STUDENT
// ==========================================

router.get(
  "/students/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {

      const student =
        await User.findOne(
          {
            _id: req.params.id,
            role: "student",
          },
          {
            password: 0,
          }
        );


      if (!student) {
        return res.status(404).json({
          message: "Student not found",
        });
      }


      res.json(student);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Unable to fetch student profile",
      });

    }
  }
);


module.exports = router;
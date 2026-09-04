const express = require("express");
const router = express.Router();

const fs = require("fs");
const pdfParse = require("pdf-parse");

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const genAI = require("../config/gemini");
const ResumeAnalysis = require("../models/ResumeAnalysis");

router.post(
  "/analyze",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {

      // Read uploaded PDF
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(dataBuffer);

      const resumeText = pdfData.text;

      const prompt = `
You are a professional ATS (Applicant Tracking System) Resume Analyzer.

Evaluate the following resume using ONLY the scoring rubric below.

Scoring Rubric:

Contact Information : 10 marks
Education           : 15 marks
Skills              : 20 marks
Projects            : 20 marks
Experience          : 20 marks
Formatting          : 10 marks
Grammar             : 5 marks

Instructions:

- Be strict and consistent.
- Never generate random scores.
- Award marks only if the section is present and well written.
- Do NOT calculate the total score.
- Return ONLY valid JSON.
- Do NOT wrap the response inside markdown.
- Do NOT add explanations outside JSON.

Return JSON exactly like this:

{
  "contact": 0,
  "education": 0,
  "skills": 0,
  "projects": 0,
  "experience": 0,
  "formatting": 0,
  "grammar": 0,

  "strengths": [
    "...",
    "..."
  ],

  "weaknesses": [
    "...",
    "..."
  ],

  "skillsDetected": [
    "...",
    "..."
  ],

  "missingSkills": [
    "...",
    "..."
  ],

  "suggestions": [
    "...",
    "..."
  ]
}

Resume:

${resumeText}
`;

      const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      let text = result.text;

      text = text.replace(/```json/g, "");
      text = text.replace(/```/g, "");
      text = text.trim();

      const analysis = JSON.parse(text);

      // Calculate Score Yourself
      const resumeScore =
        Number(analysis.contact) +
        Number(analysis.education) +
        Number(analysis.skills) +
        Number(analysis.projects) +
        Number(analysis.experience) +
        Number(analysis.formatting) +
        Number(analysis.grammar);

      const atsScore = resumeScore;

      const saved = new ResumeAnalysis({

        userId: req.user.id,

        resumeScore,

        atsScore,

        strengths: analysis.strengths,

        weaknesses: analysis.weaknesses,

        missingSkills: analysis.missingSkills,

        suggestions: analysis.suggestions,

        skillsDetected: analysis.skillsDetected,

      });

      await saved.save();

      // Delete uploaded file
      fs.unlinkSync(req.file.path);

      res.json({
        success: true,

        resumeScore,

        atsScore,

        breakdown: {
          contact: analysis.contact,
          education: analysis.education,
          skills: analysis.skills,
          projects: analysis.projects,
          experience: analysis.experience,
          formatting: analysis.formatting,
          grammar: analysis.grammar,
        },

        strengths: analysis.strengths,

        weaknesses: analysis.weaknesses,

        skillsDetected: analysis.skillsDetected,

        missingSkills: analysis.missingSkills,

        suggestions: analysis.suggestions,
      });

    } catch (error) {

      console.log(error);

      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }
);

module.exports = router;
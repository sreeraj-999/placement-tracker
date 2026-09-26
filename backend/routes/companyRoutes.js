const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const Company = require("../models/Company");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// ======================================================
// PDF STORAGE
// ======================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = req.params.folderName;

    const folderPath = path.join(
      __dirname,
      "../public/pdfs",
      folderName.toLowerCase()
    );

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, {
        recursive: true,
      });
    }

    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


// Only PDF files are allowed
const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const isPDF =
      file.mimetype === "application/pdf" ||
      file.originalname
        .toLowerCase()
        .endsWith(".pdf");

    if (!isPDF) {
      return cb(
        new Error("Only PDF files are allowed")
      );
    }

    cb(null, true);
  },
});


// ======================================================
// GET ALL COMPANIES
// STUDENT + ADMIN
// ======================================================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const companies = await Company.find()
        .sort({ name: 1 });

      res.status(200).json(companies);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed to fetch companies",
      });
    }
  }
);


// ======================================================
// GET COMPANY PDFS
// STUDENT + ADMIN
// ======================================================

router.get(
  "/:folderName/pdfs",
  authMiddleware,
  async (req, res) => {
    try {
      const folderName =
        req.params.folderName.toLowerCase();

      const company =
        await Company.findOne({
          folderName,
        });

      if (!company) {
        return res.status(404).json({
          message: "Company not found",
        });
      }

      const folderPath = path.join(
        __dirname,
        "../public/pdfs",
        company.folderName
      );

      if (!fs.existsSync(folderPath)) {
        return res.status(200).json([]);
      }

      const files = fs
        .readdirSync(folderPath)
        .filter((file) =>
          file.toLowerCase().endsWith(".pdf")
        );

      const pdfs = files.map((file) => ({
        title: file.replace(/\.pdf$/i, ""),
        fileName: file,
        url: `/pdfs/${company.folderName}/${file}`,
      }));

      res.status(200).json(pdfs);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed to fetch question papers",
      });
    }
  }
);


// ======================================================
// ADD COMPANY
// ADMIN ONLY
// ======================================================

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const {
        name,
        description,
        eligibility,
        skills,
        folderName,
      } = req.body;

      if (!name || !folderName) {
        return res.status(400).json({
          message:
            "Company name and folder name are required",
        });
      }

      const cleanName = name.trim();
      const cleanFolder =
        folderName.trim().toLowerCase();

      const existingCompany =
        await Company.findOne({
          $or: [
            { name: cleanName },
            { folderName: cleanFolder },
          ],
        });

      if (existingCompany) {
        return res.status(400).json({
          message: "Company already exists",
        });
      }

      const folderPath = path.join(
        __dirname,
        "../public/pdfs",
        cleanFolder
      );

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, {
          recursive: true,
        });
      }

      const company = new Company({
        name: cleanName,
        description:
          description?.trim() || "",
        eligibility:
          eligibility?.trim() || "",
        skills:
          skills?.trim() || "",
        folderName: cleanFolder,
      });

      await company.save();

      res.status(201).json({
        message: "Company added successfully",
        company,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed to add company",
      });
    }
  }
);


// ======================================================
// EDIT COMPANY
// ADMIN ONLY
// ======================================================

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const {
        name,
        description,
        eligibility,
        skills,
      } = req.body;

      const company =
        await Company.findById(req.params.id);

      if (!company) {
        return res.status(404).json({
          message: "Company not found",
        });
      }

      if (name !== undefined) {
        company.name = name.trim();
      }

      if (description !== undefined) {
        company.description =
          description.trim();
      }

      if (eligibility !== undefined) {
        company.eligibility =
          eligibility.trim();
      }

      if (skills !== undefined) {
        company.skills = skills.trim();
      }

      await company.save();

      res.status(200).json({
        message: "Company updated successfully",
        company,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed to update company",
      });
    }
  }
);


// ======================================================
// DELETE COMPANY
// ADMIN ONLY
// ======================================================

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const company =
        await Company.findById(req.params.id);

      if (!company) {
        return res.status(404).json({
          message: "Company not found",
        });
      }

      // Delete only the MongoDB company record.
      // Existing PDF files are kept safe.
      await Company.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Company deleted successfully. PDF files were kept.",
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed to delete company",
      });
    }
  }
);


// ======================================================
// UPLOAD PDF
// ADMIN ONLY
// ======================================================

router.post(
  "/:folderName/pdf",
  authMiddleware,
  adminMiddleware,
  upload.single("pdf"),
  async (req, res) => {
    try {
      const folderName =
        req.params.folderName.toLowerCase();

      const company =
        await Company.findOne({
          folderName,
        });

      if (!company) {
        return res.status(404).json({
          message: "Company not found",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Please select a PDF file",
        });
      }

      res.status(201).json({
        message: "PDF uploaded successfully",

        pdf: {
          title: req.file.originalname.replace(
            /\.pdf$/i,
            ""
          ),

          fileName: req.file.filename,

          url: `/pdfs/${folderName}/${req.file.filename}`,
        },
      });

    } catch (error) {
      console.log(error);

      // Remove partially uploaded file if an error occurs
      if (req.file?.path) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (deleteError) {
          console.log(deleteError);
        }
      }

      res.status(500).json({
        message:
          error.message ||
          "Failed to upload PDF",
      });
    }
  }
);


// ======================================================
// DELETE PDF
// ADMIN ONLY
// ======================================================

router.delete(
  "/:folderName/pdf/:fileName",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const folderName =
        req.params.folderName.toLowerCase();

      const fileName =
        req.params.fileName;

      const company =
        await Company.findOne({
          folderName,
        });

      if (!company) {
        return res.status(404).json({
          message: "Company not found",
        });
      }

      const filePath = path.join(
        __dirname,
        "../public/pdfs",
        company.folderName,
        fileName
      );

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          message: "PDF not found",
        });
      }

      fs.unlinkSync(filePath);

      res.status(200).json({
        message: "PDF deleted successfully",
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed to delete PDF",
      });
    }
  }
);


module.exports = router;
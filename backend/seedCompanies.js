const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const Company = require("./models/Company");

dotenv.config();

const companies = [
  {
    name: "TCS",
    folderName: "tcs",
    description: "Tata Consultancy Services placement preparation.",
    eligibility: "As per TCS recruitment criteria.",
    skills: "Aptitude, Coding, Programming, Communication",
  },
  {
    name: "Infosys",
    folderName: "infosys",
    description: "Infosys placement preparation and previous papers.",
    eligibility: "As per Infosys recruitment criteria.",
    skills: "Aptitude, Coding, Programming, Logical Reasoning",
  },
  {
    name: "Wipro",
    folderName: "wipro",
    description: "Wipro placement preparation and previous papers.",
    eligibility: "As per Wipro recruitment criteria.",
    skills: "Aptitude, Coding, Programming, Communication",
  },
  {
    name: "Accenture",
    folderName: "accenture",
    description: "Accenture placement preparation and previous papers.",
    eligibility: "As per Accenture recruitment criteria.",
    skills: "Aptitude, Coding, Logical Reasoning, Programming",
  },
  {
    name: "UST",
    folderName: "ust",
    description: "UST placement preparation and previous papers.",
    eligibility: "As per UST recruitment criteria.",
    skills: "Aptitude, Coding, Programming, Problem Solving",
  },
  {
    name: "IBM",
    folderName: "ibm",
    description: "IBM placement preparation and previous papers.",
    eligibility: "As per IBM recruitment criteria.",
    skills: "Coding, Programming, Problem Solving, Aptitude",
  },
  {
    name: "EY",
    folderName: "ey",
    description: "EY placement preparation and previous papers.",
    eligibility: "As per EY recruitment criteria.",
    skills: "Aptitude, Communication, Logical Reasoning, Technical Skills",
  },
];

async function seedCompanies() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const pdfFolder = path.join(
      __dirname,
      "public",
      "pdfs"
    );

    for (const companyData of companies) {
      const folderPath = path.join(
        pdfFolder,
        companyData.folderName
      );

      // Only create the company if its PDF folder exists
      if (!fs.existsSync(folderPath)) {
        console.log(
          `Skipping ${companyData.name} - folder not found`
        );
        continue;
      }

      const existingCompany =
        await Company.findOne({
          folderName: companyData.folderName,
        });

      if (existingCompany) {
        console.log(
          `${companyData.name} already exists`
        );
        continue;
      }

      await Company.create(companyData);

      console.log(
        `${companyData.name} added successfully`
      );
    }

    console.log("Company seeding completed");

    await mongoose.connection.close();

  } catch (error) {
    console.log("Seed Error:", error);

    await mongoose.connection.close();
  }
}

seedCompanies();
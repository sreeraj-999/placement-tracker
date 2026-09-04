const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/:company", (req, res) => {

    const company = req.params.company.toLowerCase();

    const folderPath = path.join(
        __dirname,
        "../public/pdfs",
        company
    );

    if (!fs.existsSync(folderPath)) {
        return res.json([]);
    }

    const files = fs.readdirSync(folderPath);

    const pdfs = files.map(file => ({
        title: file.replace(".pdf", ""),
        url: `/pdfs/${company}/${file}`
    }));

    res.json(pdfs);

});

module.exports = router;
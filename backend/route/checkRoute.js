import express from "express";
import multer from "multer";
import extractPdf from "../utils/extractPdf.js";
import { checkRulesWithGemini } from "../utils/geminiService.js";

const router = express.Router();
const upload = multer();

router.post("/check", upload.single("pdf"), async (req, res) => {
  try {
    const pdfBuffer = req.file.buffer;
    const rules = req.body.rules ? JSON.parse(req.body.rules) : [];

    const text = await extractPdf(pdfBuffer);

    const results = await checkRulesWithGemini(text, rules);

    res.json({ text, results });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;

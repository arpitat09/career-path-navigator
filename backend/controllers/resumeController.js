import * as pdfModule from "pdf-parse";

import {
  analyzeResumeText
} from "../services/resumeAnalyzer.js";

/*
=========================================================
PDF TEXT EXTRACTION
=========================================================
*/

async function extractPdfText(
  buffer
) {
  /*
   * pdf-parse 2.x
   */

  if (
    pdfModule.PDFParse
  ) {
    const parser =
      new pdfModule.PDFParse({
        data: buffer
      });

    try {
      const result =
        await parser.getText();

      return result?.text || "";

    } finally {
      if (
        typeof parser.destroy ===
        "function"
      ) {
        await parser.destroy();
      }
    }
  }

  /*
   * Compatibility with older versions.
   */

  if (
    typeof pdfModule.default ===
    "function"
  ) {
    const result =
      await pdfModule.default(
        buffer
      );

    return result?.text || "";
  }

  throw new Error(
    "Unable to read the PDF."
  );
}

/*
=========================================================
ANALYZE RESUME
=========================================================
*/

export async function analyzeResume(
  req,
  res
) {
  console.log(
    "📄 Resume analysis request received"
  );

  try {
    /*
     * Check file.
     */

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload a PDF resume."
      });
    }

    console.log(
      "📄 File:",
      req.file.originalname
    );

    console.log(
      "📦 Size:",
      req.file.size,
      "bytes"
    );

    /*
     * Check file type.
     */

    if (
      req.file.mimetype !==
      "application/pdf"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only PDF files are allowed."
      });
    }

    /*
     * Extract text.
     */

    console.log(
      "📖 Extracting PDF text..."
    );

    const rawText =
      await extractPdfText(
        req.file.buffer
      );

    console.log(
      "📝 Extracted characters:",
      rawText.length
    );

    /*
     * Make sure the PDF actually
     * contains readable text.
     */

    if (
      rawText.trim().length < 100
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Could not extract enough text from this PDF. Please upload a text-based resume PDF."
      });
    }

    /*
     * Analyze locally.
     */

    console.log(
      "🔎 Running resume analysis..."
    );

    const analysis =
      analyzeResumeText(
        rawText
      );

    console.log(
      "📊 ATS Score:",
      analysis.atsScore
    );

    console.log(
      "🛠️ Skills:",
      analysis.skills
    );

    /*
     * Send result.
     */

    return res.status(200).json({
      success: true,

      fileName:
        req.file.originalname,

      analysis
    });

  } catch (error) {
    console.error(
      "❌ Resume analysis error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Resume analysis failed."
    });
  }
}
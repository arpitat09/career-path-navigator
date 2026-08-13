import express from "express";
import multer from "multer";

import {
  analyzeResume
} from "../controllers/resumeController.js";

const router =
  express.Router();

/*
=========================================================
MULTER
=========================================================
*/

const upload =
  multer({
    storage:
      multer.memoryStorage(),

    limits: {
      fileSize:
        5 * 1024 * 1024
    },

    fileFilter:
      (req, file, cb) => {
        if (
          file.mimetype ===
          "application/pdf"
        ) {
          cb(
            null,
            true
          );
        } else {
          cb(
            new Error(
              "Only PDF files are allowed."
            )
          );
        }
      }
  });

/*
=========================================================
TEST
=========================================================
*/

router.get(
  "/test",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Resume API is working."
    });
  }
);

/*
=========================================================
ANALYZE
=========================================================
*/

router.post(
  "/analyze",
  upload.single("resume"),
  analyzeResume
);

export default router;
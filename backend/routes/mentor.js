import express from "express";

import {
  mentorChat,
} from "../controllers/mentorController.js";

const router =
  express.Router();

router.post(
  "/chat",
  mentorChat
);

router.get(
  "/test",
  (req, res) => {
    res.json({
      success: true,
      message:
        "AI Mentor API is working.",
    });
  }
);

export default router;
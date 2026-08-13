import {
  askGeminiMentor,
} from "../services/ai/geminiService.js";

export async function mentorChat(
  req,
  res
) {
  try {
    const { message } = req.body;

    if (
      !message ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a message.",
      });
    }

    const answer =
      await askGeminiMentor(
        message
      );

    return res.status(200).json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error(
      "❌ AI Mentor error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "AI Mentor is temporarily unavailable.",
      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
}
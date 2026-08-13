import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is missing from backend/.env"
  );
}

const genAI =
  new GoogleGenerativeAI(apiKey);

const model =
  genAI.getGenerativeModel({
    model: "gemini-3.5-flash-lite",
  });

export async function askGeminiMentor(
  message
) {
  if (
    !message ||
    !message.trim()
  ) {
    throw new Error(
      "Mentor message cannot be empty."
    );
  }

  const prompt = `
You are CareerPath AI Mentor.

Help students with:
- career guidance
- programming
- technology learning
- skill development
- project ideas
- interview preparation
- placement preparation
- study roadmaps
- career questions

Give practical, clear and concise answers.

If the question is unrelated to
career, education, programming,
technology, or professional development,
politely explain that you focus on
career and learning guidance.

Student's question:
${message.trim()}
`;

  console.log(
    "🤖 AI Mentor request started..."
  );

  const result =
    await model.generateContent(
      prompt
    );

  const text =
    result.response.text();

  if (
    !text ||
    !text.trim()
  ) {
    throw new Error(
      "Gemini returned an empty response."
    );
  }

  console.log(
    "✅ AI Mentor response received."
  );

  return text.trim();
}
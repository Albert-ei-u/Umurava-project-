import dotenv from "dotenv";

dotenv.config();

const required = ["MONGODB_URI"];

required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`[env] ${key} is not set. Using fallback if provided.`);
  }
});

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  mongoUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/umurava_screening",
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiModel: process.env.GEMINI_MODEL || "gemini-1.5-pro-latest",
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean),
};

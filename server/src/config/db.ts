import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../utils/logger";

export const connectDb = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error("MongoDB connection error", err);
    process.exit(1);
  }
};

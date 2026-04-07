import winston from "winston";
import { env } from "../config/env";

export const logger = winston.createLogger({
  level: env.nodeEnv === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
      return `[${timestamp}] ${level}: ${message}${metaString}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

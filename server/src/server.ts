import { env } from "./config/env";
import { connectDb } from "./config/db";
import { logger } from "./utils/logger";
import app from "./app";

const start = async () => {
  await connectDb();

  app.listen(env.port, () => {
    logger.info(`API listening on port ${env.port}`);
  });
};

start().catch((err) => {
  logger.error("Failed to start server", err);
  process.exit(1);
});

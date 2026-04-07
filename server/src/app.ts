import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { notFound, errorHandler } from "./middlewares/errorHandler";
import { env } from "./config/env";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.allowedOrigins.length ? env.allowedOrigins : "*",
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;

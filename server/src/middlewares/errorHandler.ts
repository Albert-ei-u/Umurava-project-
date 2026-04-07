import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found", path: req.originalUrl });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err instanceof ApiError ? err.statusCode : 500;
  const message =
    err instanceof ApiError ? err.message : "Something went wrong";
  const details = err instanceof ApiError ? err.details : undefined;

  logger.error(message, { status, path: req.originalUrl, stack: err.stack });

  res.status(status).json({
    message,
    details,
  });
};

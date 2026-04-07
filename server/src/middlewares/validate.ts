import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { StatusCodes } from "http-status-codes";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const issues = result.error.issues.map((i) => i.message);
      return next(new ApiError(StatusCodes.BAD_REQUEST, "Validation failed", issues));
    }

    next();
  };

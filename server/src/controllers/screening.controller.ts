import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { runScreening } from "../services/screening.service";
import { asyncHandler } from "../utils/asyncHandler";

export const triggerScreening = asyncHandler(async (req: Request, res: Response) => {
  const { jobId, applicantIds, topN } = req.body;
  const { screening, results } = await runScreening(jobId, applicantIds, topN);
  res.status(StatusCodes.CREATED).json({ screeningId: screening._id, results });
});

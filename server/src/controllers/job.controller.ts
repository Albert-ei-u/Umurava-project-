import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Job } from "../models/job.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";

export const createJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
});

export const listJobs = asyncHandler(async (_req: Request, res: Response) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

export const getJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findById(req.params.id);
  if (!job) throw new ApiError(StatusCodes.NOT_FOUND, "Job not found");
  res.json(job);
});

export const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!job) throw new ApiError(StatusCodes.NOT_FOUND, "Job not found");
  res.json(job);
});

import { Applicant } from "../models/applicant.model";
import { Job } from "../models/job.model";
import { Screening } from "../models/screening.model";
import { ApiError } from "../utils/apiError";
import { StatusCodes } from "http-status-codes";
import { GeminiService } from "./gemini.service";

const geminiService = new GeminiService();

export const runScreening = async (jobId: string, applicantIds?: string[], topN = 10) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Job not found");
  }

  const applicants = applicantIds?.length
    ? await Applicant.find({ _id: { $in: applicantIds } })
    : await Applicant.find({ jobIds: job._id });

  if (!applicants.length) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "No applicants found for this job or provided IDs"
    );
  }

  const results = await geminiService.scoreApplicants(job, applicants, topN);

  const screening = await Screening.create({
    jobId: job._id,
    results,
    topN,
    model: process.env.GEMINI_API_KEY ? process.env.GEMINI_MODEL : "heuristic",
    status: "completed",
  });

  return { screening, results };
};

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import multer from "multer";
import { parse } from "csv-parse/sync";
import { Applicant } from "../models/applicant.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";

const upload = multer({ storage: multer.memoryStorage() });
export const uploadMiddleware = upload.single("file");

export const createApplicant = asyncHandler(async (req: Request, res: Response) => {
  const applicant = await Applicant.create(req.body);
  res.status(StatusCodes.CREATED).json(applicant);
});

export const listApplicants = asyncHandler(async (_req: Request, res: Response) => {
  const applicants = await Applicant.find().sort({ createdAt: -1 });
  res.json(applicants);
});

export const uploadApplicants = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file?.buffer && !req.file?.path) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "No file uploaded");
  }

  const csvBuffer = (req.file as Express.Multer.File & { buffer?: Buffer }).buffer;
  const fileContent = csvBuffer?.toString("utf-8") || "";

  if (!fileContent) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to read uploaded file");
  }

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const docs = records.map((row: any) => ({
    name: row.name,
    email: row.email,
    phone: row.phone,
    jobIds: row.jobIds ? row.jobIds.split("|") : [],
    profile: {
      headline: row.headline || row.role,
      yearsOfExperience: Number(row.yearsOfExperience || row.yoe || 0),
      skills: row.skills ? row.skills.split("|").map((s: string) => s.trim()) : [],
      education: row.education,
      certifications: row.certifications
        ? row.certifications.split("|").map((c: string) => c.trim())
        : [],
      languages: row.languages
        ? row.languages.split("|").map((l: string) => l.trim())
        : [],
      location: row.location,
      desiredRole: row.desiredRole || row.role,
      seniority: row.seniority,
      resumeUrl: row.resumeUrl,
    },
  }));

  const inserted = await Applicant.insertMany(docs);
  res.status(StatusCodes.CREATED).json({ inserted: inserted.length });
});

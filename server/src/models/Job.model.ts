import mongoose, { Schema, Document, Model } from "mongoose";

export interface JobDocument extends Document {
  title: string;
  summary: string;
  requirements: {
    skills: string[];
    minYearsExperience?: number;
    education?: string;
    location?: string;
    employmentType?: string;
    description?: string;
    seniority?: "junior" | "mid" | "senior" | "lead";
  };
  idealCandidateProfile?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<JobDocument>(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    requirements: {
      skills: [{ type: String, required: true }],
      minYearsExperience: { type: Number },
      education: { type: String },
      location: { type: String },
      employmentType: { type: String },
      description: { type: String },
      seniority: {
        type: String,
        enum: ["junior", "mid", "senior", "lead"],
      },
    },
    idealCandidateProfile: { type: String },
  },
  { timestamps: true }
);

export const Job: Model<JobDocument> =
  mongoose.models.Job || mongoose.model<JobDocument>("Job", JobSchema);

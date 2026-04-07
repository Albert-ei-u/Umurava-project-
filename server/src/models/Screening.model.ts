import mongoose, { Schema, Document, Model } from "mongoose";

export interface ScreeningResult {
  applicantId: mongoose.Types.ObjectId;
  score: number;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}

export interface ScreeningDocument extends Document {
  jobId: mongoose.Types.ObjectId;
  results: ScreeningResult[];
  topN: number;
  model: string;
  status: "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const ScreeningSchema = new Schema<ScreeningDocument>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    results: [
      {
        applicantId: { type: Schema.Types.ObjectId, ref: "Applicant" },
        score: { type: Number },
        strengths: [{ type: String }],
        gaps: [{ type: String }],
        recommendation: { type: String },
      },
    ],
    topN: { type: Number, default: 10 },
    model: { type: String },
    status: { type: String, enum: ["completed", "failed"], default: "completed" },
  },
  { timestamps: true }
);

export const Screening: Model<ScreeningDocument> =
  mongoose.models.Screening ||
  mongoose.model<ScreeningDocument>("Screening", ScreeningSchema);

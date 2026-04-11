import mongoose, { Schema, Document } from "mongoose";

export interface IApplicant extends Document {
  id: string; // Legacy ID support
  name: string;
  role: string;
  location: string;
  experience: string;
  email: string;
  gender: "M" | "F" | "Not stated";
  technicalProfile: string;

  resumeText?: string;
  resumeUrl?: string;
  profileStatus: "Verified" | "Pending" | "Archived" | "Duplicate";
  isDuplicate: boolean;
  originalCandidateId?: string;
  similarityScore?: number;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicantSchema: Schema = new Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, enum: ["M", "F", "Not stated"], default: "Not stated" },
    technicalProfile: { type: String, required: true },

    resumeText: { type: String },
    resumeUrl: { type: String },
    profileStatus: { type: String, enum: ["Verified", "Pending", "Archived", "Duplicate"], default: "Pending" },
    isDuplicate: { type: Boolean, default: false },
    originalCandidateId: { type: Schema.Types.ObjectId, ref: "Applicant" },
    similarityScore: { type: Number, default: 0 },
    ownerId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IApplicant>("Applicant", ApplicantSchema);

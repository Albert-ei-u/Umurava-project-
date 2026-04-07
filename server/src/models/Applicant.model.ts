import mongoose, { Schema, Document, Model } from "mongoose";

export interface ApplicantDocument extends Document {
  name: string;
  email: string;
  phone?: string;
  profile: {
    headline: string;
    yearsOfExperience: number;
    skills: string[];
    education?: string;
    certifications?: string[];
    languages?: string[];
    location?: string;
    desiredRole?: string;
    seniority?: "junior" | "mid" | "senior" | "lead";
    resumeUrl?: string;
  };
  jobIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ApplicantSchema = new Schema<ApplicantDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    profile: {
      headline: { type: String, required: true },
      yearsOfExperience: { type: Number, required: true },
      skills: [{ type: String, required: true }],
      education: { type: String },
      certifications: [{ type: String }],
      languages: [{ type: String }],
      location: { type: String },
      desiredRole: { type: String },
      seniority: {
        type: String,
        enum: ["junior", "mid", "senior", "lead"],
      },
      resumeUrl: { type: String },
    },
    jobIds: [{ type: Schema.Types.ObjectId, ref: "Job", default: [] }],
  },
  { timestamps: true }
);

ApplicantSchema.index({ email: 1 }, { unique: false });
ApplicantSchema.index({ "profile.skills": 1 });

export const Applicant: Model<ApplicantDocument> =
  mongoose.models.Applicant ||
  mongoose.model<ApplicantDocument>("Applicant", ApplicantSchema);

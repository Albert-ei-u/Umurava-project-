import { z } from "zod";

export const createApplicantSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    jobIds: z.array(z.string()).optional(),
    profile: z.object({
      headline: z.string(),
      yearsOfExperience: z.number().nonnegative(),
      skills: z.array(z.string()).min(1),
      education: z.string().optional(),
      certifications: z.array(z.string()).optional(),
      languages: z.array(z.string()).optional(),
      location: z.string().optional(),
      desiredRole: z.string().optional(),
      seniority: z.enum(["junior", "mid", "senior", "lead"]).optional(),
      resumeUrl: z.string().url().optional(),
    }),
  }),
});

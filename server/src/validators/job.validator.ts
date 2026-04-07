import { z } from "zod";

export const createJobSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    summary: z.string().min(5),
    requirements: z.object({
      skills: z.array(z.string()).min(1),
      minYearsExperience: z.number().optional(),
      education: z.string().optional(),
      location: z.string().optional(),
      employmentType: z.string().optional(),
      description: z.string().optional(),
      seniority: z.enum(["junior", "mid", "senior", "lead"]).optional(),
    }),
    idealCandidateProfile: z.string().optional(),
  }),
});

export const updateJobSchema = createJobSchema.extend({
  body: createJobSchema.shape.body.partial(),
  params: z.object({ id: z.string() }),
});

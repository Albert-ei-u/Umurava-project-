import { z } from "zod";

export const screeningSchema = z.object({
  body: z.object({
    jobId: z.string(),
    applicantIds: z.array(z.string()).optional(),
    topN: z.number().int().positive().max(50).optional(),
  }),
});

export interface JobRequirement {
  skills: string[];
  minYearsExperience?: number;
  education?: string;
  location?: string;
  employmentType?: string;
  description?: string;
  seniority?: "junior" | "mid" | "senior" | "lead";
}

export interface JobInput {
  title: string;
  summary: string;
  requirements: JobRequirement;
  idealCandidateProfile?: string;
}

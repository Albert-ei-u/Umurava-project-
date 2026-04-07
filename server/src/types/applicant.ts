export interface ApplicantProfile {
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
}

export interface ApplicantInput {
  name: string;
  email: string;
  phone?: string;
  profile: ApplicantProfile;
  jobIds?: string[];
}

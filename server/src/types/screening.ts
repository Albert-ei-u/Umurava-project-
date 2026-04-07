export interface ScoredApplicant {
  applicantId: string;
  score: number;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}

export interface ScreeningPayload {
  jobId: string;
  applicantIds?: string[];
  topN?: number;
}

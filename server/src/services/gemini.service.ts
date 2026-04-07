import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";
import { JobDocument } from "../models/job.model";
import { ApplicantDocument } from "../models/applicant.model";
import { logger } from "../utils/logger";

interface GeminiScore {
  applicantId: string;
  score: number;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}

export class GeminiService {
  private client: GoogleGenerativeAI | null;

  constructor() {
    this.client = env.geminiApiKey
      ? new GoogleGenerativeAI(env.geminiApiKey)
      : null;
  }

  async scoreApplicants(
    job: JobDocument,
    applicants: ApplicantDocument[],
    topN: number
  ): Promise<GeminiScore[]> {
    if (!this.client) {
      logger.warn("GEMINI_API_KEY not set. Falling back to heuristic scoring.");
      return this.heuristicScore(applicants, job, topN);
    }

    const model = this.client.getGenerativeModel({
      model: env.geminiModel,
    });

    const prompt = this.buildPrompt(job, applicants, topN);

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    try {
      const parsed = JSON.parse(text) as GeminiScore[];
      return parsed.slice(0, topN);
    } catch (err) {
      logger.error("Failed to parse Gemini response; using heuristic scoring", err);
      return this.heuristicScore(applicants, job, topN);
    }
  }

  private heuristicScore(
    applicants: ApplicantDocument[],
    job: JobDocument,
    topN: number
  ): GeminiScore[] {
    const requiredSkills = job.requirements.skills.map((s) => s.toLowerCase());
    const targetYears = job.requirements.minYearsExperience || 0;

    const scored = applicants.map((applicant) => {
      const skills = applicant.profile.skills.map((s) => s.toLowerCase());
      const skillMatches = skills.filter((s) => requiredSkills.includes(s)).length;
      const skillScore =
        requiredSkills.length === 0
          ? 0
          : (skillMatches / requiredSkills.length) * 70;
      const experienceScore =
        applicant.profile.yearsOfExperience >= targetYears
          ? 30
          : (applicant.profile.yearsOfExperience / Math.max(targetYears, 1)) * 30;

      const score = Math.min(100, Math.round(skillScore + experienceScore));

      return {
        applicantId: applicant._id.toString(),
        score,
        strengths: [
          `Skills matched: ${skillMatches}/${requiredSkills.length}`,
          `Experience: ${applicant.profile.yearsOfExperience} yrs`,
        ],
        gaps: [],
        recommendation: score > 60 ? "Proceed to human review" : "Keep in backlog",
      };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);
  }

  private buildPrompt(
    job: JobDocument,
    applicants: ApplicantDocument[],
    topN: number
  ): string {
    return `
You are an AI recruiter assistant. Rank applicants for the job below and return JSON only (no prose).

Job:
${JSON.stringify(job, null, 2)}

Applicants:
${JSON.stringify(applicants, null, 2)}

Return a JSON array sorted by best fit with at most ${topN} items.
Each item must be:
{
  "applicantId": "<mongodb_id>",
  "score": 0-100 number,
  "strengths": ["bullet"],
  "gaps": ["bullet"],
  "recommendation": "short sentence"
}
    `;
  }
}

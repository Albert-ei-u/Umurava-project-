import { Router } from "express";
import jobRoutes from "./job.routes";
import applicantRoutes from "./applicant.routes";
import screeningRoutes from "./screening.routes";

const router = Router();

router.use("/jobs", jobRoutes);
router.use("/applicants", applicantRoutes);
router.use("/screenings", screeningRoutes);

export default router;

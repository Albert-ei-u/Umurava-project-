import { Router } from "express";
import {
  createApplicant,
  listApplicants,
  uploadApplicants,
  uploadMiddleware,
} from "../controllers/applicant.controller";
import { validate } from "../middlewares/validate";
import { createApplicantSchema } from "../validators/applicant.validator";

const router = Router();

router.post("/", validate(createApplicantSchema), createApplicant);
router.get("/", listApplicants);
router.post("/upload", uploadMiddleware, uploadApplicants);

export default router;

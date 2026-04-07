import { Router } from "express";
import {
  createJob,
  getJob,
  listJobs,
  updateJob,
} from "../controllers/job.controller";
import { validate } from "../middlewares/validate";
import { createJobSchema, updateJobSchema } from "../validators/job.validator";

const router = Router();

router.post("/", validate(createJobSchema), createJob);
router.get("/", listJobs);
router.get("/:id", getJob);
router.put("/:id", validate(updateJobSchema), updateJob);

export default router;

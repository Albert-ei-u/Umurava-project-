import { Router } from "express";
import { triggerScreening } from "../controllers/screening.controller";
import { validate } from "../middlewares/validate";
import { screeningSchema } from "../validators/screening.validator";

const router = Router();

router.post("/run", validate(screeningSchema), triggerScreening);

export default router;

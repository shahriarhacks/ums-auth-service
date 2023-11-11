import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicSemesterController,
  getAllAcademicSemesters,
  getSingleSemester,
  updateSemester,
} from "./academicSemester.controller";
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-semester",
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemesterController,
);

router.get("/:id", getSingleSemester);

router.patch(
  "/:id",
  validateRequest(updateAcademicSemesterZodSchema),
  updateSemester,
);

router.get("/", getAllAcademicSemesters);

export default router;

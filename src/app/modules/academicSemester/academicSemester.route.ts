import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicSemesterController,
  getAllAcademicSemesters,
  getSingleSemester,
} from "./academicSemester.controller";
import createAcademicSemesterZodSchema from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-semester",
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemesterController,
);

router.get("/:id", getSingleSemester);

router.get("/", getAllAcademicSemesters);

export default router;

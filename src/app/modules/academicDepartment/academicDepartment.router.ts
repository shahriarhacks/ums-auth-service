import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicDepartment,
  deleteSingleAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
} from "./academicDepartment.controller";
import {
  academicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from "./academicDepartment.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(academicDepartmentZodSchema),
  createAcademicDepartment,
);

router.get("/:id", getSingleAcademicDepartment);

router.patch(
  "/:id",
  validateRequest(updateAcademicDepartmentZodSchema),
  updateSingleAcademicDepartment,
);

router.delete("/:id", deleteSingleAcademicDepartment);

router.get("/", getAllAcademicDepartments);

export default router;

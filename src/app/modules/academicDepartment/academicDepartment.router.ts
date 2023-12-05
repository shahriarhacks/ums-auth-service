import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
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
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  createAcademicDepartment,
);

router.get("/:id", getSingleAcademicDepartment);

router.patch(
  "/:id",
  validateRequest(updateAcademicDepartmentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  updateSingleAcademicDepartment,
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  deleteSingleAcademicDepartment,
);

router.get("/", getAllAcademicDepartments);

export default router;

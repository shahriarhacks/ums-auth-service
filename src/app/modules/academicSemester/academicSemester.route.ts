import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicSemesterController,
  deleteSingleSemester,
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
  "/create",
  validateRequest(createAcademicSemesterZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  createAcademicSemesterController,
);

router.get(
  "/:id",
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  getSingleSemester,
);

router.patch(
  "/:id",
  validateRequest(updateAcademicSemesterZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  updateSemester,
);

router.delete("/:id", auth(ENUM_USER_ROLE.SUPER_ADMIN), deleteSingleSemester);

router.get("/", getAllAcademicSemesters);

export default router;

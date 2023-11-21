import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createAdmin, createFaculty, createStudent } from "./user.controller";
import {
  createAdminZodSchema,
  createFacultyZodSchema,
  createStudentZodSchema,
} from "./user.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(createStudentZodSchema),
  createStudent,
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyZodSchema),
  createFaculty,
);

router.post(
  "/create-admin",
  validateRequest(createAdminZodSchema),
  createAdmin,
);

export default router;

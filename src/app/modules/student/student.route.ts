import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  deleteStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
} from "./student.controller";
import { updateStudentZodSchema } from "./student.validation";

const router = express.Router();

router.get("/:id", getSingleStudent);
router.patch("/:id", validateRequest(updateStudentZodSchema), updateStudent);
router.delete("/:id", deleteStudent);

router.get("/", getAllStudents);

export default router;

import express from "express";
import {
  deleteStudent,
  getAllStudents,
  getSingleStudent,
} from "./student.controller";

const router = express.Router();

router.get("/:id", getSingleStudent);
router.delete("/:id", deleteStudent);

router.get("/", getAllStudents);

export default router;

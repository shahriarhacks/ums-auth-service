import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  deleteFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
} from "./faculty.controller";
import { updateFacultyZodSchema } from "./faculty.validation";

const router = express.Router();

router.get("/:id", getSingleFaculty);

router.patch("/:id", validateRequest(updateFacultyZodSchema), updateFaculty);

router.delete("/:id", deleteFaculty);

router.get("/", getAllFaculties);

export default router;

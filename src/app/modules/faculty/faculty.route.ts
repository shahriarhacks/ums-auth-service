import express from "express";
import {
  deleteFaculty,
  getAllFaculties,
  getSingleFaculty,
} from "./faculty.controller";

const router = express.Router();

router.get("/:id", getSingleFaculty);

router.delete("/:id", deleteFaculty);

router.get("/", getAllFaculties);

export default router;

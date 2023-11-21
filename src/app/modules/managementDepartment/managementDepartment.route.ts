import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createManagementDepartment } from "./managementDepartment.controller";
import { createManagementDepartmentZodSchema } from "./managementDepartment.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createManagementDepartmentZodSchema),
  createManagementDepartment,
);

export default router;

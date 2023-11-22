import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createManagementDepartment,
  deleteManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
} from "./managementDepartment.controller";
import {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
} from "./managementDepartment.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createManagementDepartmentZodSchema),
  createManagementDepartment,
);

router.get("/:id", getSingleManagementDepartment);

router.patch(
  "/:id",
  validateRequest(updateManagementDepartmentZodSchema),
  updateManagementDepartment,
);

router.delete("/:id", deleteManagementDepartment);

router.get("/", getAllManagementDepartment);

export default router;

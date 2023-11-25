import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { deleteAdmin, getAllAdmins, getSingleAdmin } from "./admin.controller";
import { updateAdminZodSchema } from "./admin.validation";

const router = express.Router();

router.get("/:id", getSingleAdmin);
router.patch("/:id", validateRequest(updateAdminZodSchema));
router.delete("/:id", deleteAdmin);

router.get("/", getAllAdmins);

export default router;

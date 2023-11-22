import express from "express";
import { deleteAdmin, getAllAdmins, getSingleAdmin } from "./admin.controller";

const router = express.Router();

router.get("/:id", getSingleAdmin);
router.delete("/:id", deleteAdmin);

router.get("/", getAllAdmins);

export default router;

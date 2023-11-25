import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authLoginUser, refreshToken } from "./auth.controller";
import { authLoginZodSchema, refreshTokenZodSchema } from "./auth.validation";

const router = express.Router();

router.post("/login", validateRequest(authLoginZodSchema), authLoginUser);
router.post("/ref-token", validateRequest(refreshTokenZodSchema), refreshToken);

export default router;

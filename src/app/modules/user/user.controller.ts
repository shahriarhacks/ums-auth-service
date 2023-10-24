import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { createUserService } from "./user.services";

export const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { user } = req.body;
  const result = await createUserService(user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Created Successfully",
    data: result,
  });
  next();
});

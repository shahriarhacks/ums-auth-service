import { RequestHandler } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { createManagementDepartmentServices } from "./managementDepartment.services";

export const createManagementDepartment: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { ...managementDepartment } = req.body;
    const result =
      await createManagementDepartmentServices(managementDepartment);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Management Department Created Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

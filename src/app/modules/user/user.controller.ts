/* eslint-disable no-console */
import { RequestHandler } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import {
  createAdminServices,
  createFacultyServices,
  createStudentService,
} from "./user.services";

export const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { student, ...userData } = req.body;
    const result = await createStudentService(student, userData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Student Created Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { faculty, ...userData } = req.body;
    const result = await createFacultyServices(faculty, userData);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Create Faculty Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { admin, ...userData } = req.body;
    const result = await createAdminServices(admin, userData);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Create Admin Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

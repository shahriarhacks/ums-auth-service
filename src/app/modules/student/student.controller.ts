import { RequestHandler } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination.constants";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { studentFilterableFields } from "./student.constant";
import { IStudent } from "./student.interface";
import {
  deleteStudentServices,
  getAllStudentsServices,
  getSingleStudentServices,
} from "./student.services";

export const getSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getSingleStudentServices(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Student Retrieve Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteStudentServices(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Student Retrieve Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllStudents: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, studentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllStudentsServices(filters, paginationOptions);

    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Student Retrieve Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

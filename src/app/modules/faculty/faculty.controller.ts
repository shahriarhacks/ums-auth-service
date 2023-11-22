import { RequestHandler } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination.constants";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { facultyFilterableFields } from "./faculty.constant";
import { IFaculty } from "./faculty.interface";
import {
  deleteFacultyServices,
  getAllFacultyServices,
  getSingleFacultyServices,
} from "./faculty.services";

export const getSingleFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getSingleFacultyServices(id);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Faculty Retrieve Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteFacultyServices(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Student Deleted Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllFaculties: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, facultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await getAllFacultyServices(filters, paginationOptions);
    sendResponse<IFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Faculty Retrieve Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

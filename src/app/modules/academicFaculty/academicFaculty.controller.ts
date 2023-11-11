import { RequestHandler } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination.constants";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import {
  createAcademicFacultyServices,
  deleteSingleFacultyServices,
  getAllAcademicFaculties,
  getSingleAcademicFacultyServices,
  updateSingleAcademicFacultyServices,
} from "./academicFaculty.services";
import { academicFacultyFilterableFields } from "./academicSemester.constant";

export const createAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicFaculty } = req.body;
    const result = await createAcademicFacultyServices(academicFaculty);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Academic Faculty Created Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleAcademicFaculty: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;
    const result = await getSingleAcademicFacultyServices(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty Retrieve Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await getAllAcademicFaculties(filters, paginationOptions);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Academic Faculty Retrieve Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSingleAcademicFaculty: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateSingleAcademicFacultyServices(id, updatedData);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Academic Semester Updated Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSingleFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteSingleFacultyServices(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty Deleted Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

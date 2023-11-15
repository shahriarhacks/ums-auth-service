import { RequestHandler } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination.constants";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicDepartmentFilterableFields } from "./academicDepartment.constant";
import {
  createAcademicDepartmentServices,
  deleteSingleAcademicDepartmentServices,
  getAllAcademicDepartmentServices,
  getSingleAcademicDepartmentServices,
  updateSingleAcademicDepartmentServices,
} from "./academicDepartment.services";

export const createAcademicDepartment: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { ...academicDepartment } = req.body;
    const result = await createAcademicDepartmentServices(academicDepartment);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Academic Department Created Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleAcademicDepartment: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;
    const result = await getSingleAcademicDepartmentServices(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Academic Department Retrieve Successfully ",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSingleAcademicDepartment: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateSingleAcademicDepartmentServices(
      id,
      updatedData,
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Academic Department Updated Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAcademicDepartments: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const filters = pick(req.query, academicDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await getAllAcademicDepartmentServices(
      filters,
      paginationOptions,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Academic Department Retrieve Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSingleAcademicDepartment: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;
    const result = await deleteSingleAcademicDepartmentServices(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Academic Department Deleted Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

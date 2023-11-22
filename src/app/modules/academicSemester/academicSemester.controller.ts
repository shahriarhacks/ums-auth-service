/* eslint-disable no-console */

import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination.constants";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { filtersAbleFields } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import {
  createAcademicSemesterService,
  deleteSingleSemesterServices,
  getAllAcademicSemesterService,
  getSingleSemesterService,
  updateSingleSemesterService,
} from "./academicSemester.services";

export const createAcademicSemesterController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { ...academicSemester } = req.body;
    const result = await createAcademicSemesterService(academicSemester);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Academic Semester Created Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAcademicSemesters: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const filters = pick(req.query, filtersAbleFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllAcademicSemesterService(
      paginationOptions,
      filters,
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Retrieve Successfully",
      meta: result?.meta,
      data: result?.data,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleSemester = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await getSingleSemesterService(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Semester Retrieve Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSemester = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateSingleSemesterService(id, updatedData);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Single Semester Updated Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSingleSemester: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteSingleSemesterServices(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Deleted Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

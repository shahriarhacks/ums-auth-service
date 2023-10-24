import { RequestHandler } from "express";
import { paginationFields } from "../../../constants/pagination.constants";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { filtersAbleFields } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import {
  createAcademicSemesterService,
  getAllAcademicSemesterService,
} from "./academicSemester.services";

export const createAcademicSemesterController: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { ...academicSemester } = req.body;
    const result = await createAcademicSemesterService(academicSemester);

    sendResponse<IAcademicSemester>(res, {
      statusCode: 201,
      success: true,
      message: "Academic Semester Created Successfully",
      data: result,
    });
    next();
  },
);

export const getAllAcademicSemesters: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, filtersAbleFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllAcademicSemesterService(
      paginationOptions,
      filters,
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: 200,
      success: true,
      message: "Semester Retrieve Successfully",
      meta: result?.meta,
      data: result?.data,
    });
    next();
  },
);

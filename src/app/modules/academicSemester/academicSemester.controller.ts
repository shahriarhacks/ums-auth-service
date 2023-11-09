import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination.constants";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { filtersAbleFields } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import {
  createAcademicSemesterService,
  getAllAcademicSemesterService,
  getSingleSemesterService,
} from "./academicSemester.services";

export const createAcademicSemesterController: RequestHandler = catchAsync(
  async (req, res) => {
    const { ...academicSemester } = req.body;
    const result = await createAcademicSemesterService(academicSemester);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Academic Semester Created Successfully",
      data: result,
    });
  },
);

export const getAllAcademicSemesters: RequestHandler = catchAsync(
  async (req, res) => {
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
  },
);

export const getSingleSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleSemesterService(id);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Semester Retrieve Successfully",
      data: result,
    });
  },
);

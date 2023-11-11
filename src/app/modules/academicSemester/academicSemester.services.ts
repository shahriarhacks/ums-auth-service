import httpStatus from "http-status";
import mongoose, { SortOrder } from "mongoose";
import QueryString from "qs";
import ApiError from "../../../errors/ApiError";
import paginationHelperCalculator from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/commonType";
import { IPaginationOptions } from "../../../interfaces/paginationOptionsType";
import {
  academicSemesterTitleCodeMapper,
  searchableFields,
} from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";

export const createAcademicSemesterService = async (
  payload: IAcademicSemester,
) => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Academic Semester Title and code are not matched",
    );
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const getAllAcademicSemesterService = async (
  pgOptions: IPaginationOptions,
  filters: Partial<QueryString.ParsedQs>,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { search, ...filtersData } = filters;

  const andCondition = [];

  if (search) {
    andCondition.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })),
    });
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: search,
  //           $options: "i",
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: search,
  //           $options: "i",
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: search,
  //           $options: "i",
  //         },
  //       },
  //       {
  //         startMonth: {
  //           $regex: search,
  //           $options: "i",
  //         },
  //       },
  //       {
  //         endMonth: {
  //           $regex: search,
  //           $options: "i",
  //         },
  //       },
  //     ],
  //   },
  // ];

  if (Object.values(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } = paginationHelperCalculator({
    page: pgOptions?.page,
    limit: pgOptions?.limit,
  });
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await AcademicSemester.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      skip,
      total,
    },
    data: result,
  };
};

export const getSingleSemesterService = async (id: string) => {
  const result = await AcademicSemester.findById(
    new mongoose.Types.ObjectId(id),
  );
  return result;
};

export const updateSingleSemesterService = async (
  id: string,
  payload: Partial<IAcademicSemester>,
) => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Academic Semester Title and code are not matched",
    );
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    payload,
    {
      new: true,
    },
  );
  return result;
};

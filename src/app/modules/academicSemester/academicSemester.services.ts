import { SortOrder } from "mongoose";
import QueryString from "qs";
import ApiError from "../../../errors/ApiError";
import paginationHelperCalculator from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/commonType";
import { IPaginationOptions } from "../../../interfaces/paginationOptionsType";
import {
  academicSemesterTitleCodeMapper,
  academicSemesterTitleEndMonthMapper,
  academicSemesterTitleStartMonthMapper,
  searchableFields,
} from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";

export const createAcademicSemesterService = async (
  payload: IAcademicSemester,
) => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(400, "Academic Semester Title and code are not matched");
  } else if (
    academicSemesterTitleStartMonthMapper[payload.title] !== payload.startMonth
  ) {
    throw new ApiError(400, "Semester Start Month and Title not matched");
  } else if (
    academicSemesterTitleEndMonthMapper[payload.title] !== payload.endMonth
  ) {
    throw new ApiError(400, "Semester End Month and Title not matched");
  } else {
    const result = await AcademicSemester.create(payload);
    return result;
  }
};

export const getAllAcademicSemesterService = async (
  pgOptions: IPaginationOptions,
  filters: Partial<QueryString.ParsedQs>,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: "i",
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: "i",
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: "i",
  //         },
  //       },
  //       {
  //         startMonth: {
  //           $regex: searchTerm,
  //           $options: "i",
  //         },
  //       },
  //       {
  //         endMonth: {
  //           $regex: searchTerm,
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
  const result = await AcademicSemester.find({ $and: andCondition })
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

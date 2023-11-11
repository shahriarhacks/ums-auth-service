import { SortOrder } from "mongoose";
import paginationHelperCalculator from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/commonType";
import { IPaginationOptions } from "../../../interfaces/paginationOptionsType";
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from "./academicFaculty.interface";
import AcademicFaculty from "./academicFaculty.model";
import { academicFacultySearchableFields } from "./academicSemester.constant";

export const createAcademicFacultyServices = async (
  payload: IAcademicFaculty,
) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

export const getSingleAcademicFacultyServices = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

export const updateSingleAcademicFacultyServices = async (
  id: string,
  payload: IAcademicFaculty,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const getAllAcademicFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { search, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelperCalculator(paginationOptions);

  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: academicFacultySearchableFields.map(field => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      skip,
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const deleteSingleFacultyServices = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

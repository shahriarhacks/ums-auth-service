import { SortOrder } from "mongoose";
import paginationHelperCalculator from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/paginationOptionsType";
import { academicDepartmentSearchableFields } from "./academicDepartment.constant";
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from "./academicDepartment.interface";
import AcademicDepartment from "./academicDepartment.model";

export const createAcademicDepartmentServices = async (
  payload: IAcademicDepartment,
) => {
  const result = (await AcademicDepartment.create(payload)).populate(
    "academicFaculty",
  );
  return result;
};

export const getSingleAcademicDepartmentServices = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate("academicFaculty");
  return result;
};

export const updateSingleAcademicDepartmentServices = async (
  id: string,
  payload: Partial<IAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const getAllAcademicDepartmentServices = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions,
) => {
  const { search, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelperCalculator(paginationOptions);

  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
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

  const result = await AcademicDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("academicFaculty");

  const total = await AcademicDepartment.countDocuments(whereConditions);

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

export const deleteSingleAcademicDepartmentServices = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

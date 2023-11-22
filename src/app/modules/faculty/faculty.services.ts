import { SortOrder } from "mongoose";
import paginationHelperCalculator from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/paginationOptionsType";
import { facultySearchableFields } from "./faculty.constant";
import { IFacultyFilters } from "./faculty.interface";
import Faculty from "./faculty.model";

export const getSingleFacultyServices = async (id: string) => {
  const result = await Faculty.findOne({ _id: id })
    .populate("academicDepartment")
    .populate("academicFaculty");
  return result;
};

export const deleteFacultyServices = async (id: string) => {
  const result = await Faculty.findOneAndDelete({ _id: id })
    .populate("academicDepartment")
    .populate("academicFaculty");
  return result;
};

export const getAllFacultyServices = async (
  filters: IFacultyFilters,
  pgOptions: IPaginationOptions,
) => {
  const { search, ...filtersData } = filters;
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelperCalculator(pgOptions);

  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([filed, value]) => ({
        [filed]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereConditions)
    .populate("academicDepartment")
    .populate("academicFaculty")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      total,
      skip,
      limit,
      page,
    },
    data: result,
  };
};

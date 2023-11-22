import { SortOrder } from "mongoose";
import paginationHelperCalculator from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/paginationOptionsType";
import { studentSearchableFields } from "./student.constant";
import { IStudentFilters } from "./student.interface";
import Student from "./student.model";

export const getSingleStudentServices = async (id: string) => {
  const result = await Student.findOne({ _id: id })
    .populate("academicFaculty")
    .populate("academicSemester")
    .populate("academicDepartment");
  return result;
};

export const deleteStudentServices = async (id: string) => {
  const result = await Student.findOneAndDelete({ _id: id })
    .populate("academicFaculty")
    .populate("academicSemester")
    .populate("academicDepartment");
  return result;
};

export const getAllStudentsServices = async (
  filters: IStudentFilters,
  pgOption: IPaginationOptions,
) => {
  const { search, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelperCalculator(pgOption);

  const andConditions = [];

  // Search needs $or for searching in specified fields

  if (search) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })),
    });
  }

  // Filters needs $and to full fill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(whereConditions)
    .populate("academicFaculty")
    .populate("academicSemester")
    .populate("academicDepartment")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereConditions);
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

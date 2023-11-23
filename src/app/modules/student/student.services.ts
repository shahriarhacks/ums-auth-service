/* eslint-disable no-undefined */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import paginationHelperCalculator from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/paginationOptionsType";
import { studentSearchableFields } from "./student.constant";
import { IStudent, IStudentFilters } from "./student.interface";
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

export const updateStudentServices = async (
  id: string,
  payload: Partial<IStudent>,
) => {
  if (payload === undefined || payload === null) {
    // Handle the case where payload is undefined or null
    throw new ApiError(httpStatus.BAD_REQUEST, "Payload is required");
  }

  const isExist = await Student.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student Not Found");
  }
  const { name, guardian, localGuardian, ...studentData } = payload;

  const updatedStudentData: Partial<IStudent> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.values(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const lgKey = `localGuardian.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[lgKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate(
    { _id: id },
    updatedStudentData,
    { new: true },
  )
    .populate("academicFaculty")
    .populate("academicSemester")
    .populate("academicDepartment");
  return result;
};

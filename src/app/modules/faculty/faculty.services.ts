/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import paginationHelperCalculator from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/paginationOptionsType";
import { facultySearchableFields } from "./faculty.constant";
import { IFaculty, IFacultyFilters } from "./faculty.interface";
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

export const updateFacultyServices = async (
  id: string,
  payload: Partial<IFaculty>,
) => {
  const isExist = await Faculty.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty Not Found");
  }
  const { name, ...facultyUpdated } = payload;

  const updatedFacultyData = { ...facultyUpdated };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).map(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate(
    { _id: id },
    updatedFacultyData,
    { new: true },
  );

  return result;
};

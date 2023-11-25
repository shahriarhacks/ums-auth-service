/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import paginationHelperCalculator from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/paginationOptionsType";
import { adminSearchableFields } from "./admin.constant";
import { IAdmin, IAdminFilters } from "./admin.interface";
import Admin from "./admin.model";

export const getSingleAdminServices = async (id: string) => {
  const result = await Admin.findOne({ _id: id }).populate(
    "managementDepartment",
  );
  return result;
};

export const deleteAdminServices = async (id: string) => {
  const result = await Admin.findOneAndDelete({ _id: id }).populate(
    "managementDepartment",
  );

  return result;
};

export const getAllAdminServices = async (
  filters: IAdminFilters,
  pgOptions: IPaginationOptions,
) => {
  const { search, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelperCalculator(pgOptions);

  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Admin.find(whereConditions)
    .populate("managementDepartment")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments(whereConditions);
  return {
    meta: {
      page,
      skip,
      limit,
      total,
    },
    data: result,
  };
};

export const updateAdminServices = async (
  id: string,
  payload: Partial<IAdmin>,
) => {
  const isExist = await Admin.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty Not Found");
  }
  const { name, ...facultyUpdated } = payload;

  const updatedFacultyData = { ...facultyUpdated };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).map(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ _id: id }, updatedFacultyData, {
    new: true,
  });

  return result;
};

import mongoose, { SortOrder } from "mongoose";
import paginationHelperCalculator from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/paginationOptionsType";
import { managementDepartmentSearchableFields } from "./managementDepartment.constant";
import {
  IManagementDepartment,
  IManagementDepartmentFilterAbleFields,
} from "./managementDepartment.interface";
import ManagementDepartment from "./managementDepartment.model";

export const createManagementDepartmentServices = async (
  md: IManagementDepartment,
) => {
  const result = await ManagementDepartment.create(md);
  return result;
};

export const getSingleManagementDepartmentServices = async (id: string) => {
  const result = await ManagementDepartment.findOne({ _id: id });
  return result;
};

export const updateManagementDepartmentServices = async (
  payload: IManagementDepartment,
  id: string,
) => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    payload,
    { new: true },
  );
  return result;
};

export const deleteManagementDepartmentServices = async (id: string) => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  return result;
};

export const getAllManagementDepartmentServices = async (
  filters: IManagementDepartmentFilterAbleFields,
  pgOptions: IPaginationOptions,
) => {
  const { search, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelperCalculator(pgOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (search) {
    andConditions.push({
      $or: managementDepartmentSearchableFields.map(field => ({
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
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.countDocuments(whereConditions);

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

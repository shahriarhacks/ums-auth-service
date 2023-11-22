import { SortOrder } from "mongoose";
import paginationHelperCalculator from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/paginationOptionsType";
import { adminSearchableFields } from "./admin.constant";
import { IAdminFilters } from "./admin.interface";
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

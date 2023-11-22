import { RequestHandler } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination.constants";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { adminFilterableFields } from "./admin.constant";
import { IAdmin } from "./admin.interface";
import {
  deleteAdminServices,
  getAllAdminServices,
  getSingleAdminServices,
} from "./admin.services";

export const getSingleAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getSingleAdminServices(id);

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Admin Retrieve Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteAdminServices(id);
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Student Deleted Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAdmins: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllAdminServices(filters, paginationOptions);

    sendResponse<IAdmin[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Admin Retrieve Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

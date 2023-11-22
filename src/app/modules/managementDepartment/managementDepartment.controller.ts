/* eslint-disable no-console */
import { RequestHandler } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination.constants";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { managementDepartmentFilterableFields } from "./managementDepartment.constant";
import { IManagementDepartment } from "./managementDepartment.interface";
import {
  createManagementDepartmentServices,
  deleteManagementDepartmentServices,
  getAllManagementDepartmentServices,
  getSingleManagementDepartmentServices,
  updateManagementDepartmentServices,
} from "./managementDepartment.services";

export const createManagementDepartment: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { ...managementDepartment } = req.body;
    const result =
      await createManagementDepartmentServices(managementDepartment);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Management Department Created Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleManagementDepartment: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;
    const result = await getSingleManagementDepartmentServices(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Department Management Retrieve Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateManagementDepartment: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;
    const { ...updatedData } = req.body;
    const result = await updateManagementDepartmentServices(updatedData, id);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Management Department Updated Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteManagementDepartment: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;
    const result = await deleteManagementDepartmentServices(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Department Management Deleted Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllManagementDepartment: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllManagementDepartmentServices(
      filters,
      paginationOptions,
    );
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Department Management Retrieve Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

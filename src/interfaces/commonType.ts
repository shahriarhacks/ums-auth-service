import { SortOrder } from "mongoose";
import { IGenericErrorMessage } from "./errorType";

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: Array<IGenericErrorMessage>;
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    skip: number;
    total: number;
  };
  data: T;
};

export type IOptionsType = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

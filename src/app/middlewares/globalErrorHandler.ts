/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line prefer-const

import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import handleValidationError from "../../errors/handleValidationError";
import handleZodError from "../../errors/handleZodError";
import { IGenericErrorMessage } from "../../interfaces/errorType";
import { errorLog } from "../../shared/logger";

const globalErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  config.env === "development"
    ? console.log("Global error handler ~", error)
    : errorLog.error("Global error handler ~", error);

  let statusCode: number = 400;
  let message: string = "Something went wrong";
  let errorMessages: Array<IGenericErrorMessage> = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    // eslint-disable-next-line no-undefined
    stack: config.env !== "production" ? error.stack : undefined,
  });
  next();
};

export default globalErrorHandler;

import { ZodError, ZodIssue } from "zod";
import { IGenericErrorResponse } from "../interfaces/commonType";
import { IGenericErrorMessage } from "../interfaces/errorType";

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: Array<IGenericErrorMessage> = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error [Invalid Type]",
    errorMessages: errors,
  };
};

export default handleZodError;

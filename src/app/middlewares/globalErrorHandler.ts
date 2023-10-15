import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/errorType'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
const globalErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  // eslint-disable-next-line prefer-const
  let statusCode: number = 500
  // eslint-disable-next-line prefer-const
  let message: string = 'Something went wrong'
  // eslint-disable-next-line prefer-const
  let errorMessages: Array<IGenericErrorMessage> = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    // eslint-disable-next-line no-undefined
    stack: config.env !== 'production' ? error.stack : undefined,
  })
  next()
}

export default globalErrorHandler

import { IGenericErrorMessage } from './errorType'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: Array<IGenericErrorMessage>
}

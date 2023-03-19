import ErrorCode, { errorFromString } from './error_codes'

export default class APIError {
  statusCode: number
  code: ErrorCode
  message: string

  constructor(statusCode: number, code: string, message: string) {
    this.statusCode = statusCode
    this.code = errorFromString(code)
    this.message = message
  }
}

import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    message = getReasonPhrase(statusCode),
    details?: unknown
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

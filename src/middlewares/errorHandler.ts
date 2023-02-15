import { Response } from "express";

export class ErrorHandler extends Error {
  statusCode: number;

  constructor(statusCode?: number, message?: string) {
    super();
    this.statusCode = statusCode ?? 500;
    this.message = message ?? "Something wrong";
  }
}

export const handleError = (err: ErrorHandler, res: Response) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

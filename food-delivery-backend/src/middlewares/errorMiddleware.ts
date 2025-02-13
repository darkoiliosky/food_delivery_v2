import { Request, Response, NextFunction } from "express";

// Custom error class to handle different types of errors
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error middleware for handling errors
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default to 500 if no status code is provided
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  // Log the error (you can add more logging logic here)
  console.error(err.stack);

  // Send a structured error response
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    // Only expose stack trace in development mode for security reasons
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

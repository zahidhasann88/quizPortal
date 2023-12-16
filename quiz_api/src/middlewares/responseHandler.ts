import { Response } from 'express';
import { CustomError } from './../helpers/errorConstructor';

export const successResponse = (res: Response, data: any, statusCode = 200, message = 'Success') => {
  res.status(statusCode).json({ success: true, message, data });
};

export const errorResponse = (res: Response, error: CustomError) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ error: error.message });
};

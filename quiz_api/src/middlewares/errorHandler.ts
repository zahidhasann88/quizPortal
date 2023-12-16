import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../helpers/errorConstructor';
import { errorResponse } from './responseHandler';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const customError = err instanceof CustomError ? err : new CustomError(err.message, 500);
  errorResponse(res, customError);
};

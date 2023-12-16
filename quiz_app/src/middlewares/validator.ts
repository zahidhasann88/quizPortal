import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from '../helpers/errorConstructor';

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => {
      if (error.msg && typeof error.msg === 'string') {
        return error.msg.trim();
      }
      return 'Validation error';
    }).join(', ');
    return next(new CustomError(`Validation failed: ${errorMessages}`, 422));
  }
  next();
};

export default validate;

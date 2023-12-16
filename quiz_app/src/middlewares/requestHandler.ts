import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  next();
};
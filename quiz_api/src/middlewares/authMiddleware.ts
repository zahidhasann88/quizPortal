import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwtUtils';
import { CustomError } from '../helpers/errorConstructor';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verifyToken(token);
    req.body.decoded = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
};

import { Request, Response, NextFunction } from 'express';
import { HttpBaseError } from '../errors/HttpBaseError';

export const errorHandler = (err: HttpBaseError, req: Request, res: Response, next: NextFunction) => {
  console.error(req, next);
  console.error(err.stack);
  const errorStatusCode = err.statusCode
  const errorMessage = err.message
  return res.status(errorStatusCode)
  .json({ message: errorMessage });
};
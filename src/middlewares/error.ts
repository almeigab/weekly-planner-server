/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../utils/errors/BadRequestError';
import { UnknownError } from '../utils/errors/UnknownError';
import { NotFoundError } from '../utils/errors/NotFoundError';

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BadRequestError) {
    res.status(400).json({
      error:
        Object.values(err.causes?.[0].constraints || {})?.[0] || err.message,
    });
  } else if (err instanceof UnknownError) {
    res.status(500).json({
      error: err.message,
    });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({
      error: err.message,
    });
  } else {
    res.status(500).end();
  }
}

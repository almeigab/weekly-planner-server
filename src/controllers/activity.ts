import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import activityService from '../services/activity';
import { AddActivityDTO } from '../dto/activity';
import { BadRequestError } from '../utils/errors/BadRequestError';
import { UnknownError } from '../utils/errors/UnknownError';

async function addActivityHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const addActivityDTO = new AddActivityDTO(
      req.body.name,
      req.body.from,
      req.body.to,
      req.body.date
    );

    const errors = await validate(addActivityDTO);
    if (errors.length) {
      next(new BadRequestError(errors));
      return;
    }

    const activity = await activityService.addActivity(addActivityDTO);

    res.status(201).json(activity);
  } catch (error: unknown) {
    next(new UnknownError(error));
  }
}

const activityController = {
  addActivityHandler,
};

export default activityController;

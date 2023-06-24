import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import activityService from '../services/activity';
import { AddActivityDTO, GetActivitiesDTO } from '../dto/activity';
import { BadRequestError } from '../utils/errors/BadRequestError';
import { UnknownError } from '../utils/errors/UnknownError';
import { ActivityOverlapsError } from '../utils/errors/ActivityOverlapsError';

async function addActivityHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const addActivityDTO = new AddActivityDTO(
      req.body.name,
      req.body.weekDay,
      req.body.from,
      req.body.to,
      req.body.label
    );

    const errors = await validate(addActivityDTO);
    if (errors.length) {
      next(new BadRequestError(null, errors));
      return;
    }

    const activity = await activityService.addActivity(addActivityDTO);

    res.status(201).json(activity);
  } catch (error: unknown) {
    if (error instanceof ActivityOverlapsError) {
      next(new BadRequestError(error));
    } else {
      next(new UnknownError(error));
    }
  }
}

async function getActivitiesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const weekDay = req.query.weekDay?.toString();

    const getActivitiesDTO = new GetActivitiesDTO(weekDay);

    const errors = await validate(getActivitiesDTO);
    if (errors.length) {
      next(new BadRequestError(null, errors));
      return;
    }

    const activities = await activityService.getActivities(getActivitiesDTO);

    res.status(200).json(activities);
  } catch (error) {
    next(new UnknownError(error));
  }
}

const activityController = {
  addActivityHandler,
  getActivitiesHandler,
};

export default activityController;

import { NextFunction, Request, Response } from 'express';
import activityLabelService from '../services/activityLabel';
import { UnknownError } from '../utils/errors/UnknownError';

async function getActivityLabelsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const activityLabels = await activityLabelService.getActivityLabels();
    res.status(200).json(activityLabels);
  } catch (error) {
    next(new UnknownError(error));
  }
}

const activityLabelController = {
  getActivityLabelsHandler,
};

export default activityLabelController;

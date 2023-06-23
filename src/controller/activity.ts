import { Request, Response } from 'express';
import activityService from '../service/activity';

async function addActivityHandler(req: Request, res: Response) {
  const { name, from, to, date } = req.body;

  try {
    const activity = await activityService.addActivity({
      date,
      from,
      name,
      to,
    });

    res.status(201).json(activity);
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'error',
      error,
    });
  }
}

const activityController = {
  addActivityHandler,
};

export default activityController;

import { Request, Response } from 'express';
import activityService from '../service/activity';

async function addActivityHandler(req: Request, res: Response) {
  const { name, from, to, date } = req.body;

  const activity = await activityService.addActivity({
    date,
    from,
    name,
    to,
  });

  res.status(201).json(activity);
}

const activityController = {
  addActivityHandler,
};

export default activityController;

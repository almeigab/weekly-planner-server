import { Request, Response } from 'express';
import dayService from '../service/day';

async function getDayHandler(req: Request, res: Response) {
  const { date: dateString } = req.query;
  const date = new Date(dateString?.toString() || '');

  try {
    const day = await dayService.getDay({ date, fetchActivities: true });

    if (day == null) {
      res.send(404);
      return;
    }

    res.status(201).json(day);
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'error',
      error,
    });
  }
}

const dayController = {
  getDayHandler,
};

export default dayController;

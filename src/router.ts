import express, { Request, Response } from 'express';
import activityController from './controller/activity';
import dayController from './controller/day';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

router.post('/activity', activityController.addActivityHandler);
router.get('/day', dayController.getDayHandler);

export default router;

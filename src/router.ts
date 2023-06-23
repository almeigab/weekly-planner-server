import express, { Request, Response } from 'express';
import activityController from './controller/activity';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

router.post('/activity', activityController.addActivityHandler);

export default router;

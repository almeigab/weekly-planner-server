import express, { Request, Response } from 'express';
import activityController from './controllers/activity';
import dayController from './controllers/day';
import errorMiddleware from './middlewares/error';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

router.post('/activity', activityController.addActivityHandler);
router.get('/day', dayController.getDayHandler);

router.use(errorMiddleware);
export default router;

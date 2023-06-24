import express, { Request, Response } from 'express';
import activityController from './controllers/activity';
import errorMiddleware from './middlewares/error';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

router.post('/activity', activityController.addActivityHandler);

router.use(errorMiddleware);
export default router;

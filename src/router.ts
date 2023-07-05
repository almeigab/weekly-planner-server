import express, { Request, Response } from 'express';
import activityController from './controllers/activity';
import errorMiddleware from './middlewares/error';
import activityLabelController from './controllers/activityLabel';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

router.post('/activities', activityController.addActivityHandler);
router.get('/activities', activityController.getActivitiesHandler);
router.get(
  '/activity-labels',
  activityLabelController.getActivityLabelsHandler
);

router.use(errorMiddleware);
export default router;

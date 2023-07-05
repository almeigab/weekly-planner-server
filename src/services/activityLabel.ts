import { AppDataSource } from '../data-source';
import { ActivityLabel } from '../entity/ActivityLabel';

async function getActivityLabels() {
  return AppDataSource.getRepository(ActivityLabel).find();
}

const activityLabelService = {
  getActivityLabels,
};

export default activityLabelService;

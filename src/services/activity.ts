import { AppDataSource } from '../data-source';
import { AddActivityDTO } from '../dto/activity';
import { Activity } from '../entity/Activity';

async function addActivity(addActivityDTO: AddActivityDTO) {
  const activity = new Activity();
  activity.name = addActivityDTO.name;
  activity.weekDay = addActivityDTO.weekDay;
  activity.from = new Date(addActivityDTO.from);
  activity.to = new Date(addActivityDTO.to);

  return AppDataSource.getRepository(Activity).save(activity, { reload: true });
}

const activityService = {
  addActivity,
};

export default activityService;

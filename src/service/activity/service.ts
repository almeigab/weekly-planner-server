import { AppDataSource } from '../../data-source';
import { Activity } from '../../entity/Activity';
import dayService from '../day/service';
import { AddActivityDTO } from './model';

const activityRepository = AppDataSource.getRepository(Activity);

async function addActivity(addActivityDTO: AddActivityDTO) {
  const activity = new Activity();
  activity.name = addActivityDTO.name;
  activity.from = addActivityDTO.from;
  activity.to = addActivityDTO.to;

  let day = await dayService.getDay(addActivityDTO.date);

  if (!day) {
    day = await dayService.addDay(addActivityDTO.date);
  }

  activity.day = day;
  return activityRepository.save(activity, { reload: true });
}

const activityService = {
  addActivity,
};

export default activityService;

import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../data-source';
import { AddActivityDTO, GetActivitiesDTO } from '../dto/activity';
import { Activity } from '../entity/Activity';

async function addActivity(addActivityDTO: AddActivityDTO) {
  const activity = new Activity();
  activity.name = addActivityDTO.name;
  activity.weekDay = addActivityDTO.weekDay;
  activity.from = new Date(addActivityDTO.from);
  activity.to = new Date(addActivityDTO.to);

  if (addActivityDTO.label) activity.label = addActivityDTO.label;

  return AppDataSource.getRepository(Activity).save(activity, { reload: true });
}

async function getActivities(getActivitiesDTO: GetActivitiesDTO) {
  const where: FindOptionsWhere<Activity> = {};

  if (getActivitiesDTO.weekDay?.length) {
    where.weekDay = parseInt(getActivitiesDTO.weekDay, 10);
  }

  console.log(where);
  return AppDataSource.getRepository(Activity).findBy(where);
}

const activityService = {
  addActivity,
  getActivities,
};

export default activityService;

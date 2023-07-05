import { FindOptionsWhere, LessThan, MoreThan } from 'typeorm';
import { AppDataSource } from '../data-source';
import { AddActivityDTO, GetActivitiesDTO } from '../dto/activity';
import { Activity } from '../entity/Activity';
import { ActivityOverlapsError } from '../utils/errors/ActivityOverlapsError';
import { ActivityLabel } from '../entity/ActivityLabel';

async function isActivityOverlaped(activity: Activity) {
  const overlapedActivitiesCount = await AppDataSource.getRepository(
    Activity
  ).countBy([
    {
      from: LessThan(activity.to),
      to: MoreThan(activity.from),
    },
  ]);

  return overlapedActivitiesCount > 0;
}

async function addActivity(addActivityDTO: AddActivityDTO) {
  const activity = new Activity();
  activity.name = addActivityDTO.name;
  activity.weekDay = addActivityDTO.weekDay;
  activity.from = new Date(addActivityDTO.from);
  activity.to = new Date(addActivityDTO.to);

  if (addActivityDTO.label) {
    const activityLabel = new ActivityLabel();
    activityLabel.id = addActivityDTO.label;
    activity.label = activityLabel;
  }

  if (await isActivityOverlaped(activity)) throw new ActivityOverlapsError();

  return AppDataSource.getRepository(Activity).save(activity, { reload: true });
}

async function getActivities(getActivitiesDTO: GetActivitiesDTO) {
  const where: FindOptionsWhere<Activity> = {};

  if (getActivitiesDTO.weekDay?.length) {
    where.weekDay = parseInt(getActivitiesDTO.weekDay, 10);
  }

  return AppDataSource.getRepository(Activity).findBy(where);
}

async function getActivityLabels() {
  return ActivityLabel;
}

const activityService = {
  addActivity,
  getActivities,
  getActivityLabels,
};

export default activityService;

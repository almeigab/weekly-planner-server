import { AppDataSource } from '../data-source';
import { AddActivityDTO } from '../dto/activity';
import { AddDayDTO, GetDayDTO } from '../dto/day';
import { Activity } from '../entity/Activity';
import dayService from './day';

async function addActivity(addActivityDTO: AddActivityDTO) {
  const activity = new Activity();
  activity.name = addActivityDTO.name;
  activity.from = addActivityDTO.from;
  activity.to = addActivityDTO.to;

  const getDayDTO = new GetDayDTO(addActivityDTO.date);

  let day = await dayService.getDay(getDayDTO, false);

  const addDayDTO = new AddDayDTO(addActivityDTO.date);

  if (!day) {
    day = await dayService.addDay(addDayDTO);
  }

  activity.day = day;
  return AppDataSource.getRepository(Activity).save(activity, { reload: true });
}

const activityService = {
  addActivity,
};

export default activityService;

import { AppDataSource } from '../data-source';
import { AddActivityDTO } from '../dto/activity';
import { AddDayDTO, GetDayDTO } from '../dto/day';
import { Activity } from '../entity/Activity';
import dateTimeUtils from '../utils/dateTime';
import dayService from './day';

const activityRepository = AppDataSource.getRepository(Activity);

async function addActivity(addActivityDTO: AddActivityDTO) {
  const activity = new Activity();
  activity.name = addActivityDTO.name;
  activity.from = dateTimeUtils.getDateFromTime(addActivityDTO.from);
  activity.to = dateTimeUtils.getDateFromTime(addActivityDTO.to);

  const getDayDTO = new GetDayDTO();
  getDayDTO.date = addActivityDTO.date;

  let day = await dayService.getDay(getDayDTO, false);

  const addDayDTO = new AddDayDTO();
  addDayDTO.date = addActivityDTO.date;

  if (!day) {
    day = await dayService.addDay(addDayDTO);
  }

  activity.day = day;
  return activityRepository.save(activity, { reload: true });
}

const activityService = {
  addActivity,
};

export default activityService;

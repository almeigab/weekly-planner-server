import { AppDataSource } from '../data-source';
import { AddDayDTO, GetDayDTO } from '../dto/day';
import { Day } from '../entity/Day';
import dateTimeUtils from '../utils/dateTime';

const dayRepository = AppDataSource.getRepository(Day);

async function getDay(getDayDTO: GetDayDTO, fetchActivities = false) {
  const date = dateTimeUtils.getDateFromDateWithoutTime(getDayDTO.date);

  return dayRepository.findOne({
    where: { date },
    ...(fetchActivities ? { relations: ['activities'] } : null),
  });
}

async function addDay(addDayDTO: AddDayDTO) {
  const date = dateTimeUtils.getDateFromDateWithoutTime(addDayDTO.date);

  const day = new Day();
  day.date = date;

  return dayRepository.save(day, { reload: true });
}

const dayService = { getDay, addDay };
export default dayService;

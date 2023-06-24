import { AppDataSource } from '../data-source';
import { AddDayDTO, GetDayDTO } from '../dto/day';
import { Day } from '../entity/Day';

async function getDay(getDayDTO: GetDayDTO, fetchActivities = false) {
  const result = await AppDataSource.getRepository(Day).findOne({
    where: { date: getDayDTO.date },
    ...(fetchActivities ? { relations: ['activities'] } : null),
  });

  return result;
}

async function addDay(addDayDTO: AddDayDTO) {
  const day = new Day();
  day.date = addDayDTO.date;

  return AppDataSource.getRepository(Day).save(day, { reload: true });
}

const dayService = { getDay, addDay };
export default dayService;

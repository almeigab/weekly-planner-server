import { AppDataSource } from '../data-source';
import { Day } from '../entity/Day';

const dayRepository = AppDataSource.getRepository(Day);

async function getDay(date: Date) {
  return dayRepository.findOneBy({
    date,
  });
}

async function addDay(date: Date) {
  const day = new Day();
  day.date = date;

  return dayRepository.save(day, { reload: true });
}

const dayService = { getDay, addDay };
export default dayService;

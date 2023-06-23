import { AppDataSource } from '../data-source';
import { Day } from '../entity/Day';

const dayRepository = AppDataSource.getRepository(Day);

async function getDay({
  date,
  fetchActivities = false,
}: {
  date: Date;
  fetchActivities?: boolean;
}) {
  return dayRepository.findOne({
    where: { date },
    ...(fetchActivities ? { relations: ['activities'] } : null),
  });
}

async function addDay({ date }: { date: Date }) {
  const day = new Day();
  day.date = date;

  return dayRepository.save(day, { reload: true });
}

const dayService = { getDay, addDay };
export default dayService;

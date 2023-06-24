import { ObjectLiteral, Repository } from 'typeorm';
import { AppDataSource } from '../../src/data-source';
import { AddDayDTO, GetDayDTO } from '../../src/dto/day';
import dayService from '../../src/services/day';

const findOne = jest.fn();
const save = jest.fn();

describe('day service', () => {
  beforeEach(() => {
    jest.spyOn(AppDataSource, 'getRepository').mockReturnValue({
      findOne,
      save,
    } as unknown as Repository<ObjectLiteral>);
  });
  describe('getDay', () => {
    it('should return day', async () => {
      findOne.mockResolvedValue({
        id: 1,
        date: new Date('2023-06-23'),
      });

      await expect(
        dayService.getDay(new GetDayDTO('2023-06-23'))
      ).resolves.toMatchObject({
        id: 1,
        date: new Date('2023-06-23'),
      });
      expect(findOne).toHaveBeenCalledWith({
        where: { date: new Date('2023-06-23T00:00:00.000Z') },
      });
    });
    it('should return day with activities', async () => {
      findOne.mockResolvedValue({
        id: 1,
        date: new Date('2023-06-23'),
        activities: [],
      });

      await expect(
        dayService.getDay(new GetDayDTO('2023-06-23'), true)
      ).resolves.toMatchObject({
        id: 1,
        date: new Date('2023-06-23'),
        activities: [],
      });
      expect(findOne).toHaveBeenCalledWith({
        where: { date: new Date('2023-06-23T00:00:00.000Z') },
        relations: ['activities'],
      });
    });
  });
  describe('addDay', () => {
    it('shoud return added day', async () => {
      save.mockResolvedValue({
        id: 1,
        date: new Date('2023-06-23'),
      });

      await expect(
        dayService.addDay(new AddDayDTO('2023-06-23'))
      ).resolves.toMatchObject({
        id: 1,
        date: new Date('2023-06-23'),
      });
      expect(save).toHaveBeenCalledWith(
        { date: new Date('2023-06-23T00:00:00.000Z') },
        { reload: true }
      );
    });
  });
});

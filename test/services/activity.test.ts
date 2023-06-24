import { ObjectLiteral, Repository } from 'typeorm';
import { AppDataSource } from '../../src/data-source';
import dayService from '../../src/services/day';
import activityService from '../../src/services/activity';
import { AddActivityDTO } from '../../src/dto/activity';

const save = jest.fn();
dayService.getDay = jest.fn();
dayService.addDay = jest.fn();

describe('activity service', () => {
  beforeEach(() => {
    jest.spyOn(AppDataSource, 'getRepository').mockReturnValue({
      save,
    } as unknown as Repository<ObjectLiteral>);
  });
  describe('addActivity', () => {
    it('shoud return added activity', async () => {
      (dayService.getDay as jest.Mock).mockResolvedValue({
        id: 1,
        date: new Date('2023-06-23'),
      });

      save.mockResolvedValue({
        id: 1,
        name: 'test',
        from: new Date('0001-01-01T07:00:00Z'),
        to: new Date('0001-01-01T08:00:00Z'),
        checked: false,
        day: {
          id: 1,
          date: new Date('2023-06-23'),
        },
      });

      await expect(
        activityService.addActivity(
          new AddActivityDTO(
            'test',
            '2023-06-23T07:00:00Z',
            '2023-06-23T08:00:00Z',
            '2023-06-23T00:00:00Z'
          )
        )
      ).resolves.toMatchObject({
        id: 1,
        name: 'test',
        from: new Date('0001-01-01T07:00:00Z'),
        to: new Date('0001-01-01T08:00:00Z'),
        checked: false,
        day: {
          id: 1,
          date: new Date('2023-06-23'),
        },
      });
      expect(dayService.getDay).toHaveBeenCalledWith(
        {
          date: new Date('2023-06-23'),
        },
        false
      );
      expect(dayService.addDay).not.toHaveBeenCalled();
    });
    it('shoud add day and return added activity', async () => {
      (dayService.getDay as jest.Mock).mockResolvedValue(null);
      (dayService.addDay as jest.Mock).mockResolvedValue({
        id: 1,
        date: new Date('2023-06-23'),
      });

      save.mockResolvedValue({
        id: 1,
        name: 'test',
        from: new Date('0001-01-01T07:00:00Z'),
        to: new Date('0001-01-01T08:00:00Z'),
        checked: false,
        day: {
          id: 1,
          date: new Date('2023-06-23'),
        },
      });

      await expect(
        activityService.addActivity(
          new AddActivityDTO(
            'test',
            '2023-06-23T07:00:00Z',
            '2023-06-23T08:00:00Z',
            '2023-06-23T00:00:00Z'
          )
        )
      ).resolves.toMatchObject({
        id: 1,
        name: 'test',
        from: new Date('0001-01-01T07:00:00Z'),
        to: new Date('0001-01-01T08:00:00Z'),
        checked: false,
        day: {
          id: 1,
          date: new Date('2023-06-23'),
        },
      });
      expect(dayService.getDay).toHaveBeenCalledWith(
        {
          date: new Date('2023-06-23'),
        },
        false
      );
      expect(dayService.addDay).toHaveBeenCalledWith({
        date: new Date('2023-06-23'),
      });
    });
  });
});

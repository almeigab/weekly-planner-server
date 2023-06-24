import { ObjectLiteral, Repository } from 'typeorm';
import { AppDataSource } from '../../src/data-source';
import activityService from '../../src/services/activity';
import { AddActivityDTO } from '../../src/dto/activity';
import { ActivityOverlapsError } from '../../src/utils/errors/ActivityOverlapsError';

const save = jest.fn();
const countBy = jest.fn();

describe('activity service', () => {
  beforeEach(() => {
    jest.spyOn(AppDataSource, 'getRepository').mockReturnValue({
      save,
      countBy,
    } as unknown as Repository<ObjectLiteral>);
  });
  describe('addActivity', () => {
    it('shoud return added activity', async () => {
      countBy.mockResolvedValue(0);

      save.mockResolvedValue({
        id: 1,
        name: 'test',
        weekDay: 0,
        from: new Date('0001-01-01T07:00:00Z'),
        to: new Date('0001-01-01T08:00:00Z'),
        checked: false,
      });

      await expect(
        activityService.addActivity(
          new AddActivityDTO(
            'test',
            0,
            '2023-06-23T07:00:00Z',
            '2023-06-23T08:00:00Z'
          )
        )
      ).resolves.toMatchObject({
        id: 1,
        name: 'test',
        weekDay: 0,
        from: new Date('0001-01-01T07:00:00Z'),
        to: new Date('0001-01-01T08:00:00Z'),
        checked: false,
      });
    });
    it('shoud throw error when activity overlaps', async () => {
      countBy.mockResolvedValue(1);

      await expect(
        activityService.addActivity(
          new AddActivityDTO(
            'test',
            0,
            '2023-06-23T07:00:00Z',
            '2023-06-23T08:00:00Z'
          )
        )
      ).rejects.toThrowError(new ActivityOverlapsError());
    });
  });
});

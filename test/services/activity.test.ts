import { ObjectLiteral, Repository } from 'typeorm';
import { AppDataSource } from '../../src/data-source';
import activityService from '../../src/services/activity';
import { AddActivityDTO } from '../../src/dto/activity';

const save = jest.fn();

describe('activity service', () => {
  beforeEach(() => {
    jest.spyOn(AppDataSource, 'getRepository').mockReturnValue({
      save,
    } as unknown as Repository<ObjectLiteral>);
  });
  describe('addActivity', () => {
    it('shoud return added activity', async () => {
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
  });
});

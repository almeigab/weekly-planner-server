import {
  parseDateStringToDate,
  parseDateToDateString,
  parseDateToTimeString,
  parseTimeStringToDate,
} from '../../src/utils/dateTime';

describe('dateTime utils', () => {
  describe('parseDateStringToDate', () => {
    it('should return date', () => {
      expect(parseDateStringToDate('2023-06-23')).toStrictEqual(
        new Date('2023-06-23T00:00:00Z')
      );
    });
  });
  describe('parseTimeStringToDate', () => {
    it('should return date', () => {
      expect(parseTimeStringToDate('08:00:00')).toStrictEqual(
        new Date('0001-01-01T08:00:00Z')
      );
    });
  });
  describe('parseDateToDateString', () => {
    it('should return date string', () => {
      expect(parseDateToDateString(new Date('2023-06-23T00:00:00Z'))).toBe(
        '2023-06-23'
      );
    });
  });
  describe('parseDateToTimeString', () => {
    it('should return date', () => {
      expect(parseDateToTimeString(new Date('0001-01-01T08:00:00Z'))).toBe(
        '08:00:00'
      );
    });
  });
});

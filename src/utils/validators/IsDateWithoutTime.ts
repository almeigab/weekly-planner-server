/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateWithoutTime', async: false })
export class IsDateWithoutTime implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    const timestamp = Date.parse(
      `${date}T${new Date().toISOString().split('T')[1]}`
    );
    return !Number.isNaN(timestamp);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Date ($value) should be in format `YYYY-MM-DD`!';
  }
}

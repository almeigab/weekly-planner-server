/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsTime', async: false })
export class IsTime implements ValidatorConstraintInterface {
  validate(time: string, args: ValidationArguments) {
    const timestamp = Date.parse(
      `${new Date().toISOString().split('T')[0]}T${time}Z`
    );
    return !Number.isNaN(timestamp);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Time ($value) should be in format `hh:mm:ss`!';
  }
}

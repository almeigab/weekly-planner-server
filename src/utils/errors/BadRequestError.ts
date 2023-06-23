import { ValidationError } from 'class-validator';

export class BadRequestError extends Error {
  constructor(causes: ValidationError[]) {
    super('Bad Request Error');
    this.name = 'BadRequestError';
    this.causes = causes;
  }

  causes: ValidationError[];
}

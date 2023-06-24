import { ValidationError } from 'class-validator';

export class BadRequestError extends Error {
  constructor(causes: ValidationError[], message = 'Bad Request Error') {
    super(message);
    this.name = 'BadRequestError';
    this.causes = causes;
  }

  causes: ValidationError[];
}

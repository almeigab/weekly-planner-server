import { ValidationError } from 'class-validator';

export class BadRequestError extends Error {
  constructor(
    error: unknown,
    causes?: ValidationError[],
    message = 'Bad Request Error'
  ) {
    super(error instanceof Error ? error.message : message);
    this.name = 'BadRequestError';
    this.causes = causes;
  }

  causes?: ValidationError[];
}

export class UnknownError extends Error {
  constructor(error: unknown, message = 'Unknown Error') {
    super(error instanceof Error ? error.message : message);
    this.name = 'UnknownError';
  }

  causes?: any[];
}

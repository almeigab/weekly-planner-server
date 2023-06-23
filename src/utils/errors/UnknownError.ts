export class UnknownError extends Error {
  constructor(error: unknown) {
    super(error instanceof Error ? error.message : 'error');
    this.name = 'UnknownError';
  }

  causes?: any[];
}

export class ActivityOverlapsError extends Error {
  constructor(message = 'Activity Overlaps Error') {
    super(message);
    this.name = 'ActivityOverlapsError';
  }
}

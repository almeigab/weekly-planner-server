export function parseDateStringToDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

export function parseTimeStringToDate(time: string) {
  return new Date(`0001-01-01T${time}Z`);
}

export function parseDateToDateString(date: Date) {
  return date.toISOString().split('T')[0];
}

export function parseDateToTimeString(date: Date) {
  return date.toISOString().split('T')[1].split('Z')[0].split('.')[0];
}

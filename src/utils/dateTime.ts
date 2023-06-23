function getDateFromTime(time: string) {
  return new Date(`${new Date().toISOString().split('T')[0]}T${time}Z`);
}

function getDateFromDateWithoutTime(dateWithoutTime: string) {
  return new Date(
    `${dateWithoutTime}T${new Date().toISOString().split('T')[1]}`
  );
}

const dateTimeUtils = {
  getDateFromTime,
  getDateFromDateWithoutTime,
};

export default dateTimeUtils;

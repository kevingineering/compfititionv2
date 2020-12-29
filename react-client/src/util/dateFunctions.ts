import moment from 'moment';

//determines if input time is in past
export const timeIsInPast = (inputTime: string) => {
  const today = new Date();

  const todayTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours(),
    today.getMinutes()
  );

  const parsedInputTime = new Date(
    parseInt(inputTime.substr(0, 4)),
    parseInt(inputTime.substr(5, 7)) - 1,
    parseInt(inputTime.substr(8, 10)),
    parseInt(inputTime.substr(11, 13)),
    parseInt(inputTime.substr(14, 16))
  );

  return todayTime >= parsedInputTime;
};

//determines if a date is after year 2100
export const dateIsAfter2100 = (inputDate: string) => {
  const lastDate = new Date(2100, 0, 1);
  if (inputDate[4] !== '-') {
    return true;
  }
  const parsedInputDate = new Date(
    parseInt(inputDate.substr(0, 4)),
    parseInt(inputDate.substr(5, 7)) - 1,
    parseInt(inputDate.substr(8, 10))
  );
  return lastDate <= parsedInputDate;
};

//returns an object with current date of goal and booleans saying if goal has started and if goal is complete
export const getGoalTime = (startTime: Date, duration: number) => {
  const isStarted = moment().isAfter(startTime);

  let time = Math.min(
    moment().endOf('day').diff(moment(startTime), 'days'),
    duration
  );

  const isFinished = time === duration;

  return { isStarted, time, isFinished };
};

//removes unnecessary decimals from a number
export const cleanNumber = (value: number, decimals: number = 2) => {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
};

import moment from 'moment';

//determines if a date occured before today
export const dateIsBeforeToday = (inputDate: string) => {
  const today = new Date();
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const parsedInputDate = new Date(
    parseInt(inputDate.substr(0, 4)),
    parseInt(inputDate.substr(5, 7)) - 1,
    parseInt(inputDate.substr(8, 10))
  );
  return todayDate > parsedInputDate;
};

//determines if a date is after year 2100
export const dateIsAfter2100 = (inputDate: string) => {
  const lastDate = new Date(2099, 11, 31);
  if (inputDate[4] !== '-') {
    return true;
  }
  const parsedInputDate = new Date(
    parseInt(inputDate.substr(0, 4)),
    parseInt(inputDate.substr(5, 7)) - 1,
    parseInt(inputDate.substr(8, 10))
  );
  return lastDate < parsedInputDate;
};

//returns an object with current date of goal and booleans saying if goal has started and if goal is complete
export const getGoalTime = (startDate: Date, duration: number) => {
  const isStarted = moment().startOf('day').diff(startDate, 'hours') >= 0;
  let time = Math.min(moment().endOf('day').diff(startDate, 'days'), duration);

  const isComplete = time === duration;

  return { isStarted, time, isComplete };
};

//removes unnecessary decimals from a number
export const cleanNumber = (value: number, decimals: number = 2) => {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
};

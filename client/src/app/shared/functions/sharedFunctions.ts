import * as moment from 'moment';

// returns [boolean, number, boolean]
export const getTimeWithStatus = (
  startDate: Date,
  duration: number
): [boolean, number, boolean] => {
  const isStarted = moment().startOf('day').diff(startDate, 'hours') >= 0;
  let time = moment().startOf('day').diff(startDate, 'days');
  if (time > duration) {
    time = duration;
  }
  const isComplete = time === duration;

  return [isStarted, time, isComplete];
};

export const getTime = (startDate: Date, duration: number): number => {
  let time = moment().startOf('day').diff(startDate, 'days');
  if (time > duration) {
    time = duration;
  }
  return time;
};

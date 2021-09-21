/**
 * @param {string} time RFC3339
 */
const time = (time: string): string => {
  const diff = new Date().getTime() - new Date(time).getTime();

  // diff in seconds
  const seconds = Math.abs(diff) / 1000;

  // time durations in seconds
  const MINUTE = 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const WEEK = DAY * 7;
  const MONTH = WEEK * 4;
  const YEAR = MONTH * 12;

  if (seconds < MINUTE) {
    return `${seconds} second(s) ago`;
  } else if (seconds < HOUR) {
    return `${Math.floor(seconds / MINUTE)} minute(s) ago`;
  } else if (seconds < DAY) {
    return `${Math.floor(seconds / HOUR)} hour(s) ago`;
  } else if (seconds < WEEK) {
    return `${Math.floor(seconds / DAY)} day(s) ago`;
  } else if (seconds < MONTH) {
    return `${Math.floor(seconds / WEEK)} week(s) ago`;
  } else if (seconds < YEAR) {
    return `${Math.floor(seconds / MONTH)} month(s) ago`;
  } else {
    return `${Math.floor(seconds / YEAR)} year(s) ago`;
  }
};

export default time;

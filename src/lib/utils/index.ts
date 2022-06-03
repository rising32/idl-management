import { addWeeks, getWeek, getYear, startOfWeek, startOfYear } from 'date-fns';

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    return 'invalid email';
  }
}

export const dateTimeFormatOptions: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

export function getLocalDataString(date: Date) {
  return new Date(date).toLocaleDateString(undefined, dateTimeFormatOptions);
}

export function getWeekNumber(date: Date) {
  return getWeek(date, { weekStartsOn: 1, firstWeekContainsDate: 4 });
}

export function getFirstDayOfYear() {
  const startDay = startOfYear(new Date(getYear(new Date()), 1, 1));
  let realStartDay;
  if (getWeek(startDay, { weekStartsOn: 1, firstWeekContainsDate: 4 }) >= 52) {
    realStartDay = startOfWeek(addWeeks(startDay, 1), { weekStartsOn: 1 });
  } else {
    realStartDay = startDay;
  }
  return realStartDay;
}

export function getShortName(name: string) {
  const short = name
    .split(' ')
    .map(x => x[0].toUpperCase())
    .join('');
  return short;
}

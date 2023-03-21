const leftTime = (time: string): string => time.split(" - ")[0];
const rightTime = (time: string): string => time.split(" - ")[1];
const isNotValidTimeFormat = (time: string): boolean => time.indexOf(":") < 0;
const getHour = (time: string): number => parseInt(time.split(":")[0]);
const invalidHour = (hour: number): boolean => hour < 0 || hour > 23;
const getMinute = (time: string): number => parseInt(time.split(":")[1]);
const invalidMinute = (minute: number): boolean => minute < 0 || minute > 59;

export const isMilitaryTime = (time: string): boolean => {
  if (time === "") return false;
  if (time.split(" - ").length != 2) return false;
  if (
    isNotValidTimeFormat(leftTime(time)) ||
    isNotValidTimeFormat(rightTime(time))
  )
    return false;

  if (
    invalidHour(getHour(leftTime(time))) ||
    invalidHour(getHour(rightTime(time)))
  )
    return false;

  if (
    invalidMinute(getMinute(leftTime(time))) ||
    invalidMinute(getMinute(rightTime(time)))
  )
    return false;

  return true;
};

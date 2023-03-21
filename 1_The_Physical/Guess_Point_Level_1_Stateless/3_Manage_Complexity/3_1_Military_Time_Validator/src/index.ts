const leftTime = (time: string): string => time.split(" - ")[0];
const rightTime = (time: string): string => time.split(" - ")[1];
const isNotValidTimeFormat = (time: string): boolean =>
  time.split(":").length !== 2;
const invalidHour = (time: string): boolean =>
  parseInt(time.split(":")[0]) < 0 || parseInt(time.split(":")[0]) > 23;
const invalidMinute = (time: string): boolean =>
  parseInt(time.split(":")[1]) < 0 || parseInt(time.split(":")[1]) > 59;

export const isMilitaryTime = (time: string): boolean => {
  if (time === "") return false;
  if (time.split(" - ").length != 2) return false;
  if (
    isNotValidTimeFormat(leftTime(time)) ||
    isNotValidTimeFormat(rightTime(time))
  )
    return false;

  if (invalidHour(leftTime(time)) || invalidHour(rightTime(time))) return false;

  if (invalidMinute(leftTime(time)) || invalidMinute(rightTime(time)))
    return false;

  return true;
};

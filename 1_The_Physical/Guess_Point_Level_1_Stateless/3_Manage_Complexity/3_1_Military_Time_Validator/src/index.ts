const leftTime = (time: string): string => time.split(" - ")[0];
const rightTime = (time: string): string => time.split(" - ")[1];
const isNotValidTimeFormat = (time: string): boolean => time.indexOf(":") < 0;
export const isMilitaryTime = (time: string): boolean => {
  if (time === "") return false;
  if (time.split(" - ").length != 2) return false;
  if (
    isNotValidTimeFormat(leftTime(time)) ||
    isNotValidTimeFormat(rightTime(time))
  )
    return false;
  return true;
};

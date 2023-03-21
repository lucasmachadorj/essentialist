const isNotValidTimeFormat = (time: string): boolean =>
  time.split(":").length !== 2;
const invalidHour = (time: string): boolean =>
  parseInt(time.split(":")[0]) < 0 || parseInt(time.split(":")[0]) > 23;
const invalidMinute = (time: string): boolean =>
  parseInt(time.split(":")[1]) < 0 || parseInt(time.split(":")[1]) > 59;

export const isMilitaryTime = (time: string): boolean => {
  if (time === "") return false;
  let [start = "", end = ""] = time.split(" - ");

  if (time.split(" - ").length != 2) return false;
  if (isNotValidTimeFormat(start) || isNotValidTimeFormat(end)) return false;
  if (invalidHour(start) || invalidHour(end)) return false;
  if (invalidMinute(start) || invalidMinute(end)) return false;

  return true;
};

export const isMilitaryTime = (time: string): boolean => {
  if (time === "") return false;
  if (time.indexOf(" - ") < 0) return false;
  if (time.split(" - ")[1].indexOf(":") < 0) return false;
  return true;
};

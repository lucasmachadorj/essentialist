export const isMilitaryTime = (time: string): boolean => {
  if (time === "") return false;
  if (time.indexOf(" - ") < 0) return false;
  return true;
};

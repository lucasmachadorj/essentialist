export const isMilitaryTime = (time: string): boolean => {
  if (time === "") return false;
  if (time === "000012:00") return false;
  return true;
};

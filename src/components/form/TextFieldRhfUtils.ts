export const stringToNumber = (str: string) => +str;
export const stringToNumberOrNull = ((str: string) =>
  str === "" ? null : +str) as typeof stringToNumber;
export const numberToString = (val: number) => val?.toString() || "";

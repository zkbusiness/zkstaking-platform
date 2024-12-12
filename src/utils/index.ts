import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import numeral from "numeral";

export const formatNumber = (
  value: number,
  format: string = "0.[00]a"
): string => {
  return numeral(value).format(format).toUpperCase(); // 'a' formats numbers to K, M, B, T
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const timeFix = (value: number) => {
  if (value / 9 > 1) {
    return value;
  } else {
    return "0" + value;
  }
};

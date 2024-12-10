import numeral from "numeral";

export const formatNumber = (value: number): string => {
  return numeral(value).format("0.[00]a").toUpperCase(); // 'a' formats numbers to K, M, B, T
};

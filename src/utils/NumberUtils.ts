const toFixed = (value: number): string => {
  return value.toFixed(2);
};

const round = (value: number): number => {
  return Math.round(value * 100) / 100;
};

export const NumberUtils = {
  round,
  toFixed,
};

interface NumberArrayOption {
  start?: number;
  step?: number;
}

export default function makeNumberArray(number: number, option?: NumberArrayOption) {
  const { start = 0, step = 1 } = option || {};
  return Array.from({ length: number }, (_, index) => start + index * step);
}

export const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;
  return parseFloat(average.toFixed(1));
};

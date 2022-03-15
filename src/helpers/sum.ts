export const sum = (addends: number[]): number => {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  return addends?.length > 0 ? addends.reduce(reducer) : 0;
};

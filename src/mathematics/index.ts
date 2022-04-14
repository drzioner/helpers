export const sum = (previousValue, currentValue) =>
  previousValue + currentValue;
export const subtraction = (previousValue, currentValue) =>
  previousValue - currentValue;
export const division = (previousValue, currentValue) =>
  previousValue / currentValue;
export const multiplication = (previousValue, currentValue) =>
  previousValue * currentValue;

export declare type ArithmeticOperationType =
  | 'sum'
  | 'subtraction'
  | 'division'
  | 'multiplication';

export enum ArithmeticOperations {
  SUM = 'sum',
  SUBTRACTION = 'subtraction',
  DIVISION = 'division',
  MULTIPLICATION = 'multiplication',
}

const reducers = {
  sum,
  subtraction,
  division,
  multiplication,
};

export const arithmeticOperations = (
  values: number[],
  operation: ArithmeticOperationType,
): number => {
  const reducer = reducers[operation];
  return values?.length > 0 ? values.reduce(reducer) : 0;
};

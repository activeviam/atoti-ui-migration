/**
 * Extracts the tuple value from the column-width argument value.
 * The tuple is in the shape of [baseColumnWidth, levelColumnMultiplier]
 */
export function getColumnWidthFromArgs(argString: string): [number, number] {
  const values = argString
    .split(",")
    .map((stringValue) => parseInt(stringValue));

  if (values.length !== 2) {
    throw new Error(
      "The value passed into the column-width argument must be two numbers separated by a comma",
    );
  }

  const [baseWidth, levelColumnMultiplier] = values;

  return [baseWidth, levelColumnMultiplier];
}

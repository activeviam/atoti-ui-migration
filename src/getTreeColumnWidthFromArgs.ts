/**
 * Extracts the tuple from the tree-column-width argument value.
 * The tuple is in the shape of [baseColumnWidth, levelDepthMultiplier]
 */
export function getTreeColumnWidthFromArgs(
  argString: string,
): [number, number] {
  const values = argString
    .split(",")
    .map((stringValue) => parseInt(stringValue));

  if (values.length !== 2) {
    throw new Error(
      "The value passed into the column-width argument must be two numbers separated by a comma",
    );
  }

  const [baseWidth, levelDepthMultiplier] = values;

  return [baseWidth, levelDepthMultiplier];
}

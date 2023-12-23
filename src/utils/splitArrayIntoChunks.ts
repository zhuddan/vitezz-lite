/**
 * @desc 切分二维数组
 * @param arr
 * @param partLength
 */
export function splitArrayIntoChunks<T>(arr: T[], partLength: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / partLength) }, (_, index) =>
    arr.slice(index * partLength, (index + 1) * partLength),
  );
}
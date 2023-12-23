type KeyOf<T> = T extends object ? keyof T : never;

/**
 * 去重
 * @param arr
 * @param propertyNames
 */
export function uniqueArray<T extends object>(arr: T[], ...propertyNames: KeyOf<T>[]): T[];
export function uniqueArray<T>(arr: T[]): T[];
export function uniqueArray<T>(arr: T[], ...propertyNames: KeyOf<T>[]): T[] {
  if (propertyNames && propertyNames.length > 0) {
    const uniqueMap = new Map<string, T>();
    arr.forEach((item) => {
      const key = propertyNames.map(prop => String(item[prop])).join('-');
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    });
    return Array.from(uniqueMap.values());
  }
  else {
    return Array.from(new Set(arr));
  }
}

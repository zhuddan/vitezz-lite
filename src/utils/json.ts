export function stringifyJson(data: AnyObject): Nullable<string> {
  try {
    return JSON.stringify(data);
  }
  catch (error) {
    return null;
  }
}

export function parseJson<T extends AnyObject = AnyObject>(jsonStr: string): Nullable<T> {
  try {
    return JSON.parse(jsonStr);
  }
  catch (error) {
    return null;
  }
}

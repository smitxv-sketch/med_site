export function getByPath(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    current = current[key];
  }
  return current;
}

export function setByPath(obj: any, path: string, value: any): void {
  if (!obj || !path) return;
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined || current[key] === null) {
      // Create array if next key is numeric
      current[key] = !isNaN(Number(keys[i + 1])) ? [] : {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

export function hydrateProps<T = Record<string, any>>(
  targetObj: T | undefined,
  bindings: Record<string, string> | undefined,
  context: any
): T {
  const result = targetObj ? JSON.parse(JSON.stringify(targetObj)) : {};
  
  if (!bindings || !context) {
    return result as T;
  }

  for (const [targetPath, sourcePath] of Object.entries(bindings)) {
    const value = getByPath(context, sourcePath);
    if (value !== undefined) {
      setByPath(result, targetPath, value);
    }
  }

  return result as T;
}

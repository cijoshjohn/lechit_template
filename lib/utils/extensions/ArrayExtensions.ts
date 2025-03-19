import './MapExtensions';

export function groupBy<T, TKey extends keyof T>(this: T[], key: TKey): Map<T[TKey], T[]> {
  const map = new Map<T[TKey], T[]>();
  for (const item of this) {
    const group = map.getOrAdd(item[key], []);
    group.push(item);
  }
  return map;
}

declare global {
  interface Array<T> {
    /**
     * Groups elements in an array by distinct values of a given key.
     */
    groupBy<TKey extends keyof T>(this: T[], key: TKey): Map<T[TKey], T[]>;
  }
}

Array.prototype.groupBy = groupBy;

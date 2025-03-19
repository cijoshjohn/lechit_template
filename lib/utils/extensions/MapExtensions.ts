export function getOrAdd<K, V>(this: Map<K, V>, key: K, defaultValue: V): V {
  const existing = this.get(key);
  if (existing !== undefined) {
    return existing;
  }
  this.set(key, defaultValue);
  return defaultValue;
}

declare global {
  interface Map<K, V> {
    /**
     * Gets a value from a {@link Map} by key if it exists.
     * If it does not exist, the default value is set for that key and is returned.
     */
    getOrAdd(this: Map<K, V>, key: K, defaultValue: V): V;
  }
}

Map.prototype.getOrAdd = getOrAdd;

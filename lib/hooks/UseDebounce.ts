import React, { useEffect, useRef, useState } from 'react';

export type UseDebounce<T> = [
  /**
   * The debounced value. Updates only after the specified delay elapses.
   */
  debounced: T,

  /**
   * A function for updating the debounced value immediately.
   * This additionally updates the source state and cancels any pending debouncing.
   */
  setDebouncedImmediately: (value: T) => void,

  /**
   * Cancels any pending debouncing. The debounced value won't be updated from its previous value.
   */
  cancel: () => void,
];

/**
 * Handles debouncing of state.
 *
 * Adapted from code at:
 * @see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export function useDebounce<T>(
  state: T,
  setState: React.Dispatch<React.SetStateAction<T>>,
  delay: number,
): UseDebounce<T> {
  const [debounced, setDebounced] = useState<T>(state);
  const [immediate, setImmediate] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    clearTimeout(timeout.current); // Clear in progress timeouts every time the state changes.

    if (immediate) {
      setDebounced(state);
      setImmediate(false);
    } else {
      timeout.current = setTimeout(() => setDebounced(state), delay);
    }

    return () => {
      clearTimeout(timeout.current);
    };
  }, [state, immediate]);

  const setDebouncedImmediately = (value: T) => {
    setImmediate(true);
    setState(value);
  };

  const cancel = () => {
    clearTimeout(timeout.current);
  };

  return [debounced, setDebouncedImmediately, cancel];
}

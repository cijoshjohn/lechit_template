import { useEffect, useRef } from 'react';
import { useOptionalState, OptionalState } from './UseOptionalState';

export type UseResetAfterTime<T> = [
  /**
   * The current value.
   */
  value: T,

  /**
   * A function for updating the value to a new state which will reset back to its initial value after a timeout.
   * This additionally cancels any pending reset, and starts it again.
   */
  setValue: (value: T) => void,

  /**
   * Cancels any pending reset, the value will stay as its current value.
   */
  cancel: () => void,

  /**
   * Immediately resets the value to its initial value.
   */
  reset: () => void,
];

/**
 * Handles setting of state which will reset back to specified initial value after a timeout.
 *
 * @param state The state being controlled. If left undefined, uses internal state.
 * @param initial When the value is changed, it will be reset to this value after delay.
 * @param delay The amount of time until the value resets to its initial.
 */
export function useResetAfterTime<T>(state: OptionalState<T>, initial: T, delay: number): UseResetAfterTime<T> {
  const [current, setCurrent] = useOptionalState(state, initial);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    clearTimeout(timeout.current); // Clear in progress timeouts every time the state changes.

    if (current != initial) {
      timeout.current = setTimeout(() => setCurrent(initial), delay);
    }

    return () => {
      clearTimeout(timeout.current);
    };
  }, [current]);

  const cancel = () => {
    clearTimeout(timeout.current);
  };

  const reset = () => {
    cancel();
    setCurrent(initial);
  };

  return [current, setCurrent, cancel, reset];
}

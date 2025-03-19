import React, { useState } from 'react';

export type OptionalState<T> = [value: T, setValue: React.Dispatch<React.SetStateAction<T>> | undefined] | undefined;

/**
 * Allows a component or hook to accept an optional state via props, making it controlled if provided.
 * Otherwise, internal state is used making it uncontrolled.
 *
 * @param controlledState
 * The controlled state, typically provided via props.
 * If `setValue` is not provided, then the controlled component cannot update the owner's state from inside.
 *
 * @param defaultValue
 * The default value passed to the internal `useState`. Only used if `controlledState` is not provided.
 */
export function useOptionalState<T>(
  controlledState: OptionalState<T>,
  defaultValue: T,
): [value: T, setValue: React.Dispatch<React.SetStateAction<T>>] {
  // useState must always be called regardless of whether it's actually used or not to preserve order of hooks.
  const [internalValue, setInternalValue] = useState<T>(defaultValue);

  if (controlledState) {
    const [value, setValue] = controlledState;
    return [value, setValue ?? (() => {})];
  }

  return [internalValue, setInternalValue];
}

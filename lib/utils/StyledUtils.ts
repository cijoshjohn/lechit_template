// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { styled } from '@mui/material';

/**
 * Helper for excluding typed property keys when using the {@link styled} function
 * to create styled components with custom props that should not be passed down to its children.
 *
 * This helps avoid doing long chains of `prop !== 'someProperty' && prop !== 'anotherProperty' && ...`
 *
 * @example
 * type CustomBoxProps = BoxProps & {
 *   someProperty: number;
 *   anotherProperty: string;
 * }
 *
 * const CustomComponent = styled(Box, {
 *   shouldForwardProp: (prop) => excludeProps<CustomBoxProps>(prop, ['someProperty', 'anotherProperty']),
 * })<CustomBoxProps>(({ theme, someProperty }) => ({
 *   ...
 * }));
 */
export function excludeProps<TProps>(prop: PropertyKey, excluded: (keyof TProps)[]): boolean {
  return !excluded.includes(prop as keyof TProps);
}

import { forwardRef } from 'react';
import { ListChildComponentProps } from 'react-window';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { FixedSizeList } from 'react-window';

/**
 * Applies padding to the top of a {@link FixedSizeList} when used while setting the list item's style.
 * Should be used with {@link fixedSizedListPaddingInnerElement}
 *
 * Works by shifting all list items down (since they are fixed positioned).
 *
 * https://github.com/bvaughn/react-window?tab=readme-ov-file#can-i-add-padding-to-the-top-and-bottom-of-a-list
 *
 */
export function fixedSizedListPaddingStyle(style: React.CSSProperties, paddingPx: number): React.CSSProperties {
  return { ...style, top: `${parseFloat(style.top as string) + paddingPx}px` };
}

/**
 * Applies padding to the bottom of a {@link FixedSizeList} when set as its `innerElementType`.
 *
 * Works by increasing the height of the fixed size window by the padding amount on both top and bottom.
 * Assumes that padding was also applied to the top with {@link fixedSizedListPaddingStyle}.
 *
 * https://github.com/bvaughn/react-window?tab=readme-ov-file#can-i-add-padding-to-the-top-and-bottom-of-a-list
 */
export function fixedSizedListPaddingInnerElement<T>(paddingPx: number) {
  return forwardRef<HTMLDivElement, ListChildComponentProps<T>>(function innerElem<T>(
    { style, ...rest }: ListChildComponentProps<T>,
    ref: React.LegacyRef<HTMLDivElement>,
  ) {
    return (
      <div
        ref={ref}
        style={{
          ...style,
          height: `${parseFloat(style.height as string) + paddingPx * 2}px`,
        }}
        {...rest}
      />
    );
  });
}

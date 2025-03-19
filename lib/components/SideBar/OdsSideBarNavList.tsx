import { Box, BoxProps, List, ListProps } from '@mui/material';

export interface OdsSideBarNavListProps {
  /**
   * By default, the nav list will set `overflowY` to `auto`, overriding scroll functionality of the side bar
   * which lets content above the nav list stay stationary and will only scroll the nav items list.
   *
   * Setting this to true will disable this behaviour.
   */
  disableOverflowScroll?: boolean;

  children?: React.ReactNode;

  slotProps?: {
    box?: BoxProps;
    list?: ListProps;
  };
}

/**
 * A list containing navigation items, designed to sit in the side bar.
 */
export function OdsSideBarNavList(props: OdsSideBarNavListProps) {
  return (
    <Box sx={{ overflowY: props.disableOverflowScroll ? 'initial' : 'auto' }} {...props.slotProps?.box}>
      <List sx={{ paddingX: '12px', paddingY: '8px' }} {...props.slotProps?.list}>
        {props.children}
      </List>
    </Box>
  );
}

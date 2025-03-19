import React, { useContext } from 'react';
import {
  Box,
  BoxProps,
  ClickAwayListener,
  Drawer,
  DrawerProps,
  Toolbar,
  ToolbarProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { OdsSideBarState } from '../../hooks/UseOdsSideBarState';
import { OdsContext } from '../../contexts/OdsContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OdsContextType } from '../../contexts/OdsContext';

export type OdsSideBarProps = DrawerProps & {
  /**
   * The side bar state.
   * Will use {@link OdsContextType.defaultSideBarState} if unspecified.
   */
  sideBarState?: OdsSideBarState;

  /**
   * By default, the app bar is displayed over content due to it being 'display: fixed', so a
   * margin is added to shift contents down so they sit underneath it. This option disables the margin.
   */
  disableFixedAppBarMargin?: boolean;

  odsSideBarSlotProps?: {
    fixedMargin?: ToolbarProps;
    contentBox?: BoxProps;
  };

  children: React.ReactNode;
};

/**
 * A panel that opens from the side of the screen. Typically displays site navigation links.
 */
export function OdsSideBar(props: OdsSideBarProps): JSX.Element {
  const {
    sideBarState: customSideBarState,
    disableFixedAppBarMargin,
    odsSideBarSlotProps,
    children,
    ...derivedProps
  } = props;
  const { defaultSideBarState } = useContext(OdsContext);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const sideBarState = customSideBarState ?? defaultSideBarState;

  return (
    <Drawer
      open={sideBarState.expanded || sideBarState.previewing}
      variant={smallScreen ? 'temporary' : 'persistent'}
      PaperProps={{
        elevation: 1,
        sx: { overflowY: 'initial', height: 1 },
      }}
      {...derivedProps}
    >
      {/* Padding to position contents below the toolbar displayed over the side bar. */}
      {!disableFixedAppBarMargin && <Toolbar {...odsSideBarSlotProps?.fixedMargin} />}

      {/* Contents */}
      <ClickAwayListener
        onClickAway={() => {
          if (smallScreen) sideBarState.setExpanded(false);
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          flexGrow="1"
          position="relative"
          sx={{ overflowY: 'auto' }}
          onMouseOver={() => sideBarState?.setPreviewing(true, true)}
          onMouseLeave={() => sideBarState?.setPreviewing(false)}
          {...odsSideBarSlotProps?.contentBox}
        >
          {children}
        </Box>
      </ClickAwayListener>
    </Drawer>
  );
}

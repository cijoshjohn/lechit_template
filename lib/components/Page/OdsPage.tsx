import { Box, BoxProps, Paper, PaperProps, styled } from '@mui/material';
import { OdsSideBarState } from '../../hooks/UseOdsSideBarState';
import React, { useContext } from 'react';
import { excludeProps } from '../../utils/StyledUtils';
import { OdsContext } from '../../contexts/OdsContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OdsContextType } from '../../contexts/OdsContext';

type SideBarAnchor = 'left' | 'top' | 'right' | 'bottom';

export type OdsPageProps = BoxProps & {
  /**
   * Controls whether the page content gets pushed inwards due to the side bar being open.
   * Will use {@link OdsContextType.defaultSideBarState} if unspecified.
   */
  sideBarState?: OdsSideBarState;

  /**
   * The anchor of the side bar. Determines what side of the page the margin gets applied to.
   * Defaults to 'left'.
   */
  sideBarAnchor?: SideBarAnchor;

  children: React.ReactNode;

  slotProps?: {
    outer?: PaperProps;
    inner?: PaperProps;
  };
};

function marginKeyFromAnchor(anchor?: SideBarAnchor): keyof BoxProps {
  switch (anchor) {
    case 'left':
    default:
      return 'marginLeft';
    case 'right':
      return 'marginRight';
    case 'top':
      return 'marginTop';
    case 'bottom':
      return 'marginBottom';
  }
}

type StyledBoxProps = {
  sideBarState?: OdsSideBarState;
  sideBarAnchor?: SideBarAnchor;
};

/**
 * A box that automatically applies a margin to the appropriate side based on whether a side bar is open or not.
 * https://mui.com/material-ui/react-drawer/#persistent-drawer
 */
const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => excludeProps<StyledBoxProps>(prop, ['sideBarState', 'sideBarAnchor']),
})<StyledBoxProps>(({ theme, sideBarAnchor }) => {
  const marginKey = marginKeyFromAnchor(sideBarAnchor);
  return {
    display: 'flex',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [marginKey]: 0, // Set the specified side's margin to 0 by default (side bar state not open).
    variants: [
      {
        // 'props' determines when this variant gets applied. In this case, when the side bar is expanded.
        props: ({ sideBarState }) => sideBarState?.expanded === true,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          [marginKey]: theme.shape.sideBarWidth, // Inset the margin when sidebar is open.
        },
      },
    ],
  };
});

/**
 * A {@link Box} component that wraps the page contents. It applies margins based on the side bar.
 */
export function OdsPage(props: OdsPageProps): JSX.Element {
  const { sideBarState: customSideBarState, sideBarAnchor, children, slotProps, ...derivedProps } = props;
  const { defaultSideBarState } = useContext(OdsContext);
  const sideBarState = customSideBarState ?? defaultSideBarState;

  return (
    <StyledBox sideBarState={sideBarState} sideBarAnchor={sideBarAnchor} {...derivedProps}>
      <Paper elevation={2} square={true} sx={{ padding: 2, display: 'flex' }} {...slotProps?.outer}>
        <Paper elevation={1} sx={{ position: 'relative' }} {...slotProps?.inner}>
          {children}
        </Paper>
      </Paper>
    </StyledBox>
  );
}

import { AppBar, AppBarProps, Toolbar, Stack, StackProps, ToolbarProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export type OdsAppBarProps = AppBarProps & {
  /**
   * By default, the app bar is displayed over content due to it being 'display: fixed', so a
   * margin is added to shift contents down so they sit underneath it. This option disables the margin.
   */
  disableFixedAppBarMargin?: boolean;

  /**
   * Dark mode is typically enforced for the app bar, but can be prevented by setting this to true.
   */
  disableDarkMode?: boolean;

  slotProps?: {
    toolbar?: ToolbarProps;
    fixedMargin?: ToolbarProps;
  };
};

/**
 * A wrapper around MUI's {@link AppBar} component.
 */
export function OdsAppBar(props: OdsAppBarProps): JSX.Element {
  const { disableFixedAppBarMargin, disableDarkMode, slotProps, ...derivedProps } = props;
  const theme = useTheme();

  // Dark theme is enforced on OdsAppBar
  return (
    <div className={disableDarkMode ? '' : 'mode-dark'}>
      <AppBar {...derivedProps}>
        <Toolbar sx={{ px: theme.spacing(1) }} disableGutters {...slotProps?.toolbar}>
          {derivedProps.children}
        </Toolbar>
      </AppBar>

      {/* Manually add padding to place content below the fixed position app bar.*/}
      {!disableFixedAppBarMargin && <Toolbar {...slotProps?.fixedMargin} />}
    </div>
  );
}

export function OdsAppBarLeftStack(props: StackProps): JSX.Element {
  return (
    <Stack direction="row" flexGrow={1} spacing={2} alignItems="center" {...props}>
      {props.children}
    </Stack>
  );
}

export function OdsAppBarRightStack(props: StackProps): JSX.Element {
  return (
    <Stack direction="row" alignItems="center" {...props}>
      {props.children}
    </Stack>
  );
}

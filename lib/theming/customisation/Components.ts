import { Components, CssVarsTheme, Theme } from '@mui/material';
import { odsThemeDefaults } from '../OdsTheme';

type ThemeComponents = Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>;

export function odsThemeComponents(themeBuilder: Theme): ThemeComponents {
  return {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body2SemiBold: 'p',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense',
      },
      styleOverrides: {
        dense: {
          height: odsThemeDefaults.toolbarHeight,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          // SVG Icons that appear inside an MUI List or Menu item.
          '.MuiList-root &, .MuiMenuItem-root &': {
            width: themeBuilder.spacing(3),
            height: themeBuilder.spacing(3),
          },
          // SVG Icons in the app bar.
          '.MuiAppBar-root &': {
            color: themeBuilder.palette.common.white,
          },
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: 'inherit',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          flexGrow: 1,
        },
        paperAnchorLeft: {
          width: odsThemeDefaults.sideBarWidth,
          borderRightWidth: 0.5,
          borderRightStyle: 'solid',
          borderRightColor: themeBuilder.palette.divider,
        },
        paperAnchorRight: {
          width: odsThemeDefaults.sideBarWidth,
          borderLeftWidth: 0.5,
          borderLeftStyle: 'solid',
          borderLeftColor: themeBuilder.palette.divider,
        },
        paperAnchorTop: {
          height: odsThemeDefaults.sideBarWidth + odsThemeDefaults.toolbarHeight,
          borderBottomWidth: 0.5,
          borderBottomStyle: 'solid',
          borderBottomColor: themeBuilder.palette.divider,
        },
        paperAnchorBottom: {
          height: odsThemeDefaults.sideBarWidth,
          borderTopWidth: 0.5,
          borderTopStyle: 'solid',
          borderTopColor: themeBuilder.palette.divider,
        },
      },
    },
  };
}

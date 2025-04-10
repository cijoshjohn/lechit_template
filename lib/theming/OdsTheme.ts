/**
 * This file is where the ODS Themes are built, where values can be assigned to the theme options based on our design tokens.
 */

import { Theme, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { deepmergeCustom } from 'deepmerge-ts';
import { createShadows } from '../utils/ElevationUtils';
import { odsThemeComponents } from './customisation/Components';
import { odsThemeColorSchemes } from './customisation/ColorSchemes';
import { odsThemeTypography } from './customisation/Typography';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    number: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    number?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    number: true;
  }
}
/**
 * Values that are used by multiple properties in {@link createBaseOdsThemeOptions}.
 */
export const odsThemeDefaults = {
  sideBarWidth: 256,
  toolbarHeight: 48,
};

/**
 * Options type passed to MUI's `createTheme` function.
 */
export type CreateThemeOptions = Exclude<Parameters<typeof createTheme>[0], undefined>;

/**
 * Base theme options for ODS which other themes can use as base options.
 */
function createBaseOdsThemeOptions(): CreateThemeOptions {
  const themeBuilder = createTheme({
    id: '',
    spacing,
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      number: {
        fontFamily: 'Roboto Mono, monospace',
        fontWeight: 400,
        fontSize: '1rem', // adjust as needed
        letterSpacing: '0.05em',
      },
      allVariants: {
        letterSpacing: '-0.9px',
      },
    },
  });

  return {
    id: 'baseOdsTheme',
    cssVariables: {
      // This is the css class to specify light vs dark mode. It will either be `.mode-light` or `.mode-dark`.
      colorSchemeSelector: '.mode-%s',
    },
    zIndex: {
      // AppBar appears over the drawer.
      drawer: themeBuilder.zIndex.drawer,
      appBar: themeBuilder.zIndex.drawer + 1,
    },
    shape: {
      sideBarWidth: odsThemeDefaults.sideBarWidth,
    },
    typography: odsThemeTypography(themeBuilder),
    components: odsThemeComponents(themeBuilder),
    colorSchemes: odsThemeColorSchemes(),
    shadows: createShadows('none'),
    spacing: spacing,
  };
}

function spacing(value: number | string) {
  let num: number = 0;
  if (typeof value === 'string') {
    num = +value.replace('-', '.');
  } else {
    num = value;
  }
  return num * 8; // Value of 0.25 corresponds to 1px.
}

/**
 * Constructs a theme based on the default ODS theme with customisations merged into it.
 */
export function createOdsTheme(options: CreateThemeOptions): Theme {
  const baseOptions = createBaseOdsThemeOptions();

  // Dont merge arrays since this produces the union of all elements.
  // (Not what we want, e.g. elevation overlay with 50 elements).
  // Rather new arrays should overwrite existing ones.
  const mergeFunc = deepmergeCustom({ mergeArrays: false });

  // The provided options takes precedence over baseOptions
  const mergedOptions = mergeFunc(baseOptions, options);
  const theme = createTheme(mergedOptions);
  return responsiveFontSizes(theme);
}

/**
 * The default ODS theme.
 */
export const odsTheme = createOdsTheme({ id: 'odsTheme' });

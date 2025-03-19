/**
 * The file augments the built-in Typescript definitions for Theme and Palette types.
 *    - This is where additional theme options are defined to represent our own custom ODS design tokens.
 *    - The augmentation behaviour is explained in the MUI theme documentation: https://mui.com/material-ui/customization/theming/
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

// Allows accessing theme css variables. https://mui.com/material-ui/customization/css-theme-variables/usage/#typescript
import type {} from '@mui/material/themeCssVarsAugmentation';

//@ts-expect-error --- Modules need to be imported for them to be augmented.
import type { Theme, ThemeOptions, Palette, PaletteOptions, TypographyVariants, TypographyVariantsOptions, createTheme, responsiveFontSizes } from '@mui/material/styles';

//@ts-expect-error --- Modules need to be imported for them to be augmented.
import type createPalette from '@mui/material/styles/createPalette';

//@ts-expect-error --- Modules need to be imported for them to be augmented.
import { ColorPartial } from '@mui/material/styles/createPalette';

//@ts-expect-error --- Modules need to be imported for them to be augmented.
import type Shape from '@mui/system/createTheme/shape';
import React from 'react';

/* eslint-enable prettier/prettier */

declare module '@mui/material/styles/createPalette' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface PaletteColor extends ColorPartial {} // Allows numeric shades to be accessed for example via `theme.palette.primary`
}

declare module '@mui/system/createTheme/shape' {
  interface Shape {
    sideBarWidth: number | string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body2SemiBold: true;
    body3: true;
    sideNavGroupHeading: true;
  }
}

// Note: Properties added to Theme should also be added to ThemeOptions to allow configuration using `createTheme`. Likewise for Palette and PaletteOptions.
declare module '@mui/material/styles' {
  interface Theme {
    id: string;
  }
  interface ThemeOptions {
    id: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface CustomComponentPalette {}

  interface Palette {
    components?: CustomComponentPalette;
  }

  interface PaletteOptions {
    components?: CustomComponentPalette;
  }

  interface TypographyVariants {
    body2SemiBold: React.CSSProperties;
    body3: React.CSSProperties;
    sideNavGroupHeading: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    body2SemiBold?: React.CSSProperties;
    body3?: React.CSSProperties;
    sideNavGroupHeading?: React.CSSProperties;
  }
}

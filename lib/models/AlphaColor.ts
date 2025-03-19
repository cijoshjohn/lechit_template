import { Color, alpha, darken, lighten } from '@mui/material';

/**
 * Represents colors in the ODS foundations library that have more shades (up to 1200).
 */
export interface ExtendedColor extends Color {
  1000: string;
  1100: string;
  1200: string;
}

/**
 * Represents the full color model used in ODS with 9 shades of alpha levels.
 */
export interface AlphaColor extends ExtendedColor {
  Alpha100: string;
  Alpha200: string;
  Alpha300: string;
  Alpha400: string;
  Alpha500: string;
  Alpha600: string;
  Alpha700: string;
  Alpha800: string;
  Alpha900: string;
}

/**
 * Creates all shades of a color given its shade 500.
 */
export function createColor(shade500: string, accent500?: string): Color {
  return {
    '50': lighten(shade500, 0.9),
    '100': lighten(shade500, 0.75),
    '200': lighten(shade500, 0.6),
    '300': lighten(shade500, 0.45),
    '400': lighten(shade500, 0.3),
    '500': shade500,
    '600': darken(shade500, 0.075),
    '700': darken(shade500, 0.15),
    '800': darken(shade500, 0.3),
    '900': darken(shade500, 0.4),
    A100: lighten(accent500 ?? shade500, 0.75),
    A200: lighten(accent500 ?? shade500, 0.6),
    A400: lighten(accent500 ?? shade500, 0.3),
    A700: darken(accent500 ?? shade500, 0.15),
  };
}

/**
 * Adds additional extended colors 1000 - 1200 which will be darkened values based on shade 500.
 */
export function createExtendedColor(baseColor: Color): ExtendedColor {
  const extendedColor = baseColor as ExtendedColor;
  extendedColor[1000] = darken(baseColor[500], 0.5);
  extendedColor[1100] = darken(baseColor[500], 0.6);
  extendedColor[1200] = darken(baseColor[500], 0.7);
  return extendedColor;
}

/**
 * Generates a color with populated Alpha values (`Alpha100` - `Alpha900`).
 */
export function createAlphaColor(alphaShade: keyof Color, baseColor: Color): AlphaColor {
  const extendedColor = createExtendedColor(baseColor);
  return createAlphaColorExtended(alphaShade, extendedColor);
}

/**
 * Generates a color with populated Alpha values (`Alpha100` - `Alpha900`).
 */
export function createAlphaColorExtended(alphaShade: keyof ExtendedColor, baseColor: ExtendedColor): AlphaColor {
  const alphaColor = baseColor as AlphaColor;
  for (let i = 0; i < 9; i++) {
    const alphaKey = `Alpha${(i + 1) * 100}` as keyof AlphaColor;
    const alphaAmount = (i + 1) / 10;
    alphaColor[alphaKey] = alpha(baseColor[alphaShade], alphaAmount);
  }
  return alphaColor;
}

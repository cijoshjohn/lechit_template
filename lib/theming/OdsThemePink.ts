import { purple } from '@mui/material/colors';
import { createOdsTheme } from './OdsTheme';
import { createOverlays } from '../utils/ElevationUtils';
import { createColor, createExtendedColor } from '../models/AlphaColor';
import { darken } from '@mui/material';

const myPink = createExtendedColor(createColor('#dd66cc'));
const myPink1300 = darken(myPink[500], 0.8);
const myPink1350 = darken(myPink[500], 0.85);

/**
 * An alternate ODS theme. Pink!
 * Demonstrates the ability to extend the default ODS theme.
 */
export const odsThemePink = createOdsTheme({
  id: 'odsThemePink',
  colorSchemes: {
    light: {
      palette: {
        primary: myPink,
        secondary: purple,
        success: myPink,
        warning: myPink,
        error: myPink,
        info: myPink,
        background: { default: myPink[50] },
        AppBar: {
          defaultBg: myPink1350,
          darkBg: myPink1350,
        },
      },
      overlays: createOverlays(myPink[50], [
        myPink[100], // 0
        myPink[50], // 1
        myPink[100], // 2
        myPink[50], // 3
        myPink[100], // 4
      ]),
    },
    dark: {
      palette: {
        primary: myPink,
        secondary: purple,
        success: myPink,
        warning: myPink,
        error: myPink,
        info: myPink,
        background: { default: myPink1300 },
        AppBar: {
          defaultBg: myPink1350,
          darkBg: myPink1350,
        },
      },
      overlays: createOverlays(myPink1350, [
        myPink1300, // 0
        myPink[1200], // 1
        myPink[1100], // 2
        myPink[1000], // 3
        myPink[900], // 4
      ]),
    },
  },
});

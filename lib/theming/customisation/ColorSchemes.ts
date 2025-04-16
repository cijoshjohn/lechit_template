import { ColorSystemOptions, DefaultColorScheme } from '@mui/material/styles/createThemeWithVars';
import { common, grey, green, blue } from '@mui/material/colors';
import { odsCoolGrey } from '../../tokens/OdsCoolGrey';
import { odsOricaBlue } from 'tokens';
import { createOverlays } from '../../utils/ElevationUtils';

type ThemeColorSchemes = Partial<Record<DefaultColorScheme, boolean | ColorSystemOptions>> &
  Record<never, ColorSystemOptions>;

export function odsThemeColorSchemes(): ThemeColorSchemes {
  return {
    light: {
      palette: {
        background: {
          default: grey[100],
          actuals: odsOricaBlue[600],
          forecast: odsCoolGrey[400],
          baseline: green[600],
        } as unknown,
        AppBar: {
          defaultBg: odsCoolGrey[900],
          darkBg: odsCoolGrey[900],
        },
      },
      overlays: createOverlays(common.white, [
        grey[100], // 0
        common.white, // 1
        grey[100], // 2
        common.white, // 3
        grey[100], // 4
      ]),
    },
    dark: {
      palette: {
        action: {
          active: 'rgba(255, 255, 255, 0.54)',
        },
        background: {
          default: grey[900],
          actuals: odsOricaBlue[600],
          forecast: odsCoolGrey[400],
          baseline: green[600],
        } as unknown,
        AppBar: {
          defaultBg: odsCoolGrey[900],
          darkBg: odsCoolGrey[900],
        },
      },
      overlays: createOverlays(odsCoolGrey[800], [
        odsCoolGrey[900], // 0
        odsCoolGrey[800], // 1
        odsCoolGrey[700], // 2
        odsCoolGrey[600], // 3
        odsCoolGrey[500], // 4
      ]),
    },
  };
}

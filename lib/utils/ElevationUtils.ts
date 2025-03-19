import { Overlays, Shadows } from '@mui/material';

/**
 * Creates a background-image CSS value that has a solid color using linear-gradient.
 * https://mui.com/material-ui/react-paper/#elevation
 */
export function overlayColor(color: string): string {
  return `linear-gradient(${color}, ${color})`;
}

/**
 * Creates an {@link Overlays} object for all 25 elevations using a default color.
 * Allows overriding any number of colors beginning at elevation 0.
 *
 * @param defaultColor The color to use for all elevations by default.
 * @param elevationColors The colors to override the base color starting from elevation 0.
 */
export function createOverlays(defaultColor: string, elevationColors?: string[]): Overlays {
  const elevationColorOrDefault = (elevation: number) => {
    if (elevationColors && elevation < elevationColors?.length) {
      return overlayColor(elevationColors[elevation]);
    }
    return overlayColor(defaultColor);
  };

  return [
    elevationColorOrDefault(0),
    elevationColorOrDefault(1),
    elevationColorOrDefault(2),
    elevationColorOrDefault(3),
    elevationColorOrDefault(4),
    elevationColorOrDefault(5),
    elevationColorOrDefault(6),
    elevationColorOrDefault(7),
    elevationColorOrDefault(8),
    elevationColorOrDefault(9),
    elevationColorOrDefault(10),
    elevationColorOrDefault(11),
    elevationColorOrDefault(12),
    elevationColorOrDefault(13),
    elevationColorOrDefault(14),
    elevationColorOrDefault(15),
    elevationColorOrDefault(16),
    elevationColorOrDefault(17),
    elevationColorOrDefault(18),
    elevationColorOrDefault(19),
    elevationColorOrDefault(20),
    elevationColorOrDefault(21),
    elevationColorOrDefault(22),
    elevationColorOrDefault(23),
    elevationColorOrDefault(24),
  ];
}

/**
 * Creates a {@link Shadows} object for all 25 elevations using a default shadow (except elevation 0 which must be 'none').
 * Allows overriding any number of shadows beginning at elevation 1.
 *
 * @param defaultShadow The shadow to use for all elevations by default.
 * @param elevationShadows The shadows to override the base shadow starting from elevation 1.
 */
export function createShadows(defaultShadow: string, elevationShadows?: string[]): Shadows {
  const elevationShadowOrDefault = (elevation: number) => {
    const index = elevation - 1;
    if (elevationShadows && index < elevationShadows?.length) {
      return elevationShadows[index];
    }
    return defaultShadow;
  };

  return [
    'none',
    elevationShadowOrDefault(1),
    elevationShadowOrDefault(2),
    elevationShadowOrDefault(3),
    elevationShadowOrDefault(4),
    elevationShadowOrDefault(5),
    elevationShadowOrDefault(6),
    elevationShadowOrDefault(7),
    elevationShadowOrDefault(8),
    elevationShadowOrDefault(9),
    elevationShadowOrDefault(10),
    elevationShadowOrDefault(11),
    elevationShadowOrDefault(12),
    elevationShadowOrDefault(13),
    elevationShadowOrDefault(14),
    elevationShadowOrDefault(15),
    elevationShadowOrDefault(16),
    elevationShadowOrDefault(17),
    elevationShadowOrDefault(18),
    elevationShadowOrDefault(19),
    elevationShadowOrDefault(20),
    elevationShadowOrDefault(21),
    elevationShadowOrDefault(22),
    elevationShadowOrDefault(23),
    elevationShadowOrDefault(24),
  ];
}

import { Theme } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export function odsThemeTypography(themeBuilder: Theme): TypographyOptions {
  return {
    fontFamily: themeBuilder.typography.fontFamily,
    allVariants: {
      fontFeatureSettings: '"zero" 0, "liga" off, "clig" off',
    },
    body2SemiBold: {
      ...themeBuilder.typography.body2,
      fontWeight: 600,
      lineHeight: '143%',
    },
    body3: {
      ...themeBuilder.typography.body2,
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '133%',
      letterSpacing: '0.08px',
    },
    sideNavGroupHeading: {
      ...themeBuilder.typography.body2,
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '12px',
      letterSpacing: '1.6px',
      textTransform: 'uppercase',
    },
  };
}

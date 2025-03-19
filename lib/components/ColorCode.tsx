import { ColorPalette, ColorItem } from '@storybook/addon-docs';
import { odsThemeColorSchemes } from '../theming/customisation/ColorSchemes';

import { ColorSystemOptions } from '@mui/material/styles/createThemeWithVars';
const CustomColorPalette = () => {
  const themeColorSchemes = odsThemeColorSchemes();

  return (
    <div style={{ padding: 15 }}>
      {Object.entries(themeColorSchemes).map(([schemeName, scheme]) => (
        <div key={schemeName} style={{ marginBottom: 20 }}>
          <h2>{schemeName} Theme</h2>
          <ColorPalette>
            {Object.entries(scheme.palette).map(([paletteName, palette]) => (
              <div key={paletteName}>
                <h3>{paletteName}</h3>
                {Object.entries(palette as string).map(([colorName, colorValue]) => (
                  <ColorItem key={colorName} title={colorName} colors={{ [colorName]: colorValue }} subtitle={''} />
                ))}
              </div>
            ))}
            {Object.entries(scheme.overlays as ColorSystemOptions).map(([overlayName, overlay]) => (
              <div key={overlayName}>
                <h3>{'overlays[' + overlayName + ']'}</h3>
                <ColorItem key={overlayName} title={''} colors={{ [overlayName]: overlay as string }} subtitle={''} />
              </div>
            ))}
          </ColorPalette>
        </div>
      ))}
    </div>
  );
};

export default CustomColorPalette;

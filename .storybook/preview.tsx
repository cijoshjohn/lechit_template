// .storybook/preview.tsx

import type { Preview } from '@storybook/react';
import React, { PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { CssBaseline, ThemeProvider, useColorScheme } from '@mui/material';
import { addons } from '@storybook/addons';
import { useGlobals } from '@storybook/addons';

import { odsTheme } from '../lib/theming/OdsTheme';

// Define custom viewports (adjust as needed)
const newViewports = {
  sd: { name: 'sd', styles: { width: '1024px', height: '576px' } },
  hd: { name: 'hd', styles: { width: '1280px', height: '720px' } },
  fullHD: { name: 'fullHD', styles: { width: '1366px', height: '768px' } },
  qhd: { name: 'qhd', styles: { width: '1920px', height: '1080px' } },
  '2k': { name: '2k', styles: { width: '2560px', height: '1440px' } },
  '4k': { name: '4k', styles: { width: '3840px', height: '2160px' } },
};

// Define available theme options.
// The keys are display names while the values are the mode names used by MUI.
const themeOptions = {
  ODS: 'system',
  Light: 'light',
  Dark: 'dark',
};

// Define a type for the mode.
type Mode = 'system' | 'light' | 'dark';

/**
 * ThemeSwitcher is a small helper component that updates MUI’s color scheme
 * according to the provided `activeMode`. It uses the MUI hook `useColorScheme`,
 * which must be used inside a ThemeProvider.
 */
function ThemeSwitcher(props: PropsWithChildren<{ activeMode: Mode }>): JSX.Element | null {
  
  const { mode, setMode  } = useColorScheme();
  const previousModeRef = useRef(mode);
  useEffect(() => {
    if (props.activeMode && props.activeMode !== previousModeRef.current) {
      setMode(props.activeMode);
      previousModeRef.current = props.activeMode; // Track last set mode
    }
  }, [props.activeMode, setMode]);
  // Until the color mode is initialized, don't render the children.
  if (!mode) return null;

  return <>{props.children}</>;
}

/**
 * ThemeWrapper wraps stories in MUI's ThemeProvider and applies a CssBaseline.
 * It accepts an `activeMode` prop to dynamically set the theme.
 */
interface ThemeWrapperProps {
  children: React.ReactNode;
  activeMode: Mode;
}

const ThemeWrapper = ({ children, activeMode }: ThemeWrapperProps) => {
  return (
    <ThemeProvider theme={odsTheme} defaultMode={'system'}>
      <CssBaseline enableColorScheme={true} />
      <ThemeSwitcher activeMode={activeMode}>{children}</ThemeSwitcher>
    </ThemeProvider>
  );
};

/**
 * Define globalTypes so that Storybook adds a toolbar control for theme selection.
 * This control will appear in the Storybook toolbar and its value will be available
 * in each story's globals.
 */
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Select theme',
    defaultValue: 'system',
    toolbar: {
      // Icon shown in the toolbar
      icon: 'mirror',
      // The list of options for the dropdown.
      items: Object.keys(themeOptions).map((key) => ({
        // The value passed to your code will be the one defined in themeOptions.
        value: themeOptions[key as keyof typeof themeOptions],
        title: key,
      })),
      dynamicTitle: true,
    },
  },
};

// Configure Storybook parameters and decorators.
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: newViewports,
      defaultViewport: 'lg',
    },
  },
  decorators: [
    (Story, context) => {
      // Access the global toolbar selection for theme.
      const { globals } = context;
      const activeMode: Mode = globals.theme || 'system';

      // Optionally, you can emit a custom event when the theme changes.
      useEffect(() => {
        addons.getChannel().emit('THEME_CHANGED', activeMode);
      }, [activeMode]);

      return (
        <ThemeWrapper activeMode={activeMode}>
          <div
            style={{
              margin: '1em',
              border: '1px solid red',
              padding: '1em',
            }}
            className="storywrapper"
          >
            <Story />
          </div>
        </ThemeWrapper>
      );
    },
  ],
};

export default preview;

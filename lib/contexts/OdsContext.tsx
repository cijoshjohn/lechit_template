import { CssBaseline, Theme, ThemeProvider, useColorScheme } from '@mui/material';
import { Mode } from '@mui/system/cssVars/useCurrentColorScheme';
import { odsTheme } from '../theming/OdsTheme';
import { OdsPrefsLocalStorageService } from '../services/OdsPrefsLocalStorageService';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useOdsSideBarState, OdsSideBarState } from '../hooks/UseOdsSideBarState';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OdsSideBar } from '../components/SideBar/OdsSideBar';

export type OdsContextType = {
  /**
   * A collection of available themes.
   */
  themes: Theme[];

  /**
   * The currently active theme id.
   */
  activeThemeId: string;

  /**
   * The currently active them color mode.
   */
  activeMode: Mode;

  /**
   * Sets the active theme based on its id.
   * If no theme with the given id exists in {@link OdsContextType.themes}, then {@link odsTheme} is used as a default.
   */
  setActiveThemeId: (themeId: string) => void;

  /**
   * Sets the active color mode.
   */
  setActiveMode: (mode: Mode) => void;

  /**
   * State which can be used for managing an {@link OdsSideBar}.
   */
  defaultSideBarState: OdsSideBarState;
};

export const OdsContext = React.createContext<OdsContextType>({
  themes: [odsTheme],
  activeThemeId: odsTheme.id,
  activeMode: 'system',
  setActiveThemeId: () => {},
  setActiveMode: () => {},
  defaultSideBarState: {
    expanded: false,
    setExpanded: () => {},
    previewing: false,
    setPreviewing: () => {},
    open: false,
  },
});

export interface OdsProviderLocalStorageOptions {
  /**
   * The key that should be unique per set of preferences.
   *
   * For example, by setting this to the unique id of a signed-in user, preferences can be associated with that user and saved separately to other users.
   *
   * IMPORTANT: When this property is undefined, no children will be rendered - undefined will be returned. It is treated as if the key is not yet loaded.
   * The page will not display until the key is loaded so that the intended preferences are used. (Prevents flashing the wrong theme or color mode on page refresh etc.)
   */
  key: string | undefined;
}

export interface OdsProviderProps extends PropsWithChildren {
  /**
   * A collection of available themes. If none provided, then {@link odsTheme} will be used as the default.
   */
  themes?: Theme[];

  /**
   * - If this is provided, ODS will automatically persist preferences in the browser's local storage using the specified key.
   * - If left undefined, ODS will not automatically persist any preferences between browser refreshes.
   */
  localStorage?: OdsProviderLocalStorageOptions;
}

/**
 * Context provider that provides ODS theming features.
 */
export function OdsProvider(props: OdsProviderProps): React.ReactNode {
  const themes = props.themes && props.themes.length > 0 ? props.themes : [odsTheme];

  const localStorage = new OdsPrefsLocalStorageService();
  const [activeThemeId, setActiveThemeId] = useState<string | undefined>(undefined);
  const [activeMode, setActiveMode] = useState<Mode | undefined>(undefined);
  const defaultSideBarState = useOdsSideBarState();

  const defaultThemeId = themes[0].id;
  const defaultMode: Mode = 'system';

  // When preference state changes to a non-null value, save into local storage if a key is provided.
  useEffect(() => {
    if (activeMode && props?.localStorage?.key != null) {
      localStorage.set(props?.localStorage?.key, 'activeMode', activeMode);
    }
  }, [activeMode]);

  useEffect(() => {
    if (activeThemeId && props?.localStorage?.key != null) {
      localStorage.set(props?.localStorage?.key, 'activeThemeId', activeThemeId);
    }
  }, [activeThemeId]);

  // When local storage key is updated, retrieve saved prefs for that key and load it into state.
  useEffect(() => {
    const prefs = props?.localStorage?.key != null ? localStorage.get(props.localStorage.key) : undefined;

    setActiveThemeId(() => prefs?.activeThemeId ?? defaultThemeId);
    setActiveMode(() => prefs?.activeMode ?? defaultMode);
  }, [props.localStorage?.key]);

  const theme = useMemo(
    () => themes.find((t) => t.id === activeThemeId) ?? odsTheme,
    [activeThemeId, props.themes, props?.localStorage?.key],
  );

  const value: OdsContextType = {
    themes,
    activeThemeId: activeThemeId ?? defaultThemeId,
    activeMode: activeMode ?? defaultMode,
    setActiveThemeId,
    setActiveMode,
    defaultSideBarState,
  };

  const renderChildren = (): React.ReactNode => {
    // If local storage options are provided but the key is undefined, treat it as if the key is not yet loaded and return empty.
    if (props.localStorage && props.localStorage.key == null) {
      return undefined;
    }
    return props.children;
  };

  return (
    <OdsContext.Provider value={value}>
      <ThemeProvider theme={theme} defaultMode={activeMode}>
        <CssBaseline enableColorScheme={true} />
        <ThemeSwitcher activeMode={activeMode}>{renderChildren()}</ThemeSwitcher>
      </ThemeProvider>
    </OdsContext.Provider>
  );
}

function ThemeSwitcher(props: PropsWithChildren & { activeMode: Mode | undefined }): React.ReactNode {
  const { mode, setMode } = useColorScheme(); // Hook must only be used inside a ThemeProvider.

  useEffect(() => {
    if (props.activeMode) {
      setMode(props.activeMode);
    }
  }, [props.activeMode]);

  // Wait until the color mode has been set before rendering the application.
  // This should only occur on initial page load or reloads.
  if (!mode) return undefined;

  return props.children;
}

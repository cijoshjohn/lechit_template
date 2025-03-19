import { ColorLens } from '@mui/icons-material';
import { PopupState } from 'material-ui-popup-state/hooks';
import { useContext } from 'react';
import { OdsContext } from '../../../contexts/OdsContext';
import { OdsMenuItem, OdsMenuItemProps } from '../../../components/Menu/OdsMenuItem';
import { odsTheme } from '../../../theming/OdsTheme';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OdsUserMenuItemColorMode } from './OdsUserMenuItemColorMode';

export type OdsUserMenuItemColorThemeProps = OdsMenuItemProps & {
  /**
   * Maps themes to their menu labels.
   * If a theme's label is not provided, its ID is displayed instead.
   * @example {[odsTheme.id]: 'Default', [odsThemePink.id]: 'Pink'}
   */
  themeLabelMap?: { [themeId: string]: string };
  parentPopup?: PopupState;
  children?: React.ReactNode;
};

/**
 * A menu item for switching the entire active theme if multiple are provided.
 *
 * This is NOT for changing the color mode (system, light, dark). For that, use {@link OdsUserMenuItemColorMode}.
 */
export function OdsUserMenuItemColorTheme(props: OdsUserMenuItemColorThemeProps) {
  const { themeLabelMap, parentPopup, children, ...derivedProps } = props;
  const { activeThemeId, setActiveThemeId, themes } = useContext(OdsContext);

  const labelMap: { [id: string]: string } = themeLabelMap ?? {};
  if (Object.keys(labelMap).length === 0) {
    labelMap[odsTheme.id] = 'Default';
  }

  const setActiveThemeIdHandler = async (id: string) => {
    // Prevents console warning 'violation xyz took 'n' ms'.
    await Promise.resolve().then(() => setActiveThemeId(id));
  };

  return (
    <OdsMenuItem
      icon={<ColorLens />}
      slotProps={{
        subMenu: {
          className: 'mode-dark',
          slotProps: { paper: { style: { minWidth: 220 } } },
        },
      }}
      popupMenu={{
        id: 'color-theme-menu',
        parentPopup: parentPopup,
        menu: () =>
          themes.map((t) => (
            <OdsMenuItem
              key={t.id}
              checked={activeThemeId === t.id}
              insetWhenNoIcon
              onClick={async () => await setActiveThemeIdHandler(t.id)}
            >
              {labelMap[t.id] ?? t.id}
            </OdsMenuItem>
          )),
      }}
      {...derivedProps}
    >
      {children ?? 'Theme'}
    </OdsMenuItem>
  );
}

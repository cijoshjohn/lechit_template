import { Contrast } from '@mui/icons-material';
import { PopupState } from 'material-ui-popup-state/hooks';
import { OdsMenuItem, OdsMenuItemProps } from '../../Menu/OdsMenuItem';
import { useContext } from 'react';
import { OdsContext } from '../../../contexts/OdsContext';
import { Mode } from '@mui/system/cssVars/useCurrentColorScheme';

export type OdsUserMenuItemColorModeProps = OdsMenuItemProps & {
  /**
   * The display text for each of the modes.
   */
  labels?: {
    system: string;
    light: string;
    dark: string;
  };
  parentPopup?: PopupState;
  children?: React.ReactNode;
};

interface LabelledMode {
  mode: Mode;
  label: string;
}

/**
 * A menu item for switching the active color mode (system, light, dark).
 */
export function OdsUserMenuItemColorMode(props: OdsUserMenuItemColorModeProps) {
  const { labels, parentPopup, children, ...derivedProps } = props;
  const { activeMode, setActiveMode } = useContext(OdsContext);

  const modes: LabelledMode[] = [
    { mode: 'system', label: labels?.system ?? 'System' },
    { mode: 'light', label: labels?.light ?? 'Light' },
    { mode: 'dark', label: labels?.dark ?? 'Dark' },
  ];

  return (
    <OdsMenuItem
      icon={<Contrast />}
      slotProps={{
        subMenu: {
          className: 'mode-dark',
          slotProps: { paper: { style: { minWidth: 220 } } },
        },
      }}
      popupMenu={{
        id: 'color-mode-menu',
        parentPopup: parentPopup,
        menu: () =>
          modes.map((x) => {
            return (
              <OdsMenuItem
                key={x.mode}
                checked={activeMode === x.mode}
                insetWhenNoIcon
                onClick={() => setActiveMode(x.mode)}
              >
                {x.label}
              </OdsMenuItem>
            );
          }),
      }}
      {...derivedProps}
    >
      {children ?? 'Color Mode'}
    </OdsMenuItem>
  );
}

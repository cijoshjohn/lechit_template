import { LanguageRounded } from '@mui/icons-material';
import { PopupState } from 'material-ui-popup-state/hooks';
import { OdsMenuItem, OdsMenuItemProps } from '../../../components/Menu/OdsMenuItem';

export interface LanguageMenuItem {
  id: string;
  label: string;
}

export type OdsUserMenuItemLanguageProps = OdsMenuItemProps & {
  /**
   * List of language options.
   */
  languages: LanguageMenuItem[];

  /**
   * The id of the currently active language.
   */
  activeLanguageId: string;

  /**
   * Action to perform when a language item is selected.
   */
  onLanguageChanged: (lang: string) => void;

  parentPopup?: PopupState;
  children?: React.ReactNode;
};

/**
 * A menu item for changing the active language.
 */
export function OdsUserMenuItemLanguage(props: OdsUserMenuItemLanguageProps) {
  const { languages, activeLanguageId, onLanguageChanged, parentPopup, children, ...derivedProps } = props;

  return (
    <OdsMenuItem
      icon={<LanguageRounded />}
      slotProps={{
        subMenu: {
          className: 'mode-dark',
          slotProps: { paper: { style: { minWidth: 220 } } },
        },
      }}
      popupMenu={{
        id: 'language-menu',
        parentPopup: parentPopup,
        menu: () =>
          languages.map((x) => (
            <OdsMenuItem
              key={x.id}
              checked={activeLanguageId === x.id}
              insetWhenNoIcon
              onClick={() => onLanguageChanged(x.id)}
            >
              {x.label}
            </OdsMenuItem>
          )),
      }}
      {...derivedProps}
    >
      {children ?? 'Language'}
    </OdsMenuItem>
  );
}

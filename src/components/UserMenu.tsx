import { Logout, Settings } from '@mui/icons-material';
import { Divider, ListSubheader, MenuProps } from '@mui/material';
import { useState } from 'react';
import { PopupState } from 'material-ui-popup-state/hooks';
import { OdsUserInfo, odsTheme, odsThemePink } from '@ods/cucumber';
import {
  LanguageMenuItem,
  OdsMenuItem,
  OdsUserMenu,
  OdsUserMenuItemColorMode,
  OdsUserMenuItemColorTheme,
  OdsUserMenuItemLanguage,
  OdsUserMenuItemUser,
} from '@ods/cucumber/components';

export type UserMenuProps = MenuProps & {
  user: OdsUserInfo;
  popupState?: PopupState;
};

const languages: LanguageMenuItem[] = [
  { id: 'en', label: 'English (EN)' },
  { id: 'es', label: 'Espanol (ES)' },
  { id: 'fr', label: 'Francais (FR)' },
  { id: 'ru', label: 'русский (RU)' },
  { id: 'pt', label: 'Português (PT)' },
];

export default function UserMenu(props: UserMenuProps): JSX.Element {
  const { user, popupState, ...derivedProps } = props;
  const [activeLanguageId, setActiveLanguageId] = useState('en');

  return (
    <OdsUserMenu {...derivedProps}>
      <OdsUserMenuItemUser user={user} />
      <Divider />
      <OdsUserMenuItemColorTheme
        themeLabelMap={{ [odsTheme.id]: 'Default', [odsThemePink.id]: 'Pink' }}
        parentPopup={popupState}
      />
      <OdsUserMenuItemColorMode parentPopup={popupState} />
      <OdsUserMenuItemLanguage
        languages={languages}
        activeLanguageId={activeLanguageId}
        onLanguageChanged={setActiveLanguageId}
        parentPopup={popupState}
      />
      <OdsMenuItem icon={<Settings />}>Preferences</OdsMenuItem>
      <Divider />
      <OdsMenuItem>Terms & conditions</OdsMenuItem>
      <OdsMenuItem>Support</OdsMenuItem>
      <OdsMenuItem>Admin portal</OdsMenuItem>
      <Divider />
      <ListSubheader>Help us improve</ListSubheader>
      <OdsMenuItem>Send feedback</OdsMenuItem>
      <Divider />
      <OdsMenuItem icon={<Logout />}>Log out</OdsMenuItem>
    </OdsUserMenu>
  );
}

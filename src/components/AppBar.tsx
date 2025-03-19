import BlastIQLogo from 'assets/svg/blastiq-logo.svg?react';
import { Fragment, useContext } from 'react';
import UserMenu from './UserMenu';
import { bindMenu, bindToggle, usePopupState } from 'material-ui-popup-state/hooks';
import {
  ApplicationItem,
  OdsAppBar,
  OdsAppBarAppsButton,
  OdsAppBarAvatarButton,
  OdsAppBarLeftStack,
  OdsAppBarLogo,
  OdsAppBarNotificationButton,
  OdsAppBarRightStack,
  OdsAppBarSideBarButton,
  OdsAppSwitcherMenu,
} from '@ods/cucumber/components';
import PlaceholderLogo from '../../lib/assets/svg/logo.png';
import { UserContext } from 'contexts/UserContext';
import logo from '../../lib/assets/svg/logo.png';

const apps: ApplicationItem[] = [
  { id: 'insights', icon: <BlastIQLogo />, label: 'BlastIQ Insights', href: '/', userCanAccess: true },
  {
    id: 'otherApp',
    icon: (
      <>
        {' '}
        <img src={PlaceholderLogo} alt="LeachIT" width="145" />
      </>
    ),
    label: 'App Name',
    href: 'https://www.google.com',
  },
];

export default function AppBar() {
  const { user } = useContext(UserContext);
  const userMenuState = usePopupState({ popupId: 'user-menu', variant: 'popover' });
  const appSwitcherMenuState = usePopupState({ popupId: 'app-switcher-menu', variant: 'popover' });

  return (
    <Fragment>
      <OdsAppBar>
        {/* Left */}
        <OdsAppBarLeftStack>
          <OdsAppBarSideBarButton />
          <OdsAppBarLogo>
            {/* <PlaceholderLogoFull /> */}
            <img src={logo} alt="LeachIT" width="145" />
          </OdsAppBarLogo>
        </OdsAppBarLeftStack>

        {/* Right */}
        <OdsAppBarRightStack>
          <OdsAppBarNotificationButton title="Notifications" badgeOptions={{ color: 'primary', variant: 'dot' }} />
          <OdsAppBarAvatarButton title="User Settings" user={user} {...bindToggle(userMenuState)} />
          <OdsAppBarAppsButton title="Applications" {...bindToggle(appSwitcherMenuState)} />
        </OdsAppBarRightStack>
      </OdsAppBar>

      {/* Menus spawned by appbar buttons. */}
      <UserMenu {...bindMenu(userMenuState)} user={user} />
      <OdsAppSwitcherMenu {...bindMenu(appSwitcherMenuState)} apps={apps} />
    </Fragment>
  );
}

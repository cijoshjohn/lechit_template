import { Link, ListSubheader, Menu, MenuProps } from '@mui/material';
import { OdsMenuItem } from '../Menu/OdsMenuItem';

export interface ApplicationItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
  userCanAccess?: boolean;
}

export type OdsAppSwitcherMenuProps = MenuProps & {
  /**
   * List of all applications.
   */
  apps: ApplicationItem[];

  /**
   * Text to be displayed in the menu.
   */
  labels?: {
    yourApps: string;
    moreApps: string;
  };
};

/**
 * A menu that displays a list of applications, split into available ones and extra ones.
 */
export function OdsAppSwitcherMenu(props: OdsAppSwitcherMenuProps): JSX.Element {
  const { apps: allApps, labels, ...derivedProps } = props;

  const yourApps = allApps.filter((x) => x.userCanAccess);
  const moreApps = allApps.filter((x) => !x.userCanAccess);

  const appItem = (item: ApplicationItem) => (
    <Link
      color="textPrimary"
      underline="none"
      key={item.label}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <OdsMenuItem icon={item.icon}>{item.label}</OdsMenuItem>
    </Link>
  );

  return (
    <Menu className="mode-dark" slotProps={{ paper: { style: { minWidth: 220 } } }} {...derivedProps}>
      {yourApps.length > 0 && <ListSubheader>{labels?.yourApps ?? 'Your Apps'}</ListSubheader>}
      {yourApps.length > 0 && yourApps.map((x) => appItem(x))}

      {moreApps.length > 0 && <ListSubheader>{labels?.moreApps ?? 'More Apps'}</ListSubheader>}
      {moreApps.length > 0 && moreApps.map((x) => appItem(x))}
    </Menu>
  );
}

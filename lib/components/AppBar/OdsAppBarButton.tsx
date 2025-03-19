import { AppsRounded, NotificationsRounded } from '@mui/icons-material';
import { Badge, BadgeProps, IconButton, IconButtonProps, Tooltip } from '@mui/material';
import React from 'react';

export type OdsAppBarButtonProps = IconButtonProps & {
  /**
   * The icon to display in the button.
   * If this is undefined, then `children` will be displayed instead.
   */
  icon?: React.ReactNode;

  /**
   * Tooltip text.
   */
  title?: string;

  /**
   * Options to be passed to the badge.
   */
  badgeOptions?: BadgeProps;
};

/**
 * A wrapper around MUI's {@link IconButton} component with an optional title and notification badge.
 */
export function OdsAppBarButton(props: OdsAppBarButtonProps): JSX.Element {
  const { icon, title, badgeOptions, ...derivedProps } = props;

  return (
    <Tooltip disableInteractive title={title}>
      <IconButton {...derivedProps}>
        <Badge {...badgeOptions}>{icon ?? derivedProps.children}</Badge>
      </IconButton>
    </Tooltip>
  );
}

/**
 * An app bar button that is used to open the application switcher menu.
 */
export function OdsAppBarAppsButton(props: OdsAppBarButtonProps) {
  return <OdsAppBarButton icon={<AppsRounded />} title="Applications" {...props} />;
}

/**
 * An app bar button that is used to open the notifications menu.
 */
export function OdsAppBarNotificationButton(props: OdsAppBarButtonProps) {
  return <OdsAppBarButton icon={<NotificationsRounded />} title="Notifications" {...props} />;
}

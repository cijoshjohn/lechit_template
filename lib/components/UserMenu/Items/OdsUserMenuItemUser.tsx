import { Box, ListItemText, MenuItem, MenuItemProps, Typography, useTheme } from '@mui/material';
import { OdsAvatar } from '../../Avatar/OdsAvatar';
import { OdsUserInfo } from '../../../models/OdsUserInfo';

export type OdsUserMenuUserItemProps = MenuItemProps & {
  /**
   * User information for rendering the avatar.
   */
  user: OdsUserInfo;
};

/**
 * A menu item that displays the provided user's name, avatar and email.
 */
export function OdsUserMenuItemUser(props: OdsUserMenuUserItemProps) {
  const { user, ...derivedProps } = props;
  const theme = useTheme();
  return (
    <MenuItem {...derivedProps}>
      <Box sx={{ minWidth: theme.spacing(7) }}>
        <OdsAvatar user={user} sizePx={32} />
      </Box>
      <ListItemText>
        <Box sx={{ py: '4px' }} display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="body2" color="textPrimary">
            {user.fullName}
          </Typography>
          {user.email && (
            <Typography variant="caption" color="textSecondary">
              {user.email}
            </Typography>
          )}
        </Box>
      </ListItemText>
    </MenuItem>
  );
}

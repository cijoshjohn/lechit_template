import { Avatar, AvatarProps, styled } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { OdsUserInfo } from '../../models/OdsUserInfo';
import { getInitials } from '../../utils/UserNameUtils';

export type OdsAvatarProps = AvatarProps & {
  /**
   * User info used to generate the avatar.
   */
  user: OdsUserInfo;

  /**
   * Size in pixels of the avatar icon.
   */
  sizePx: number;
};

type StyledAvatarProps = {
  sizePx: number;
  userColor: string;
};

const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (propName: string) => !['sizePx', 'userColor'].includes(propName), // Exclude custom keys.
})<AvatarProps & StyledAvatarProps>(({ theme, userColor, sizePx }) => ({
  backgroundColor: userColor,
  color: theme.palette.getContrastText(userColor),
  width: sizePx,
  height: sizePx,
  fontSize: sizePx / 2, // Ensure text fits inside avatar - Half seems to fit well.
}));

/**
 * A wrapper around MUI's {@link Avatar} component with auto-sizing and rendering of user's initials.
 */
export function OdsAvatar(props: OdsAvatarProps): JSX.Element {
  const { user, sizePx, ...derivedProps } = props;
  const userColor = user.color ?? deepPurple[400];

  return (
    <StyledAvatar userColor={userColor} sizePx={sizePx} variant="circular" {...derivedProps}>
      {getInitials(user.fullName)}
    </StyledAvatar>
  );
}

import { OdsAvatar, OdsAvatarProps } from '../Avatar/OdsAvatar';
import { OdsUserInfo } from '../../models/OdsUserInfo';
import { OdsAppBarButton, OdsAppBarButtonProps } from './OdsAppBarButton';

export type OdsAppBarAvatarButtonProps = OdsAppBarButtonProps & {
  /**
   * User info passed to the avatar.
   */
  user: OdsUserInfo;

  slotProps?: {
    odsAvatar?: OdsAvatarProps;
  };
};

/**
 * An app bar button that draws the user's avatar.
 */
export function OdsAppBarAvatarButton(props: OdsAppBarAvatarButtonProps): JSX.Element {
  const { user, slotProps, ...derivedProps } = props;

  return (
    <OdsAppBarButton title={user.fullName} {...derivedProps}>
      <OdsAvatar user={user} sizePx={28} {...slotProps?.odsAvatar} />
    </OdsAppBarButton>
  );
}

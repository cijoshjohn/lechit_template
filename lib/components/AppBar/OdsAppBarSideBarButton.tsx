import { useContext } from 'react';
import { MenuOpenSharp, MenuSharp } from '@mui/icons-material';
import { OdsAppBarButton, OdsAppBarButtonProps } from './OdsAppBarButton';
import { OdsSideBarState } from '../../hooks/UseOdsSideBarState';
import { OdsContext } from '../../contexts/OdsContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OdsContextType } from '../../contexts/OdsContext';

export type OdsAppBarSideBarButtonProps = OdsAppBarButtonProps & {
  /**
   * A custom side bar state. Used to handle opening on click and previewing on hover.
   * Will use {@link OdsContextType.defaultSideBarState} if unspecified.
   */
  sideBarState?: OdsSideBarState;

  /**
   * Title to use if the side bar is open.
   */
  openTitle?: string;

  /**
   * Title to use if the side bar is closed.
   */
  closedTitle?: string;
};

/**
 * An app bar button that is used to open the side bar.
 */
export function OdsAppBarSideBarButton(props: OdsAppBarSideBarButtonProps): JSX.Element {
  const { sideBarState: customSideBarState, openTitle, closedTitle, ...derivedProps } = props;
  const { defaultSideBarState } = useContext(OdsContext);
  const sideBarState = customSideBarState ?? defaultSideBarState;

  const icon = sideBarState?.expanded ? <MenuOpenSharp /> : <MenuSharp />;
  const title = sideBarState?.expanded ? openTitle : closedTitle;

  const click = () => {
    if (sideBarState?.expanded) {
      sideBarState?.setPreviewing(false, true);
      sideBarState.setExpanded(false);
    } else {
      sideBarState?.setExpanded(true);
    }
  };

  return (
    <OdsAppBarButton
      icon={icon}
      title={title}
      onClick={() => click()}
      onMouseEnter={() => sideBarState?.setPreviewing(true)}
      onMouseLeave={() => sideBarState?.setPreviewing(false)}
      {...derivedProps}
    />
  );
}

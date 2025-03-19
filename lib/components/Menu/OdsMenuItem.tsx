import { Check, ChevronRight } from '@mui/icons-material';
import {
  ListItemIcon,
  ListItemIconProps,
  ListItemText,
  ListItemTextProps,
  MenuItem,
  MenuItemProps,
  MenuProps,
  SvgIcon,
  SvgIconProps,
} from '@mui/material';
import { PopupState, bindHover, bindMenu, usePopupState } from 'material-ui-popup-state/hooks';
import { Fragment } from 'react/jsx-runtime';

// https://github.com/jcoreio/material-ui-popup-state?tab=readme-ov-file#using-popover-and-menu-with-bindhover
import HoverMenu from 'material-ui-popup-state/HoverMenu';

export type OdsMenuItemProps = MenuItemProps & {
  /**
   * The item to be rendered in the left slot (typically an icon).
   */
  icon?: React.ReactNode;

  /**
   * The item to be rendered in the right slot.
   */
  right?: React.ReactNode;

  /**
   * A submenu that will be opened by hovering over this menu item.
   */
  popupMenu?: {
    id: string;

    /** The side of the menu this submenu menu will appear. */
    side?: 'left' | 'right';

    /**
     * Menu items must be an array. Do not render them all under a single Fragment or other container.
     */
    menu: (popupState?: PopupState) => React.ReactNode[];

    /**
     * This should be provided if the parent is also a popup.
     */
    parentPopup?: PopupState;
  };

  /**
   * If true, blank padding space will be shown when no icon is provided.
   */
  insetWhenNoIcon?: boolean;

  /**
   * If true, shows a checkmark in the icon slot (as long as nothing else is provided for {@link OdsMenuItemProps.icon}).
   */
  checked?: boolean;

  slotProps?: {
    listItemIcon?: ListItemIconProps;
    listItemText?: ListItemTextProps;
    subMenu?: Omit<MenuProps, 'open'>;
    svgIcon?: SvgIconProps;
  };
};

/**
 * A wrapper around MUI's {@link MenuItem} component with helpers for icons and popup sub-menus.
 */
export function OdsMenuItem(props: OdsMenuItemProps) {
  const { icon, right, popupMenu, insetWhenNoIcon, checked, slotProps, ...derivedProps } = props;

  const popupMenuState = popupMenu
    ? usePopupState({
        popupId: `${popupMenu.id}-popup-menu`,
        variant: 'popover',
        parentPopupState: popupMenu.parentPopup,
      })
    : undefined;

  const hoverMenuSide = popupMenu?.side ?? 'left';
  const hoverMenuAnchorHoriz = hoverMenuSide === 'left' ? 'left' : 'right';
  const hoverMenuTransformHoriz = hoverMenuSide === 'left' ? 'right' : 'left';

  const hoverBind = popupMenuState ? bindHover(popupMenuState) : undefined;
  const menuBind = popupMenuState ? bindMenu(popupMenuState) : undefined;

  const rightSlot =
    right ??
    (popupMenuState ? (
      <SvgIcon color="action">
        <ChevronRight />
      </SvgIcon>
    ) : undefined);

  const svgIconSlot = icon ?? (checked ? <Check /> : undefined);

  return (
    <Fragment>
      <MenuItem dense {...derivedProps} {...hoverBind}>
        {svgIconSlot && (
          <ListItemIcon {...slotProps?.listItemIcon}>
            <SvgIcon {...slotProps?.svgIcon}>{svgIconSlot}</SvgIcon>
          </ListItemIcon>
        )}
        {props.children && (
          <ListItemText inset={insetWhenNoIcon && !svgIconSlot} {...slotProps?.listItemText}>
            {props.children}
          </ListItemText>
        )}
        {rightSlot}
      </MenuItem>

      {/* If a submenu is provided, render it beside the current item instead of inside it to prevent click events propagating. */}
      {menuBind && (
        <HoverMenu
          anchorOrigin={{ vertical: 'top', horizontal: hoverMenuAnchorHoriz }}
          transformOrigin={{ vertical: 'top', horizontal: hoverMenuTransformHoriz }}
          {...slotProps?.subMenu}
          {...menuBind}
        >
          {popupMenu?.menu(popupMenuState)}
        </HoverMenu>
      )}
    </Fragment>
  );
}

import { Fragment, useState } from 'react';
import {
  Box,
  BoxProps,
  Collapse,
  Link,
  LinkProps,
  List,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  ListItemTextProps,
  ListProps,
  SvgIcon,
  SvgIconProps,
  Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useOptionalState, OptionalState } from '../../hooks/UseOptionalState';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OdsSideBarNavList } from './OdsSideBarNavList';

export interface OdsSideBarNavItemProps {
  /**
   * The label that gets displayed for the item.
   */
  label: string;

  /**
   * The route this item will navigate to when clicked.
   */
  route?: string;

  /**
   * Called when the item is clicked.
   */
  onClick?: () => void;

  /**
   * If false, then this item becomes disabled and greyed out.
   */
  canAccess?: boolean;

  /**
   * State to control whether this item is open or closed from outside.
   */
  expandedState?: OptionalState<boolean>;

  /**
   * If true, the item will be highlighted.
   */
  selected?: boolean;

  children?: React.ReactNode;

  slotProps?: {
    listItemButton?: ListItemButtonProps;
    listItemText?: ListItemTextProps;
    link?: LinkProps;
    childList?: ListProps;
    box?: BoxProps;
    childBox?: BoxProps;
    svgIcon?: SvgIconProps;
  };
}

export interface OdsSideBarNavSubItemProps {
  /**
   * The label that gets displayed for the item.
   */
  label: string;

  /**
   * The route this item will navigate to when clicked.
   */
  route?: string;

  /**
   * Called when the item is clicked.
   */
  onClick?: () => void;

  /**
   * If false, then this item becomes disabled and greyed out.
   */
  canAccess?: boolean;

  /**
   * If true, the item will be highlighted.
   */
  selected?: boolean;

  slotProps?: {
    listItemButton?: ListItemButtonProps;
    listItemText?: ListItemTextProps;
    link?: LinkProps;
    box?: BoxProps;
  };
}

/**
 * A navigation list item that sits inside a {@link OdsSideBarNavList}.
 * This is a top-level item which can hold children.
 */
export function OdsSideBarNavItem(props: OdsSideBarNavItemProps) {
  const [expanded, setExpanded] = useOptionalState(props.expandedState, false);
  const [expandHovered, setExpandHovered] = useState(false);

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }

    // Clicking anywhere on a container (that is not also a page) will toggle it open.
    if (!props.route) {
      setExpanded(!expanded);
    }
  };

  return (
    <Fragment>
      <ListItemButton
        dense
        selected={props.selected}
        disabled={props.canAccess === false}
        sx={{
          padding: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        }}
        {...props.slotProps?.listItemButton}
      >
        {/* The link button+text */}
        <Link
          color={props.selected ? 'primary' : 'textPrimary'}
          underline="none"
          href={props.route}
          onClick={handleClick}
          sx={{ flexGrow: 1 }}
          {...props.slotProps?.link}
        >
          <Box sx={{ padding: '4px 0 4px 16px' }} {...props.slotProps?.box}>
            <ListItemText sx={{ py: '4px' }} {...props.slotProps?.listItemText}>
              <Typography variant={props.route ? 'body2SemiBold' : 'sideNavGroupHeading'}>{props.label}</Typography>
            </ListItemText>
          </Box>
        </Link>

        {/* The expand button+icon. */}
        {props.children && (
          <Box
            display="flex"
            justifyContent="end"
            alignItems="center"
            sx={{ minWidth: '50px' }}
            onClick={() => setExpanded(!expanded)}
            onMouseEnter={() => setExpandHovered(true)}
            onMouseLeave={() => setExpandHovered(false)}
            {...props.slotProps?.childBox}
          >
            <SvgIcon
              color={expandHovered ? 'primary' : 'action'}
              sx={{ m: '5px', boxShadow: expandHovered ? '0 0 2px' : undefined, borderRadius: 50 }}
              {...props.slotProps?.svgIcon}
            >
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </SvgIcon>
          </Box>
        )}
      </ListItemButton>

      {props.children && (
        <Collapse in={expanded}>
          <List disablePadding {...props.slotProps?.childList}>
            {props.children}
          </List>
        </Collapse>
      )}
    </Fragment>
  );
}

/**
 * An navigation list item that sits inside a {@link OdsSideBarNavItem}.
 */
export function OdsSideBarNavSubItem(props: OdsSideBarNavSubItemProps) {
  return (
    <ListItemButton
      dense
      selected={props.selected}
      disabled={props.canAccess === false}
      sx={{
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
      }}
      {...props.slotProps?.listItemButton}
    >
      <Link
        color={props.selected ? 'primary' : 'textPrimary'}
        underline="none"
        href={props.route}
        onClick={props.onClick}
        sx={{ flexGrow: 1 }}
        {...props.slotProps?.link}
      >
        <Box sx={{ padding: '4px 0 4px 32px' }} {...props.slotProps?.box}>
          <ListItemText sx={{ py: '0px' }} {...props.slotProps?.listItemText}>
            <Typography variant="body2">{props.label}</Typography>
          </ListItemText>
        </Box>
      </Link>
    </ListItemButton>
  );
}

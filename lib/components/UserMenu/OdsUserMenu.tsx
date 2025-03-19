import { Menu, MenuProps } from '@mui/material';

/**
 * A wrapper around MUI's {@link Menu} component.
 */
export function OdsUserMenu(props: MenuProps): JSX.Element {
  return <Menu className="mode-dark" slotProps={{ paper: { style: { minWidth: 256 }, elevation: 8 } }} {...props} />;
}

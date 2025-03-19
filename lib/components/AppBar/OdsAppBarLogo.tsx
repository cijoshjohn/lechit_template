import { Link } from '@mui/material';
import React from 'react';

export type OdsAppBarLogoProps = {
  /**
   * The route to redirect to when clicked.
   * If undefined, then '/' is used.
   */
  route?: string;
  children: React.ReactNode;
};

/**
 * An app bar link containing a logo that can redirect to home.
 */
export function OdsAppBarLogo(props: OdsAppBarLogoProps): JSX.Element {
  return (
    <Link href={props.route ?? '/'} display="flex" alignItems="center">
      {props.children}
    </Link>
  );
}

export interface OdsShadowsType {
  sm: string;
  md: string;
  lg: string;
}

/**
 * Temporary shadow tokens until Design team decides best way to handle shadows.
 */
export const odsShadows: OdsShadowsType = {
  sm: '0px 3px 7px 2px rgba(0, 0, 0, 0.12), 0px 8px 5px 1px rgba(0, 0, 0, 0.14), 0px 5px 2px -3px rgba(0, 0, 0, 0.20);',
  md: '0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 5px 5px -3px rgba(0, 0, 0, 0.20);',
  lg: '0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 5px 5px -3px rgba(0, 0, 0, 0.20);',
};

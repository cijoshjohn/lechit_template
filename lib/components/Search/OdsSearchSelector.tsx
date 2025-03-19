import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  BoxProps,
  ClickAwayListener,
  Divider,
  Grow,
  LinearProgress,
  ListItem,
  ListItemProps,
  ListItemText,
  ListSubheader,
  MenuItem,
  MenuItemProps,
  Paper,
  PaperProps,
  Popper,
  Typography,
  TypographyProps,
  useTheme,
} from '@mui/material';
import { useOptionalState, OptionalState } from '../../hooks/UseOptionalState';
import { odsShadows } from '../../tokens/OdsShadows';
import { Fragment, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { OdsMenuItem, OdsMenuItemProps } from '../Menu/OdsMenuItem';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { fixedSizedListPaddingStyle, fixedSizedListPaddingInnerElement } from '../../utils/ReactWindowUtils';
import '../../utils/extensions/ArrayExtensions';
import { OdsSearchBar, OdsSearchBarProps } from './OdsSearchBar';
import { OdsContext } from '../../contexts/OdsContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OdsContextType } from '../../contexts/OdsContext';

export interface SelectorCategory {
  id: string;
  displayName: string;
  right?: React.ReactNode;
}

export interface SelectorItem<T> {
  item: T;
  displayName: string;
  categoryId?: string;
}

type ItemOrCategory<T> = (SelectorCategory | SelectorItem<T>) & { isCategory: boolean };

export interface SelectorOptions<T> {
  /**
   * The current selected item. Its display name is shown in the selector box.
   */
  selected: SelectorItem<T>;

  /**
   * Called when the selected item changes via click.
   */
  onChanged: (selected: SelectorItem<T>) => void;

  /**
   * Called when the selector is opened, or when the search bar text changes (after a debounce delay).
   */
  fetch: (searchString: string) => Promise<SelectorItem<T>[]>;

  /**
   * Categories that will be used to group items together under a single header.
   */
  categories?: SelectorCategory[];

  /**
   * Hides the default category (items whose category id is undefined.)
   */
  hideDefaultCategory?: boolean;

  /**
   * Hides the unknown category (items whose category id is not found in {@link categories}, excluding undefined)
   */
  hideUnknownCategory?: boolean;

  /**
   * Disables the search bar. Only the fetch when opening the selector will populate the items.
   */
  disableSearch?: boolean;
}

export interface OdsSearchSelectorProps<T> {
  /**
   * The selector information.
   */
  selectorOptions: SelectorOptions<T>;

  /**
   * The label that gets displayed for the search bar. Defaults to 'Search'.
   */
  searchLabel?: string;

  /**
   * If provided, the open/closed state of the component will be controlled instead of uncontrolled.
   */
  openState?: OptionalState<boolean>;

  /**
   * Open state of the container (such as a sidebar). Used to close the selector when the container is closed.
   * Will use the open state of {@link OdsContextType.defaultSideBarState} if unspecified.
   */
  containerOpen?: boolean;

  /**
   * The height of the list.
   */
  listHeight?: number;

  /**
   * Override the default padding size around the box and sides of dropdown.
   */
  paddingSize?: number;

  /**
   * Prevents the search and list drop down from closing when clicking away.
   */
  preventCloseOnClickAway?: boolean;

  /**
   * Prevents the search and list drop down from closing when an item is selected.
   */
  preventCloseOnSelect?: boolean;

  labels?: {
    searchBar?: string;
    defaultCategory?: string;
    unknownCategory?: string;
  };

  slotProps?: {
    container?: BoxProps;
    mainBox?: BoxProps;
    mainPaper?: PaperProps;
    mainItem?: MenuItemProps;
    mainTypography?: TypographyProps;
    item?: OdsMenuItemProps;
    itemTypography?: TypographyProps;
    category?: ListItemProps;
    categoryTypography?: TypographyProps;
    popperPaper?: PaperProps;
    searchContainer?: BoxProps;
    search?: OdsSearchBarProps;
  };
}

/**
 * A component that allows the user to search for and select an item from a fetched list.
 */
export function OdsSearchSelector<T>(props: OdsSearchSelectorProps<T>): JSX.Element {
  const theme = useTheme();
  const { defaultSideBarState } = useContext(OdsContext);
  const [open, setOpen] = useOptionalState(props.openState, false);
  const paperRef = useRef<HTMLDivElement>(null);
  const [fetchedItems, setFetchedItems] = useState<SelectorItem<T>[]>([]);
  const [fetching, setFetching] = useState(false);

  const containerOpen = props.containerOpen ?? defaultSideBarState.open;

  const fetchItems = async (searchString: string) => {
    setFetching(true);
    const newItems = await props.selectorOptions.fetch(searchString);
    setFetchedItems(newItems);
    setFetching(false);
  };

  useEffect(() => {
    if (open) {
      void fetchItems('');
    }
  }, [open]);

  useEffect(() => {
    if (containerOpen === false) {
      setOpen(false);
    }
  }, [containerOpen]);

  const selectItem = (item: SelectorItem<T>) => {
    if (!props.preventCloseOnSelect) {
      setOpen(false);
    }
    props.selectorOptions.onChanged(item);
  };

  const getListData = (): ItemOrCategory<T>[] => {
    const tempList: ItemOrCategory<T>[] = [];
    const categoryGroups = fetchedItems.groupBy('categoryId');

    // List categories should always appear in the order specified by props.
    for (const category of props.selectorOptions.categories ?? []) {
      const group = categoryGroups.get(category.id);
      if (!group?.length) continue;
      tempList.push({ ...category, isCategory: true });
      for (const item of group) {
        tempList.push({ ...item, isCategory: false });
      }
    }

    // Group under a single header any items with unknown categories (i.e. those that arent provided in props, excluding undefined)
    const foundCategoryKeys = Array.from(categoryGroups.keys());
    const providedCategoryKeys = props.selectorOptions.categories?.map((c) => c.id) ?? [];
    const knownCategoryKeys = foundCategoryKeys.filter((k) => k !== undefined && providedCategoryKeys.includes(k));
    const unknownCategoryKeys = foundCategoryKeys.filter((k) => k !== undefined && !providedCategoryKeys.includes(k));
    const hasUnknown = !props.selectorOptions.hideUnknownCategory && unknownCategoryKeys?.length;
    if (hasUnknown) {
      tempList.push({ id: 'unknown', displayName: props.labels?.unknownCategory ?? 'Unknown', isCategory: true });
      for (const key of unknownCategoryKeys) {
        for (const item of categoryGroups.get(key) ?? []) {
          tempList.push({ ...item, isCategory: false });
        }
      }
    }

    // Items with an undefined group belong to the default category.
    const itemsWithNoCategory = categoryGroups.get(undefined);
    if (!props.selectorOptions.hideDefaultCategory && itemsWithNoCategory?.length) {
      // Only add the header if the label was specified for it or if other headers will be visible.
      if (props.labels?.defaultCategory || knownCategoryKeys.length > 0 || hasUnknown) {
        tempList.push({
          id: 'default',
          displayName: props.labels?.unknownCategory ?? 'Uncategorised',
          isCategory: true,
        });
      }
      for (const item of itemsWithNoCategory) {
        tempList.push({ ...item, isCategory: false });
      }
    }

    return tempList;
  };

  const renderSelectorItem = ({ index, style, data }: ListChildComponentProps<ItemOrCategory<T>[]>) => {
    const itemOrCategory = data[index];
    const newStyle = fixedSizedListPaddingStyle(style, 8);
    if (itemOrCategory.isCategory) {
      const category = itemOrCategory as SelectorCategory;
      return (
        <ListItem dense style={newStyle} {...props.slotProps?.category}>
          <ListSubheader
            sx={{
              lineHeight: 'inherit',
              flexGrow: 1,
              padding: 0,
            }}
            component="span"
          >
            <Typography
              variant="body3"
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              {...props.slotProps?.categoryTypography}
            >
              {category.displayName}
              {category.right}
            </Typography>
          </ListSubheader>
        </ListItem>
      );
    } else {
      const item = itemOrCategory as SelectorItem<T>;
      return (
        <OdsMenuItem dense style={newStyle} onClick={() => selectItem(item)} {...props.slotProps?.item}>
          <Typography variant="body1" {...props.slotProps?.itemTypography}>
            {item.displayName}
          </Typography>
        </OdsMenuItem>
      );
    }
  };

  const paddingSize = props.paddingSize ?? theme.spacing('1-5');

  const listData = useMemo(() => getListData(), [fetchedItems, props.selectorOptions.categories]);

  return (
    <Box position="relative" {...props.slotProps?.container}>
      {/* Main box showing selected item */}
      <Box sx={{ p: paddingSize }} {...props.slotProps?.mainBox}>
        <Paper ref={paperRef} elevation={2} {...props.slotProps?.mainPaper}>
          <MenuItem
            onClick={() => setOpen(!open)}
            sx={{ borderRadius: `${theme.shape.borderRadius}px`, height: theme.spacing(6) }}
            {...props.slotProps?.mainItem}
          >
            <ListItemText>
              <Typography variant="body2SemiBold" {...props.slotProps?.mainTypography}>
                {props.selectorOptions.selected.displayName}
              </Typography>
            </ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
        </Paper>
      </Box>

      {/* Dropdown containing search and list */}
      <Popper
        open={open}
        anchorEl={paperRef.current}
        sx={{ zIndex: theme.zIndex.drawer, px: paddingSize, width: 1 }}
        transition
        disablePortal
      >
        {(popperTransition) => (
          <ClickAwayListener
            onClickAway={() => {
              if (!props.preventCloseOnClickAway) setOpen(false);
            }}
          >
            <Grow {...popperTransition.TransitionProps} style={{ transformOrigin: 'center top' }}>
              <Paper
                elevation={3}
                sx={{ boxShadow: odsShadows.md, width: 1, overflow: 'hidden' }}
                {...props.slotProps?.popperPaper}
              >
                {/* Search box */}
                {!props.selectorOptions.disableSearch && (
                  <Fragment>
                    <Box sx={{ p: 1 }} {...props.slotProps?.searchContainer}>
                      <OdsSearchBar
                        variant="outlined"
                        onFetch={(searchString) => fetchItems(searchString)}
                        label={props.searchLabel ?? 'Search'}
                        {...props.slotProps?.search}
                      />
                    </Box>
                    <Divider />
                  </Fragment>
                )}

                {/* Items list */}
                <Box height={props.listHeight ?? 276}>
                  {fetching && <LinearProgress />}

                  <AutoSizer>
                    {(size) => (
                      <FixedSizeList
                        innerElementType={fixedSizedListPaddingInnerElement(8)}
                        itemData={listData}
                        itemSize={32}
                        itemCount={fetching ? 0 : listData.length}
                        height={size.height}
                        width={size.width}
                      >
                        {renderSelectorItem}
                      </FixedSizeList>
                    )}
                  </AutoSizer>
                </Box>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  );
}

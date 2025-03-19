import { styled } from '@mui/material';
import { DataGridPro, DataGridProProps } from '@mui/x-data-grid-pro';

export type OdsGridPorps = DataGridProProps & {
  gridRows: Array<any>;
  gridColumns: Array<any>;
  gridPageSize: number;
  gridPerPageOptions: Array<any>;
};

type StyledGridProps = {
  sizePx: number;
  userColor: string;
};

//var theme = useTheme();

const StyledGrid = styled(DataGridPro, {
  shouldForwardProp: (propName: string) => !['sizePx', 'userColor'].includes(propName), // Exclude custom keys.
})<OdsGridPorps & StyledGridProps>(({ userColor, sizePx }) => ({
  backgroundColor: userColor,
  width: sizePx,
  height: sizePx,
  fontSize: sizePx / 2, // Ensure text fits inside avatar - Half seems to fit well.
}));

/**
 * A list containing navigation items, designed to sit in the side bar.
 */
export function OdsGridComponent(props: OdsGridPorps) {
  let { gridRows, gridColumns, gridPageSize, gridPerPageOptions } = props;
  gridPageSize = gridPageSize ? gridPageSize : 10;
  gridPerPageOptions = gridPerPageOptions ? gridPerPageOptions : [5, 10, 25, { value: -1, label: 'All' }];

  return (
    <StyledGrid
      rows={gridRows}
      columns={gridColumns}
      initialState={{
        pagination: {
          paginationModel: { pageSize: gridPageSize, page: 0 },
        },
      }}
      pageSizeOptions={gridPerPageOptions}
    ></StyledGrid>
  );
}

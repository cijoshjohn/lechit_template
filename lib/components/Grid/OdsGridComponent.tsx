/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { styled, useTheme } from '@mui/material';
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
  let { gridRows, gridColumns, gridPageSize, gridPerPageOptions, columnGroupingModel } = props;
  gridPageSize = gridPageSize ? gridPageSize : 10;
  gridPerPageOptions = gridPerPageOptions ? gridPerPageOptions : [5, 10, 25, { value: -1, label: 'All' }];
  const currentTheme = useTheme();

  let idValue = 0;
  const getRowId = (row) => (row.tankNo ? row.tankNo : idValue++);

  return (
    <>
      {gridRows ? (
        <StyledGrid
          getRowId={getRowId}
          rows={gridRows}
          columns={gridColumns}
          pagination
          initialState={{
            pagination: {
              paginationModel: { pageSize: gridPageSize, page: 0 },
            },
          }}
          sx={{
            // Alternating row colors
            '& .even-row': {
              backgroundColor: currentTheme.palette.background.paper + '!important',
            },
            '& .odd-row': {
              backgroundColor: currentTheme.palette.action.hover + '!important',
            },
            '& .MuiDataGrid-cell': {
              fontSize: currentTheme.typography.subtitle1.fontSize,
            },
            '& .MuiDataGrid-columnHeaderTitleContainer': {
              fontSize: currentTheme.typography.subtitle1.fontSize,
            },
          }}
          getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
          pageSizeOptions={gridPerPageOptions}
          columnGroupingModel={columnGroupingModel}
        ></StyledGrid>
      ) : (
        <></>
      )}
    </>
  );
}

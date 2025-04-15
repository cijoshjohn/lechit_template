/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Card, CardProps, styled, Typography, Paper, useTheme, Skeleton } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { ShiftData } from 'models/ShiftData';
import { useState } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { theme } from 'highcharts';
export type FeedDetailsProps = CardProps & {
  shiftData: ShiftData | object;
  sizePx: number;
};

type StyledCardProps = {
  sizePx: number;
  userColor: string;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.grey[100],
  flex: 1,
}));

const StyledCard = styled(Card, {
  shouldForwardProp: (propName: string) => !['sizePx', 'userColor'].includes(propName), // Exclude custom keys.
})<CardProps & StyledCardProps>(({ sizePx }) => ({
  fontSize: sizePx / 2, // Ensure text fits inside avatar - Half seems to fit well.
  width: '100%',
  padding: 10,
  margin: 0,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
}));

/*
 * A wrapper around MUI's {@link Avatar} component with auto-sizing and rendering of user's initials.
 */
export function FeedDetails(props: FeedDetailsProps): JSX.Element {
  const { shiftData, sizePx, ...derivedProps } = props;
  const userColor = deepPurple[400];
  const [newShiftData] = useState(shiftData);
  const currentTheme = useTheme();

  let getRows = () => {
    return [
      {
        id: 3,
        name: 'Throughput',
        value: Number(newShiftData.summary ? newShiftData.summary.throughput : newShiftData.throughput).toLocaleString(
          navigator.languages,
          {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          },
        ),
        unit: ' tph',
      },
      {
        id: 4,
        name: 'P80',
        value: Number(newShiftData.summary ? newShiftData.summary.p80 : newShiftData.p80).toLocaleString(
          navigator.languages,
          {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          },
        ),
        unit: ' μm',
      },
      {
        id: 5,
        name: 'Solids',
        value: Number(
          newShiftData.summary ? newShiftData.summary.percentSolids : newShiftData.percentSolids,
        ).toLocaleString(navigator.languages, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }),
        unit: ' %',
      },
      {
        id: 1,
        name: 'Au',
        value: Number(newShiftData.summary ? newShiftData.summary.auProduced : newShiftData.auProduced).toLocaleString(
          navigator.languages,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        ),
        unit: ' ppm',
      },
      {
        id: 2,
        name: 'Cu',
        value: Number(newShiftData.summary ? newShiftData.summary.gradeCu : newShiftData.gradeCu).toLocaleString(
          navigator.languages,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        ),
        unit: ' %',
      },
      {
        id: 6,
        name: 'S',
        value: Number(shiftData.summary ? shiftData.summary.gradeS : shiftData.gradeS).toLocaleString(
          navigator.languages,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        ),

        unit: ' %',
      },
    ];
  };
  let getColumns = () => {
    return [
      { field: 'name', headerName: '', width: 140, align: 'left' },
      { field: 'value', headerName: '', width: 130, align: 'right', cellClassName: 'mono-text' },
      { field: 'unit', headerName: '', width: 70, align: 'left', cellClassName: 'unit-column' },
    ];
  };

  const withData = () => {
    return (
      <>
        <StyledCard userColor={userColor} sizePx={sizePx} {...derivedProps} data-testid="feed-data">
          <StyledPaper>
            <Typography
              variant="h3"
              sx={{ color: currentTheme.palette.text.primary }}
              marginTop={0.7}
              marginBottom={2}
              fontSize={'2.5rem!important'}
            >
              Feed
            </Typography>

            <DataGridPro
              sx={{
                border: 0,
                '& .MuiDataGrid-cell': { fontSize: currentTheme.typography.h6 },
                '& data-colindex=1': { textAlign: 'right !important', letterSpacing: '-0.9px !important' },
                '& .MuiDataGrid-columnHeaders': {
                  display: 'none', // Hides the entire header row
                },
                '& .unit-column': {
                  paddingLeft: '1px !important', // override default padding
                },
                // Alternating row colors
                '& .even-row': {
                  backgroundColor: currentTheme.palette.action.hover + '!important',
                },
                '& .odd-row': {
                  backgroundColor: currentTheme.palette.background.paper + '!important',
                },
                '& .MuiDataGrid-row[data-rowindex="2"]': {
                  borderBottom: '1px solid black',
                },
                // ...generateColIndexStyles(theme),
              }}
              getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
              rowClassName={(params) => (params.row.id === 2 ? 'thick-border-row' : '')}
              columns={getColumns()}
              rows={getRows()}
              autoHeight
              slots={{
                footer: () => null,
              }}
            ></DataGridPro>
          </StyledPaper>
        </StyledCard>
      </>
    );
  };

  return <> {newShiftData ? withData() : <Skeleton width={'100%'} height={500}></Skeleton>}</>;
}

import { Card, CardProps, styled, Typography, Paper, useTheme, Skeleton } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { ShiftData } from 'models/ShiftData';
import { useState } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { theme } from 'highcharts';
export type FeedDetailsProps = CardProps & {
  shiftData: ShiftData;
  sizePx: number;
};

type StyledCardProps = {
  sizePx: number;
  userColor: string;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
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
  justifyContent: 'center',
  alignItems: 'center',
}));

/*
 * A wrapper around MUI's {@link Avatar} component with auto-sizing and rendering of user's initials.
 */
export function FeedDetails(props: FeedDetailsProps): JSX.Element {
  const { shiftData, sizePx, ...derivedProps } = props;
  const userColor = deepPurple[400];
  const [newShiftData] = useState(shiftData);
  const cuurentTheme = useTheme();

  let getRows = () => {
    return [
      {
        id: 1,
        name: 'Au',
        value:
          Number(newShiftData.auProduced).toLocaleString(navigator.languages, {
            minimumFractionDigits: 3,
          }) + ' (ppm)',
      },
      {
        id: 2,
        name: 'Cu',
        value:
          Number(newShiftData.gradeCu).toLocaleString(navigator.languages, {
            minimumFractionDigits: 3,
          }) + ' (%)',
      },
      {
        id: 3,
        name: 'Throughput',
        value:
          Number(newShiftData.throughput).toLocaleString(navigator.languages, {
            minimumFractionDigits: 3,
          }) + ' (tph)',
      },
      {
        id: 4,
        name: 'P80',
        value:
          Number(newShiftData.p80).toLocaleString(navigator.languages, {
            minimumFractionDigits: 3,
          }) + ' (μm)',
      },
      {
        id: 5,
        name: 'Solids',
        value:
          Number(newShiftData.percentSolids).toLocaleString(navigator.languages, {
            minimumFractionDigits: 3,
          }) + ' (%)',
      },
      {
        id: 6,
        name: 'pH',
        value: newShiftData.tanks[0]
          ? shiftData.tanks[0].ph
            ? Number(shiftData.tanks[0].ph).toLocaleString(navigator.languages, {
                minimumFractionDigits: 3,
              })
            : ''
          : '',
      },
    ];
  };
  let getColumns = () => {
    return [
      { field: 'name', headerName: '', width: 160 },
      { field: 'value', headerName: '', width: 200 },
    ];
  };

  const withData = () => {
    return (
      <>
        <StyledCard userColor={userColor} sizePx={sizePx} {...derivedProps} data-testid="feed-data">
          <StyledPaper>
            <Typography variant="h3">Feed</Typography>
            <DataGridPro
              sx={{
                border: 0,
                '& .MuiDataGrid-cell': { fontSize: cuurentTheme.typography.h6 },
                '& .MuiDataGrid-columnHeaders': {
                  display: 'none', // Hides the entire header row
                },
              }}
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

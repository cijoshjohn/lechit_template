import { Box, BoxProps, Skeleton, Typography } from '@mui/material';
import { OdsHighlightData } from 'components/HighlightData/OdsHighlightData';
import { OdsHighlightDataModel } from 'models/OdsHighlightData';

export type ShiftChartViewSkeletonProps = BoxProps & {
  pageName: string;
  highlightData: Array<object>;
};

export const DetailsHeader = (props: ShiftChartViewSkeletonProps) => {
  const { ...headerDetails } = props;

  const GetHighlightDetails = (propData: OdsHighlightDataModel) => {
    return <OdsHighlightData sizePx={100} data={propData} />;
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'primary.main',
        m: 0.5,
      }}
    >
      <Typography variant="h4" component="h4" color="textPrimary" data-testid="page-name">
        {headerDetails.pageName}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        {headerDetails.highlightData.length > 0 ? (
          headerDetails.highlightData.map((element: OdsHighlightDataModel) => GetHighlightDetails(element))
        ) : (
          <>
            <Skeleton
              variant="rectangular"
              width={200}
              animation="wave"
              height={100}
              sx={{ flex: 1 }}
              data-testid="page-highlight-loading1"
            />
            <Skeleton
              variant="rectangular"
              width={200}
              animation="wave"
              height={100}
              sx={{ flex: 1 }}
              data-testid="page-highlight-loading2"
            />
          </>
        )}
      </Box>
    </Box>
  );
};

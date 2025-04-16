/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-base-to-string */
import { Tooltip } from '@mui/material';
import { convertDigits, convertPriceVal, convertNum } from './config';
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
const tankColumns = [
  {
    field: 'tankNo',
    headerName: 'Tank No',
    valueGetter: (_value, row) => `${row?.tankNo ?? ''}`,
  },
  {
    field: 'cumulativeResidenceTime',
    headerName: 'Cumulative Residence time (min)',
    flex: 1,
    valueGetter: (_value, row) =>
      `${(row?.cumulativeResidenceTime ? Number(convertNum(row?.cumulativeResidenceTime, 2, 2)).toFixed() : '') ?? ''}`,
  },
  {
    field: 'model_au',
    headerName: 'Total (g/h)',
    flex: 1,
    valueGetter: (_value, row) => `${convertNum(row?.leachingProfile?.model_au, 2, 2) ?? ''}`,
  },
  {
    field: 'recoverable_au',
    headerName: 'Recoverable (g/h)',
    flex: 1,
    valueGetter: (_value, row) => `${convertNum(row?.leachingProfile?.recoverable_au, 2, 2) ?? ''}`,
  },
  {
    field: 'inaccessible_au',
    headerName: 'Inaccessible (g/h)',
    flex: 1,
    valueGetter: (_value, row) => `${convertNum(row?.leachingProfile?.inaccessible_au, 2, 2) ?? ''}`,
  },
  {
    field: 'cnadded',
    headerName: 'Added (kg/t)',
    flex: 1,
    valueGetter: (_value, row) => `${convertNum(row?.cnadded, 2, 2) ?? ''}`,
  },
  {
    field: 'model_cn',
    headerName: 'CN- Conc (ppm)',
    flex: 1,
    valueGetter: (_value, row) => `${Number(convertNum(row?.cyanideProfile?.model_cn, 0, 0)).toFixed() ?? ''}`,
  },
  {
    field: 'model_s',
    headerName: 'S(CN)₂ (ppm)',
    flex: 1,
    valueGetter: (_value, row) => `${Number(convertNum(row?.cyanideProfile?.model_s, 0, 0)).toFixed() ?? ''}`,
  },
];

const columnGroupingBase = [
  {
    groupId: 'gold',
    headerName: 'Gold',
    description: '',
    children: [
      { field: 'leachingProfile.model_au' },
      { field: 'leachingProfile.recoverable_au' },
      { field: 'leachingProfile.inaccessible_au' },
    ],
  },
  {
    groupId: 'cyanide',
    headerName: 'Cyanide',
    description: '',
    children: [
      { field: 'cnadded' },
      { field: 'cyanideProfile.model_cn' },
      { field: 'cyanideProfile.model_cu' },
      { field: 'cyanideProfile.model_s' },
    ],
  },
];

const weeklyColumnsBase = [
  {
    field: 'gradeAu',
    headerName: 'Grade Au PPM',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params.row.gradeAu) || ''}`,
  },
  {
    field: 'gradeCu',
    headerName: 'Grade Cu',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params.row.gradeCu) || ''}`,
  },
  {
    field: 'gradeS',
    headerName: 'Grade S',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params.row.gradeAu) || ''}`,
  },
  {
    field: 'noOfTanks',
    headerName: 'No Of Tanks',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params.row.gradeS) || ''}`,
  },
  {
    field: 'percentSolids',
    headerName: 'PercentSolids',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params.row.percentSolids) || ''}`,
  },
  {
    field: 'recordType',
    headerName: 'Record Type',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params.row.recordType) || ''}`,
  },
  {
    field: 'shiftId',
    headerName: 'Shift Id',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params.row.shiftId) || ''}`,
  },
  {
    field: 'throughput',
    headerName: 'Throughput',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params.row.throughput) || ''}`,
  },
  {
    field: 'feedDistribution.exposed_au',
    headerName: 'Exposed Au',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params.row.feedDistribution.exposed_au) || ''}`,
  },
  {
    field: 'feedDistribution.liberated_au',
    headerName: 'Liberated Au',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params.row.feedDistribution.liberated_au) || ''}`,
  },
  {
    field: 'feedDistribution.model_au',
    headerName: 'Model Au',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params.row.feedDistribution.model_au) || ''}`,
  },
  {
    field: 'feedDistribution.porous_au',
    headerName: 'Porous Au',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params.row.feedDistribution.porous_au) || ''}`,
  },
];

const multiShiftColumnsBase: GridColDef[] = [
  {
    field: 'shiftId',
    headerName: 'Shift Id',
    flex: 1,
    valueGetter: (_value, row) => `${row?.shiftId ?? ''}`,
    width: 180,
  },
  {
    field: 'auProduced',
    headerName: 'Recovered (g/h)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row?.auProduced) || ''}`,
    width: 110,
  },

  {
    field: 'auRecovered',
    headerName: 'Recovery (%)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row?.auRecovered) || ''}`,
  },

  {
    field: 'cnAdded',
    headerName: 'NaCN Added (kg/t)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row?.cnAdded) || ''}`,
    width: 150,
  },

  {
    field: 'cnUsed',
    headerName: 'Total NaCN Used (kg/hr)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row?.cnUsed) || ''}`,
  },
  {
    field: 'cnConcTailing',
    headerName: 'Tailings CN- (ppm)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row?.cnConcTailing) || ''}`,
  },

  {
    field: 'AuValue',
    headerName: 'Au Value ($)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row?.AuValue) || ''}`,
  },

  {
    field: 'CnCost',
    headerName: 'NaCN Cost ($)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row?.CnCost) || ''}`,
  },

  {
    field: 'TotalValue',
    headerName: 'Total Value ($)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row?.TotalValue) || ''}`,
  },

  {
    field: 'throughput',
    headerName: 'Throughput (tph)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row.throughput) || ''}`,
  },

  {
    field: 'p80',
    headerName: 'P80 (µm)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row.p80) || ''}`,
  },

  {
    field: 'percentSolids',
    headerName: 'Solids (%)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row.percentSolids) || ''}`,
  },

  {
    field: 'gradeAu',
    headerName: 'Au (ppm)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row.gradeAu) || ''}`,
  },

  {
    field: 'gradeCu',
    headerName: 'Cu (%)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row.gradeCu) || ''}`,
  },

  {
    field: 'gradeS',
    headerName: 'S (%)',
    flex: 1,
    valueGetter: (_value, row) => `${convertDigits(row.gradeS) || ''}`,
  },
];

const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: 'Gold',
    headerName: 'Gold',
    children: [{ field: 'auProduced' }, { field: 'auRecovered' }],
  },
  {
    groupId: 'Cyanide',
    headerName: 'Cyanide',
    children: [{ field: 'cnAdded' }, { field: 'cnUsed' }, { field: 'cnConcTailing' }],
  },
  {
    groupId: 'Value',
    headerName: 'Value',
    children: [{ field: 'AuValue' }, { field: 'CnCost' }, { field: 'TotalValue' }],
  },
  {
    groupId: 'Feed',
    headerName: 'Feed',
    children: [{ field: 'throughput' }, { field: 'p80' }, { field: 'percentSolids' }],
  },
  {
    groupId: 'Grades',
    headerName: 'Grades',
    children: [{ field: 'gradeAu' }, { field: 'gradeCu' }, { field: 'gradeS' }],
  },
  ,
];

/* const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: 'gold_group',
    headerName: 'Gold',
    description: '',
    children: [{ field: 'auProduced' }, { field: 'auRecovered' }],
  },
]; */

const renderSingleCell = (params) => {
  /*  var result = null;

  if (shiftAllMinMax) {
    if (shiftAllMinMax[params.field]) {
      result = (
        <Tooltip
          title={
            'Min :' +
            convertDigits(shiftAllMinMax[params.field][0] != 'NaN' ? shiftAllMinMax[params.field][0] : '') +
            '-- Max :' +
            convertDigits(shiftAllMinMax[params.field][1] != 'NaN' ? shiftAllMinMax[params.field][1] : '')
          }
          placement="top-end"
        >
          <div>{params.value}</div>
        </Tooltip>
      );
    } else {
      result = <div>{params.value}</div>;
    }
  } else {
    result = <div>{params.value}</div>;
  }

  return result; */
};

const simulationSingleColumns = [
  { field: 'date', headerName: 'Time', flex: 1, width: 160, valueGetter: (params) => `${params || ''}` },

  {
    field: 'auProduced',
    headerName: 'Recovered (g/h)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
  },
  {
    field: 'auRecovered',
    headerName: 'Recovery (%)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
  },

  {
    field: 'cnAdded',
    headerName: 'CN Added (kg/t)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
  },
  { field: 'cnUsed', headerName: 'CN Used (kg/h)', flex: 1, valueGetter: (params) => `${convertDigits(params) || ''}` },
  {
    field: 'cnConcTailing',
    headerName: 'Tailings CN (ppm)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
  },

  { field: 'AuValue', headerName: 'Au Value ($/h)', flex: 1, valueGetter: (params) => `${params || ''}` },
  { field: 'CnCost', headerName: 'CN Cost ($/h)', flex: 1, valueGetter: (params) => `${params || ''}` },
  {
    field: 'TotalValue',
    headerName: 'Total Value ($/h)',
    flex: 1,
    valueGetter: (params) => `${convertPriceVal(params) || ''}`,
  },

  {
    field: 'throughput',
    headerName: 'Throughput',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
  },
  {
    field: 'p80',
    headerName: 'P80 (µm)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
  },
  {
    field: 'percentSolids',
    headerName: 'Solids (%)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
  },

  {
    field: 'gradeAu',
    headerName: 'Au (ppm)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
  },
  {
    field: 'gradeCu',
    headerName: 'Cu (%)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
  },
  {
    field: 'gradeS',
    headerName: 'S (%)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
  },
];

const simulationMultiShifColumns = [
  {
    field: 'date',
    value: 'date',
    headerName: 'Time',
    flex: 1,
    valueGetter: (params) => `${params || ''}`,
    renderCell: (params) => renderSingleCell(params),
  },
  {
    field: 'auRecoveryAsMassFlow',
    value: 'auRecoveryAsMassFlow',
    headerName: 'Au Production',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
    renderCell: (params) => renderSingleCell(params),
  },
  {
    field: 'AuValue',
    value: 'AuValue',
    headerName: 'Au Value ($/h)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
    renderCell: (params) => renderSingleCell(params),
  },
  {
    field: 'CnCost',
    value: 'CnCost',
    headerName: 'CN Cost($/h)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
    renderCell: (params) => renderSingleCell(params),
  },
  {
    field: 'cnUsed',
    headerName: 'CN used(Kg/t)',
    value: 'cnUsed',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
    renderCell: (params) => renderSingleCell(params),
  },
  {
    field: 'cnAdded',
    value: 'cnAdded',
    headerName: 'CN Added(Kg/t)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
    renderCell: (params) => renderSingleCell(params),
  },

  {
    field: 'throughput',
    value: 'throughput',
    headerName: 'Throughput',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
    renderCell: (params) => renderSingleCell(params),
  },

  {
    field: 'percentSolids',
    value: 'percentSolids',
    headerName: 'Solids (%)',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
    renderCell: (params) => renderSingleCell(params),
  },

  {
    field: 'p80',
    value: 'p80',
    headerName: 'P80',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
    renderCell: (params) => renderSingleCell(params),
  },

  {
    field: 'gradeAu',
    value: 'gradeAu',
    headerName: 'Grade Au',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
    renderCell: (params) => renderSingleCell(params),
  },

  {
    field: 'gradeCu',
    value: 'gradeCu',
    headerName: 'Grade Cu',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
    renderCell: (params) => renderSingleCell(params),
  },

  {
    field: 'gradeS',
    value: 'gradeS',
    headerName: 'Grade S',
    flex: 1,
    valueGetter: (params) => `${convertDigits(params) || ''}`,
    renderCell: (params) => renderSingleCell(params),
  },
];

const simulationGroupDetails = [
  {
    groupId: 'gold',
    headerName: 'Gold',
    description: '',
    children: [{ field: 'auProduced' }, { field: 'auRecovered' }],
  },
  {
    groupId: 'cyanide',
    headerName: 'Cyanide',
    description: '',
    children: [{ field: 'cnAdded' }, { field: 'cnUsed' }, { field: 'cnConcTailing' }],
  },
  {
    groupId: 'benefits',
    headerName: 'Benefits',
    description: '',
    children: [{ field: 'AuValue' }, { field: 'CnCost' }, { field: 'TotalValue' }],
  },
  {
    groupId: 'feed',
    headerName: 'Feed',
    description: '',
    children: [{ field: 'throughput' }, { field: 'p80' }, { field: 'percentSolids' }],
  },
  {
    groupId: 'grades',
    headerName: 'Grades',
    description: '',
    children: [{ field: 'gradeAu' }, { field: 'gradeCu' }, { field: 'gradeS' }],
  },
];

export {
  tankColumns,
  columnGroupingBase,
  weeklyColumnsBase,
  multiShiftColumnsBase,
  columnGroupingModel,
  simulationSingleColumns,
  simulationMultiShifColumns,
  simulationGroupDetails,
};

export interface ShiftOverviewData {
  [key: string]: ShiftOverviewDataDetail;
}

export interface ShiftOverviewDataDetail {
  name: string;
  actual: number;
  actualUnit: string;
  forecast: number;
  forecastUnit: string;
}

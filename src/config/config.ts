/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// ==============================|| THEME CONFIG  ||============================== //
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

const config = {
  defaultPath: '/shiftViewer',
  fontFamily: `'Roboto', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr',
};

export default config;
export const drawerWidth = 230;
export const drawerIsOpen = false;
export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const GraphOption = [
  { key: 'variability', value: 'Variability' },
  { key: 'cumulative', value: 'Cumulative' },
];

export const feedproperties = [
  { key: 'throughput', value: 'Throughput (tph)' },
  { key: 'percentSolids', value: 'Solids (%)' },
  { key: 'p80', value: 'P80 (um)' },
  { key: 'gradeAu', value: 'Au (ppm)' },
  { key: 'gradeCu', value: 'Cu   (%)' },
  { key: 'gradeS', value: 'S   (%)' },
  { key: 'cnAdded', value: 'Cyanide (kg/t)' },
];

export const shiftPropertyList = [
  { key: 'cnUsed', value: 'CN Used (kg/h)' },
  { key: 'throughput', value: 'Throughput (tph)' },
  { key: 'percentSolids', value: 'Solids (%)' },
  { key: 'p80', value: 'P80 (um)' },
  { key: 'gradeAu', value: 'Au (ppm)' },
  { key: 'gradeCu', value: 'Cu   (%)' },
  { key: 'gradeS', value: 'S   (%)' },
  { key: 'cnAdded', value: 'Cyanide (kg/t)' },
  { key: 'auProduced', value: 'Au produced (g/h)' },
  { key: 'auRecovered', value: 'Au recovered (%)' },
  { key: 'cnConcTailing', value: 'CN Tailing (ppm)' },
];

export const mainProps = [
  { text: 'Au Production (g/h)', value: null, key: 'auRecoveryAsMassFlow' },
  { text: 'Au', value: null, subtext: ' solution', unit: ' (ppm)', key: 'auSolutionPpm' },
  { text: 'Cyanide (kg/t)', value: null, key: 'cnAdded' },
  { text: 'O', value: null, subtext: '2', unit: ' (ppm)', key: 'avgDoconc' },
  { text: 'Au', value: null, key: 'AuValue', isPrice: true },
  { text: 'CN', value: null, key: 'CnCost', isPrice: true },
];

export const goldPrice = window?.env?.REACT_APP_GOLDPRICE || 75.0;
export const CNPrice = window?.env?.REACT_APP_CN_PRICE || 1.9;

export const globalCurrency = window?.env?.REACT_APP_CURRENCY || 'usd';
export const globalCurrencySymbol = window?.env?.REACT_APP_CURRENCY_SYMBOL || '$';
export const alertPercentage = window?.env?.REACT_APP_SHIFTVIEWER_ALERT_DIFFERENCE || 2;
export const siteTimezone = window?.env?.REACT_APP_SITE_TIMEZONE;
export const locale = window?.env?.REACT_APP_SITE_TIMEZONE_LOCALE;

export const calculatePrices = (forecastData) => {
  if (forecastData) {
    let auValue = forecastData['auProduced'] * goldPrice;
    let cnCost = forecastData['cnUsed'] * CNPrice;
    let totalValue = auValue - cnCost;
    forecastData['AuValue'] = convertDigits(auValue, 2);
    forecastData['CnCost'] = convertDigits(cnCost, 2);
    forecastData['TotalValue'] = convertDigits(totalValue, 2);
  }
  return forecastData;
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 24-hour format with no colons
  const format1 = `${hours}${minutes}${seconds}${day}${month}${year}`;

  // 12-hour format with colons and padded minutes
  const formattedHours = hours % 12 || 12; // Get 12-hour format
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const format2 = `${formattedHours}:${minutes.padStart(2, '0')}:${seconds} ${amPm} ${day}/${month}/${year}`;

  return { format1, format2 };
};

export const convertPriceVal = (data): unknown => {
  return convertNum(data, 2, 2);
};

export const convertDigits = (data): unknown => {
  return convertNum(data, 3, 3);
};

export const convertNum = (data, min, max): unknown => {
  const numConvertOptions = {
    minimumFractionDigits: min,
  };
  if (max) {
    numConvertOptions['maximumFractionDigits'] = max;
  }

  let converted = Number(data).toLocaleString(navigator.languages, numConvertOptions);
  if (converted == 'NaN') {
    return data;
  } else {
    return converted;
  }
};

function stringToDate(dateString) {
  const parts = dateString.split(/[- :]/);
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are zero-indexed
  const day = parseInt(parts[2], 10);
  const hours = parseInt(parts[3], 10);
  const minutes = parseInt(parts[4], 10);
  const seconds = parseInt(parts[5], 10);

  const date = new Date(year, month, day, hours, minutes, seconds);
  return date;
}
function getDateTimeInTimeZone(timezone) {
  const dayjsObject = dayjs().tz(timezone);

  const formattedDate = dayjsObject.format('YYYY-MM-DD HH:mm:ss');

  return stringToDate(formattedDate);
}

export const nowSiteTime = () => {
  if (siteTimezone) {
    return getDateTimeInTimeZone(siteTimezone);
  } else {
    return new Date();
  }
};

import { Fragment } from 'react';
import AppBar from 'components/AppBar';
import SideBar from 'components/SideBar';

import MainLayout from 'components/Pages/MainLayout';
import SecondaryPage from 'components/Pages/SecondaryPage';
import SampleForm from 'components/SampleForm/SampleForm';

import { DashboardSkeleton } from '../lib/skeleton/DashboardSkeleton';

import { ShiftContext } from 'contexts/ShiftContext';

import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import dayjs, { Dayjs } from 'dayjs';

// import dummyShiftData from '../test_data/test_data.json'
import ShiftFacade from 'services/ShiftFacade';
import ScreenSizePage from 'components/Pages/ScreenSizePage';
import { DetailSkelton } from '../lib/skeleton/DetailsViews/DetailSkelton';
import { ForecastSkelton } from '../lib/skeleton/ForecastViews/ForecastSkelton';
import MainPage from 'components/Pages/MainPage';

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [shiftChartData, setShiftChartData] = useState<number[]>([]);
  const [shiftOverviewData, setShiftOverviewData] = useState({});

  const [currentShiftDate, setCurrentShiftDate] = useState<Dayjs>(dayjs());

  const shiftFacade = new ShiftFacade();

  useEffect(() => {
    console.log('curren date in app.tsx?', currentShiftDate.format());
    loadShiftData();
  }, [currentShiftDate]);

  const loadShiftData = () => {
    //TODO: check if need to retrieve more data. For now we just assume we need to retrieve the new data everytime
    setDataLoaded(false);

    //TODO: Based on the current shift date, generate the required shift date list which is used to retrieve the shift data
    const requiredShiftDates = [];

    setTimeout(() => {
      return shiftFacade.getShiftData(requiredShiftDates).then((shiftData) => {
        setShiftChartData(shiftData.shiftChartData);
        setShiftOverviewData(shiftData.shiftData);
        setDataLoaded(true);
      });
    }, 2000);
  };

  return (
    <Fragment>
      <AppBar />
      <SideBar />

      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/sec" element={<SecondaryPage />} />
        <Route path="/form" element={<SampleForm />} />
        <Route
          path="/dashboard"
          element={
            <ShiftContext.Provider value={{ currentShiftDate, setCurrentShiftDate }}>
              <DashboardSkeleton
                title="Demo App"
                isDataLoaded={dataLoaded}
                shiftChartData={shiftChartData}
                shiftData={shiftOverviewData}
              />
            </ShiftContext.Provider>
          }
        />
        <Route
          path="/details"
          element={
            <ShiftContext.Provider value={{ currentShiftDate, setCurrentShiftDate }}>
              <DetailSkelton></DetailSkelton>
            </ShiftContext.Provider>
          }
        />
        <Route
          path="/forecast"
          element={
            <ShiftContext.Provider value={{ currentShiftDate, setCurrentShiftDate }}>
              <ForecastSkelton></ForecastSkelton>
            </ShiftContext.Provider>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;

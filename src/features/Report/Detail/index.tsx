import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {globalStyles} from 'src/commons/globalStyles';
import {SideLeft} from './components/SideLeft';
import {defaultColors} from '@configs';
import {MainDetail} from './components/MainDetail';
import {EventProvider} from 'react-native-outside-press';
import {ReportTimeState} from '../General/components/TabBarLeftOrder';
import {useAreaId} from 'src/redux/infoDrawer/hooks';
import {IReportDist, getReportDist} from 'src/api/report';

export interface TabBarOrder {
  isOpenTab: boolean;
  setIsOpenTab: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReportDetail = () => {
  const [currenFilter, setCurrentFilter] = useState<ReportTimeState>(
    ReportTimeState.TODAY,
  );
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const handleChangeFilter = (filter: ReportTimeState) => {
    setCurrentFilter(filter);
  };
  const IdArea = useAreaId();
  const [dataReport, setDataReport] = useState<IReportDist[]>([]);
  const getDataReport = useCallback(async () => {
    const data = await getReportDist(IdArea, currenFilter, startDate, endDate);
    if (data.success) {
      setDataReport(data.data);
    }
  }, [IdArea, currenFilter, endDate, startDate]);

  useEffect(() => {
    if (IdArea) {
      if (currenFilter === ReportTimeState.DATE) {
        if (endDate && startDate) {
          if (currenFilter !== ReportTimeState.DATE) {
            setCurrentFilter(ReportTimeState.DATE);
          }
          getDataReport();
        }
      } else {
        setStartDate('');
        setEndDate('');
        getDataReport();
      }
    }
  }, [IdArea, currenFilter, startDate, endDate]);

  const [isOpenTab, setIsOpenTab] = useState<boolean>(false);
  return (
    <EventProvider style={{flex: 1}}>
      <View style={styles.container}>
        <SideLeft
          isOpenTab={isOpenTab}
          setIsOpenTab={setIsOpenTab}
          currenFilter={currenFilter}
          onChange={handleChangeFilter}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <MainDetail setIsOpenTab={setIsOpenTab} dataReport={dataReport} />
      </View>
    </EventProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.row,
    ...globalStyles.fullFill,
    backgroundColor: defaultColors.c_fff,
  },
});

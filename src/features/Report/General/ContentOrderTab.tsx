import { StyleSheet, View } from 'react-native';
import ContentRightOrder from './components/ContentRightOrder';
import TabBarLeftOrder, { ReportTimeState } from './components/TabBarLeftOrder';
import { defaultColors } from '@configs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IReportAll, getReportAll } from 'src/api/report';
import { useAreaId } from 'src/redux/infoDrawer/hooks';
import { FomatDateValueDMY, FomatDateYY_MM_DD } from 'src/commons/formatDate';



const ContentOrderTab = () => {
  const [isOpenTab, setIsOpenTab] = useState<boolean>(false);
  const [typeLocation, setTypeLocaion] = useState<ReportTimeState>(ReportTimeState.TODAY);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate , setEndDate] = useState<string>('');
  const IdArea = useAreaId();
  const [dataReport, setDataReport] = useState<IReportAll[]>([]);



  const getDataReport = useCallback(async () => {
    const data = await getReportAll(IdArea, typeLocation, startDate, endDate);
    if (data.success) {
      setDataReport(data.data);
    }
  }, [IdArea, typeLocation, endDate, startDate]);


  const stringDate = useMemo<string>(() => {
    const currentDate = new Date();
    switch (typeLocation) {
      case ReportTimeState.DATE :
        if (startDate && endDate) {
          return (
            'Từ ' +
            FomatDateYY_MM_DD(startDate) +
            ' Đến ' +
            FomatDateYY_MM_DD(endDate)
          );
        }
      case ReportTimeState.TODAY:
        return FomatDateValueDMY(currentDate);
      case ReportTimeState.WEEK:
        const currentDay = currentDate.getDay();
        const daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;
        const firstDayOfWeek = new Date(currentDate); // Tạo một bản sao của ngày hiện tại
        firstDayOfWeek.setDate(currentDate.getDate() - daysToSubtract);
        return (
          'Từ ' +
          FomatDateValueDMY(firstDayOfWeek) +
          ' Đến ' +
          FomatDateValueDMY(currentDate)
        );
      case ReportTimeState.MONTH:
        const firstDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1,
        );
        return (
          'Từ ' +
          FomatDateValueDMY(firstDayOfMonth) +
          ' Đến ' +
          FomatDateValueDMY(currentDate)
        );
      default:
        return '';
    }
  }, [typeLocation, startDate, endDate]);

  useEffect(() => {
    if (IdArea) {
      if (typeLocation === ReportTimeState.DATE) {
        if (endDate && startDate) {
          getDataReport();
        }
      } else {
        setStartDate('');
        setEndDate('');
        getDataReport();
      }
    }
  }, [IdArea, typeLocation,startDate ,endDate]);

  return (
    <View style={styles.container}>
      <TabBarLeftOrder
        isOpenTab={isOpenTab}
        setIsOpenTab={setIsOpenTab}
        typeLocation={typeLocation}
        setStartDate={setStartDate}
        setTypeLocaion={setTypeLocaion}
        setEndDate={setEndDate}
      />
      <ContentRightOrder
        isOpenTab={isOpenTab}
        setIsOpenTab={setIsOpenTab}
        stringDate={stringDate}
        dataReport={dataReport}
        typeLocation={typeLocation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: defaultColors.c_fff,
    flex :1,
  },
});

export default ContentOrderTab;

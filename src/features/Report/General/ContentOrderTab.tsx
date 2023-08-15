import { StyleSheet, View } from 'react-native';
import ContentRightOrder from './components/ContentRightOrder';
import TabBarLeftOrder, { ReportTimeState } from './components/TabBarLeftOrder';
import { defaultColors } from '@configs';
import React, { useCallback, useEffect, useState } from 'react';
import { IReportAll, getReportAll } from 'src/api/report';
import { useAreaId } from 'src/redux/infoDrawer/hooks';



const ContentOrderTab = () => {
  const [isOpenTab, setIsOpenTab] = useState<boolean>(false);
  const [typeLocation, setTypeLocaion] = useState<ReportTimeState>(ReportTimeState.TODAY);
  const [currenFilter, setCurrentFilter] = useState<string>('');
  const IdArea = useAreaId();
  const [dataReport , setDataReport] = useState<IReportAll[]>([]);

  const getDataReport = useCallback(async () => {
    const data = await getReportAll(IdArea, typeLocation);
    if (data.success) {
      setDataReport(data.data);
    }
  }, [IdArea ,typeLocation]);

  useEffect(() => {
    if (IdArea) {
      getDataReport();
    }
  }, [IdArea, typeLocation]);

  return (
    <View style={styles.container}>
      <TabBarLeftOrder
        isOpenTab={isOpenTab}
        setIsOpenTab={setIsOpenTab}
        typeLocation={typeLocation}
        setCurrentFilter={setCurrentFilter}
        setTypeLocaion={setTypeLocaion}
        currenFilter={currenFilter}
      />
      <ContentRightOrder isOpenTab={isOpenTab} setIsOpenTab={setIsOpenTab}  dataReport={dataReport}/>
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

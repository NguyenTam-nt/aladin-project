import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import HeaderContentRight from './HeaderContentRight';
import TableRightContent from './TableRightContent';
import { defaultColors } from '@configs';
import { TabBarOrder } from 'src/features/orderTab/ContentOrderTab';
import ButtonMenuTabBar from 'src/components/DropDownView/ButtonMenuTabBar';
import { IReportAll } from 'src/api/report';

interface IContentRightOrderReport {
  dataReport: IReportAll[]
  stringDate : string
}

const ContentRightOrder = (props : IContentRightOrderReport & TabBarOrder ) => {
  const {setIsOpenTab, dataReport ,stringDate} = props;
  return (
    <View style={{flex: 1}}>
      <ButtonMenuTabBar onPress={setIsOpenTab} />
      <View style={styles.container}>
        <HeaderContentRight stringDate={stringDate}/>
        <TableRightContent dataReport={dataReport} />
      </View>
    </View>
  );
};

export default ContentRightOrder;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 32,
    marginTop: 24,
   flex :1 ,
    borderRadius : 4,
    borderWidth :1,
    borderColor : defaultColors.bg_EFEFEF,
  },
});

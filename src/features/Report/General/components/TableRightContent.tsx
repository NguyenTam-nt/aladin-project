import { TextCustom } from '@components';
import {defaultColors, isTabletDevice} from '@configs';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';
import { IReportAll } from 'src/api/report';
import {ICDownTrend} from 'src/assets/icons/ICDownTrend';
import { ICCalendar } from 'src/assets/icons/ICLogo copy';
import {ICUpTrend} from 'src/assets/icons/ICUpTrend';
import { formatNumberDot } from 'src/commons/formatMoney';
import { RadioButtonSelect } from 'src/components/Checkbox/RadioButton';
import { Calendar } from '../../Detail/components/Calendar';

const ItemReport = ({index , item}: {index: number ; item : IReportAll}) => {
  return (
    <View
      style={{
        backgroundColor: index === 0 ? defaultColors._EA222A : undefined,
        paddingHorizontal: 12,
        borderTopLeftRadius: index === 0 ? 8 : 0,
        borderTopRightRadius: index === 0 ? 8 : 0,
      }}>
      <Text
        style={[
          styles.textTitleItem,
          index === 0 ? {color: defaultColors.c_fff} : undefined,
        ]}>
        {item.name}
      </Text>
      <View style={styles.contentTextRow1}>
        <Text
          style={[
            styles.textItemContent,
            index === 0 ? {color: defaultColors.c_fff} : undefined,
          ]}>
          {isTabletDevice && 'Số lượng bán: '}
          <Text
            style={[
              styles.textBold,
              {
                color:
                  index === 0 ? defaultColors.c_fff : defaultColors._EA222A,
              },
            ]}>
            {item.quantity || 0}
          </Text>{' '}
          món
        </Text>
        <View style={styles.itemLeft}>
          {item.quantityOld >= 0 ? (
            <ICUpTrend
              color={index === 0 ? defaultColors.c_fff : defaultColors._01A63E}
            />
          ) : (
            <ICDownTrend
              color={index === 0 ? defaultColors.c_fff : defaultColors._EA222A}
            />
          )}
          <Text
            style={[
              styles.textItemContent,
              index === 0 ? {color: defaultColors.c_fff} : undefined,
            ]}>
            {isTabletDevice && TextCheckPercent(item.quantityOld)}
            <Text
              style={[
                styles.textBold,
                {
                  color:
                    index === 0 ? defaultColors.c_fff : defaultColors._01A63E,
                },
              ]}>
              {item.quantityOld * 100}%
            </Text>
            {isTabletDevice && ' số lượng bán so với hôm qua'}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text
          style={[
            styles.textItemContent,
            index === 0 ? {color: defaultColors.c_fff} : undefined,
          ]}>
          {isTabletDevice && 'Doanh Thu:'}
          <Text
            style={[
              styles.textBold,
              {
                color:
                  index === 0 ? defaultColors.c_fff : defaultColors._01A63E,
              },
            ]}>
            {formatNumberDot(item.revenue || 0)}
          </Text>{' '}
          VNĐ
        </Text>
        <View style={styles.itemLeft}>
        {item.revenueOld >= 0 ? (
            <ICUpTrend
              color={index === 0 ? defaultColors.c_fff : defaultColors._01A63E}
            />
          ) : (
            <ICDownTrend
              color={index === 0 ? defaultColors.c_fff : defaultColors._EA222A}
            />
          )}
          <Text
            style={[
              styles.textItemContent,
              index === 0 ? {color: defaultColors.c_fff} : undefined,
            ]}>
            {isTabletDevice && TextCheckPercent(item.revenueOld)}
            <Text
              style={[
                styles.textBold,
                {
                  color:
                    index === 0 ? defaultColors.c_fff : defaultColors._01A63E,
                },
              ]}>
              {item.revenueOld * 100}%
            </Text>
            {isTabletDevice && '  doanh thu so với hôm qua'}
          </Text>
        </View>
      </View>
      {index !== 0 && <View style={styles.devide} />}
    </View>
  );
};


const TextCheckPercent = (value : number)  => {
   return value >= 0 ?  'Tăng :' : 'Giảm :';
};




const TableRightContent = ({dataReport} : { dataReport : IReportAll[]}) => {




  const renderItem = useCallback((e: ListRenderItemInfo<IReportAll>) => {
    return <ItemReport item={e.item} index={e.index} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={dataReport}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 32,
    flex: 1,
  },
  textTitleItem: {
    fontSize: 20,
    color: defaultColors.c_222124,
    fontWeight: 'bold',
    marginTop: 16,
  },
  textItemContent: {
    fontSize: 14,
    color: defaultColors.c_222124,
  },
  contentTextRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 17,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 17,
  },
  textBold: {
    fontWeight: 'bold',
  },
  itemLeft: {
    flexDirection: 'row',
    gap: 8,
  },
  devide: {
    height: 1,
    width: '100%',
    backgroundColor: defaultColors._DBDBDB,
  },
  styleBoxCalendar: {
    position: 'absolute',
    top: '110%',
    left: 0,
    transform: [
      {
        translateY: 17,
      },
    ],
  },
  positionRelative: {
    position: 'relative',
    zIndex: 9999,
  },
});

export default TableRightContent;

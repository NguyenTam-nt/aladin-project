import {defaultColors, isTabletDevice} from '@configs';
import React, {useCallback, useMemo} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IReportAll} from 'src/api/report';
import {ICDownTrend} from 'src/assets/icons/ICDownTrend';
import {ICUpTrend} from 'src/assets/icons/ICUpTrend';
import {formatNumberDot} from 'src/commons/formatMoney';
import {ReportTimeState} from './TabBarLeftOrder';

const ItemReport = ({
  index,
  item,
  typeLocation,
}: {
  index: number
  item: IReportAll
  typeLocation: ReportTimeState
}) => {
  const TextEqualTime = useMemo<string>(() => {
    console.log('typeLocation44', typeLocation);

    switch (typeLocation) {
      case ReportTimeState.TODAY:
        return 'hôm qua';
      case ReportTimeState.WEEK:
        return 'tuần trước';
      case ReportTimeState.MONTH:
        return 'tháng trước';
      case ReportTimeState.YEAR:
        return 'năm trước';
      case ReportTimeState.DATE:
        return '';
      default:
        return 'hôm qua';
    }
  }, [typeLocation]);

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
        {TextEqualTime && (
          <View style={styles.itemLeft}>
            {item.quantityOld >= 0 ? (
              <ICUpTrend
                color={
                  index === 0 ? defaultColors.c_fff : defaultColors._01A63E
                }
              />
            ) : (
              <ICDownTrend
                color={
                  index === 0 ? defaultColors.c_fff : defaultColors._EA222A
                }
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
                {Math.round(item.quantityOld * 100) || 0}%
              </Text>
              {isTabletDevice && ` số lượng bán so với ${TextEqualTime}`}
            </Text>
          </View>
        )}
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
        {TextEqualTime && (
          <View style={styles.itemLeft}>
            {item.revenueOld >= 0 ? (
              <ICUpTrend
                color={
                  index === 0 ? defaultColors.c_fff : defaultColors._01A63E
                }
              />
            ) : (
              <ICDownTrend
                color={
                  index === 0 ? defaultColors.c_fff : defaultColors._EA222A
                }
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
                {Math.round(item.revenueOld * 100) || 0}%
              </Text>
              {isTabletDevice && `doanh thu so với ${TextEqualTime}`}
            </Text>
          </View>
        )}
      </View>
      {index !== 0 && <View style={styles.devide} />}
    </View>
  );
};

const TextCheckPercent = (value: number) => {
  return value >= 0 ? 'Tăng :' : 'Giảm :';
};

const TableRightContent = ({
  dataReport,
  typeLocation,
}: {
  dataReport: IReportAll[]
  typeLocation: ReportTimeState
}) => {
  const renderItem = useCallback(
    (e: ListRenderItemInfo<IReportAll>) => {
      return (
        <ItemReport item={e.item} index={e.index} typeLocation={typeLocation} />
      );
    },
    [typeLocation],
  );

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

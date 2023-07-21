import {defaultColors} from '@configs';
import React, {useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ListRenderItemInfo,
} from 'react-native';
import {ICDownTrend} from 'src/assets/icons/ICDownTrend';
import {ICUpTrend} from 'src/assets/icons/ICUpTrend';

const ItemReport = ({index}: {index: number}) => {
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
        Tất cả cơ sở
      </Text>
      <View style={styles.contentTextRow1}>
        <Text
          style={[
            styles.textItemContent,
            index === 0 ? {color: defaultColors.c_fff} : undefined,
          ]}>
          Số lượng bán:{' '}
          <Text
            style={[
              styles.textBold,
              {
                color:
                  index === 0 ? defaultColors.c_fff : defaultColors._EA222A,
              },
            ]}>
            1000
          </Text>{' '}
          món
        </Text>
        <View style={styles.itemLeft}>
          <ICUpTrend
            color={index === 0 ? defaultColors.c_fff : defaultColors._01A63E}
          />
          <Text
            style={[
              styles.textItemContent,
              index === 0 ? {color: defaultColors.c_fff} : undefined,
            ]}>
            Tăng{' '}
            <Text
              style={[
                styles.textBold,
                {
                  color:
                    index === 0 ? defaultColors.c_fff : defaultColors._01A63E,
                },
              ]}>
              20%
            </Text>{' '}
            số lượng bán so với hôm qua
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text
          style={[
            styles.textItemContent,
            index === 0 ? {color: defaultColors.c_fff} : undefined,
          ]}>
          Doanh Thu:{' '}
          <Text
            style={[
              styles.textBold,
              {
                color:
                  index === 0 ? defaultColors.c_fff : defaultColors._01A63E,
              },
            ]}>
            1000.000.000
          </Text>{' '}
          VNĐ
        </Text>
        <View style={styles.itemLeft}>
          <ICDownTrend
            color={index === 0 ? defaultColors.c_fff : defaultColors._EA222A}
          />
          <Text
            style={[
              styles.textItemContent,
              index === 0 ? {color: defaultColors.c_fff} : undefined,
            ]}>
            Giảm{' '}
            <Text
              style={[
                styles.textBold,
                {
                  color:
                    index === 0 ? defaultColors.c_fff : defaultColors._01A63E,
                },
              ]}>
              5%
            </Text>{' '}
            doanh thu so với hôm qua
          </Text>
        </View>
      </View>
      {index !== 0 && <View style={styles.devide} />}
    </View>
  );
};

const TableRightContent = () => {
  const data = [1, 2, 3, 4, 5, 6];

  const renderItem = useCallback((e: ListRenderItemInfo<any>) => {
    return <ItemReport index={e.index} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
});

export default TableRightContent;

import {View, StyleSheet, FlatList, ScrollView, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import KitchenLinks from '../components/KitchenLinks';
import {defaultColors} from '@configs';
import {globalStyles} from 'src/commons/globalStyles';
import {HeaderListHistory} from './components/HeaderListHistory';
import {HistoryItem} from './components/HistoryItem';
import {getValueForDevice} from 'src/commons/formatMoney';
import SearchInput from 'src/components/Filter/SearchInput';
import {useHandleResponsePagination} from 'src/commons/useHandleResponsePagination';
import {getHistories} from 'src/api/history';
import {useGetCategotyType} from '../useGetCategotyType';
import {IHistory, ListRenderItemInfo} from '@typeRules';

export const History = () => {
  const {currentType} = useGetCategotyType();
  const getHistoryMethod = useCallback(
    async (page: number, size: number) => {
      return getHistories({
        page,
        size,
        menu: currentType,
        sort: 'createdDate,desc',
      });
    },
    [currentType],
  );

  const {data, isRefreshing, pullToRefresh, refresh, handleLoadMore} =
    useHandleResponsePagination<IHistory>(getHistoryMethod);

  useEffect(() => {
    refresh();
  }, []);

  const newData = useMemo(() => {
    const outputArray: {date: string; list: IHistory[]}[]  = [];
    const groupedMap: Map<string, IHistory[]> = new Map();

    for (const obj of data) {
      const key = new Date(obj.createdDate).toLocaleDateString();
      if (groupedMap.has(key)) {
        // @ts-ignore
        groupedMap.get(key).push(obj);
      } else {
        groupedMap.set(key, [obj]);
      }
    }
    groupedMap.forEach((value, key) => {
      outputArray.push({
        date: value.length ? value[0].createdDate : '',
        list: value,
      });
    });
    return outputArray;
  }, [data]);


  const renderItem = useCallback(({item}:ListRenderItemInfo< {date: string; list: IHistory[]}>) => {
    return <HistoryItem data={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <KitchenLinks
        renderRight={
          <SearchInput
            stylesContainer={getValueForDevice(undefined, {width: '100%'})}
            placeholder={'Lịch sử theo Ngày/ Tên món/ Mã hóa đơn'}
            value={''}
            setValue={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
          />
        }
      />
      <View style={globalStyles.fullFill}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={getValueForDevice(globalStyles.fullFill, {
            minWidth: 1240,
          })}>
          <View style={globalStyles.fullFill}>
            <HeaderListHistory />

            <FlatList
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={pullToRefresh}
                  tintColor="#000"
                />
              }
              showsVerticalScrollIndicator={false}
              data={newData}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultColors.c_fff,
    flex: 1,
    paddingHorizontal: getValueForDevice(32, 24),
    paddingBottom: 32,
  },
});

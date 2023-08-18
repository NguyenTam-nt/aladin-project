import { defaultColors } from '@configs';
import { useIsFocused } from '@react-navigation/native';
import { ListRenderItemInfo } from '@typeRules';
import React, { useCallback, useEffect } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { IHistoryDay, getHistories3 } from 'src/api/history';
import { getValueForDevice } from 'src/commons/formatMoney';
import { globalStyles } from 'src/commons/globalStyles';
import { useHandleResponsePagination } from 'src/commons/useHandleResponsePagination';
import SearchInput from 'src/components/Filter/SearchInput';
import KitchenLinks from '../components/KitchenLinks';
import { useGetCategotyType } from '../useGetCategotyType';
import { HeaderListHistory } from './components/HeaderListHistory';
import { HistoryItem } from './components/HistoryItem';

export const History = () => {
  const {currentType} = useGetCategotyType();
  const isFocus = useIsFocused();
  const getHistoryMethod = useCallback(
    async (page: number, size: number) => {
      return getHistories3({
        page,
        size,
        menu: currentType,
        status : true,
      });
    },
    [currentType],
  );

  const {data, isRefreshing, pullToRefresh, refresh, handleLoadMore} =
    useHandleResponsePagination<IHistoryDay>(getHistoryMethod);

  useEffect(() => {
    if (isFocus) {
      refresh();
    }
  }, [currentType, isFocus]);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IHistoryDay>) => {
      return <HistoryItem dataPage={item} currentType={currentType} />;
    },
    [currentType],
  );

  return (
    <View style={styles.container}>
      <KitchenLinks />
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
              data={data}
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

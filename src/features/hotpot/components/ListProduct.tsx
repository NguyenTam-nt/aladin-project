import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React, {memo, useCallback, useEffect} from 'react';
import {ProductItem} from './ProductItem';
import SpaceBottom from '../../../components/SpaceBottom';
import {getValueForDevice} from '../../../commons/formatMoney';
import {useHandleResponsePagination} from 'src/commons/useHandleResponsePagination';
import {IMenuItem, getProductByCategory} from 'src/api/products';
import {useKeyArray} from 'src/commons/useKeyArray';
import {useGetCartItem} from '../hook/useGetCartItem';
import {HeaderMobileHotpot} from './HeaderMobileHotpot';

type Props = {
  currentCategory: number
  handlePressCategory: (id: number) => void
};

export const ListProduct = memo(
  ({currentCategory, handlePressCategory}: Props) => {
    const getProduct = useCallback(
      (pageToken: number, numberOfPageSize: number) => {
        return getProductByCategory({
          page: pageToken,
          size: numberOfPageSize,
          id: currentCategory,
        });
      },
      [currentCategory],
    );

    const {data, refresh, pullToRefresh, handleLoadMore, isRefreshing} =
      useHandleResponsePagination<IMenuItem>(getProduct);

    const {isPushCategory} = useGetCartItem(currentCategory);

    useEffect(() => {
      refresh();
    }, [refresh]);
    const {keyExtractor} = useKeyArray();

    const renderItem = useCallback(
      ({item}: ListRenderItemInfo<IMenuItem>) => {
        return (
          <ProductItem
            isPushCategory={isPushCategory}
            data={{
              ...item,
              idCategory: currentCategory,
            }}
          />
        );
      },
      [currentCategory, isPushCategory],
    );

    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<SpaceBottom />}
        ListHeaderComponent={
          <HeaderMobileHotpot
            currentCategory={currentCategory}
            handlePressCategory={handlePressCategory}
          />
        }
        ListHeaderComponentStyle={styles.styleHeader}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={pullToRefresh}
            tintColor="#fff"
          />
        }
      />
    );
  },
);

const styles = StyleSheet.create({
  styleHeader: {
    marginBottom: getValueForDevice(0, 25),
  },
});

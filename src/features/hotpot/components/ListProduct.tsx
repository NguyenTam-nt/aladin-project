import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {memo, useCallback, useEffect} from 'react';
import {ProductItem} from './ProductItem';
import SpaceBottom from '../../../components/SpaceBottom';
import {defaultColors} from '@configs';
import {GroupHotpot} from './GroupHotpot';
import {TextCustom} from '@components';
import {MultipleScreenView} from '../../../components/MultipleScreenView';
import {getValueForDevice} from '../../../commons/formatMoney';
import {useHandleResponsePagination} from 'src/commons/useHandleResponsePagination';
import {IMenuItem, getProductByCategory} from 'src/api/products';
import {useKeyArray} from 'src/commons/useKeyArray';

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
      useHandleResponsePagination(getProduct);

    useEffect(() => {
      refresh();
    }, [refresh]);
    const {keyExtractor} = useKeyArray();

    const renderItem = useCallback(
      ({item}: ListRenderItemInfo<IMenuItem>) => {
        return (
          <ProductItem
            data={{
              ...item,
              idCategory: currentCategory,
            }}
          />
        );
      },
      [currentCategory],
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
          <MultipleScreenView
            phoneView={
              <>
                <GroupHotpot
                  currentCategory={currentCategory}
                  handlePressCategory={handlePressCategory}
                />
                <View style={{marginTop: 25}}>
                  <TextCustom
                    textAlign="center"
                    fontSize={14}
                    weight="700"
                    color={defaultColors.c_fff}
                    fontiCielBCCubanoNormal="iCielBCCubano-Normal">
                    Vui lòng chọn 1 vị nước Lẩu.
                  </TextCustom>
                </View>
              </>
            }
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

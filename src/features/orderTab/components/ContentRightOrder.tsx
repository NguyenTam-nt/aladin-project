import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderContentRight from './HeaderContentRight';
import TableRightContent from './TableRightContent';
import { TabBarOrder } from '../ContentOrderTab';
import { useKitChenProduct } from './hooks/useKitChenProduct';
import _ from 'lodash';
export enum State_ShortProduct {
  INVENTORY = 'INVENTORY',
  NO_INVENTORY = 'NO_INVENTORY',
  SHOW = 'SHOW',
  NO_SHOW = 'NO_SHOW',
}

export const dataItemFilter1 = [
  {label: 'Tất cả', value: ''},
  {
    label: 'Còn tồn kho',
    value: State_ShortProduct.INVENTORY,
  },
  {
    label: 'Không còn tồn kho',
    value: State_ShortProduct.NO_INVENTORY,
  },
  {
    label: 'Sản phẩm hiện',
    value: State_ShortProduct.SHOW,
  },
  {
    label: 'Sản phẩm ẩn',
    value: State_ShortProduct.NO_SHOW,
  },
];


export const dataItemFilterItem2 = [
  {
    label: 'Tên (A -> Z)',
    value: 'name,asc',
  },
  {
    label: 'Tên (Z -> A)',
    value: 'name,desc',
  },
  {
    label: 'Giá tăng dần',
    value: 'pricePromotion,asc',
  },
  {
    label: 'Giá giảm dần',
    value: 'pricePromotion,desc',
  },
];

export interface IValueFilter {
  label : string
  value : string
}

interface IContentRightOrder {
  typeLocation : string | undefined

}


const ContentRightOrder = (props :TabBarOrder & IContentRightOrder ) => {
  const {isOpenTab , setIsOpenTab ,typeLocation} = props;
  const [valueField1, setValueField1] = useState<IValueFilter>(dataItemFilter1[0]);
  const [valueField2, setValueField2] = useState<IValueFilter>(dataItemFilterItem2[0]);
  const [valueSearch, setValueSearch] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const {dataProducts, keyExtractor, onRefresh} = useKitChenProduct(
    props?.stateFilter?.id || props?.stateFilter?.idParent,
    typeLocation,
    valueField2.value,
    valueField1.value,
    query,
  );

  const debounce = useCallback(
    _.debounce((nextValue: string) => {
      setQuery(nextValue);
    }, 500),
    [],
  );

  const setDebouceSearch = (value: string) => {
    debounce(value);
    setValueSearch(valueSearch);
  };

  return (
    <View style={styles.container}>
      <HeaderContentRight
        isOpenTab={isOpenTab}
        setIsOpenTab={setIsOpenTab}
        stateFilter={props.stateFilter}
        valueField1={valueField1}
        valueField2={valueField2}
        setValueField1={setValueField1}
        setValueField2={setValueField2}
        dataItem={dataItemFilter1}
        dataItem2={dataItemFilterItem2}
        valueSearch={valueSearch}
        setValueSearch={setDebouceSearch}
      />
      <TableRightContent
        dataProducts={dataProducts.data}
        updateData={dataProducts.setData}
        keyExtractor={keyExtractor}
        onRefresh={onRefresh}
        onEndReached={dataProducts.handleLoadMore}
      />
    </View>
  );
};

export default ContentRightOrder;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 32,
    marginTop: 24,
    flex: 1,
  },
});

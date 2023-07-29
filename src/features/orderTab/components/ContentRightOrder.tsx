import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderContentRight from './HeaderContentRight';
import TableRightContent from './TableRightContent';
import { TabBarOrder } from '../ContentOrderTab';
import { useKitChenProduct } from './hooks/useKitChenProduct';
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
    value: State_ShortProduct.SHOW,
  },
];


export const dataItemFilterItem2 = [
  {
    label: 'Tên',
    value: 'name',
  },
  {
    label: 'Giá thành',
    value: 'pricePromotion',
  },
  {
    label: 'Số lượng',
    value: 'inventory',
  },
];

export interface IValueFilter {
  label : string
  value : string
}


const ContentRightOrder = (props :TabBarOrder ) => {
  const {isOpenTab , setIsOpenTab} = props;
  const [valueField1, setValueField1] = useState<IValueFilter>(dataItemFilter1[0]);
  const [valueField2, setValueField2] = useState<IValueFilter>(dataItemFilterItem2[0]);

  const {dataProducts, keyExtractor, onRefresh} = useKitChenProduct(
    props?.stateFilter?.id || props?.stateFilter?.idParent,
    '',
    valueField2.value,
    valueField1.value,
  );

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
      />
      <TableRightContent
        dataProducts={dataProducts.data}
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

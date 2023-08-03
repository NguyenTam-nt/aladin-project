import {defaultColors} from '@configs';
import React, { useMemo } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CompoundTable from '../CompoundAction/component/CompoundTable';
import { IProductInCart } from 'src/api/products';
import { ActionCartListChoose } from '../CartList';

interface IDataSelection {
  label: string
  value: any
}

export interface IDataSelectionCustom {
  label: string
  value: any
  children?: IDataSelection[]
  parentId?: number
}

const CancelOrderAction = ({
  dataItemCart,
  setActionChoose,
}: {
  dataItemCart: IProductInCart[]
  setActionChoose: React.Dispatch<React.SetStateAction<ActionCartListChoose>>
}) => {
  const dataListUpdate = useMemo<IProductInCart[]>(() => {
    return dataItemCart.filter(item => item.state === 'PROCESSING');
  }, [dataItemCart]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.itemLeft} />
        <Text style={styles.textRight}>Chọn món ăn bạn muốn hủy</Text>
      </View>
      <CompoundTable
        deleteAction
        dataItemCart={dataListUpdate}
        setActionChoose={setActionChoose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContent: {
    height: 40,
    backgroundColor: defaultColors._F8D5D5,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLeft: {
    height: 40,
    width: 4,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: defaultColors._EA222A,
  },
  textRight : {
    color: defaultColors._EA222A,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CancelOrderAction;

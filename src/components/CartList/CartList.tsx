import { defaultColors } from '@configs';
import { ICTagFloor } from '@icons';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { IProductInCart } from 'src/api/products';
import { ICCloseModal } from '../../assets/icons/ICCloseModal';
import { setShowActionCart } from '../../redux/infoDrawer/slice';
import ActionCartList from './ActionCartList';
import CancelOrderAction from './CancelOrderAction/CancelOrderAction';
import CompoundCartList from './CompoundAction/CompoundCartList';
import TableCartList from './TableCartList';

export enum ActionCartListChoose {
  sentToKitchen = 'sentToKitchen',
  addNewFood = 'addNewFood',
  cancelOrder = 'cancelOrder',
  compound = 'compound',
  empty = '',
}

const CartList = React.memo(
  ({
    hiddenViewList,
    dataItemCart,
  }: {
    hiddenViewList: () => void
    dataItemCart: IProductInCart[]
  }) => {
    const [actionChoose, setActionChoose] = useState<ActionCartListChoose>(
      ActionCartListChoose.empty,
    );
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setShowActionCart(actionChoose !== ActionCartListChoose.empty));
    }, [actionChoose]);
    const styleContainer = useMemo(() => {
      return [
        styles.container,
        {
          paddingBottom: actionChoose !== ActionCartListChoose.empty ? 0 : 24,
        },
      ];
    }, [actionChoose]);

    return (
      <View style={[styles.container, styleContainer]}>
        <View style={styles.containerHeader}>
          <View style={styles.contentHeader}>
            <ICTagFloor />
            <Text style={styles.textTitle}>Danh sách đã chọn</Text>
          </View>
          <TouchableOpacity style={styles.buttonClose} onPress={hiddenViewList}>
            <ICCloseModal />
          </TouchableOpacity>
        </View>
        <ContentViewCart
          dataItemCart={dataItemCart}
          actionChoose={actionChoose}
          setActionChoose={setActionChoose}
          hiddenViewList={hiddenViewList}
        />
      </View>
    );
  },
);

const ContentViewCart = React.memo(
  ({
    dataItemCart,
    actionChoose,
    setActionChoose,
    hiddenViewList,
  }: {
    dataItemCart: IProductInCart[]
    actionChoose: ActionCartListChoose
    setActionChoose: React.Dispatch<React.SetStateAction<ActionCartListChoose>>
    hiddenViewList: () => void
  }) => {
    switch (actionChoose) {
      case ActionCartListChoose.empty:
        return (
          <>
            <ActionCartList
              setActionChoose={setActionChoose}
              hiddenViewList={hiddenViewList}
            />
            <TableCartList itemInCart={dataItemCart} />
          </>
        );
      case ActionCartListChoose.compound:
        return (
          <CompoundCartList
            setActionChoose={setActionChoose}
            dataItemCart={dataItemCart}
          />
        );

      case ActionCartListChoose.cancelOrder:
        return (
          <CancelOrderAction
            dataItemCart={dataItemCart}
            setActionChoose={setActionChoose}
          />
        );
      default:
        return (
          <>
            <ActionCartList
              setActionChoose={setActionChoose}
              hiddenViewList={hiddenViewList}
            />
            <TableCartList itemInCart={dataItemCart} />
          </>
        );
    }
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flex: 1,
  },
  textTitle: {
    color: defaultColors.c_fff,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonClose: {
    padding: 16,
  },
});
export default CartList;

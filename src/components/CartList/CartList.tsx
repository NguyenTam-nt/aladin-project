import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {ICTagFloor} from '@icons';
import {defaultColors} from '@configs';
import {ICCloseModal} from '../../assets/icons/ICCloseModal';
import ActionCartList from './ActionCartList';
import TableCartList from './TableCartList';
import CompoundCartList from './CompoundAction/CompoundCartList';
import {useDispatch} from 'react-redux';
import {setShowActionCart, setShowDrawerFloor} from '../../redux/infoDrawer/slice';
import CancelOrderAction from './CancelOrderAction/CancelOrderAction';

export enum ActionCartListChoose {
  sentToKitchen = 'sentToKitchen',
  addNewFood = 'addNewFood',
  cancelOrder = 'cancelOrder',
  compound = 'compound',
  empty = '',
}

const CartList = React.memo(
  ({hiddenViewList}: {hiddenViewList: () => void}) => {
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
      <View style={[styles.container , styleContainer]}>
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
          actionChoose={actionChoose}
          setActionChoose={setActionChoose}
        />
      </View>
    );
  },
);

const ContentViewCart = React.memo(
  ({
    actionChoose,
    setActionChoose,
  }: {
    actionChoose: ActionCartListChoose
    setActionChoose: React.Dispatch<React.SetStateAction<ActionCartListChoose>>
  }) => {

    switch (actionChoose) {
      case ActionCartListChoose.empty:
        return (
          <>
            <ActionCartList setActionChoose={setActionChoose} />
            <TableCartList />
          </>
        );
      case ActionCartListChoose.compound:
        return <CompoundCartList />;

      case ActionCartListChoose.cancelOrder:
        return <CancelOrderAction />;
      default:
        return (
          <>
            <ActionCartList setActionChoose={setActionChoose} />
            <TableCartList />
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

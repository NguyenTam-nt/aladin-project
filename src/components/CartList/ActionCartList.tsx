import { ROLE_LIST, defaultColors, hotpotId2, hotpotId4, isTabletDevice } from '@configs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { postProductToKitchen } from 'src/api/products';
import { useIdBill, useListItemInCart } from 'src/redux/cartOrder/hooks';
import { removeCartList } from 'src/redux/cartOrder/slice';
import { ICAdd } from '../../assets/icons/ICAdd';
import { ICCompound } from '../../assets/icons/ICCompound';
import { ICDelete } from '../../assets/icons/ICDelete';
import { ICSentToKitchen } from '../../assets/icons/ICSentToKitchen';
import { ActionCartListChoose } from './CartList';
import { MessageUtils } from 'src/commons/messageUtils';
import { useUserInfo } from 'src/redux/reducers/hook';
import { IAuthorize } from 'src/redux/reducers/AuthSlice';

const ActionCartList = ({
  setActionChoose,
  hiddenViewList,
}: {
  setActionChoose: React.Dispatch<React.SetStateAction<ActionCartListChoose>>
  hiddenViewList : () => void
}) => {
  const listItemInCart = useListItemInCart();
  const billId = useIdBill();
  const dispatch = useDispatch();
  const userInfo = useUserInfo();

  const isOrder = userInfo?.authorities?.findIndex((item: IAuthorize) =>
    item.name === ROLE_LIST.order,
  );
  const postItemToKitChen = async () => {
    if (listItemInCart.length > 0) {
      let checkHotPot = 0;
      let numberHotpot = 0;

      const itemPost = listItemInCart.map(item => {
        if (item.idCategory) {
          switch (item.idCategory) {
            case hotpotId4:
              checkHotPot = 4;
              numberHotpot += item.quantity;
              break;
            case hotpotId2:
              checkHotPot = 2;
              numberHotpot += item.quantity;
              break;
            default:
              break;
          }
        }
        return {
          idProduct: item.id,
          numProduct: item.quantity,
          linkMedia: item.linkMedia,
          state: null,
          note: item?.note
        };
      });
      if (checkHotPot !== numberHotpot) {
        MessageUtils.showWarningMessage(
          `Vui lòng chọn ${checkHotPot} vị nước lẩu !`,
        );
        return;
      }
      const data = await postProductToKitchen(billId, itemPost);
      if (data.success) {
        dispatch(removeCartList());
        MessageUtils.showSuccessMessage('Thành công!');
      } else {
        MessageUtils.showErrorMessage(data?.message || '');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonSent} onPress={postItemToKitChen}>
        <ICSentToKitchen />
        <Text style={styles.textButton}>Chuyển tới bếp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonAddnew} onPress={hiddenViewList}>
        <ICAdd />
        <Text style={styles.textButton}>Gọi thêm</Text>
      </TouchableOpacity>
      {isOrder >= 0 ? (
        <>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => {
              setActionChoose(ActionCartListChoose.cancelOrder);
            }}>
            <ICDelete />
            <Text style={styles.textButton}>Hủy món</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCompound}
            onPress={() => {
              setActionChoose(ActionCartListChoose.compound);
            }}>
            <ICCompound />
            <Text style={styles.textButton}>Tách / Ghép</Text>
          </TouchableOpacity>
        </>
      ) : (
        isTabletDevice ? (
          <>
            <View
              style={[styles.buttonCancel, {backgroundColor: 'tranparents'}]}
            />
            <View
              style={[styles.buttonCancel, {backgroundColor: 'tranparents'}]}
            />
          </>
        ) : <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
    flexWrap: 'wrap',
  },
  buttonSent: {
    height: 40,
    backgroundColor: defaultColors._EA222A,
    width: isTabletDevice ? '24%' : '48%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonAddnew: {
    height: 40,
    backgroundColor: defaultColors._01A63E,
    width: isTabletDevice ? '24%' : '48%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonCancel: {
    height: 40,
    backgroundColor: defaultColors._33343B,
    width: isTabletDevice ? '24%' : '48%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonCompound: {
    height: 40,
    backgroundColor: defaultColors._0073E5,
    width: isTabletDevice ? '24%' : '48%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  textButton: {
    fontSize: 14,
    fontWeight: '600',
    color: defaultColors.c_fff,
    marginLeft: 10,
  },
});

export default ActionCartList;

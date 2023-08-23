import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import React, { useState } from 'react';
import {defaultColors, isTabletDevice} from '@configs';

import {ICAddOrder} from '../../assets/icons/ICAddOrder';
import {StatusOrderItem} from './TableCartList';
import { Thumb } from '../Thumb/Thumb';
import { IITemCart, addItemToCart } from 'src/redux/cartOrder/slice';
import { formatNumberDotSlice } from 'src/commons/formatMoney';
import { IProductInCart } from 'src/api/products';
import { getLinkImageUrl } from 'src/commons';
import { useModal } from 'src/hooks/useModal';
import ModalCustom from '../ModalCustom';
import { ICCloseModal } from 'src/assets/icons/ICCloseModal';
import ButtonAction from '../ButtonAction/ButtonAction';
import { DIMENSION } from '@constants';
import { useDispatch } from 'react-redux';

const ItemCardMobile = ({checkstatus , data } : {checkstatus: string  | null; data : IITemCart & IProductInCart}) => {
  const modalEditInventory = useModal();
  const dispatch = useDispatch();
  const [newNote, setNewNote] = useState<string>('');
  const updateItem = () => {
    dispatch(addItemToCart({...data , note :newNote  }));
    modalEditInventory.handleHidden();
  };

  const openModal = () => {
    if (data.quantity) {
      modalEditInventory.handleShow();
    }
  };
  return (
    <View>
      <Text style={styles.textHeader}>Sản phẩm</Text>
      <View style={styles.content}>
        <Thumb
          source={{
            uri: getLinkImageUrl(data.linkMedia, 70, 70),
          }}
          style={styles.image}
        />
        <View style={styles.rightContent}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {data.name}
          </Text>
          <Text style={styles.textPrice}>
            {formatNumberDotSlice(data.price)}
          </Text>
          <TouchableOpacity onPress={openModal} style={styles.viewNotiContent}>
            <ICAddOrder />
            <Text style={styles.textNoti}>
              {data.note ? data.note : 'Đặt cho tôi đơn hàng này'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewInfo}>
        <View>
          <Text style={styles.textTitleInfo}>Số lượng</Text>
          <Text style={styles.textTitle}>
            {data.numProduct || data.quantity}
          </Text>
        </View>
        <View style={styles.rightInfo}>
          <Text style={styles.textTitleInfo}>Thành tiền</Text>
          <Text style={styles.textPrice}>
            {formatNumberDotSlice(
              data.price * (data.quantity || data.numProduct),
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.textStatus}>Trạng thái/Chức năng</Text>
      <View style={styles.viewStatus}>
        <StatusOrderItem checkstatus={checkstatus} id={data.id} />
      </View>
      <View style={styles.devide} />
      <ModalCustom
        onBackdropPress={modalEditInventory.handleHidden}
        ref={modalEditInventory.refModal}>
        <View style={styles.modalEdit}>
          <View style={styles.contentHeaderModal}>
            <Text style={styles.textHeaderModal}>Tạo ghi chú</Text>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={modalEditInventory.handleHidden}>
              <ICCloseModal color={defaultColors.c_0000} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 32}}>
            <Text style={styles.textNumber}>Nội dung ghi chú</Text>
            <TextInput
              style={styles.textInputEdit}
              placeholder={'Nhập nội dung ghi chú'}
              value={newNote}
              maxLength={100}
              onChangeText={(value: any) => {
                setNewNote(value);
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <ButtonAction
              onPressCancel={modalEditInventory.handleHidden}
              onPressDone={updateItem}
            />
          </View>
        </View>
      </ModalCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    color: defaultColors.c_fff,
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
    marginTop: 8,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 8,
  },
  rightContent: {
    marginLeft: 16,
    justifyContent: 'space-between',
    flex : 1,
  },
  textTitle: {
    color: defaultColors.c_fff,
    fontSize: 14,
  },
  textPrice: {
    color: defaultColors.c_fff,
    fontSize: 14,
    fontWeight: '600',
  },

  viewNotiContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNoti: {
    color: defaultColors.c_fff,
    fontSize: 12,
    marginLeft: 4,
  },
  viewInfo: {
    flexDirection: 'row',
    marginTop: 16,
  },
  rightInfo: {
    marginLeft: 24,
  },
  textTitleInfo: {
    fontSize: 14,
    color: defaultColors.c_fff,
    fontWeight: '600',
    marginBottom: 8,
  },
  textStatus: {
    fontSize: 14,
    color: defaultColors.c_fff,
    marginTop: 16,
  },
  viewStatus: {
    marginTop: 8,
  },
  devide: {
    height: 1,
    width: '100%',
    backgroundColor: defaultColors._404040,
    marginVertical: 16,
  },
  modalEdit: {
    height: 270,
    width: isTabletDevice ? 500 : DIMENSION.width,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 10,
    padding: 24,
  },
  textHeaderModal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: defaultColors.c_222124,
  },
  textNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: defaultColors.c_222124,
  },
  contentHeaderModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInputEdit: {
    width: ' 80%',
    height: 40,
    borderWidth: 1,
    marginTop: 12,
    borderRadius: 8,
    borderColor: defaultColors.bg_EFEFEF,
    padding: 10,
  },

});

export default ItemCardMobile;

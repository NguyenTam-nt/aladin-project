import { defaultColors, isTabletDevice } from '@configs';
import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ICDeleteProduct } from 'src/assets/icons/ICDeleteProduct';
import { formatNumberDotSlice } from 'src/commons/formatMoney';
import { useListItemInCart } from 'src/redux/cartOrder/hooks';
import { IITemCart, addItemToCart, removeItemById, setItemProductInCart } from 'src/redux/cartOrder/slice';
import { ICAddOrder } from '../../assets/icons/ICAddOrder';
import { Thumb } from '../Thumb/Thumb';
import ItemCardMobile from './ItemCardMobile';
import { getLinkImageUrl } from 'src/commons';
import { IProductInCart } from 'src/api/products';
import { useDispatch } from 'react-redux';
import { useModal } from 'src/hooks/useModal';
import ModalCustom from '../ModalCustom';
import { ICCloseModal } from 'src/assets/icons/ICCloseModal';
import ButtonAction from '../ButtonAction/ButtonAction';
import { DIMENSION } from '@constants';

export  enum ProductState {
  COMPLETE ='COMPLETE', CANCEL ='CANCEL', PROCESSING ='PROCESSING', PROCESSING_CANCEL='PROCESSING_CANCEL'
}

export const StatusOrderItem = React.memo(({checkstatus , id } : {checkstatus: string | null ; id : number}) => {
  const dispatch = useDispatch();
  const {
    colorBackground,
    textStatus,
    circleColor,
  }: {colorBackground: string; textStatus: string; circleColor: string} =
    (() => {

      switch (checkstatus) {
        case ProductState.COMPLETE:
          return {
            colorBackground: defaultColors._BAE5C8,
            textStatus: 'Hoàn thành',
            circleColor: defaultColors._01A63E,
          };
        case ProductState.CANCEL:
          return {
            colorBackground: defaultColors._241_171_171_100,
            textStatus: 'Đã huỷ',
            circleColor: defaultColors._E73F3F,
          };
        case  ProductState.PROCESSING:
          return {
            colorBackground: defaultColors._99C7F5,
            textStatus: 'Chờ chế biến',
            circleColor: defaultColors._0073E5,
          };
        case ProductState.PROCESSING_CANCEL :
          return {
            colorBackground: defaultColors._FFDB9E,
            textStatus: 'Chờ huỷ',
            circleColor: defaultColors._F4A118,
          };

        default:
          return {
            colorBackground: defaultColors._99C7F5,
            textStatus: 'Chờ chế biến',
            circleColor: defaultColors._0073E5,
          };
      }
    })();

    const removeItem = useCallback(() => {
      dispatch(removeItemById(id));
    }, [id]);
  return checkstatus ? (
    <View
      style={{
        width: 118,
        height: 32,
        backgroundColor: colorBackground,
        borderRadius: 16,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View
        style={{
          height: 12,
          width: 12,
          backgroundColor: circleColor,
          borderRadius: 6,
          marginLeft: 8,
        }}
      />
      <Text
        style={{
          color: defaultColors.c_222124,
          marginLeft: 8,
          fontSize: 14,
          lineHeight: 22,
        }}>
        {textStatus}
      </Text>
    </View>
  ) : (
    <TouchableOpacity
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={removeItem}>
      <ICDeleteProduct />
    </TouchableOpacity>
  );});

const TableCartItem = ( {checkstatus , data } : {checkstatus: string | null ; data : IITemCart & IProductInCart}) => {
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
      <View style={styles.itemContainer} />
      <View style={styles.tableItemContainer}>
        <View style={styles.col1}>
          <Text style={styles.textTable}>1</Text>
        </View>
        <View style={styles.itemCol2}>
          <View>
            <Thumb
              source={{
                uri: getLinkImageUrl(data.linkMedia, 70, 70),
              }}
              style={styles.imageItem}
            />
          </View>
          <View style={styles.textItemCol2}>
            <Text style={styles.textNameItem}>{data.name}</Text>
            <Text style={styles.textPriceItem}>
              {formatNumberDotSlice(data.price)}
            </Text>
            <TouchableOpacity
              onPress={openModal}
              style={styles.textAddOrderItem}>
              <ICAddOrder />
              <Text style={styles.textNotiITem}>
                {data.note && data.note !== 'null' ? data.note : 'Đặt cho tôi đơn hàng này'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.col3}>
          <Text style={styles.textTable}>
            {data.quantity || data.numProduct}
          </Text>
        </View>
        <View style={styles.col4}>
          <Text style={styles.textTable}>
            {formatNumberDotSlice(
              (data.quantity || data.numProduct) * data.pricePromotion,
            )}
          </Text>
        </View>
        <View style={styles.col5}>
          <StatusOrderItem checkstatus={checkstatus} id={data.id} />
        </View>
      </View>
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
              maxLength={100}
              value={newNote}
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

const TableCartList = ({itemInCart = []}: {itemInCart: IProductInCart[]}) => {
  const data = useListItemInCart();
  const renderItem = (item: ListRenderItemInfo<IITemCart & IProductInCart>) => {
    return isTabletDevice ? (
      <TableCartItem checkstatus={item.item.state} data={item.item} />
    ) : (
      <ItemCardMobile checkstatus={item.item.state} data={item.item} />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={itemInCart.concat(data)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          isTabletDevice ? (
            <View style={styles.content}>
              <View style={styles.col1}>
                <Text style={styles.textTable}>STT</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.textTable}>Sản phẩm</Text>
              </View>
              <View style={styles.col3}>
                <Text style={styles.textTable}>Số lượng</Text>
              </View>
              <View style={styles.col4}>
                <Text style={styles.textTable}>Thành tiền</Text>
              </View>
              <View style={styles.col5}>
                <Text style={styles.textTable}>Trạng thái/Chức năng</Text>
              </View>
            </View>
          ) : (
            <></>
          )
        }
        renderItem={renderItem}
        ListFooterComponent={
          <View style={{height: isTabletDevice ? 120 : 155}} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textTable: {
    fontSize: 14,
    fontWeight: '600',
    color: defaultColors.c_fff,
  },
  container: {
    marginRight: 16,
    marginTop: 32,


  },
  content: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  col1: {
    width: 73,
  },
  col2: {
    width: 318,
  },
  col3: {
    width: 104,
  },
  col4: {
    width: 118,
  },
  col5: {
    flex: 1,

    flexWrap: 'wrap-reverse',
  },
  itemContainer: {
    height: 1,
    width: '100%',
    backgroundColor: defaultColors._404040,
  },
  tableItemContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
  },
  itemCol2: {
    width: 318,
    flexDirection: 'row',
  },
  imageItem: {
    height: 70,
    width: 70,
    borderRadius: 8,
  },
  textItemCol2: {
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  textAddOrderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNameItem: {
    color: defaultColors.c_fff,
    fontSize: 14,
  },
  textPriceItem: {
    color: defaultColors.c_fff,
    fontSize: 14,
    fontWeight: '600',
  },
  textNotiITem: {
    color: defaultColors.c_fff,
    fontSize: 12,
    marginLeft: 4,
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

export default TableCartList;

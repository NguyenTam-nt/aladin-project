import { defaultColors, isTabletDevice } from '@configs';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { IProductInCart, cancelProductItem } from 'src/api/products';
import { postCombineProduct, postDetechedProduct } from 'src/api/table';
import { getLinkImageUrl } from 'src/commons';
import { formatNumberDotSlice } from 'src/commons/formatMoney';
import { MessageUtils } from 'src/commons/messageUtils';
import { useIdBill } from 'src/redux/cartOrder/hooks';
import { setItemProductInCart } from 'src/redux/cartOrder/slice';
import { ICAddOrder } from '../../../../assets/icons/ICAddOrder';
import { ICCheck } from '../../../../assets/icons/ICCheck';
import { ICDelete } from '../../../../assets/icons/ICDelete';
import QuantityUpdate from '../../..//QuantityUpdate';
import { Thumb } from '../../../Thumb/Thumb';
import { ActionCartListChoose } from '../../CartList';
import ItemCardMobile from './ItemCardMobile';
import ModalCustom from 'src/components/ModalCustom';
import { ICCloseModal } from 'src/assets/icons/ICCloseModal';
import { useModal } from 'src/hooks/useModal';
import ButtonAction from 'src/components/ButtonAction/ButtonAction';
import { DIMENSION } from '@constants';

const TableCartItem = ({
  data,
  index,
  updateDataCancel,
  deleteAction,
}: {
  data: IProductInCart
  index: number
  updateDataCancel: (value: IProductInCart) => void
  deleteAction :   boolean |undefined
}) => {
  const modalEditInventory = useModal();
  const [newInventory, setNewInventory] = useState<string>('');
  const updateItem = async () => {};

  return (
    <View>
      <View style={styles.itemContainer} />
      <View style={styles.tableItemContainer}>
        <View style={styles.col1}>
          <Text style={styles.textTable}>{index + 1}</Text>
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
              {formatNumberDotSlice(data.numProduct * data.price)}
            </Text>
            <View style={styles.textAddOrderItem}>
              <ICAddOrder />
              <Text style={styles.textNotiITem}>Đặt cho tôi đơn hàng này</Text>
            </View>
          </View>
        </View>
        <View style={styles.col3}>
          <Text style={styles.textTable}>{data.numProduct}</Text>
        </View>
        <View style={styles.col5}>
          <QuantityUpdate
            value={deleteAction ? 0 : data.numProduct}
            max={data.numProduct}
            updateData={updateDataCancel}
            data={data}
          />
        </View>
      </View>

    </View>
  );
};

const CompoundTable = React.memo(
  ({
    deleteAction,
    dataItemCart,
    setActionChoose,
    tableId,
    typeActions = null,
  }: {
    deleteAction?: boolean
    dataItemCart: IProductInCart[]
    setActionChoose: React.Dispatch<React.SetStateAction<ActionCartListChoose>>
    tableId? : number
    typeActions?: 'combine' | 'detached' | null
  }) => {
    const dataProduct = useRef<IProductInCart[]>([]);
    const billId = useIdBill();
    const dispatch = useDispatch();
    const updateDataCancel = (value: IProductInCart) => {
      const id = value.id;
      const dataCheck = [...dataProduct.current];
      if (id) {
        const index = dataProduct.current.findIndex(item => item?.id === id);
        if (index >= 0) {
          if (value.numProduct > 0) {
            dataCheck[index] = value;
          } else {
             dataCheck.splice(index, 1);
          }
          dataProduct.current = dataCheck;
        } else {
          if (value.numProduct > 0) {
          dataCheck.push(value);
          dataProduct.current = dataCheck;
          }
        }
      }
    };
    const onUpdatePress = useCallback(async () => {
      if (  dataProduct.current.length > 0) {
      if (typeActions === null && deleteAction ) {

        const dataUpdate = await cancelProductItem(billId, dataProduct.current);
        if (dataUpdate.success) {
          dataProduct.current = [];
          MessageUtils.showSuccessMessage('Yêu cầu huỷ món thành công');
          dispatch(setItemProductInCart(dataUpdate.data?.list));
          setActionChoose(ActionCartListChoose.addNewFood);
        } else {
          MessageUtils.showErrorMessage('Yêu cầu huỷ món thất bại');
        }
      } else {
        if (tableId && billId) {
          if (typeActions === 'combine') {
            const dataUpdate = await postCombineProduct(
              billId,
              tableId,
              dataProduct.current,
            );
            if (dataUpdate.success) {
              MessageUtils.showSuccessMessage('Ghép bàn thành công');
              dataProduct.current = [];
              dispatch(setItemProductInCart(dataUpdate.data.list));
              setActionChoose(ActionCartListChoose.addNewFood);
            } else {
              MessageUtils.showErrorMessage('Ghép bàn thất bại');
            }
          } else {
            const dataUpdate = await postDetechedProduct(
              billId,
              tableId,
              dataProduct.current,
            );
            if (dataUpdate.success) {
              dataProduct.current = [];
              MessageUtils.showSuccessMessage('Tách bàn thành công');
              dispatch(setItemProductInCart(dataUpdate.data.list));
              setActionChoose(ActionCartListChoose.addNewFood);
            } else {
              MessageUtils.showErrorMessage('Tách bàn thất bại');
            }
          }
        } else {
          MessageUtils.showWarningMessage('Chọn bàn để thực hiện');
        }
      }
    }
    }, [billId, dataProduct.current, tableId, typeActions, deleteAction]);

    const renderItem = useCallback(
      (item: ListRenderItemInfo<IProductInCart>) => {
        return isTabletDevice ? (
          <TableCartItem
           deleteAction={deleteAction}
            data={item.item}
            index={item.index}
            updateDataCancel={updateDataCancel}
          />
        ) : (
          <ItemCardMobile data={item.item}   deleteAction={deleteAction}    updateDataCancel={updateDataCancel}/>
        );
      },
      [ updateDataCancel ,deleteAction],
    );

    return (
      <View style={styles.container}>
        <FlatList
          data={dataItemCart}
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
                <View style={styles.col5}>
                  <Text style={styles.textTable}>
                    Số lượng {deleteAction ? 'huỷ' : 'ghép'}
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )
          }
          renderItem={renderItem}
        />
        <View style={styles.buttonAction}>
          <TouchableOpacity
            style={styles.buttonConfirm}
            onPress={onUpdatePress}>
            <ICCheck />
            <Text style={styles.textConfirm}>Thực hiện</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => {
              setActionChoose(ActionCartListChoose.empty);
            }}>
            <ICDelete />
            <Text style={styles.textConfirm}>Huỷ bỏ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  buttonAction: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    marginLeft: 16,
    justifyContent : !isTabletDevice ? 'center' : undefined,
  },
  buttonConfirm: {
    height: 40,
    width: 130,
    backgroundColor: defaultColors._EA222A,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  textConfirm: {
    color: defaultColors.c_fff,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonCancel: {
    height: 40,
    width: 130,
    backgroundColor: defaultColors._33343B,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  textTable: {
    fontSize: 14,
    fontWeight: '600',
    color: defaultColors.c_fff,
  },
  container: {
    marginRight: 16,
    marginTop: 32,
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  col1: {
    width: 73,
  },
  col2: {
    width: 388,
  },
  col3: {
    width: 189,
    alignItems: 'center',
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
    width: 388,
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

});

export default CompoundTable;

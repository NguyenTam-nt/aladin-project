import { Thumb } from '@components';
import { defaultColors, isTabletDevice } from '@configs';
import { DIMENSION } from '@constants';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IItemProductKitchen, UpdateInventoryProduct, UpdateShowProduct } from 'src/api/products';
import { ICCloseModal } from 'src/assets/icons/ICCloseModal';
import { ICEdit } from 'src/assets/icons/ICEdit';
import { ICEye } from 'src/assets/icons/ICEye';
import { ICEyeOff } from 'src/assets/icons/ICEyeOff';
import { getLinkImageUrl } from 'src/commons';
import { formatNumberDotSlice } from 'src/commons/formatMoney';
import { MessageUtils } from 'src/commons/messageUtils';
import ButtonAction from 'src/components/ButtonAction/ButtonAction';
import ModalCustom from 'src/components/ModalCustom';
import { useModal } from 'src/hooks/useModal';

const TableCartItem = ({item , showModalEdit } : { item :IItemProductKitchen ;showModalEdit : (id : number) => void}) => {
  const [active, setActive] = useState<boolean>(item.show);

  const onPressShow = async () => {
    const update = await UpdateShowProduct(item.id);
    if (update.success) {
      setActive(value => !value);
      MessageUtils.showSuccessMessage('Thành công');
    } else {
      MessageUtils.showErrorMessage('Thất bái');
    }
  };
  useEffect(() => {
     setActive(item.show);
  } , [
    item.show,
  ]);
  return (
    <View>
      <View style={styles.itemContainer} />
      <View style={styles.tableItemContainer}>
        <View style={styles.col1}>
          <Thumb
            source={{
              uri: getLinkImageUrl(item.linkMedia, 66, 44),
            }}
            style={styles.imageItem}
          />
        </View>
        <View style={styles.col2}>
          <Text style={styles.textTable}>{item.id}</Text>
        </View>
        <View style={styles.col3}>
          <Text style={styles.textTable}>{item.name}</Text>
        </View>
        <View style={styles.col4}>
          <Text style={styles.textTable}>{item.ncategory}</Text>
        </View>
        <View style={styles.col5}>
          <Text style={styles.textTable}>{item.mcategory}</Text>
        </View>
        <View style={styles.col6}>
          <Text style={styles.textTable}>
            {formatNumberDotSlice(item.pricePromotion)}
          </Text>
        </View>
        <View style={styles.col7}>
          <Text style={styles.textTable}>{item.inventory}</Text>
        </View>
        <View style={styles.col8}>
          <View style={styles.containerAction}>
            <TouchableOpacity
              onPress={() => {
                showModalEdit(item.id);
              }}>
              <ICEdit />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressShow}>
              {active ? <ICEye /> : <ICEyeOff />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

interface ITableRightContent {
  dataProducts: IItemProductKitchen[]
  keyExtractor: (item: any, index: number) => string
  onRefresh: () => void
  onEndReached: (
    info?:
      | {
          distanceFromEnd: number
        }
      | undefined,
  ) => void
  updateData :React.Dispatch<React.SetStateAction<IItemProductKitchen[] | undefined>>
}

const TableRightContent = (props : ITableRightContent) => {
  const {dataProducts, keyExtractor, onRefresh, onEndReached ,updateData} = props;
  const modalEditInventory = useModal();
  const [newInventory, setNewInventory] = useState<string>('');
  const idEdit = useRef<number>();

  const showModalEdit = (id: number) => {
    idEdit.current = id;
    modalEditInventory.handleShow();
  };

  const updateItem = async () => {
    const update = await UpdateInventoryProduct(idEdit.current, newInventory);
    setNewInventory('');
    if (update.success) {
      modalEditInventory.handleHidden();
      MessageUtils.showSuccessMessageWithTimeout('Thành công');
      const newData = [...dataProducts];
      const findIndex = newData.findIndex(item => item.id === idEdit.current);
      if (findIndex >= 0) {
        newData[findIndex] = update.data;
        updateData([...newData]);
      }
    } else {
      modalEditInventory.handleHidden();
      MessageUtils.showErrorMessageWithTimeout('Thất bại');
    }
  };


  const renderItem = (item: ListRenderItemInfo<IItemProductKitchen>) => {
    return <TableCartItem item={item.item} showModalEdit={showModalEdit} />;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={isTabletDevice ? {flex: 1} : {minWidth: 934}}
        >
        <View style={{ flex : 1}}>
        <View style={styles.content}>
          <View style={styles.col1}>
            <Text style={styles.textTableHeader}>Hình ảnh</Text>
          </View>
          <View style={styles.col2}>
            <Text style={styles.textTableHeader}>Mã món ăn</Text>
          </View>
          <View style={styles.col3}>
            <Text style={styles.textTableHeader}>Tên món ăn</Text>
          </View>
          <View style={styles.col4}>
            <Text style={styles.textTableHeader}>Loại thực đơn</Text>
          </View>
          <View style={styles.col5}>
            <Text style={styles.textTableHeader}>Danh mục</Text>
          </View>
          <View style={styles.col6}>
            <Text style={styles.textTableHeader}>Giá bán</Text>
          </View>
          <View style={styles.col7}>
            <Text style={styles.textTableHeader}>Tồn kho</Text>
          </View>
          <View style={[styles.col8]}>
            <Text style={styles.textTableHeader}>Chức năng</Text>
          </View>
        </View>

        <FlatList
          data={dataProducts}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={onEndReached}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
        />
        </View>
      </ScrollView>
      <ModalCustom
        onBackdropPress={modalEditInventory.handleHidden}
        ref={modalEditInventory.refModal}>
        <View style={styles.modalEdit}>
          <View style={styles.contentHeaderModal}>
            <Text style={styles.textHeaderModal}>Cập nhật số lượng </Text>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={modalEditInventory.handleHidden}>
              <ICCloseModal color={defaultColors.c_0000} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 32}}>
            <Text style={styles.textNumber}>Số lượng tồn kho</Text>
            <TextInput
              style={styles.textInputEdit}
              placeholder={'Nhập số lượng'}
              value={newInventory.toString()}
              onFocus={() => {
                setNewInventory('');
              }}
              keyboardType="numeric"
              onChangeText={(value: any) => {
                if (value && !isNaN(value)) {
                  setNewInventory(+value);
                } else {
                  setNewInventory('');
                }
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <ButtonAction
              onPressCancel={modalEditInventory.handleHidden}
              onPressDone={() => {
                updateItem();
              }}
            />
          </View>
        </View>
      </ModalCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  textTable: {
    fontSize: 14,
    color: defaultColors.c_222124,
  },
  textTableHeader: {
    fontSize: 14,
    color: defaultColors.c_222124,
    fontWeight: '600',
  },
  container: {
    // marginRight: 16,
    marginTop: 32,
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  col1: {
    width: '10%',
  },
  col2: {
    width: '12%',
  },
  col3: {
    width: '20%',
  },
  col4: {
    width: '14%',
  },
  col5: {
    width: '17%',
  },
  col6: {
    width: '10%',
  },
  col7: {
    width: '9%',
  },
  col8: {
    width: '8%',
    flexWrap: 'wrap-reverse',
  },
  itemContainer: {
    height: 1,
    width: '100%',
    backgroundColor: defaultColors.bg_EFEFEF,
  },
  tableItemContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
  },
  imageItem: {
    height: 44,
    width: 66,
  },
  textAddOrderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNameItem: {
    color: defaultColors.c_222124,
    fontSize: 14,
  },
  textPriceItem: {
    color: defaultColors.c_222124,
    fontSize: 14,
    fontWeight: '600',
  },
  textNotiITem: {
    color: defaultColors.c_222124,
    fontSize: 12,
    marginLeft: 4,
  },
  containerAction: {
    flexDirection: 'row',
    gap: 8,
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

export default TableRightContent;

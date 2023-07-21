import {defaultColors, isTabletDevice} from '@configs';
import React, {useCallback} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ICAddOrder} from '../../../../assets/icons/ICAddOrder';
import {Thumb} from '../../../Thumb/Thumb';
import ItemCardMobile from './ItemCardMobile';
import QuantityUpdate from '../../..//QuantityUpdate';
import {ICCheck} from '../../../../assets/icons/ICCheck';
import {ICDelete} from '../../../../assets/icons/ICDelete';
import {useListItemInCart} from 'src/redux/cartOrder/hooks';
import {IITemCart} from 'src/redux/cartOrder/slice';
import {formatNumberDotSlice} from 'src/commons/formatMoney';

const TableCartItem = ({data}: {data: IITemCart}) => {

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
                uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
              }}
              style={styles.imageItem}
            />
          </View>
          <View style={styles.textItemCol2}>
            <Text style={styles.textNameItem}>
              Combo 2 Người lớn ăn thả g... ssssss
            </Text>
            <Text style={styles.textPriceItem}>
              {formatNumberDotSlice(data.quantity * 600000)}
            </Text>
            <View style={styles.textAddOrderItem}>
              <ICAddOrder />
              <Text style={styles.textNotiITem}>Đặt cho tôi đơn hàng này</Text>
            </View>
          </View>
        </View>
        <View style={styles.col3}>
          <Text style={styles.textTable}>{data.quantity}</Text>
        </View>
        <View style={styles.col5}>
          <QuantityUpdate value={data.quantity} max={data.quantity}/>
        </View>
      </View>
    </View>
  );
};

const CompoundTable = React.memo(({deleteAction}: {deleteAction: boolean}) => {
  const data = useListItemInCart();

  const renderItem = useCallback((item: ListRenderItemInfo<any>) => {
    return isTabletDevice ? (
      <TableCartItem data={item.item} />
    ) : (
      <ItemCardMobile checkstatus={item.item} />
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
        ListFooterComponent={
          <View style={styles.buttonAction}>
            <TouchableOpacity style={styles.buttonConfirm}>
              <ICCheck />
              <Text style={styles.textConfirm}>Thực hiện</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel}>
              <ICDelete />
              <Text style={styles.textConfirm}>Huỷ bỏ</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  buttonAction: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    marginLeft: 16,
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

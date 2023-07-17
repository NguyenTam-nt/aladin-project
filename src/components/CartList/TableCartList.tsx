import {defaultColors} from '@configs';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Thumb} from '../Thumb/Thumb';
import { ICAddOrder } from '../../assets/icons/ICAddOrder';

const TableCartItem = () => {
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
            <Text>Combo 2 Người lớn ăn thả g...</Text>
            <Text>600.000</Text>
            <View style={styles.textAddOrderItem}>
              <ICAddOrder />
              <Text>Đặt cho tôi đơn hàng này</Text>
            </View>
          </View>
        </View>
        <View style={styles.col3}>
          <Text style={styles.textTable}>1</Text>
        </View>
        <View style={styles.col4}>
          <Text style={styles.textTable}>Thành tiền</Text>
        </View>
        <View style={styles.col5}>
          <Text style={styles.textTable}>Trạng thái/Chức năng</Text>
        </View>
      </View>
    </View>
  );
};

const TableCartList = () => {
  return (
    <View style={styles.container}>
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
        <View
          style={styles.col5}>
          <Text style={styles.textTable}>Trạng thái/Chức năng</Text>
        </View>
      </View>
      <TableCartItem />
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
  col2 : {
    width : 318,
  },
  col3 : {
    width :104,
  },
  col4 : {
    width : 118,
  },
  col5 : {
    flex: 1,
    flexWrap: 'wrap-reverse',
  },
  itemContainer : {
    height: 1,
    width: '100%',
    backgroundColor: defaultColors._404040,
  },
  tableItemContainer : {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
  },
  itemCol2 : {
    width: 318, flexDirection: 'row',
  },
  imageItem : {
    height: 70, width: 70, borderRadius: 8,
  },
  textItemCol2 : {
    justifyContent: 'space-between', marginLeft: 16,
  },
  textAddOrderItem : {
    flexDirection: 'row', alignItems: 'center',
  },
});

export default TableCartList;

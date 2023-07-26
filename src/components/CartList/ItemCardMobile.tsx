import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {defaultColors} from '@configs';

import {ICAddOrder} from '../../assets/icons/ICAddOrder';
import {StatusOrderItem} from './TableCartList';
import { Thumb } from '../Thumb/Thumb';
import { IITemCart } from 'src/redux/cartOrder/slice';
import { formatNumberDotSlice } from 'src/commons/formatMoney';

const ItemCardMobile = ({checkstatus , data } : {checkstatus : string ; data : IITemCart}) => {
  return (
    <View>
      <Text style={styles.textHeader}>Sản phẩm</Text>
      <View style={styles.content}>
        <Thumb
          source={{
            uri: data.data.linkMedia,
          }}
          style={styles.image}
        />
        <View style={styles.rightContent}>
          <Text style={styles.textTitle} numberOfLines={1}>{data.data.name}</Text>
          <Text style={styles.textPrice}>{formatNumberDotSlice(data.data.price)}</Text>
          <View style={styles.viewNotiContent}>
            <ICAddOrder />
            <Text style={styles.textNoti}>Đặt cho tôi đơn hàng này</Text>
          </View>
        </View>
      </View>
      <View style={styles.viewInfo}>
        <View>
          <Text style={styles.textTitleInfo}>Số lượng</Text>
          <Text style={styles.textTitle}>{data.quantity}</Text>
        </View>
        <View style={styles.rightInfo}>
          <Text style={styles.textTitleInfo}>Thành tiền</Text>
          <Text style={styles.textPrice}>{formatNumberDotSlice(data.data.price * data.quantity)}</Text>
        </View>
      </View>
      <Text style={styles.textStatus}>Trạng thái/Chức năng</Text>
      <View style={styles.viewStatus}>
        <StatusOrderItem checkstatus={checkstatus} />
      </View>
      <View style={styles.devide} />
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
});

export default ItemCardMobile;

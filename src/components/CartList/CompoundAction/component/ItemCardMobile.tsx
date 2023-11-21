import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {defaultColors} from '@configs';

import {ICAddOrder} from '../../../../assets/icons/ICAddOrder';

import {Thumb} from '../../../Thumb/Thumb';
import QuantityUpdate from 'src/components/QuantityUpdate';
import { IProductInCart } from 'src/api/products';
import { getLinkImageUrl } from 'src/commons';
import { formatNumberDot } from 'src/commons/formatMoney';

const ItemCardMobile = ({
  data,
  updateDataCancel,
  deleteAction,
}: {
  data: IProductInCart
  updateDataCancel: (value: IProductInCart) => void
  deleteAction?: boolean
}) => {
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
          <Text style={styles.textPrice}>{formatNumberDot(data.pricePromotion)}</Text>
          <View style={styles.viewNotiContent}>
            <ICAddOrder />
            <Text style={styles.textNoti}>{data.note && data.note !== 'null' || 'Đặt đơn hàng này cho tôi'}</Text>
          </View>
        </View>
      </View>
      <View style={styles.viewInfo}>
        <View>
          <Text style={styles.textTitleInfo}>Số lượng</Text>
          <Text style={styles.textTitle}>{data.numProduct}</Text>
        </View>
        <View style={styles.rightInfo}>
          <Text style={styles.textTitleInfo}>
            Số lượng {deleteAction ? 'huỷ' : 'ghép'}
          </Text>
          <View style={{width: 110}}>
            <QuantityUpdate
              max={data.numProduct}
              updateData={updateDataCancel}
              data={data}
              value={deleteAction ? 0 : data.numProduct}
            />
          </View>
        </View>
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
    flex: 1,
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

import { defaultColors, isTabletDevice } from '@configs';
import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { ICAddOrder } from '../../assets/icons/ICAddOrder';
import { Thumb } from '../Thumb/Thumb';
import ItemCardMobile from './ItemCardMobile';
import { useListItemInCart } from 'src/redux/cartOrder/hooks';
import { IITemCart } from 'src/redux/cartOrder/slice';
import { formatNumberDotSlice } from 'src/commons/formatMoney';
import { IMenuItem } from 'src/api/products';


export const StatusOrderItem = React.memo(({checkstatus} : {checkstatus : string}) => {
  const {
    colorBackground,
    textStatus,
    circleColor,
  }: {colorBackground: string; textStatus: string; circleColor: string} =
    (() => {
      switch (checkstatus) {
        case 'success':
          return {
            colorBackground: defaultColors._BAE5C8,
            textStatus: 'Hoàn thành',
            circleColor: defaultColors._01A63E,
          };
        case 'cancel':
          return {
            colorBackground: defaultColors._241_171_171_100,
            textStatus: 'Đã huỷ',
            circleColor: defaultColors._E73F3F,
          };
        case 'waitingSuccess':
          return {
            colorBackground: defaultColors._99C7F5,
            textStatus: 'Chờ chế biến',
            circleColor: defaultColors._0073E5,
          };
        case 'waitingCancel':
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

  return (
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
          marginLeft : 8,
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
  );});

const TableCartItem = ( {checkstatus , data } : {checkstatus : string ; data : IITemCart}) => {

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
                uri: data.data.linkMedia,
              }}
              style={styles.imageItem}
            />
          </View>
          <View style={styles.textItemCol2}>
            <Text style={styles.textNameItem}>{data.data.name}</Text>
            <Text style={styles.textPriceItem}>
              {formatNumberDotSlice(data.data.price)}
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
        <View style={styles.col4}>
          <Text style={styles.textTable}>
            {formatNumberDotSlice(data.quantity * data.data.price)}
          </Text>
        </View>
        <View style={styles.col5}>
          <StatusOrderItem checkstatus={checkstatus} />
        </View>
      </View>
    </View>
  );
};

const TableCartList = () => {
  const data = useListItemInCart();
  const renderItem = (item: ListRenderItemInfo<IITemCart>) => {
    return isTabletDevice ? (
      <TableCartItem checkstatus={item.item.data.name} data={item.item} />
    ) : (
      <ItemCardMobile checkstatus={item.item.data.name} data={item.item} />
    );
  };

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
});

export default TableCartList;

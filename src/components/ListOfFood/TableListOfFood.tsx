import { defaultColors, isTabletDevice } from '@configs';
import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { IProductInCart } from 'src/api/products';

const TableCartItem = ({item}: {item: IProductInCart}) => {
  const timeFormat = new Date(item.createdDate);
  return (
    <View>
      <View style={styles.itemContainer} />
      <View style={styles.tableItemContainer}>
        <View style={styles.col1}>
          <Text style={styles.textTable}>{item.name}</Text>
        </View>
        <View style={styles.itemCol2}>
          <Text style={styles.textNameItem}>
            {timeFormat.getHours() +
              ':' +
              (timeFormat.getMinutes().toString().length === 1 ? '0' : '') +
              timeFormat.getMinutes().toString()}
          </Text>
        </View>
        <View style={styles.col3}>
          <Text style={styles.textNameItem}>{item.guide}</Text>
        </View>
      </View>
    </View>
  );
};

const TableListOfFood = ({dataItemCart}: {dataItemCart: IProductInCart[]}) => {
  const renderItem = (item: ListRenderItemInfo<any>) => {
    return <TableCartItem item={item.item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataItemCart}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.content}>
            <View style={styles.col1}>
              <Text style={styles.textTable}>Tên món ăn</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.textTable}>Thời gian gọi món</Text>
            </View>
            <View style={styles.col3}>
              <Text style={styles.textTable}>Ghi chú</Text>
            </View>
          </View>
        }
        renderItem={renderItem}
        ListFooterComponent={
          <View style={{height: isTabletDevice ? 64 : 64}} />
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
    width: '33%',
  },
  col2: {
    width: '33%',
    alignItems: 'center',
  },
  col3: {
    flex: 1,
    flexWrap: 'wrap-reverse',
    alignItems: 'center',
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
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
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

export default TableListOfFood;

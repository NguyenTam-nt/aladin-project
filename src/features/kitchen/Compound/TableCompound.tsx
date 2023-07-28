import { defaultColors, isTabletDevice } from '@configs';
import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ICAddOrder } from 'src/assets/icons/ICAddOrder';
import DropDownView from 'src/components/DropDownView/DropDownView';

const TableCartItem = () => {

  return (
    <View>
      <View style={styles.itemContainer} />
      <View style={styles.tableItemContainer}>
        <View style={styles.col1}>
          <Text style={styles.textTable}>1</Text>
        </View>
        <View style={styles.itemCol2}>
          <Text style={styles.textTable}>Lẩu riêu cua</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 6,
              gap: 6,
            }}>
            <ICAddOrder color={defaultColors.bg_5F5F61} />
            <Text>Đặt đơn hàng này cho tôi</Text>
          </View>
        </View>
        <View style={styles.col3Item}>
          <Text style={styles.textTable}>1</Text>
        </View>
        <View style={styles.col5}>
          <Text style={styles.textTable}>
            Chuyển từ{' '}
            <Text style={styles.textHeaderTable}> H134 - Tầng 1/ Bàn 5 </Text>{' '}
            đến <Text style={styles.textHeaderTable}>H134 - Tầng 1/ Bàn 5</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const ItemDayList = () => {
  const data = [
    'success',
    'cancel',
    'waitingSuccess',
    'waitingCancel',
    'success',
    'success',
    'success',
    'cancel',
  ];
  return (
    <View>
      <DropDownView
        isOpen={false}
        itemView={
          <View>
            {data.map((e , index) => {
              return <TableCartItem  key={index} />;
            })}
          </View>
        }
        textHeader="Ngày 15/05/2023"
        headerButtonStyle={{
          backgroundColor: defaultColors.bg_FAFAFA,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 20,
          paddingHorizontal: 20,
        }}
        textStyle={{
          fontSize: 14,
          color: defaultColors.c_222124,
          fontWeight: 'bold',
        }}
      />
    </View>
  );
};

const TableCompound = React.memo(() => {
  const data = [
    'success',
    'cancel',
    'waitingSuccess',
    'waitingCancel',
    'success',
    'success',
    'success',
    'cancel',
    'waitingSuccess',
    'waitingCancel',
    'success',
    'success',
  ];
  const renderItem = (item: ListRenderItemInfo<any>) => {
    return <ItemDayList />;

  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={isTabletDevice ? {flex: 1} : {minWidth: 934}}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.content}>
              <View style={styles.col1}>
                <Text style={styles.textHeaderTable}>Thời gian</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.textHeaderTable}>Tên món</Text>
              </View>
              <View style={styles.col3}>
                <Text style={styles.textHeaderTable}>Số lượng chuyển</Text>
              </View>
              <View style={styles.col5}>
                <Text style={styles.textHeaderTable}>Trạng thái/Chức năng</Text>
              </View>
            </View>
          }
          renderItem={renderItem}
        />
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  textTable: {
    fontSize: 14,
    fontWeight: '400',
    color: defaultColors.c_222124,
  },
  textHeaderTable: {
    fontSize: 14,
    fontWeight: '600',
    color: defaultColors.c_222124,
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
    width: '20%',
  },
  col2: {
    flex: 1,
  },
  col3: {
    width: 122,
  },
  col3Item: {
    width: 122,
    alignItems: 'center',
  },
  col5: {
    flex: 1,
    flexWrap: 'wrap-reverse',
  },
  itemContainer: {
    height: 1,
    width: '100%',
    backgroundColor: defaultColors.bg_EFEFEF,
  },
  tableItemContainer: {
    flexDirection: 'row',
    paddingVertical: 28,
    alignItems: 'center',
  },
  itemCol2: {
    flex: 1,
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
});

export default TableCompound;

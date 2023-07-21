import {Thumb} from '@components';
import {defaultColors, isTabletDevice} from '@configs';
import {DIMENSION} from '@constants';
import React, {useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ICEdit} from 'src/assets/icons/ICEdit';
import {ICEye} from 'src/assets/icons/ICEye';
import {ICEyeOff} from 'src/assets/icons/ICEyeOff';

const TableCartItem = () => {
  const [active, setActive] = useState<boolean>(true);
  return (
    <View>
      <View style={styles.itemContainer} />
      <View style={styles.tableItemContainer}>
        <View style={styles.col1}>
          <Thumb
            source={{
              uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
            }}
            style={styles.imageItem}
          />
        </View>
        <View style={styles.col2}>
          <Text style={styles.textTable}>ABCD</Text>
        </View>
        <View style={styles.col3}>
          <Text style={styles.textTable}>Lẩu tứ xuyên</Text>
        </View>
        <View style={styles.col4}>
          <Text style={styles.textTable}>600.000</Text>
        </View>
        <View style={styles.col5}>
          <Text style={styles.textTable}>600.000</Text>
        </View>
        <View style={styles.col6}>
          <Text style={styles.textTable}>600.000</Text>
        </View>
        <View style={styles.col7}>
          <Text style={styles.textTable}>600.000</Text>
        </View>
        <View style={styles.col8}>
          <View style={styles.containerAction}>
            <TouchableOpacity>
              <ICEdit />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActive(value => !value);
              }}>
              {active ? <ICEye /> : <ICEyeOff />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const TableRightContent = () => {
  const data = [
    'success',
    'cancel',
    'waitingSuccess',
    'waitingCancel',
    'success',
    'success',
    'success',
    'success',
    'success',
    'success',
    'success',
    'success',
  ];
  const renderItem = (item: ListRenderItemInfo<any>) => {
    return <TableCartItem />;
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
          }
          renderItem={renderItem}
        />
      </ScrollView>
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
    marginRight: 16,
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
});

export default TableRightContent;

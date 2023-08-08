import {defaultColors} from '@configs';
import {ICArrowRight, ICTagFloor} from '@icons';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import {IFloorInfo, ITable, getTableID} from 'src/api/table';
import { setIdBill } from 'src/redux/cartOrder/slice';

export enum DinnerTableState {
  EMPTY = 'EMPTY',
  BOOK = 'BOOK',
  EATING = 'EATING',
}

const TableItem = ({item}: {item: ITable}) => {
  const isTablet = DeviceInfo.isTablet();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {bgColor, textColor}: {bgColor: string; textColor: string} = (() => {
    switch (item.state) {
      case DinnerTableState.EMPTY:
        return {bgColor: defaultColors.c_fff, textColor: defaultColors.c_0000};
      case DinnerTableState.BOOK:
        return {bgColor: defaultColors._01A63E, textColor: defaultColors.c_fff};
      case DinnerTableState.EATING:
        return {bgColor: defaultColors._0073E5, textColor: defaultColors.c_fff};
      default:
        return {bgColor: defaultColors.c_fff, textColor: defaultColors.c_0000};
    }
  })();

  const stylesTablet: StyleProp<ViewStyle> = [
    styles.tableItem,
    {width: isTablet ? 180 : '45%', margin: isTablet ? 16 : 8 , backgroundColor : bgColor},
  ];

  const onPress = async (id: number) => {
    const getId = await getTableID(id);

    if (getId.success) {
      //@ts-ignore
      navigation.navigate('orderTab', {screen: 'hotpot'});
      dispatch(setIdBill(getId.data));
    }
  };

  return (
    <TouchableOpacity
      style={stylesTablet}
      onPress={() => {
        onPress(item.id);
      }}>
      <View style={styles.contentTableItem}>
        <ICArrowRight color={textColor} />
        <Text style={[styles.textTable, {color: textColor}]}>{item.name}</Text>
        <Text style={[styles.textMax, {color: textColor}]}>
          Tối đa {item.nseat} người
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const TableOrder = ({item}: {item: IFloorInfo}) => {

  return (
    <View>
      <View style={styles.contentTextFloor}>
        <ICTagFloor />
        <Text style={styles.textFloor}> Phòng/bàn - {item.nameArea}</Text>
      </View>
      <View style={styles.contentTextFloor}>
        {item?.tables?.map((item: ITable, index: number) => {
          return <TableItem key={index} item={item} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentTextFloor: {
    flexDirection: 'row',
    marginTop: 32,
    flexWrap: 'wrap',
  },
  textFloor: {
    fontSize: 18,
    color: defaultColors.c_fff,
    fontWeight: 'bold',
    marginLeft: 8,
    lineHeight: 28,
  },
  tableItem: {
    height: 108,
    width: 180,
    margin: 16,
    backgroundColor: defaultColors._01A63E,
    borderRadius: 16,
  },
  contentTableItem: {
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    padding: 16,
  },
  textTable: {
    fontSize: 14,
    fontWeight: '600',
    color: defaultColors.c_fff,
  },
  textMax: {
    fontSize: 12,
    color: defaultColors.c_fff,
  },
});

export default TableOrder;

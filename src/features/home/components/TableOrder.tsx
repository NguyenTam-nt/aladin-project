import { defaultColors } from '@configs';
import { ICArrowRight, ICTagFloor } from '@icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import DeviceInfo from 'react-native-device-info';



const TableItem = () => {
  const isTablet = DeviceInfo.isTablet();
  const navigation = useNavigation();
  const stylesTablet: StyleProp<ViewStyle> = [
    styles.tableItem,
    {width: isTablet ? 180 : '45%', margin: isTablet ? 16 : 8},
  ];
  return (
    <TouchableOpacity style={stylesTablet} onPress={() => { navigation.navigate('orderTab' , { screen : 'hotpot'});}}>
      <View style={styles.contentTableItem}>
        <ICArrowRight />
        <Text style={styles.textTable}>Bàn 1</Text>
        <Text style={styles.textMax}>Tối đa 4 người</Text>
      </View>
    </TouchableOpacity>
  );
};


const TableOrder = (item: any) => {
  return (
    <View>
      <View style={styles.contentTextFloor}>
        <ICTagFloor />
        <Text style={styles.textFloor}> Phòng/bàn - Tầng {item.item.index}</Text>
      </View>
      <View style={styles.contentTextFloor}>
        {item.item.table.map((item: any , index : number) => {
          return <TableItem key={index} />;
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

import { defaultColors } from '@configs';
import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import TableOrder from './components/TableOrder';

const data = [
  {table: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], index: 1},
  {table: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], index: 2},
];

const HomeScreen = () => {
  const marginTablet = DeviceInfo.isTablet() ? 32  : '2.5%';
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={[styles.flatlistContent , { marginHorizontal : marginTablet}]}
        renderItem={(item: ListRenderItemInfo<any>) => {
          return <TableOrder item={item.item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistContent: {
    marginHorizontal: 32,
  },
  container: {
    backgroundColor: defaultColors.bg_primary,
    flex: 1,
  },
});

export default HomeScreen;

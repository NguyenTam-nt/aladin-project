import { defaultColors } from '@configs';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { IFloorInfo, getTable } from 'src/api/table';
import { useAreaId, useFloorActive } from 'src/redux/infoDrawer/hooks';
import TableOrder from './components/TableOrder';



const HomeScreen = () => {
  const [dataTable, setDataTable] = useState<IFloorInfo[]>([]);
  const floorClone = useRef<IFloorInfo[]>([]);
  const floorActive = useFloorActive();

  const areaId = useAreaId();
  const getDataTable = async () => {
    if (areaId) {
      const tableData = await getTable(areaId);
      if (tableData.success && tableData.data) {
        setDataTable(tableData.data);
        floorClone.current = tableData.data;
      }
    }
  };

  useEffect(() => {
    if (floorActive) {
      const index = floorClone.current.findIndex(
        item => item.nameArea === floorActive,
      );
      if (index >= 0) {
        setDataTable([floorClone.current[index]]);
      } else {
        setDataTable(floorClone.current);
      }
    }
  }, [floorActive]);

  useEffect(() => {
    getDataTable();
  }, [areaId]);

  const marginTablet = DeviceInfo.isTablet() ? 32 : '2.5%';
  return (
    <View style={styles.container}>
      <FlatList
        data={dataTable}
        contentContainerStyle={[
          styles.flatlistContent,
          {marginHorizontal: marginTablet},
        ]}
        renderItem={(item: ListRenderItemInfo<IFloorInfo>) => {
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

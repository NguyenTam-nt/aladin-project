import {defaultColors} from '@configs';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import {IFloorInfo, getTable} from 'src/api/table';
import {useConnectSocketJS} from 'src/hooks/useConnectSockJS';
import {useAreaId, useFloorActive} from 'src/redux/infoDrawer/hooks';
import {setGetTable} from 'src/redux/reducers/AuthSlice';
import {useIsGetTable} from 'src/redux/reducers/hook';
import TableOrder, {DinnerTableState} from './components/TableOrder';

export type RootStackHomeAll = {
  [key: string]: {tableId: number}
};
const HomeScreen = ({stateCheckbox}: {stateCheckbox: string[]}) => {
  const [dataTable, setDataTable] = useState<IFloorInfo[]>([]);
  const floorClone = useRef<IFloorInfo[]>([]);
  const floorActive = useFloorActive();
  const areaId = useAreaId();
  const idTable = useIsGetTable();
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const {dataSocket, setDataSocket} = useConnectSocketJS<any>(
    areaId ? `/topic/table/${areaId}` : '',
  );
  const getDataTable = async () => {
    if (areaId) {
      const tableData = await getTable(areaId, stateCheckbox);
      if (tableData.success && tableData.data) {
        if (floorActive) {
          const index = tableData.data.findIndex(
            item => item.nameArea === floorActive,
          );
          if (index >= 0) {
            setDataTable([tableData.data[index]]);
            floorClone.current = tableData.data;
          } else {
            setDataTable(tableData.data);
            floorClone.current = tableData.data;
          }
        } else {
          setDataTable(tableData.data);
          floorClone.current = tableData.data;
        }
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
    if (isFocus) {
      getDataTable();
    }
  }, [areaId, stateCheckbox, isFocus]);
  useEffect(() => {
    if (dataSocket) {
      const data = dataSocket;
      let areaIndex = -1;
      let tableIndex = -1;
      floorClone.current.forEach((area, index) => {
        const foundTableIndex = area.tables.findIndex(
          table => table.id.toString() === data.id.toString(),
        );
        if (foundTableIndex !== -1) {
          areaIndex = index;
          tableIndex = foundTableIndex;
        }
      });
      if (areaIndex >= 0 && tableIndex >= 0) {
        const newTable = [...floorClone.current];
        newTable[areaIndex].tables[tableIndex] = {
          ...newTable[areaIndex].tables[tableIndex],
          state: data.state,
        };
        setDataTable([...newTable]);
      }
      setDataSocket(undefined);
    }
  }, [dataSocket]);

  useEffect(() => {
    floorClone.current.map((floor) => {
      floor.tables.some(table => {
        if (table.id === idTable && table.state === DinnerTableState.EMPTY) {
          dispatch(setGetTable(undefined));
        }
      });
    });
  }, [idTable, dataTable]);


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

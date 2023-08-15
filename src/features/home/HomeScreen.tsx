import { defaultColors } from '@configs';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { IFloorInfo, getTable } from 'src/api/table';
import { useAreaId, useFloorActive } from 'src/redux/infoDrawer/hooks';
import TableOrder, { DinnerTableState } from './components/TableOrder';
import SockJS from 'sockjs-client';
import { SOCK_CLIENNT_URL } from 'src/api/config';
import { useIsGetTable } from 'src/redux/reducers/hook';
import { useDispatch } from 'react-redux';
import { setGetTable } from 'src/redux/reducers/AuthSlice';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';

var Stomp = require('stompjs/lib/stomp.js').Stomp;
export type RootStackramHomeAll = {
  [key: string]: {tableId : number }
};
const HomeScreen = ({ stateCheckbox } : { stateCheckbox : string[]}) => {
  const route = useRoute<RouteProp<RootStackramHomeAll>>();
  const [dataTable, setDataTable] = useState<IFloorInfo[]>([]);
  const floorClone = useRef<IFloorInfo[]>([]);
  const floorActive = useFloorActive();
  const areaId = useAreaId();
  const idTable = useIsGetTable();
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const getDataTable = async () => {
    if (areaId) {
      const tableData = await getTable(areaId , stateCheckbox );
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
    if (isFocus){
    getDataTable();
    }
  }, [areaId, stateCheckbox , isFocus]);

  useEffect(() => {
    let stompClient1: any;
    if (areaId && isFocus) {
      const sockClient = new SockJS(SOCK_CLIENNT_URL);
      let stompClient = Stomp.over(sockClient);
      if (!stompClient.connected ) {
        stompClient.connect({}, function (frame: any) {
          setTimeout(() => {
            stompClient1 = stompClient.subscribe(
              `/topic/table/${areaId}`,
              function (messageOutput: any) {
                const data = JSON.parse(messageOutput.body);
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
              },
            );
          }, 500);
        });

      }
    }
    return () => {
      stompClient1?.unsubscribe();
    };
  }, [areaId ,isFocus]);

   useEffect(() => {
     floorClone.current.map((floor, index) => {
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

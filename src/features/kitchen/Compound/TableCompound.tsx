import { defaultColors, isTabletDevice } from '@configs';
import { IHistoryCompoumd } from '@typeRules';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getHistories } from 'src/api/history';
import { IResponseApi } from 'src/api/types';
import { ICAddOrder } from 'src/assets/icons/ICAddOrder';
import { useHandleResponsePagination } from 'src/commons/useHandleResponsePagination';
import DropDownView from 'src/components/DropDownView/DropDownView';
import { useGetCategotyType } from '../useGetCategotyType';
import { Html } from 'src/components/Html';

const TableCartItem = ({item} : {item : IHistoryCompoumd}) => {

  return (
    <View>
      <View style={styles.itemContainer} />
      <View style={styles.tableItemContainer}>
        <View style={styles.col1}>
          <Text style={styles.textTable}>{item.thour}</Text>
        </View>
        <View style={styles.itemCol2}>
          <Text style={styles.textTable}>{item.nameProduct}</Text>
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
          <Text style={styles.textTable}>{item.numProduct}</Text>
        </View>
        <View style={styles.col5}>
          <Text style={styles.textTable}>
            <Html content={item.reason} />
          </Text>
        </View>
      </View>
    </View>
  );
};

const ItemDayList = ({ data} : { data : {date: string; list: IHistoryCompoumd[]}}) => {

  return (
    <View>
      <DropDownView
        isOpen={false}
        itemView={
          <View>
            {data.list.map((e , index) => {
              return <TableCartItem  item={e}  key={index} />;
            })}
          </View>
        }
        textHeader={`Ngày ${new Date(data.date).toLocaleDateString()}`}
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
  const {currentType} = useGetCategotyType();
  const getHistoryMethod    = useCallback(
    async (page: number, size: number) :Promise<IResponseApi<IHistoryCompoumd>> => {
      return getHistories({
        page,
        size,
        menu: currentType,
        sort: 'createdDate,desc',
        state : false,
      }) as any;
    },
    [currentType],
  );
  const {data, isRefreshing, pullToRefresh, refresh, handleLoadMore} =
    useHandleResponsePagination<IHistoryCompoumd>(getHistoryMethod);
    const newData = useMemo(() => {
      const outputArray: {date: string; list: IHistoryCompoumd[]}[]  = [];
      const groupedMap: Map<string, IHistoryCompoumd[]> = new Map();

      for (const obj of data) {
        const key = new Date(obj.createdDate).toLocaleDateString();
        if (groupedMap.has(key)) {
          // @ts-ignore
          groupedMap.get(key).push(obj);
        } else {
          groupedMap.set(key, [obj]);
        }
      }

      groupedMap.forEach((value, key) => {
        outputArray.push({
          date: value.length ? value[0].createdDate : '',
          list: value,
        });
      });
      return outputArray;
    }, [data]);

  console.log('check check' ,newData);

  useEffect(() => {
    refresh();
  }, []);
  const renderItem = ({item}:ListRenderItemInfo< {date: string; list: IHistoryCompoumd[]}>) => {
    return <ItemDayList  data={item}/>;

  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={isTabletDevice ? {flex: 1} : {minWidth: 934}}>
        <View style={{ flex : 1}}>
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
              <Text style={styles.textHeaderTable}>Nội dung thông báo</Text>
            </View>
          </View>
          <FlatList
            data={newData}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        </View>
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

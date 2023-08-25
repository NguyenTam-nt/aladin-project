import { defaultColors, isTabletDevice } from '@configs';
import { useIsFocused } from '@react-navigation/native';
import { IHistoryCompoumd } from '@typeRules';
import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IHistoryDay, getHistories3, getHistoriesContent } from 'src/api/history';
import { IResponseApi } from 'src/api/types';
import { ICAddOrder } from 'src/assets/icons/ICAddOrder';
import { ICDoubleArrowDown } from 'src/assets/icons/ICDoubleArrowDown';
import { useHandleResponsePagination } from 'src/commons/useHandleResponsePagination';
import DropDownView from 'src/components/DropDownView/DropDownView';
import { Html } from 'src/components/Html';
import { useGetCategotyType } from '../useGetCategotyType';

const TableCartItem = ({item}: {item: IHistoryCompoumd}) => {
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
            <Text style={styles.textTable}>
              {item.note ? item.note : 'Đặt đơn hàng này cho tôi'}
            </Text>
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

const ItemDayList = ({
  dataPage,
  currentType,
}: {
  dataPage: IHistoryDay
  currentType: string
}) => {
  const IsFocus = useIsFocused();
  const getHistoryMethod = useCallback(
    async (
      page: number,
      size: number,
    ): Promise<IResponseApi<IHistoryCompoumd>> => {
      return getHistoriesContent({
        page,
        size,
        menu: currentType,
        status: false,
        day: dataPage.day,
      }) as any;
    },
    [currentType, dataPage],
  );
  const {data, isRefreshing, pullToRefresh, refresh, handleLoadMore} =
    useHandleResponsePagination<IHistoryCompoumd>(getHistoryMethod);

  useEffect(() => {
    if (IsFocus) {
      refresh();
    }
  }, [currentType, IsFocus]);

  return (
    <View>
      <DropDownView
        isOpen={false}
        itemView={
          <View>
            {data.map((e, index) => {
              return <TableCartItem item={e} key={index} />;
            })}
            <View style={styles.buttonShowMore}>
              <TouchableOpacity
                style={styles.buttonShowMoreItem}
                onPress={() => handleLoadMore()}>
                <Text style={styles.buttonShowMoreText}>Hiển thị thêm</Text>
                <ICDoubleArrowDown />
              </TouchableOpacity>
            </View>
          </View>
        }
        textHeader={`Ngày ${new Date(dataPage.day).toLocaleDateString()}`}
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
  const IsFocus = useIsFocused();
  const getHistoryMethod = useCallback(
    async (page: number, size: number) :Promise<IResponseApi<IHistoryDay>> => {
      return getHistories3({
        page,
        size,
        menu: currentType,
        status : false,
      }) as any;
    },
    [currentType],
  );
  const {data, isRefreshing, pullToRefresh, refresh, handleLoadMore} =
    useHandleResponsePagination<IHistoryDay>(getHistoryMethod);

  useEffect(() => {
    if (IsFocus) {
    refresh();
    }
  }, [currentType ,IsFocus]);

  const renderItem = ({
    item,
  }: ListRenderItemInfo<IHistoryDay>) => {
    return <ItemDayList dataPage={item} currentType={currentType} />;
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={isTabletDevice ? {flex: 1} : {minWidth: 934}}>
        <View style={{flex: 1}}>
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
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            onEndReached={handleLoadMore}
            keyExtractor={item => item.day}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={pullToRefresh}
                tintColor="#000"
              />
            }
            onEndReachedThreshold={0.5}
            ListFooterComponent={<View style={{height: 50}} />}
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
  buttonShowMore : {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop : 12,
  } ,
  buttonShowMoreItem : {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonShowMoreText : {
    color: defaultColors._EA222A,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TableCompound;

import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {defaultColors} from '@configs';
import {Notice} from './components/Notice';
import KitchenLinks from '../components/KitchenLinks';
import {BillItem} from './components/BillItem';
import ModalCustom from '../../../components/ModalCustom';
import {ModalConfirmCancel} from './components/ModalConfirmCancel';
import {HeaderListBill} from './components/HeaderListBill';
import {dataFilter, useWaitProcess} from './hooks/useWaitProcess';
import {getValueForDevice} from 'src/commons/formatMoney';
import {useKeyArray} from 'src/commons/useKeyArray';
import {ListRenderItemInfo} from '@typeRules';
import {IOrderKitchen, OrderType} from 'src/typeRules/product';
import DropDownFilter from 'src/components/Filter/DropDownFilter';
import {HeaderListBillFood} from './components/HeaderListBillFood';
import {BillItemFood} from './components/BillItemFood';
import NotificationSound from 'src/components/Toast/SoundNotification';

export const WaitProcees = React.memo(() => {
  const {
    modalConfirmCancel,
    modalRefuse,
    handleShowModalAction,
    data,
    pullToRefresh,
    isRefreshing,
    handleLoadMore,
    fileterItem,
    setFilterItem,
    isTable,
    handlePressCompelete,
    currentDataSelect,
    notices,
    handleDeleteNotice,
  } = useWaitProcess();
  const {keyExtractor} = useKeyArray();

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IOrderKitchen>) => {
      return isTable ? (
        <BillItem
          data={item}
          onShowModal={handleShowModalAction}
          onHideModal={modalConfirmCancel.handleHidden}
          onPress={handlePressCompelete}
        />
      ) : (
        <BillItemFood
          data={item}
          onShowModal={handleShowModalAction}
          onHideModal={modalConfirmCancel.handleHidden}
          onPress={handlePressCompelete}
        />
      );
    },
    [handleShowModalAction, isTable, handlePressCompelete],
  );




  return (
    <View style={styles.container}>
      {notices && notices?.length ? (
        <Notice onDelete={handleDeleteNotice} notices={notices} />
      ) : null}
      <KitchenLinks
        renderRight={
          <DropDownFilter
            dataItem={dataFilter}
            labelField="label"
            valueField="value"
            value={fileterItem}
            setValue={setFilterItem}
            placeholder="Lọc sản phẩm"
            isSort={true}
            styleDropdown={styles.w_220}
            leftPosition={false}
          />
        }
      />
      <View style={styles.styleViewItem}>
        {isTable ? <HeaderListBill /> : <HeaderListBillFood />}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={pullToRefresh}
              tintColor="#000"
            />
          }
        />
      </View>

      <ModalCustom
        isCenter={getValueForDevice(true, false)}
        onBackdropPress={modalConfirmCancel.handleHidden}
        ref={modalConfirmCancel.refModal}>
        <ModalConfirmCancel
          titleInput="Lý do hủy món"
          placeholder="Hủy món từ bếp"
          message={`Hủy món ${currentDataSelect?.name}?`}
          onPress={handlePressCompelete}
          data={currentDataSelect}
          onCancel={modalConfirmCancel.handleHidden}
          state={OrderType.cancel}
        />
      </ModalCustom>
      <ModalCustom
        isCenter={getValueForDevice(true, false)}
        onBackdropPress={modalRefuse.handleHidden}
        ref={modalRefuse.refModal}>
        <ModalConfirmCancel
          state={OrderType.process_cancel}
          onPress={handlePressCompelete}
          data={currentDataSelect}
          titleInput="Lý do từ chối"
          placeholder="Bếp từ chối hủy món"
          message="Từ chối hủy món"
          onCancel={modalRefuse.handleHidden}
        />
      </ModalCustom>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.c_fff,
    padding: getValueForDevice(32, 20),
  },
  styleTable: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
  },
  styleViewItem: {
    flex: 1,
  },
  styleModalView: {
    width: 720,
    height: 348,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 16,
    padding: 24,
  },
  styleModalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  styleGroupItemSort: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  styleBtnSort: {
    flexDirection: 'row',
    columnGap: 8,
    width: 'auto',
    height: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: defaultColors.bg_A1A0A3,
    borderRadius: 4,
  },
  w_220: {
    width: 220,
  },
});

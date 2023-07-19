import {View, StyleSheet, FlatList} from 'react-native';
import React, {useCallback} from 'react';
import {defaultColors} from '@configs';
import {Notice} from './components/Notice';
import KitchenLinks from '../components/KitchenLinks';
import {BillItem} from './components/BillItem';
import ModalCustom from '../../../components/ModalCustom';
import {ModalConfirmCancel} from './components/ModalConfirmCancel';
import {HeaderListBill} from './components/HeaderListBill';
import {useWaitProcess} from './hooks/useWaitProcess';

export const WaitProcees = React.memo(() => {
  const {modalConfirmCancel, modalRefuse, handleShowModalAction} =
    useWaitProcess();
  const renderItem = useCallback(() => {
    return (
      <BillItem
        onShowModal={handleShowModalAction}
        onHideModal={modalConfirmCancel.handleHidden}
      />
    );
  }, [handleShowModalAction]);

  return (

      <View style={styles.container}>
        <Notice />
        <KitchenLinks />
        <View style={styles.styleViewItem}>
          <HeaderListBill />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[1, 2, 3, 4, 5]}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>

      <ModalCustom
        onBackdropPress={modalConfirmCancel.handleHidden}
        ref={modalConfirmCancel.refModal}>
        <ModalConfirmCancel
          titleInput="Lý do hủy món"
          placeholder="Hủy món từ thu ngân"
          message="Hủy món [Tên món ăn]?"
          onCancel={modalConfirmCancel.handleHidden}
        />
      </ModalCustom>
      <ModalCustom
        onBackdropPress={modalRefuse.handleHidden}
        ref={modalRefuse.refModal}>
        <ModalConfirmCancel
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
    padding: 32,
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
});

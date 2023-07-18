import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useRef} from 'react';
import {defaultColors} from '@configs';
import {Notice} from './components/Notice';
import {TextCustom} from '@components';
import KitchenLinks from '../components/KitchenLinks';
import {BillItem} from './components/BillItem';
import ModalCustom, {ModalCustomMethod} from '../../../components/ModalCustom';
import {ICCloseModal} from '../../../assets/icons/ICCloseModal';

// const data = [
//   {
//     name: 'Tầng 1/bàn 6',
//     code: 'Mã hóa đơn 1253',
//     childs: [
//       {
//         date: '25/05/2023 - 10:25',
//         name: 'Lẩu riêu cua ',
//         quanlity: 4,
//         by: 'Order',
//       },
//       {
//         date: '25/04/2023 - 10:25',
//         name: 'Lẩu riêu cua ',
//         quanlity: 3,
//         by: 'Order',
//       },
//       {
//         date: '25/03/2023 - 10:25',
//         name: 'Lẩu riêu cua ',
//         quanlity: 2,
//         by: 'Order',
//       },
//     ],
//   },
// ];

export const WaitProcees = () => {
  const refModalConfirmDelete = useRef<ModalCustomMethod>(null);

  const handleShowModalConfirm = () => {
    refModalConfirmDelete.current?.show(false);
  };

  const handleHiddenModalConfirm = () => {
    refModalConfirmDelete.current?.hide();
  };

  return (
    <>
      <View style={styles.container}>
        <Notice />
        <KitchenLinks />
        <View style={styles.styleViewItem}>
          <View style={styles.styleTable}>
            <View style={styles.styleViewItem}>
              <TextCustom
                weight="600"
                fontSize={16}
                color={defaultColors.c_222124}>
                Thời gian
              </TextCustom>
            </View>
            <View style={styles.styleViewItem}>
              <TextCustom
                weight="600"
                fontSize={16}
                color={defaultColors.c_222124}>
                Tên món
              </TextCustom>
            </View>
            <View style={styles.styleViewItem}>
              <TextCustom
                weight="600"
                fontSize={16}
                color={defaultColors.c_222124}>
                Số lượng
              </TextCustom>
            </View>
            <View style={styles.styleViewItem}>
              <TextCustom
                weight="600"
                fontSize={16}
                color={defaultColors.c_222124}>
                Trạng thái
              </TextCustom>
            </View>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[1, 2, 3, 4, 5]}
            renderItem={() => {
              return (
                <BillItem
                  onShowModal={handleShowModalConfirm}
                  onHideModal={handleHiddenModalConfirm}
                />
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </View>
      <ModalCustom
        onBackdropPress={handleHiddenModalConfirm}
        ref={refModalConfirmDelete}>
        <View style={styles.styleModalView}>
          <View style={styles.styleModalHeader}>
            <View style={{flex: 1}}>
              <TextCustom
                fontSize={24}
                weight="700"
                color={defaultColors.c_222124}
                textAlign="center">
                Hủy món [Tên món ăn]?
              </TextCustom>
            </View>
            <TouchableOpacity style={{marginLeft: 'auto'}}>
              <ICCloseModal color={defaultColors.bg_CBCBCB} />
            </TouchableOpacity>
          </View>
          <View>
            <TextCustom
              fontSize={14}
              weight="600"
              color={defaultColors.c_222124}>
              Lý do hủy món{' '}
              <TextCustom color={defaultColors._EA222A}>*</TextCustom>
            </TextCustom>
            <TextInput
              placeholderTextColor={defaultColors.c_222124}
              placeholder="Hủy món từ thu ngân"
              style={{
                height: 120,
                borderWidth: 1,
                borderColor: defaultColors.bg_EFEFEF,
                paddingHorizontal: 16,
                paddingVertical: 8,
                color: defaultColors.c_222124,
              }}
              textAlignVertical="top"
              multiline
            />
          </View>
        </View>
      </ModalCustom>
    </>
  );
};

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
  },
});

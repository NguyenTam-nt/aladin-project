import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import React, {useCallback} from 'react';
import {defaultColors} from '@configs';
import {TextCustom} from '@components';
import {ICAddOrder} from '../../../../assets/icons/ICAddOrder';
import {ICCheckSingle} from '../../../../assets/icons/ICCheckSingle';
import {ICCheckMulti} from '../../../../assets/icons/ICCheckMulti';
import {ICDelete} from '../../../../assets/icons/ICDelete';
import {ICDeleteMulti} from '../../../../assets/icons/ICDeleteMulti';
import {ICDown} from '../../../../assets/icons/ICDown';
import {TypeModalWaitProcess} from '../hooks/useWaitProcess';
import { Button } from '../../../../components/Button'
import { ICCheck } from '../../../../assets/icons/ICCheck'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  onShowModal: (type: TypeModalWaitProcess) => void
  onHideModal: () => void
};

export const BillItem = ({onShowModal, onHideModal}: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleOpen = () => {
    // onPress?.()
    setIsOpen(value => !value);
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 300
    });
  };
  return (
    <>
      <TouchableOpacity onPress={toggleOpen} style={styles.styleGoupItem}>
        <View>
          <TextCustom
            fontSize={14}
            weight="600"
            lineHeight={22}
            color={defaultColors.c_222124}>
            Tầng 1/ bàn 6
          </TextCustom>
          <TextCustom
            fontSize={14}
            lineHeight={18}
            weight="600"
            color={defaultColors.bg_A1A0A3}>
            Mã hóa đơn 1253
          </TextCustom>
        </View>
        <TouchableOpacity>
          <ICDown color={defaultColors.c_222124} />
        </TouchableOpacity>
      </TouchableOpacity>
      <View
        style={[
          {flex: 1},
          !isOpen ? {height: 0, overflow: 'hidden'} : undefined,
        ]}>
        <BillItemMenu onHideModal={onHideModal} onShowModal={onShowModal} />
        <BillItemMenu onHideModal={onHideModal} onShowModal={onShowModal} />
        <BillItemMenu onHideModal={onHideModal} onShowModal={onShowModal} />
        <BillItemMenu isCancel onHideModal={onHideModal} onShowModal={onShowModal} />
        <BillItemMenu onHideModal={onHideModal} onShowModal={onShowModal} />
        <BillItemMenu onHideModal={onHideModal} onShowModal={onShowModal} />
      </View>
    </>
  );
};

type PropsBillItemMenu = {
  onShowModal: (type: TypeModalWaitProcess) => void
  onHideModal: () => void
  isCancel?: boolean
};

export const BillItemMenu = ({
  onHideModal,
  onShowModal,
  isCancel = false,
}: PropsBillItemMenu) => {
  const handleShowModalCancel = useCallback(() => {
    onShowModal(TypeModalWaitProcess.cancelbill);
  }, []);

  const handleShowModalRefuse = useCallback(() => {
    onShowModal(TypeModalWaitProcess.refusebill);
  }, []);
  return (
    <View style={[styles.styleItemProduct, {
        backgroundColor: isCancel ? defaultColors.bg_FCEAEA : 'transparent'
    }]}>
      <View style={styles.styleViewItem}>
        <TextCustom
          lineHeight={22}
          fontSize={14}
          weight="400"
          color={defaultColors.c_222124}>
          25/05/2023 - 10:25
        </TextCustom>
        <TextCustom
          lineHeight={18}
          fontSize={12}
          weight="400"
          color={defaultColors.bg_A1A0A3}>
          Bởi Order
        </TextCustom>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom
          lineHeight={22}
          fontSize={14}
          weight="400"
          color={defaultColors.c_222124}>
          Lẩu riêu cua{' '}
        </TextCustom>
        <View>
          <View style={{flexDirection: 'row', columnGap: 4}}>
            <ICAddOrder color={defaultColors.bg_A1A0A3} />
            <TextCustom
              lineHeight={18}
              fontSize={12}
              weight="400"
              color={defaultColors.bg_A1A0A3}>
              Đặt cho tôi đơn hàng này
            </TextCustom>
          </View>
        </View>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom fontSize={14} weight="400" color={defaultColors.c_222124}>
          4
        </TextCustom>
      </View>
      <View style={[styles.styleViewItem, styles.styleGroupBtn]}>
        {!isCancel ? (
          <>
            <TouchableOpacity style={[styles.styleBtn, styles.styleBtnGreen]}>
              <ICCheckSingle />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.styleBtn, styles.styleBtnGreen]}>
              <ICCheckMulti />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShowModalCancel}
              style={[styles.styleBtn, styles.styleBtnRed]}>
              <ICDelete />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShowModalCancel}
              style={[styles.styleBtn, styles.styleBtnRed]}>
              <ICDeleteMulti />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Button
            style={styles.styleViewItem}
              renderLeff={
                <View>
                  <ICCheck />
                </View>
              }
              text="Thực hiện"
            />
            <Button
              onPress={handleShowModalRefuse}
              style={[styles.styleBtnCancel, styles.styleViewItem]}
              renderLeff={
                <View>
                  <ICDelete />
                </View>
              }
              text="Hủy bỏ"
            />
          </>
        )}
      </View>
    </View>
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
  styleGoupItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: defaultColors.bg_F5F5F5,
  },
  styleItemProduct: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  styleBtn: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleGroupBtn: {
    columnGap: 12,
    flexDirection: 'row',
  },
  styleBtnGreen: {
    backgroundColor: defaultColors._01A63E,
  },
  styleBtnRed: {
    backgroundColor: defaultColors._EA222A,
  },
  styleBtnCancel: {
    backgroundColor: defaultColors.c_222124,
  },
});

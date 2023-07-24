import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import React from 'react';
import {defaultColors} from '@configs';
import {TextCustom} from '@components';
import {ICAddOrder} from '../../../../assets/icons/ICAddOrder';
import {ICDown} from '../../../../assets/icons/ICDown';
import {globalStyles} from 'src/commons/globalStyles';
import {getValueForDevice} from 'src/commons/formatMoney';
import {DIMENSION} from '@constants';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const HistoryItem = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleOpen = () => {
    // onPress?.()
    setIsOpen(value => !value);
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 300,
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
            Ngày 15/05/2023
          </TextCustom>
        </View>
        <TouchableOpacity
          style={{
            transform: [
              {
                rotate: isOpen ? '180deg' : '0deg',
              },
            ],
          }}>
          <ICDown color={defaultColors.c_222124} />
        </TouchableOpacity>
      </TouchableOpacity>
      <View
        style={[
          {flex: 1},
          !isOpen ? {height: 0, overflow: 'hidden'} : undefined,
        ]}>
        <HistoryItemMenu />
        <HistoryItemMenu />
        <HistoryItemMenu />
      </View>
    </>
  );
};

export const HistoryItemMenu = () => {
  return (
    <View style={styles.styleItemProduct}>
      <View style={[styles.styleViewItem, styles.pl_16]}>
        <TextCustom
          lineHeight={22}
          fontSize={14}
          weight="400"
          color={defaultColors.c_222124}>
          15:05
        </TextCustom>
      </View>
      <View style={styles.styleViewItem2}>
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
      <View style={styles.styleViewItem}>
        <TextCustom fontSize={14} color={defaultColors.c_222124} weight="400">
          Tầng 1/ Bàn 3
        </TextCustom>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom fontSize={14} color={defaultColors.c_222124} weight="400">
          HĐ234
        </TextCustom>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom fontSize={14} color={defaultColors.c_222124} weight="400">
          Order
        </TextCustom>
      </View>

      <View style={[styles.styleViewItem, styles.styleStatus]}>
        <View
          style={[styles.styleCricle, {backgroundColor: defaultColors._EA222A}]}
        />
        <TextCustom fontSize={14} color={defaultColors.c_222124} weight="400">
          Hủy món
        </TextCustom>
      </View>
      <View style={styles.styleViewItem2}>
        <TextCustom fontSize={14} color={defaultColors.c_222124} weight="400">
          Order nhầm, đã xác nhận lại từ bếp
        </TextCustom>
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
    width: `${100 / 10}%`,
  },
  styleViewItem2: {
    width: `${(100 / 10) * 2}%`,
  },
  styleGoupItem: {
    height: getValueForDevice(60, 40),
    borderRadius: getValueForDevice(0, 8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: defaultColors.bg_F5F5F5,
    width: getValueForDevice('auto', DIMENSION.width - 24 * 2),
  },
  styleItemProduct: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 16,
    backgroundColor: defaultColors.c_fff,
    // columnGap: 8,
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
  styleCricle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  styleStatus: {
    ...globalStyles.row,
    ...globalStyles.alignItemsCenter,
    columnGap: 4,
  },
  pl_16: {
    paddingLeft: 16
  }
});

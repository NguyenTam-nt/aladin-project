import {View, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {TextCustom} from '@components';
import {defaultColors} from '@configs';

export const HeaderListHistory = memo(() => {
  return (
    <View style={styles.styleTable}>
      <View style={styles.styleViewItem}>
        <TextCustom weight="600" fontSize={16} color={defaultColors.c_222124}>
          Thời gian
        </TextCustom>
      </View>
      <View style={styles.styleViewItem2}>
        <TextCustom weight="600" fontSize={16} color={defaultColors.c_222124}>
          Tên món
        </TextCustom>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom weight="600" fontSize={16} color={defaultColors.c_222124}>
          Số lượng
        </TextCustom>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom weight="600" fontSize={16} color={defaultColors.c_222124}>
          Tầng/Bàn
        </TextCustom>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom weight="600" fontSize={16} color={defaultColors.c_222124}>
          Mã hóa đơn
        </TextCustom>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom weight="600" fontSize={16} color={defaultColors.c_222124}>
          Tên tài khoản
        </TextCustom>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom weight="600" fontSize={16} color={defaultColors.c_222124}>
          Trạng thái
        </TextCustom>
      </View>
      <View style={styles.styleViewItem2}>
        <TextCustom weight="600" fontSize={16} color={defaultColors.c_222124}>
          Lý do
        </TextCustom>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  styleTable: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    // columnGap: 8,
  },
  styleViewItem: {
    width: `${100 / 10}%`,
  },
  styleViewItem2: {
    width: `${(100 / 10) * 2}%`,
  },
});

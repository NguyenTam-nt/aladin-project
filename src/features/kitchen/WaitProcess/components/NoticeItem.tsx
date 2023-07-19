import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {ICCloseModal} from '../../../../assets/icons/ICCloseModal';

export const NoticeItem = memo(() => {
  return (
    <View style={styles.noticeItem}>
      <View style={styles.styleGroupText}>
        <TextCustom fontSize={14} color={defaultColors.c_222124} weight="400">
          Chuyển từ <TextCustom weight="600"> H234 - Tầng 1/ Bàn 4</TextCustom>{' '}
          đến <TextCustom weight="600">H134 - Tầng 1/ Bàn 5</TextCustom>
        </TextCustom>
      </View>
      <TouchableOpacity>
        <ICCloseModal color={defaultColors.bg_5F5F61} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  noticeItem: {
    borderLeftWidth: 4,
    borderLeftColor: defaultColors._EA222A,
    borderRadius: 4,
    height: 60,
    flex: 1,
    backgroundColor: defaultColors.bg_FCEAEA,
    maxWidth: 376,
    columnGap: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  styleGroupText: {
    flex: 1,
  },
});

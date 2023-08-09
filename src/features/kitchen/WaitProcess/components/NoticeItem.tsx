import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {defaultColors} from '@configs';
import {ICCloseModal} from '../../../../assets/icons/ICCloseModal';
import {getValueForDevice} from 'src/commons/formatMoney';
import {DIMENSION} from '@constants';
import {INotice} from '@typeRules';
import {Html} from 'src/components/Html';

type Props = {
  notice: INotice
  onDelete: () => void
};

export const NoticeItem = memo(({notice, onDelete}: Props) => {
  return (
    <View style={styles.noticeItem}>
      <View style={styles.styleGroupText}>
        <Html content={notice.reason} />
      </View>
      <TouchableOpacity onPress={onDelete}>
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
    // flex: 1,
    backgroundColor: defaultColors.bg_FCEAEA,
    width: getValueForDevice(
      (DIMENSION.width - 32 * 2) / 3 - 32 / 3,
      DIMENSION.width * 0.7,
    ),
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

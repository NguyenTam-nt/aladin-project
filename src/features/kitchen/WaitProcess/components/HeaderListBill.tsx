import {View, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {MultipleScreenView} from 'src/components/MultipleScreenView';
import { getValueForDevice } from 'src/commons/formatMoney'

export const HeaderListBill = memo(() => {
  return (
    <View style={styles.styleTable}>
      <View style={styles.styleViewItem}>
        <TextCustom weight="600" fontSize={16} color={defaultColors.c_222124}>
          Thời gian
        </TextCustom>
      </View>
      <View style={styles.styleViewItem}>
        <TextCustom weight="600" fontSize={16} color={defaultColors.c_222124}>
          Tên món
        </TextCustom>
      </View>
      <View style={[styles.styleViewItem, getValueForDevice(undefined, styles.justifyEnd) ]}>
        <TextCustom weight="600" textAlign={getValueForDevice('left', 'right')} fontSize={16} color={defaultColors.c_222124}>
          Số lượng
        </TextCustom>
      </View>
      <MultipleScreenView
        tableVew={
          <View style={styles.styleViewItem}>
            <TextCustom
              weight="600"
              fontSize={16}
              color={defaultColors.c_222124}>
              Trạng thái
            </TextCustom>
          </View>
        }
      />
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
  justifyEnd: {
    justifyContent: 'flex-end'
  }
});

import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { NoticeItem } from './NoticeItem';
import { DIMENSION } from '@constants';

export const NoticeCancelItem = memo(({test}: {test: number[]}) => {
  return (
    <View style={styles.groupNotice}>
      <NoticeItem />
    </View>
  );
});

const styles = StyleSheet.create({
  groupNotice: {
    flexDirection : 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    maxWidth: DIMENSION.width - 216,
  },
});

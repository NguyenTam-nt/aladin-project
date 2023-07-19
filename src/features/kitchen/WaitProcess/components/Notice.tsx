import {View, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {NoticeItem} from './NoticeItem';

export const Notice = memo(() => {
  return (
    <View style={styles.groupNotice}>
      <NoticeItem />
      <NoticeItem />
      <NoticeItem />
    </View>
  );
});

const styles = StyleSheet.create({
  groupNotice: {
    flexDirection: 'row',
    columnGap: 16,
  },
});

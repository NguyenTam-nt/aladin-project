import {View, StyleSheet, FlatList} from 'react-native';
import React, {memo, useCallback} from 'react';
import {NoticeItem} from './NoticeItem';
import {DIMENSION} from '@constants';

export const Notice = memo(() => {
  const renderItem = useCallback(() => {
    return <NoticeItem />;
  }, []);

  return (
    <View style={styles.groupNotice}>
      <FlatList
        data={[1, 2, 3]}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        snapToInterval={DIMENSION.width * 0.7}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.clgap_16}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  groupNotice: {
    flexDirection: 'row',
    // columnGap: 16,
  },
  clgap_16: {
    columnGap: 16,
  },
});

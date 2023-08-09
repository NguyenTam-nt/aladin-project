import {View, StyleSheet, FlatList, ListRenderItemInfo} from 'react-native';
import React, {memo, useCallback} from 'react';
import {NoticeItem} from './NoticeItem';
import {DIMENSION} from '@constants';
import { INotice } from '@typeRules'

type Props = {
  notices: INotice[]
  onDelete: (index: number) => void
}

export const Notice = memo(({notices, onDelete}:Props) => {

  const renderItem = useCallback(({item, index}:ListRenderItemInfo<INotice>) => {
    return <NoticeItem onDelete={() => onDelete(index)} notice={item} />;
  }, [onDelete]);

  return (
    <View style={styles.groupNotice}>
      <FlatList
        data={notices}
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

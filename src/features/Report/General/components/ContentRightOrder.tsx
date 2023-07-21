import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import HeaderContentRight from './HeaderContentRight';
import TableRightContent from './TableRightContent';
import { defaultColors } from '@configs';

const ContentRightOrder = () => {
  return (
    <View style={styles.container}>
      <HeaderContentRight />
      <TableRightContent />
    </View>
  );
};

export default ContentRightOrder;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 32,
    marginTop: 24,
    flex: 1,
    borderRadius : 4,
    borderWidth :1,
    borderColor : defaultColors.bg_EFEFEF,
  },
});

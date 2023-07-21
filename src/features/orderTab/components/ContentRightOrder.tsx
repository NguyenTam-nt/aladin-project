import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderContentRight from './HeaderContentRight';
import TableRightContent from './TableRightContent';
import { TabBarOrder } from '../ContentOrderTab';


const ContentRightOrder = (props :TabBarOrder ) => {
  const {isOpenTab , setIsOpenTab} = props;

  return (
    <View style={styles.container}>
      <HeaderContentRight  isOpenTab={isOpenTab} setIsOpenTab={setIsOpenTab}/>
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
  },
});

import { StyleSheet, View } from 'react-native';
import ContentRightOrder from './components/ContentRightOrder';
import TabBarLeftOrder from './components/TabBarLeftOrder';
import { defaultColors } from '@configs';
import React, { useState } from 'react';

const ContentOrderTab = () => {
  const [isOpenTab , setIsOpenTab] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <TabBarLeftOrder isOpenTab={isOpenTab} setIsOpenTab={setIsOpenTab} />
      <ContentRightOrder isOpenTab={isOpenTab} setIsOpenTab={setIsOpenTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: defaultColors.c_fff,
    flex :1,
  },
});

export default ContentOrderTab;

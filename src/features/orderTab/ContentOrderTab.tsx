import { StyleSheet, View } from 'react-native';
import ContentRightOrder from './components/ContentRightOrder';
import TabBarLeftOrder from './components/TabBarLeftOrder';
import { defaultColors, isTabletDevice } from '@configs';
import React, { useState } from 'react';

export interface TabBarOrder  {
  isOpenTab : boolean
  setIsOpenTab :React.Dispatch<React.SetStateAction<boolean>>
}

const ContentOrderTab = () => {
  const [isOpenTab , setIsOpenTab] = useState<boolean>(true);
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

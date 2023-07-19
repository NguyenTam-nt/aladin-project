import { StyleSheet, View } from 'react-native';
import ContentRightOrder from './components/ContentRightOrder';
import TabBarLeftOrder from './components/TabBarLeftOrder';
import { defaultColors } from '@configs';
import React from 'react';

const ContentOrderTab = () => {
  return (
    <View style={styles.container}>
      <TabBarLeftOrder />
      <ContentRightOrder />
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

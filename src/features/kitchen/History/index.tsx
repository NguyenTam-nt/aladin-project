import {View, StyleSheet} from 'react-native';
import React from 'react';
import KitchenLinks from '../components/KitchenLinks';
import {defaultColors} from '@configs';

export const History = () => {
  return (
    <View style={styles.container}>
      <KitchenLinks />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultColors.c_fff,
    flex: 1,
    paddingHorizontal: 32
  },
});

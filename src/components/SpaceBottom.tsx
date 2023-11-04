import {BOTTOM_BAR_HEIGHT} from '@configs';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const SpaceBottom = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: BOTTOM_BAR_HEIGHT + 5 ,
  },
});

export default SpaceBottom;

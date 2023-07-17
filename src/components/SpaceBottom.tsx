import { isTabletDevice } from '@configs';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const SpaceBottom = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: isTabletDevice ?  65 : 129,
  },
});

export default SpaceBottom;

import { View, Text ,StyleSheet } from 'react-native';
import React from 'react';
import KitchenLinks from '../components/KitchenLinks';
import { defaultColors } from '@configs';
import TableCompound from './TableCompound';

const CompoundTabKitChen = React.memo(() => {
  return (
    <View style={styles.container}>
      <KitchenLinks />
      <TableCompound />
    </View>
  );
});

const styles = StyleSheet.create({
   container : {
    flex : 1 , paddingHorizontal : 32,
    backgroundColor : defaultColors.c_fff,
   },
});

export default CompoundTabKitChen;

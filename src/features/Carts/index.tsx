import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderBack from 'src/components/Header/HeaderBack';

const CartsScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderBack isProductDetail={true} />
      <View style={styles.styleCheckAll}>
        <View style={styles.styleCheckBox}>
          <TextCustom>BO</TextCustom>
        </View>
        <View style={styles.styleContent}>
          <TextCustom>Cart dgegeg</TextCustom>
        </View>
        <View style={styles.styleRemove}>
          <TextCustom>Remove</TextCustom>
        </View>
      </View>
      <TextCustom>Cart dgegeg</TextCustom>
    </View>
  );
};

export default CartsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, position: 'relative', paddingHorizontal: 16},
  styleCheckAll: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 17,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 20,
    paddingHorizontal: 18,
  },
  styleCheckBox: {
    width: 20,
    height: '100%',
    backgroundColor: defaultColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultColors._0073E5,
    height: '100%',
    width: '100%',
  },
  styleRemove: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultColors._074A20,
    height: '100%',
    // width: '100%',
  },
});

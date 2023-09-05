import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {defaultColors} from '@configs';
import {TextCustom} from '../Text';
import TextTranslate from '../TextTranslate';

const CityFilter = () => {
  return (
    <View style={styles.container}>
      <TextTranslate
        text="common.view_price"
        color={defaultColors.c_fff}
        fontSize={8}
        weight="400"
      />
      <TextCustom color={defaultColors.c_fff} fontSize={12} weight="bold">
        Hà Nội
      </TextCustom>
    </View>
  );
};

export default CityFilter;

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 32,
    borderWidth: 1,
    borderColor: defaultColors.c_fff,
    borderRadius: 6,
    padding: 4,
  },
});

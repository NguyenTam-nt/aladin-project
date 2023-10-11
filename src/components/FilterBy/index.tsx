import {StyleSheet, View} from 'react-native';
import {globalStyles} from 'src/commons/globalStyles';
import {TextCustom} from '../Text';
import React from 'react';

const FilterBy = () => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((it, idx) => {
        return (
          <TextCustom numberOfLines={1} weight="400">
            Sản phẩm m
          </TextCustom>
        );
      })}
    </View>
  );
};

export default FilterBy;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.flexWrap,
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
});

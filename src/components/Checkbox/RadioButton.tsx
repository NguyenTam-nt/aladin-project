import { defaultColors } from '@configs';
import { View ,StyleSheet} from 'react-native';
import React from 'react';

export const RadioButtonSelect = ({active}: {active: boolean}) => {
  return (
    <View
      style={[
        styles.containerRadiobutton,
        {borderColor: active ? defaultColors._EA222A : defaultColors.c_fff},
      ]}>
      {active && <View style={styles.circleDot} />}
    </View>
  );
};
const styles = StyleSheet.create({
  containerRadiobutton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: defaultColors.c_fff,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDot: {
    height: 8,
    width: 8,
    backgroundColor: defaultColors._EA222A,
    borderRadius: 4,
  },
});

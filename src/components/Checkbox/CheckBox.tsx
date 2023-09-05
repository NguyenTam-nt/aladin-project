import { defaultColors } from '@configs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ICCheckSingle } from 'src/assets/icons/ICCheckSingle';


const CheckBox = ({active}: {active: boolean}) => {
  return (
    <View
      style={[
        styles.containerRadiobutton,
        {borderColor: active ? defaultColors._074A20 : defaultColors.c_222124},
      ]}>
      {active && <ICCheckSingle color={defaultColors._074A20} />}
    </View>
  );
};
const styles = StyleSheet.create({
  containerRadiobutton: {
    width: 18,
    height: 18,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: defaultColors.c_222124,
    alignItems: 'center',
    justifyContent: 'center',
    padding : 4,
  },
});
export default CheckBox;

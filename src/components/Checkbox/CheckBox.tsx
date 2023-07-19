import React from 'react';
import { defaultColors } from '@configs';
import { View ,StyleSheet} from 'react-native';
import { ICCheck } from '../../assets/icons/ICCheck';


const CheckBox = ({active}: {active: boolean}) => {
  return (
    <View
      style={[
        styles.containerRadiobutton,
        {borderColor: active ? defaultColors._EA222A : defaultColors.c_222124},
      ]}>
      {active && (
        <View style={{position: 'absolute'}}>
          <ICCheck color={defaultColors._EA222A} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  containerRadiobutton: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: defaultColors.c_222124,
    alignItems: 'center',
    justifyContent: 'center',
    padding : 4,
  },
  circleDot: {
    height: 8,
    width: 8,
    backgroundColor: defaultColors._EA222A,
    borderRadius: 4,
  },
});
export default CheckBox;

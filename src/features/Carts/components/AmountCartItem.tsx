import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
interface IProps {
  quanlity: number;
  handleIncrease?: (value: any) => void;
  handleDecrease?: (value: any) => void;
  quantityDefault: number;
  handleUodateQuantity: (type: 'DECREASE' | 'INCREASE') => void;
}
const AmountCartItem = (props: IProps) => {
  const {
    quanlity,
    handleDecrease,
    handleIncrease,
    quantityDefault,
    handleUodateQuantity,
  } = props;
  return (
    <View style={styles.counterStyle}>
      <TouchableOpacity
        disabled={quantityDefault ? quanlity === 1 : false}
        onPress={() => handleUodateQuantity('DECREASE')}
        style={styles.actionStyle}>
        <TextCustom>-</TextCustom>
      </TouchableOpacity>
      <View style={styles.counterItem}>
        <TextCustom fontSize={16} weight="400" color={defaultColors.bg_00C3AB}>
          {quanlity}
        </TextCustom>
      </View>
      <TouchableOpacity
        disabled={quanlity === quantityDefault}
        onPress={() => handleUodateQuantity('INCREASE')}
        style={styles.actionStyle}>
        <TextCustom>+</TextCustom>
      </TouchableOpacity>
    </View>
  );
};

export default AmountCartItem;
const styles = StyleSheet.create({
  counterStyle: {
    flexDirection: 'row',
    borderColor: defaultColors.bg_00C3AB,
    borderRadius: 4,
    borderWidth: 1,
  },
  actionStyle: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterItem: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: defaultColors.bg_00C3AB,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
});

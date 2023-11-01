import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {boolean} from 'yup';
interface IProps {
  quanlity: number;
  handleIncrease?: (value: any) => void;
  handleDecrease?: (value: any) => void;
  quantityDefault: number;
  handleUodateQuantity: (type: 'DECREASE' | 'INCREASE') => void;
  disable?: boolean;
}
const AmountCartItem = (props: IProps) => {
  const {
    quanlity,
    handleDecrease,
    handleIncrease,
    quantityDefault,
    handleUodateQuantity,
    disable = false,
  } = props;
  return (
    <View style={styles.counterStyle}>
      <TouchableOpacity
        disabled={
          disable == false ? (quantityDefault ? quanlity === 1 : false) : true
        }
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
        disabled={disable == false ? quanlity === quantityDefault : true}
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
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: defaultColors.bg_00C3AB,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    minWidth: 24,
    width: 'auto',
    paddingHorizontal: 4,
  },
});

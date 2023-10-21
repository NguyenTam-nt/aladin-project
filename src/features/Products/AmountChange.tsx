import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import TextTranslate from 'src/components/TextTranslate';
interface IProps {
  quanlity: number;
  handleIncrease?: (value: any) => void;
  handleDecrease?: (value: any) => void;
  descActive?: boolean;
  ascActive?: boolean;
  quantityDefault: number;
}
const AmountChange = (props: IProps) => {
  const {quanlity, handleDecrease, handleIncrease, quantityDefault} = props;
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <TextTranslate
        fontSize={14}
        weight="400"
        color={defaultColors.c_0000}
        text="product.quanlity"
      />
      <View style={styles.counterStyle}>
        <TouchableOpacity
          disabled={quantityDefault ? quanlity === 1 : false}
          onPress={handleDecrease}
          style={styles.actionStyle}>
          <TextCustom>-</TextCustom>
        </TouchableOpacity>
        <View style={styles.counterItem}>
          <TextCustom
            fontSize={16}
            weight="400"
            color={defaultColors.bg_00C3AB}>
            {quanlity}
          </TextCustom>
        </View>
        <TouchableOpacity
          disabled={quanlity === quantityDefault}
          onPress={handleIncrease}
          style={styles.actionStyle}>
          <TextCustom>+</TextCustom>
        </TouchableOpacity>
      </View>
      {quantityDefault !== 0 && (
        <TextCustom fontSize={14} weight="400" color={defaultColors.c_0000}>
          {t('common.product-vailable', {lenght: quantityDefault})}
        </TextCustom>
      )}
    </View>
  );
};

export default AmountChange;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
  },
  counterStyle: {
    flexDirection: 'row',
    borderColor: defaultColors.bg_00C3AB,
    borderRadius: 4,
    borderWidth: 1,
  },
  actionStyle: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterItem: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: defaultColors.bg_00C3AB,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
});

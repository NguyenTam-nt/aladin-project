import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {TextCustom} from '@components';
import {defaultColors} from '@configs';

type Props = {
  onPress: (id: number) => void
  isActive?: boolean
  text: string
  id: number
};

export const ButtonCategory = memo(({onPress, isActive, text, id}: Props) => {
  const handlePress = () => {
    onPress(id);
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={[
        styles.btn,
        isActive ? styles.styleActiveButton : styles.styleInActiveButton,
      ]}>
      <TextCustom
        fontSize={14}
        weight="500"
        color={isActive ? defaultColors.c_fff : defaultColors._EA222A}>
        {text}
      </TextCustom>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  btn: {
    width: 'auto',
    flex: 1,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleActiveButton: {
    backgroundColor: defaultColors._EA222A,
  },
  styleInActiveButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: defaultColors.bg_FCEAEA,
  },
});

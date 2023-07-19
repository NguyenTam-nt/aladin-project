import {StyleSheet, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {defaultColors} from '@configs';
import {TextCustom} from '@components';

type Props = {
  renderLeff?: JSX.Element
  renderRight?: JSX.Element
  text: string
  style?: StyleProp<ViewStyle>
  onPress?: () => void
};

export const Button = ({renderLeff, renderRight, text, style, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.styleBtn, style]}>
      {renderLeff ? renderLeff : null}
      <TextCustom fontSize={14} weight="600" color={defaultColors.c_fff}>
        {text}
      </TextCustom>
      {renderRight ? renderRight : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  styleBtn: {
    width: '100%',
    height: 42,
    backgroundColor: defaultColors._EA222A,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    columnGap: 8,
  },
});

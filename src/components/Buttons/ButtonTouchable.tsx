import {StyleSheet, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {defaultColors, fontSize} from '@configs';
import TextTranslate from '../TextTranslate';
import {PropsTextCustom, TextCustom} from '../Text';
import RadialGradient from 'react-native-radial-gradient';

type Props = {
  renderLeff?: JSX.Element;
  renderRight?: JSX.Element;
  text?: string;
  textCustom?: string;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  weight?: any;
  isAction?: boolean;
  textGradient?: boolean;
  textColor?: string;
  fontSize?: number;
  onPress?: () => void;
} & PropsTextCustom;

export const ButtonTouchable = ({
  renderLeff,
  renderRight,
  text,
  textCustom,
  height = 24,
  borderRadius = 8,
  style,
  weight = '600',
  isAction = false,
  textGradient = true,
  textColor = defaultColors.c_fff,
  fontSize = 14,
  onPress,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles(height, borderRadius, isAction).styleBtn,
        StyleSheet.flatten(style),
      ]}>
      {renderLeff ? renderLeff : null}
      {text && (
        <TextTranslate
          {...props}
          fontSize={fontSize}
          weight={weight}
          color={textColor}
          text={text}
        />
      )}
      {textCustom && (
        <TextCustom
          {...props}
          fontSize={fontSize}
          weight={weight}
          color={isAction ? defaultColors.c_fff : defaultColors.bg_00C3AB}>
          {textCustom}
        </TextCustom>
      )}
      {renderRight ? renderRight : null}
    </TouchableOpacity>
  );
};

const styles = (height?: number, borderRadius?: number, isAction?: boolean) =>
  StyleSheet.create({
    styleBtn: {
      // width: '100%',
      paddingHorizontal: 10,
      height: height,
      backgroundColor: isAction ? defaultColors.bg_00C3AB : defaultColors.c_fff,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: isAction
        ? defaultColors.bg_00C3AB
        : defaultColors.text_C4C4C4,
      borderWidth: 1,
      borderRadius: borderRadius,
      flexDirection: 'row',
      columnGap: 8,
    },
  });

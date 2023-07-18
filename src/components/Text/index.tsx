import {Platform, Text, TextProps} from 'react-native';
import React from 'react';

interface Props extends TextProps {
  lineHeight?: number
  weight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  fontStyle?: 'normal' | 'italic'
  fontFamily?: string
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed'
  textDecorationColor?: string
  shadow?: {
    textShadowColor?: string
    textShadowOffset?: {
      width: number
      height: number
    }
    textShadowRadius?: number
  }
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  children?: any
  backgroundColor?: string
  color?: string
  numberOfLines?: number
  fontSize?: number
  fontiCielBCCubanoNormal?: string
}

const getFont: (weight: Props['weight']) => string = weight => {
  if (Platform.OS === 'android') {
    switch (weight) {
      case '100':
      case '200':
      case '300':
        return 'IBMPlexSans-Light';
      case 'normal':
      case '400':
        return 'IBMPlexSans-Medium';
      case '500':
        return 'IBMPlexSans-Regular';
      case '600':
        return 'IBMPlexSans-SemiBold';
      case '800':
      case '900':
      case '700':
      case 'bold':
        return 'IBMPlexSans-Bold';
      default:
        return 'IBMPlexSans-Medium';
    }
  }
  return 'IBMPlexSans-Medium';
};

export const TextCustom = ({
  children,
  numberOfLines,
  weight,
  fontiCielBCCubanoNormal,
  ...props
}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{...props, fontFamily: !fontiCielBCCubanoNormal ? getFont(weight) : fontiCielBCCubanoNormal, fontWeight: weight}}>
      {children}
    </Text>
  );
};

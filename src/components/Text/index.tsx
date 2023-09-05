import {Platform, Text, TextProps} from 'react-native';
import React from 'react';

export interface PropsTextCustom extends TextProps {
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
  [key: string]: any
}

const getFont: (weight: PropsTextCustom['weight']) => string = weight => {
  if (Platform.OS === 'android') {
    switch (weight) {
      case '100':
      case '200':
      case '300':
        return 'NunitoSans_10pt-Light';
      case 'normal':
      case '400':
        return 'NunitoSans_10pt-Medium';
      case '500':
        return 'NunitoSans_10pt-Regular';
      case '600':
        return 'NunitoSans_10pt-SemiBold';
      case '800':
      case '900':
      case '700':
      case 'bold':
        return 'NunitoSans_10pt-Bold';
      default:
        return 'NunitoSans_10pt-Medium';
    }
  }
  return 'NunitoSans_10pt-Medium';
};

export const TextCustom = ({
  children,
  numberOfLines,
  weight,
  ...props
}: PropsTextCustom) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{...props, fontFamily: getFont(weight), fontWeight: weight}}>
      {children}
    </Text>
  );
};

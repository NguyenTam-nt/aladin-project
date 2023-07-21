import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ICFilter = ({
  width = 24,
  height = 24,
  color = defaultColors.bg_A1A0A3,
}: IIcon) => {
  return (
    <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M3 18v-1.5h6V18H3zm0-5.25v-1.5h12v1.5H3zM3 7.5V6h18v1.5H3z"
      fill={color}
    />
  </Svg>
  );
};

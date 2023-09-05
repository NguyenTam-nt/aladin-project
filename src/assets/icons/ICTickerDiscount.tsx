import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ICTickerDiscount = ({
  width = 91,
  height = 31,
  color = defaultColors.primary,
}: IIcon) => (
  <Svg width={width} height={height} viewBox="0 0 91 31" fill="none">
    <Path d="M72.5544 15.5026L91 31H0V0H91L72.5544 15.5026Z" fill={color} />
  </Svg>
);

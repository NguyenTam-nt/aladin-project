import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

export const ICClose = ({
  width = 26,
  height = 26,
  color = defaultColors.c_fff,
}: IIcon) => (
  <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
    <Path
      d="M1 21L11 11L21 21M21 1L10.9981 11L1 1"
      stroke="#939393"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

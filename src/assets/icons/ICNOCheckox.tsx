import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path, G, Circle, Rect} from 'react-native-svg';

export const ICNOCheckbox = ({
  width = 24,
  height = 24,
  color = defaultColors.bg_939393,
}: IIcon) => (
  <Svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none">
    <Rect x="0.5" y="0.5" width="17" height="17" rx="3.5" stroke="#626262" />
  </Svg>
);

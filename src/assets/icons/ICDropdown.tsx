import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const ICDropdown = ({
  width = 19,
  height = 13,
  color = defaultColors.text_111213,
}: IIcon) => (
  <Svg width="15" height="9" viewBox="0 0 15 9" fill="none">
    <Path
      d="M1.25359 -5.64442e-07L-0.000164087 1.25375L7.08317 8.33708L14.1665 1.25375L12.9128 -5.48032e-08L7.08317 5.82958L1.25359 -5.64442e-07Z"
      fill="#FF7D03"
    />
  </Svg>
);

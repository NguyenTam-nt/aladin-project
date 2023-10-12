import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path, G, Circle} from 'react-native-svg';

export const ICPrev = ({
  width = 33,
  height = 33,
  color = defaultColors.primary,
}: IIcon) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 33 33"
    fill="none">
    <G style="mix-blend-mode:multiply">
      <Circle cx="16.5" cy="16.5" r="16.5" fill="#E9E9E9" />
    </G>
    <Path
      d="M21 6L10 16.5L21 27"
      stroke="#FF7D03"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

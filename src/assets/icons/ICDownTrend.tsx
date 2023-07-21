import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ICDownTrend = ({
  width = 24,
  height = 24,
  color = defaultColors._EA222A,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.325 18v-1.5H19.5l-6.025-6.024L9.3 14.65 2 7.376 3.075 6.3l6.2 6.2 4.175-4.175 7.075 7.075v-3.075H22V18h-5.675z"
        fill={color}
      />
    </Svg>
  );
};

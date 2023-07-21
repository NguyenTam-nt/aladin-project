import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ICUpTrend = ({
  width = 24,
  height = 24,
  color = defaultColors._01A63E,
}: IIcon) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"

    >
      <Path
        d="M3.075 18L2 16.927 9.3 9.65l4.175 4.175L19.5 7.8h-3.175V6.3H22v5.675h-1.475V8.9l-7.075 7.075L9.275 11.8l-6.2 6.2z"
        fill={color}
      />
    </Svg>
  );
};

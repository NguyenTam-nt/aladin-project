import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ICAddOrder = ({
  width = 16,
  height = 16,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M3.333 12.667h6V9.333h3.334v-6H3.333v9.334zm0 1.333c-.366 0-.68-.13-.941-.392A1.284 1.284 0 012 12.667V3.333c0-.366.13-.68.392-.941.26-.261.575-.392.941-.392h9.334c.366 0 .68.13.941.392.261.26.392.575.392.941V10l-4 4H3.333zm1.334-4.667V8H8v1.333H4.667zm0-2.666V5.333h6.666v1.334H4.667z"
        fill={color}
      />
    </Svg>
  );
};

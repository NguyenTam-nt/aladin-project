import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ICArrowRight = ({
  width = 24,
  height = 24,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45 14 6l6 6-6 6z"
        fill={color}
      />
    </Svg>
  );
};

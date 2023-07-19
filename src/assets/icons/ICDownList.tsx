import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ICDownList = ({
  width = 24,
  height = 24,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"

  >
    <Path d="M12 15l-5-4.975h10L12 15z" fill={color} />
  </Svg>
  );
};

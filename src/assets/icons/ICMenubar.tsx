import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';

export const ICMenubar = ({
  width = 24,
  height = 24,
  color = defaultColors.c_222124,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zM4 18a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zM11 11a1 1 0 100 2h8a1 1 0 100-2h-8z"
        fill={color}
      />
    </Svg>
  );
};

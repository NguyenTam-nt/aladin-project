import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

export const ICTagFloor = ({
  width = 9,
  height = 28,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 9 28" fill="none">
      <Path d="M0 0h4l5 14-5 14H0V0z" fill="url(#paint0_linear_2251_56675)" />
      <Defs>
        <LinearGradient
          id="paint0_linear_2251_56675"
          x1={4.5}
          y1={0}
          x2={4.5}
          y2={28}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#F1BA42" />
          <Stop offset={1} stopColor="#F4A118" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

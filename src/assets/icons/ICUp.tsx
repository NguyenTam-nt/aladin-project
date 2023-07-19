import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export const ICUp = ({
  width = 24,
  height = 24,
  color = defaultColors.c_222124,
}: IIcon) => {
  return (
    <Svg
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"

  >
    <G clipPath="url(#clip0_2356_50830)">
      <Path
        d="M7.676 16l4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6L7.676 16z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2356_50830">
        <Path fill="#fff" transform="translate(.266)" d="M0 0H24V24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
  );
};

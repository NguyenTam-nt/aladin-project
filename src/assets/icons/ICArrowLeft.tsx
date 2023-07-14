import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export const ICArrowLeft = ({
  width = 24,
  height = 24,
  color = defaultColors._EA222A,
}: IIcon) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"

    >
      <G clipPath="url(#clip0_2251_57783)">
        <Path
          d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2251_57783">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

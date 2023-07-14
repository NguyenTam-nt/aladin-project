import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export const ICAdd = ({
  width = 24,
  height = 24,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"
  >
    <G clipPath="url(#clip0_2308_50994)">
      <Path d="M19.5 13h-6v6h-2v-6h-6v-2h6V5h2v6h6v2z" fill={color} />
    </G>
    <Defs>
      <ClipPath id="clip0_2308_50994">
        <Path fill="#fff" transform="translate(.5)" d="M0 0H24V24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
  );
};

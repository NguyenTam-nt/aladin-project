import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export const ICDelete = ({
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
      <G clipPath="url(#clip0_2308_50999)">
        <Path
          d="M16 9v10H8V9h8zm-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2308_50999">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

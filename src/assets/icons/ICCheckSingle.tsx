import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export const ICCheckSingle = ({
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
        <G clipPath="url(#clip0_2347_53716)">
          <Path
            d="M8.998 16.2l-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4-10.6 10.6z"
            fill={color}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_2347_53716">
            <Path fill={color} d="M0 0H24V24H0z" />
          </ClipPath>
        </Defs>
      </Svg>
  );
};

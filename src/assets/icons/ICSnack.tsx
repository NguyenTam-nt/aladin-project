import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';

export const ICSnack = ({
  width = 20,
  height = 20,
  color = defaultColors.c_222124,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_2307_56620)">
        <Path
          d="M19.965 11.238A12.085 12.085 0 0113.532 20H6.477a12.092 12.092 0 01-6.442-8.762 2.474 2.474 0 01.552-2.013 2.51 2.51 0 011.92-.892h14.984a2.507 2.507 0 011.917.892 2.473 2.473 0 01.557 2.013zm-8.299-6.726v1.321h1.667V4.512a3.65 3.65 0 00-1.078-2.601 2.027 2.027 0 01-.589-1.423V0H10v.488c.003.975.39 1.91 1.076 2.602a1.995 1.995 0 01.59 1.422zm-3.333.833v1.322H10V5.345a3.655 3.655 0 00-1.078-2.602 1.991 1.991 0 01-.589-1.421V0H6.666v1.322a3.653 3.653 0 001.077 2.6c.376.378.588.89.59 1.423z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2307_56620">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

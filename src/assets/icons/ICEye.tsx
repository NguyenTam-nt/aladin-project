import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

export const ICEye = ({
  width = 24,
  height = 24,
  color = defaultColors.c_222124,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_2356_51042)">
        <Path
          d="M12 6a9.77 9.77 0 018.82 5.5A9.77 9.77 0 0112 17a9.77 9.77 0 01-8.82-5.5A9.77 9.77 0 0112 6zm0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5a2.5 2.5 0 010 5 2.5 2.5 0 010-5zm0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2356_51042">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

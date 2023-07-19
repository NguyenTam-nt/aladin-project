import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';

export const ICCalendar = ({
  width = 24,
  height = 24,
  color = defaultColors.c_222124,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_2591_57289)">
        <Path
          d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2591_57289">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

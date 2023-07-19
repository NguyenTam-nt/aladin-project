import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

 export const ICEdit = ({
  width = 24,
  height = 24,
  color = defaultColors.c_222124,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_2356_51039)">
        <Path
          d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2356_51039">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};



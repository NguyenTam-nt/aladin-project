import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

export const ICCompound = ({
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
    <G clipPath="url(#clip0_2308_51004)">
      <Path
        d="M10.14 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10.5 12l-2.36 2.36c-.5-.23-1.05-.36-1.64-.36-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12.5 14l7 7h3v-1L10.14 7.64zM6.5 8a2 2 0 11-.001-3.999A2 2 0 016.5 8zm0 12a2 2 0 11-.001-3.999A2 2 0 016.5 20zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm7-9.5l-6 6 2 2 7-7V3h-3z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2308_51004">
        <Path fill="#fff" transform="translate(.5)" d="M0 0H24V24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
  );
};

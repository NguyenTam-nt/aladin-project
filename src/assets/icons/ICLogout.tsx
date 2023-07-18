import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Mask} from 'react-native-svg';

export const ICLogout = ({
  width = 24,
  height = 24,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_2307_56146)">
        <Mask
          id="a"
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={24}
          height={24}>
          <Path d="M0 0h24v24H0V0z" fill={color} />
        </Mask>
        <G mask="url(#a)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 7.3c0-1.68 0-2.52.327-3.162a3 3 0 011.311-1.311C10.28 2.5 11.12 2.5 12.8 2.5h2.4c1.68 0 2.52 0 3.162.327a3 3 0 011.311 1.311C20 4.78 20 5.62 20 7.3v9.4c0 1.68 0 2.52-.327 3.162a3 3 0 01-1.311 1.311c-.642.327-1.482.327-3.162.327h-2.4c-1.68 0-2.52 0-3.162-.327a3 3 0 01-1.311-1.311C8 19.22 8 18.38 8 16.7v-1.45h4a3.25 3.25 0 000-6.5H8V7.3zM5.384 9.884a1.25 1.25 0 10-1.768-1.768l-3 3a1.25 1.25 0 000 1.768l3 3a1.25 1.25 0 001.768-1.768l-.866-.866H12a1.25 1.25 0 100-2.5H4.518l.866-.866z"
            fill={color}
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_2307_56146">
          <Path fill={color} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

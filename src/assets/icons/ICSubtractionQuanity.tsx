import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

export const ICSubtractionQuanity = ({
  width = 24,
  height = 24,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_2307_58167)">
        <Path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"
          fill="#CBCBCB"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2307_58167">
          <Path fill={color} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

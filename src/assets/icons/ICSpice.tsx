import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';

export const ICSpice = ({
  width = 20,
  height = 20,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_2307_56640)">
        <Path
          d="M5.84 18.018c.3.748.756 1.424 1.338 1.981H4.584C1.448 20.1.001 16.666.001 14.166c-.067-3.494 3.208-5.124 3.333-8.334V4.166a.835.835 0 01.119-1.667 3.333 3.333 0 015.594-1.476 2.5 2.5 0 00-1.393 3.143H5.001v1.666A7.49 7.49 0 013.501 10h2.713a8.535 8.535 0 00-.375 8.02zM20 14.166c.005 2.5-1.444 5.935-4.583 5.833H11.25c-3.136.102-4.588-3.333-4.583-5.833C6.6 10.672 9.876 9.042 10 5.832V4.166a.835.835 0 11.118-1.667 3.328 3.328 0 016.43 0 .836.836 0 01.119 1.667v1.666c.125 3.21 3.4 4.84 3.333 8.334zm-3.5-4.167a7.485 7.485 0 01-1.5-4.167V4.166h-3.333v1.666a7.491 7.491 0 01-1.5 4.167H16.5zm-2.333 4.167a.833.833 0 10-1.667 0 .833.833 0 001.667 0zm1.666 2.5a.833.833 0 10-1.666 0 .833.833 0 001.666 0zm1.667-2.5a.834.834 0 10-1.667 0 .834.834 0 001.667 0z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2307_56640">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

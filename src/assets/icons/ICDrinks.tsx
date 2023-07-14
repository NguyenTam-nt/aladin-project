import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ICDrinks = ({
  width = 18,
  height = 20,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill="none"

      >
      <Path
        d="M8.993 8.333H.967L.712 6.297a2.518 2.518 0 012.453-2.964h6.383l-.555 5zm.834 7.592a.833.833 0 01-1.657-.183L8.808 10H1.176l.796 6.352A4.173 4.173 0 006.106 20h5.784a4.175 4.175 0 004.135-3.65l.793-6.35h-6.333l-.658 5.925zm7.2-7.592l.244-1.955a2.5 2.5 0 00-2.44-3.045h-3.605l-.555 5h6.356zm-5.695-5.925a.833.833 0 01.825-.741h3.508a.833.833 0 000-1.667h-3.508a2.5 2.5 0 00-2.484 2.224l-.124 1.11h1.677l.106-.926z"
        fill={color}
      />
    </Svg>
  );
};

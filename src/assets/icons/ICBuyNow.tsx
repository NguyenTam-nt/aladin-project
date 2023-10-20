import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ICBuyNow = ({
  width = 24,
  height = 24,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none">
      <Path
        d="M16.05 13C16.8 13 17.46 12.59 17.8 11.97L21.38 5.48C21.4643 5.32843 21.5075 5.15747 21.5054 4.98406C21.5034 4.81064 21.456 4.64077 21.3681 4.49126C21.2803 4.34175 21.1549 4.21778 21.0043 4.13162C20.8538 4.04545 20.6834 4.00009 20.51 4H5.71L4.77 2H1.5V4H3.5L7.1 11.59L5.75 14.03C5.02 15.37 5.98 17 7.5 17H19.5V15H7.5L8.6 13H16.05ZM6.66 6H18.81L16.05 11H9.03L6.66 6ZM7.5 18C6.4 18 5.51 18.9 5.51 20C5.51 21.1 6.4 22 7.5 22C8.6 22 9.5 21.1 9.5 20C9.5 18.9 8.6 18 7.5 18ZM17.5 18C16.4 18 15.51 18.9 15.51 20C15.51 21.1 16.4 22 17.5 22C18.6 22 19.5 21.1 19.5 20C19.5 18.9 18.6 18 17.5 18Z"
        fill={color}
      />
    </Svg>
  );
};

import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {defaultColors} from '../../../configs/dimentions';

export const ICProduct = ({
  width = 19,
  height = 22,
  color = defaultColors.primary,
}: IIcon) => (
  <Svg width={width} height={height} viewBox="0 0 19 22" fill="none">
    <Path
      d="M9.5 1L18 5.44682V16.5639L9.5 21L1 16.5639V5.44682L9.5 1ZM15.8852 5.8744L9.5 2.53928L7.03786 3.82202L13.3822 7.17851L15.8852 5.8744ZM9.5 9.20951L11.9315 7.94816L5.57692 4.59166L3.11478 5.8744L9.5 9.20951ZM2.30769 6.9861V15.7087L8.84615 19.1293V10.4067L2.30769 6.9861ZM10.1538 19.1293L16.6923 15.7087V6.9861L10.1538 10.4067V19.1293Z"
      fill={color}
      stroke={color}
      strokeWidth={0.4}
    />
  </Svg>
);

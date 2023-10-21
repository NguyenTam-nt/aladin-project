import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path, G, Circle, Rect} from 'react-native-svg';

export const ICISCheckbox = ({
  width = 24,
  height = 24,
  color = defaultColors.bg_939393,
}: IIcon) => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <Rect x="0.75" y="0.75" width="16.5" height="16.5" rx="4" fill="#FF7D03" />
    <Path
      d="M6.7498 12.1492L3.5998 8.99922L2.5498 10.0492L6.7498 14.2492L15.7498 5.24922L14.6998 4.19922L6.7498 12.1492Z"
      fill="white"
    />
  </Svg>
);

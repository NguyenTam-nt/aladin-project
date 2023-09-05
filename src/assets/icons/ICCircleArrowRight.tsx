import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

export const ICCircleArrowRight = ({
  width = 30,
  height = 30,
  color = defaultColors.bg_00C3AB,
}: IIcon) => (
  <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
    <Path
      d="M15 9L13.9425 10.0575L18.1275 14.25H9V15.75H18.1275L13.9425 19.9425L15 21L21 15L15 9Z"
      fill={color}
    />
    <Rect x={0.5} y={0.5} width={29} height={29} rx={14.5} stroke={color} />
  </Svg>
);

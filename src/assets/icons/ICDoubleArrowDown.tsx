import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ICDoubleArrowDown = ({
  width = 24,
  height = 24,
  color = defaultColors._EA222A,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 19l-6-6 1.05-1.05L12 16.9l4.95-4.95L18 13l-6 6zm0-6.325l-6-6 1.05-1.05 4.95 4.95 4.95-4.95L18 6.675l-6 6z"
        fill={color}
      />
    </Svg>
  );
};

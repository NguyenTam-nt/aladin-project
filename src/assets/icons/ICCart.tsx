import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ICCart = ({
  width = 28,
  height = 28,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
      <Path
        d="M19.736 15.335c1 0 1.88-.547 2.333-1.374l4.774-8.653c.493-.88-.147-1.973-1.16-1.973H5.949L4.696.668H.336v2.667h2.667l4.8 10.12-1.8 3.253c-.974 1.787.306 3.96 2.333 3.96h16v-2.667h-16l1.467-2.666h9.933zM7.216 6h16.2l-3.68 6.667h-9.36l-3.16-6.667zm1.12 16a2.663 2.663 0 00-2.653 2.667 2.663 2.663 0 002.653 2.667c1.467 0 2.667-1.2 2.667-2.667 0-1.467-1.2-2.667-2.667-2.667zm13.333 0a2.663 2.663 0 00-2.653 2.667 2.663 2.663 0 002.653 2.667c1.467 0 2.667-1.2 2.667-2.667 0-1.467-1.2-2.667-2.667-2.667z"
        fill={color}
      />
    </Svg>
  );
};

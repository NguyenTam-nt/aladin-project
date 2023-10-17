import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ICAccountInfo = ({
  width = 19,
  height = 23,
  color = defaultColors.text_111213,
}: IIcon) => (
  <Svg width={width} height={height} viewBox="0 0 19 23" fill="none">
    <Path
      d="M11.875 0H2.375C1.74511 0 1.14102 0.242321 0.695621 0.673654C0.250222 1.10499 0 1.69 0 2.3V20.7C0 21.9765 1.05687 23 2.375 23H16.625C17.9431 23 19 21.9765 19 20.7V6.9L11.875 0ZM16.625 20.7H2.375V2.3H10.6875V8.05H16.625V20.7ZM10.6875 12.65C10.6875 13.915 9.61875 14.95 8.3125 14.95C7.00625 14.95 5.9375 13.915 5.9375 12.65C5.9375 11.385 7.00625 10.35 8.3125 10.35C9.61875 10.35 10.6875 11.385 10.6875 12.65ZM13.0625 18.4V19.55H3.5625V18.4C3.5625 16.8705 6.73312 16.1 8.3125 16.1C9.89188 16.1 13.0625 16.8705 13.0625 18.4Z"
      fill={color}
    />
  </Svg>
);

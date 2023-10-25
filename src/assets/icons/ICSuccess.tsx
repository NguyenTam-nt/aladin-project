import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ICSuccess = ({
  width = 26,
  height = 26,
  color = defaultColors.ic_919EAB,
}: IIcon) => {
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25 3.65854C13.2134 3.65854 3.65854 13.2134 3.65854 25C3.65854 36.7866 13.2134 46.3415 25 46.3415C36.7866 46.3415 46.3415 36.7866 46.3415 25C46.3415 13.2134 36.7866 3.65854 25 3.65854ZM0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25Z"
        fill="#00D2B8"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M38.8442 18.5694L22.1036 35.31L12.1211 25.3275L14.7081 22.7406L22.1036 30.1361L36.2573 15.9824L38.8442 18.5694Z"
        fill="#00D2B8"
      />
    </Svg>
  );
};

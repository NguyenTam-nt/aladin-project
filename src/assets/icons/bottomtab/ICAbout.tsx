import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {defaultColors} from '../../../configs/dimentions';

export const ICAbout = ({
  width = 21,
  height = 21,
  color = defaultColors.bg_939393,
}: IIcon) => (
  <Svg width={width} height={height} viewBox="0 0 21 21" fill="none">
    <Path
      d="M14.6606 1.75H6.33937C5.32525 1.75 4.81863 1.75 4.40913 1.89263C4.02306 2.02952 3.67374 2.25357 3.3883 2.54735C3.10285 2.84114 2.88897 3.19677 2.76325 3.58662C2.625 4.00837 2.625 4.52987 2.625 5.57375V17.8272C2.625 18.578 3.48687 18.977 4.032 18.4782C4.18494 18.3369 4.38552 18.2585 4.59375 18.2585C4.80198 18.2585 5.00256 18.3369 5.1555 18.4782L5.57812 18.865C5.84606 19.1128 6.19757 19.2504 6.5625 19.2504C6.92743 19.2504 7.27894 19.1128 7.54688 18.865C7.81481 18.6172 8.16632 18.4796 8.53125 18.4796C8.89618 18.4796 9.24769 18.6172 9.51562 18.865C9.78356 19.1128 10.1351 19.2504 10.5 19.2504C10.8649 19.2504 11.2164 19.1128 11.4844 18.865C11.7523 18.6172 12.1038 18.4796 12.4688 18.4796C12.8337 18.4796 13.1852 18.6172 13.4531 18.865C13.7211 19.1128 14.0726 19.2504 14.4375 19.2504C14.8024 19.2504 15.1539 19.1128 15.4219 18.865L15.8445 18.4782C15.9974 18.3369 16.198 18.2585 16.4062 18.2585C16.6145 18.2585 16.8151 18.3369 16.968 18.4782C17.5131 18.977 18.375 18.578 18.375 17.8272V5.57375C18.375 4.52987 18.375 4.0075 18.2367 3.5875C18.1112 3.19745 17.8974 2.84162 17.6119 2.54766C17.3265 2.25371 16.9771 2.02955 16.5909 1.89263C16.1814 1.75 15.6747 1.75 14.6606 1.75Z"
      stroke={color}
      strokeWidth={1.8}
    />
    <Path
      d="M9.1875 9.625H14.875M6.125 9.625H6.5625M6.125 6.5625H6.5625M6.125 12.6875H6.5625M9.1875 6.5625H14.875M9.1875 12.6875H14.875"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
);

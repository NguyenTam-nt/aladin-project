import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Defs, Path, RadialGradient, Stop} from 'react-native-svg';

export const ICSearch = ({
  width = 32,
  height = 32,
  color = defaultColors.bg_939393,
}: IIcon) => (
  <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
    <Path
      d="M20.6667 18.6667H19.6133L19.24 18.3067C20.5918 16.7387 21.3348 14.7369 21.3333 12.6667C21.3333 10.9526 20.825 9.27696 19.8727 7.85173C18.9204 6.4265 17.5669 5.31567 15.9833 4.65971C14.3996 4.00376 12.6571 3.83213 10.9759 4.16653C9.29472 4.50094 7.75047 5.32636 6.53841 6.53841C5.32636 7.75047 4.50094 9.29472 4.16653 10.9759C3.83213 12.6571 4.00376 14.3996 4.65971 15.9833C5.31567 17.5669 6.4265 18.9204 7.85173 19.8727C9.27696 20.825 10.9526 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.34667 18.6667 6.66667 15.9867 6.66667 12.6667C6.66667 9.34667 9.34667 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z"
      fill="url(#paint0_radial_1265_35421)"
    />
    <Defs>
      <RadialGradient
        id="paint0_radial_1265_35421"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(15.7726 -7.58519) rotate(109.723) scale(35.214 286507)">
        <Stop stopColor="#FF6D03" />
        <Stop offset={1} stopColor="#E60E00" />
      </RadialGradient>
    </Defs>
  </Svg>
);
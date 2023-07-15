import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

 export const ICDrawerHotPot = ({
  width = 20,
  height = 20,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_2251_57559)" fill={color}>
        <Path d="M3.322 19.23c0 .424.345.77.77.77h11.83c.424 0 .77-.346.77-.77v-.834H3.322v.834zM18.73 11.135a.586.586 0 00-.586-.586H1.869c-.776.03-.776 1.144 0 1.172h1.453v5.503h13.37v-5.503h1.452a.586.586 0 00.586-.586z" />
        <Path d="M18.145 12.974h-.28s-.002 0-.002.002v1.168l.002.002h.292c.868.024.886 1.25.02 1.29h-.312-.002v1.17l.002.001h.312c2.425-.103 2.397-3.55-.032-3.633zM1.855 12.974c-2.43.083-2.456 3.53-.032 3.633h.304c.001 0 .002 0 .002-.002v-1.168c0-.001 0-.002-.002-.002h-.284c-.868-.024-.886-1.25-.02-1.289h.304c.001 0 .002 0 .002-.002v-1.168c0-.001 0-.002-.002-.002h-.272zM17.325 4.457a1.108 1.108 0 00-2-.954l-2.843 5.86h2.542l2.3-4.906zM2.91 6.018c.541.558 1.22.963 1.966 1.175.723.203 1.502.197 1.877-.45.382-.636.132-1.584-.592-1.838a4.418 4.418 0 01-1.818-1.063c-.551-.515-1.533-.282-1.903.372-.368.628-.025 1.289.47 1.804zM9.484 3.662a4.598 4.598 0 002.165-.995c.6-.5 1.054-1.172.72-1.875-.32-.703-1.281-1.046-1.927-.575a4.598 4.598 0 01-1.982.934c-.766.17-1.145 1.15-.801 1.852.322.686 1.09.781 1.825.66z" />
      </G>
      <Defs>
        <ClipPath id="clip0_2251_57559">
          <Path fill={color} d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};


